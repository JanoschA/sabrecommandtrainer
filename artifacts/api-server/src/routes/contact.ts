import { randomUUID } from "node:crypto";
import { Router, type IRouter, type Request } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

interface TurnstileVerificationResult {
  success: boolean;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
  "error-codes"?: string[];
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSmtpConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function isTurnstileConfigured(): boolean {
  return !!(process.env.TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

function isRecentEnough(startedAt: unknown): boolean {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return false;
  const elapsed = Date.now() - startedAt;
  return elapsed >= 2500 && elapsed < 1000 * 60 * 60;
}

function getRequestIp(req: Request): string | undefined {
  const cfIp = req.headers["cf-connecting-ip"];
  if (typeof cfIp === "string" && cfIp.trim()) {
    return cfIp;
  }

  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0]?.trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor[0]) {
    return forwardedFor[0].split(",")[0]?.trim();
  }

  return req.ip || undefined;
}

async function verifyTurnstile(token: string, remoteip?: string): Promise<TurnstileVerificationResult> {
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip,
        idempotency_key: randomUUID(),
      }),
    });

    const result = (await response.json().catch(() => ({}))) as TurnstileVerificationResult;

    if (!response.ok) {
      return {
        success: false,
        "error-codes": [...(result["error-codes"] ?? []), "siteverify-unavailable"],
      };
    }

    return result;
  } catch {
    return {
      success: false,
      "error-codes": ["internal-error"],
    };
  }
}

router.get("/contact/config", (_req, res) => {
  const configured = !!(process.env.CONTACT_EMAIL && isSmtpConfigured() && isTurnstileConfigured());
  res.json({
    configured,
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY ?? null,
  });
});

router.post("/contact", async (req, res) => {
  const recipientEmail = process.env.CONTACT_EMAIL;
  if (!recipientEmail) {
    res.status(503).json({ error: "CONTACT_EMAIL not configured", fallback: true });
    return;
  }

  if (!isSmtpConfigured()) {
    res.status(503).json({ error: "SMTP not configured", fallback: true });
    return;
  }

  if (!isTurnstileConfigured()) {
    res.status(503).json({ error: "TURNSTILE not configured", fallback: true });
    return;
  }

  const {
    name,
    email,
    message,
    turnstileToken,
    website,
    startedAt,
  } = req.body ?? {};

  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.length > 200 ||
    typeof email !== "string" ||
    !isValidEmail(email) ||
    email.length > 300 ||
    typeof message !== "string" ||
    !message.trim() ||
    message.length > 5000 ||
    typeof turnstileToken !== "string" ||
    !turnstileToken.trim() ||
    turnstileToken.length > 2048 ||
    (typeof website === "string" && website.trim().length > 0) ||
    !isRecentEnough(startedAt)
  ) {
    res.status(400).json({ error: "Ungültige Eingabe" });
    return;
  }

  const turnstileResult = await verifyTurnstile(turnstileToken, getRequestIp(req));
  const hasActionMismatch =
    typeof turnstileResult.action === "string" &&
    turnstileResult.action.length > 0 &&
    turnstileResult.action !== "contact_form";

  if (!turnstileResult.success || hasActionMismatch) {
    req.log.warn(
      {
        turnstile: {
          success: turnstileResult.success,
          action: turnstileResult.action,
          errorCodes: turnstileResult["error-codes"] ?? [],
          hostname: turnstileResult.hostname,
        },
      },
      "Turnstile verification failed",
    );

    const errorCodes = turnstileResult["error-codes"] ?? [];
    const unavailable =
      errorCodes.includes("internal-error") || errorCodes.includes("siteverify-unavailable");

    res.status(unavailable ? 502 : 400).json({
      error: unavailable
        ? "Sicherheitsprüfung aktuell nicht verfügbar. Bitte versuche es später erneut."
        : "Sicherheitsprüfung fehlgeschlagen. Bitte versuche es erneut.",
      turnstile: true,
      errorCodes,
    });
    return;
  }

  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587", 10);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name.trim()}" <${process.env.SMTP_USER!}>`,
      replyTo: email.trim(),
      to: recipientEmail,
      subject: `Kontaktformular: Nachricht von ${name.trim()}`,
      text: `Name: ${name.trim()}\nE-Mail: ${email.trim()}\n\nNachricht:\n${message.trim()}`,
      html: `<p><strong>Name:</strong> ${name.trim()}</p><p><strong>E-Mail:</strong> ${email.trim()}</p><hr><p>${message.trim().replace(/\n/g, "<br>")}</p>`,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "E-Mail konnte nicht gesendet werden" });
  }
});

export default router;
