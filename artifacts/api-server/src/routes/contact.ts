import { Router, type IRouter } from "express";
import nodemailer from "nodemailer";

const router: IRouter = Router();

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isSmtpConfigured(): boolean {
  return !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

router.get("/contact/config", (_req, res) => {
  const configured = !!(process.env.CONTACT_EMAIL && isSmtpConfigured());
  res.json({ configured });
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

  const { name, email, message } = req.body ?? {};

  if (
    typeof name !== "string" || !name.trim() || name.length > 200 ||
    typeof email !== "string" || !isValidEmail(email) || email.length > 300 ||
    typeof message !== "string" || !message.trim() || message.length > 5000
  ) {
    res.status(400).json({ error: "Ungültige Eingabe" });
    return;
  }

  const smtpPort = parseInt(process.env.SMTP_PORT ?? "587");

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
