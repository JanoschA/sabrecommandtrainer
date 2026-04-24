import { mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { AUDIO_SUBFOLDER, labelToFileKey } from "../../artifacts/sabre-training/src/lib/audio-files";
import {
  ALL_MOVES,
  COOLDOWN_MOVES,
  WARMUP_MOVES,
  translations,
  type Language,
} from "../../artifacts/sabre-training/src/lib/i18n";

type Category = "training" | "warmup" | "cooldown" | "motivation";

interface AudioJob {
  lang: Language;
  category: Category;
  translationKey: string;
  text: string;
  synthesisText: string;
  fileKey: string;
  subfolder: string;
  outputPath: string;
}

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const AUDIO_ROOT = path.join(REPO_ROOT, "artifacts", "sabre-training", "public", "audio");
const DEFAULT_LANGS: Language[] = ["en", "fr"];
const DEFAULT_CATEGORIES: Category[] = ["training", "warmup", "cooldown", "motivation"];
const LANGUAGE_CODES: Record<Language, string> = {
  de: "de",
  en: "en",
  fr: "fr",
};
const LANGUAGE_VOICE_ENV: Record<Language, string> = {
  de: "ELEVENLABS_VOICE_ID_DE",
  en: "ELEVENLABS_VOICE_ID_EN",
  fr: "ELEVENLABS_VOICE_ID_FR",
};

function parseArgs(argv: string[]) {
  const options = {
    langs: [] as Language[],
    categories: [] as Category[],
    overwrite: false,
    dryRun: false,
    modelId: process.env.ELEVENLABS_MODEL_ID ?? "eleven_v3",
    outputFormat: process.env.ELEVENLABS_OUTPUT_FORMAT ?? "mp3_44100_128",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--overwrite") {
      options.overwrite = true;
      continue;
    }
    if (arg === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (arg === "--langs" || arg === "--lang") {
      const value = argv[index + 1];
      if (!value) throw new Error(`Missing value after ${arg}.`);
      options.langs.push(...parseList<Language>(value, ["de", "en", "fr"]));
      index += 1;
      continue;
    }
    if (arg === "--categories" || arg === "--category") {
      const value = argv[index + 1];
      if (!value) throw new Error(`Missing value after ${arg}.`);
      options.categories.push(...parseList<Category>(value, DEFAULT_CATEGORIES));
      index += 1;
      continue;
    }
    if (arg === "--model") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value after --model.");
      options.modelId = value;
      index += 1;
      continue;
    }
    if (arg === "--output-format") {
      const value = argv[index + 1];
      if (!value) throw new Error("Missing value after --output-format.");
      options.outputFormat = value;
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    ...options,
    langs: dedupe(options.langs.length ? options.langs : DEFAULT_LANGS),
    categories: dedupe(options.categories.length ? options.categories : DEFAULT_CATEGORIES),
  };
}

function parseList<T extends string>(value: string, allowed: readonly T[]): T[] {
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (!allowed.includes(part as T)) {
        throw new Error(`Unsupported value "${part}". Allowed: ${allowed.join(", ")}`);
      }
      return part as T;
    });
}

function dedupe<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function printHelp() {
  console.log(`Generate missing audio files from existing i18n texts via ElevenLabs.

Usage:
  pnpm --filter @workspace/scripts run generate:audio -- --langs en,fr

Environment:
  ELEVENLABS_API_KEY           Required
  ELEVENLABS_VOICE_ID_EN       Required when generating English
  ELEVENLABS_VOICE_ID_FR       Required when generating French
  ELEVENLABS_VOICE_ID_DE       Required when generating German
  ELEVENLABS_MODEL_ID          Optional (default: eleven_v3)
  ELEVENLABS_OUTPUT_FORMAT     Optional (default: mp3_44100_128)

Options:
  --langs en,fr                Languages to generate (default: en,fr)
  --categories training,...    Categories: training,warmup,cooldown,motivation
  --overwrite                  Regenerate files even if they already exist
  --dry-run                    Print planned files without calling the API
  --model eleven_v3            Override ElevenLabs model for this run
  --output-format mp3_44100_128
`);
}

function categoryEntries(category: Category): Array<{ translationKey: string; text: string; subfolder: string }> {
  switch (category) {
    case "training":
      return [...ALL_MOVES].map((moveId) => {
        const translationKey = `move_${moveId}`;
        const text = String(translations.de[translationKey as keyof typeof translations.de]);
        const fileKey = labelToFileKey(text);
        return { translationKey, text, subfolder: AUDIO_SUBFOLDER[fileKey] ?? "training" };
      });
    case "warmup":
      return [...WARMUP_MOVES].map((moveId) => {
        const translationKey = `move_${moveId}`;
        const text = String(translations.de[translationKey as keyof typeof translations.de]);
        const fileKey = labelToFileKey(text);
        return { translationKey, text, subfolder: AUDIO_SUBFOLDER[fileKey] ?? "aufwaermen" };
      });
    case "cooldown":
      return [...COOLDOWN_MOVES].map((moveId) => {
        const translationKey = `move_${moveId}`;
        const text = String(translations.de[translationKey as keyof typeof translations.de]);
        const fileKey = labelToFileKey(text);
        return { translationKey, text, subfolder: AUDIO_SUBFOLDER[fileKey] ?? "abkuehlen" };
      });
    case "motivation":
      return Array.from({ length: 6 }, (_, index) => {
        const translationKey = `motiv_${index + 1}`;
        const fileKey = translationKey;
        return { translationKey, text: fileKey, subfolder: AUDIO_SUBFOLDER[fileKey] ?? "motivation" };
      });
    default:
      return [];
  }
}

function buildSynthesisText(category: Category, lang: Language, text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;

  switch (category) {
    case "training":
      return buildTrainingPrompt(lang, trimmed);
    case "motivation":
      return buildMotivationPrompt(lang, trimmed);
    case "warmup":
    case "cooldown":
    default:
      return trimmed;
  }
}

function buildTrainingPrompt(lang: Language, text: string): string {
  const command = text.endsWith("!") ? text : `${text}!`;

  switch (lang) {
    case "de":
      return `[shouts] ${command}`;
    case "fr":
      return `[shouts] ${command}`;
    case "en":
    default:
      return `[shouts] ${command}`;
  }
}

function buildMotivationPrompt(lang: Language, text: string): string {
  const command = text.endsWith("!") ? text : `${text}!`;

  switch (lang) {
    case "de":
      return `[energetic] ${command}`;
    case "fr":
      return `[energetic] ${command}`;
    case "en":
    default:
      return `[energetic] ${command}`;
  }
}

function buildJobs(langs: Language[], categories: Category[]): AudioJob[] {
  const jobs: AudioJob[] = [];

  for (const lang of langs) {
    const dict = translations[lang];
    for (const category of categories) {
      const entries = categoryEntries(category);
      for (const entry of entries) {
        const rawText = String(dict[entry.translationKey as keyof typeof dict] ?? "");
        const text = rawText.trim();
        if (!text) continue;

        const fileKey = category === "motivation" ? entry.translationKey : labelToFileKey(text);
        jobs.push({
          lang,
          category,
          translationKey: entry.translationKey,
          text,
          synthesisText: buildSynthesisText(category, lang, text),
          fileKey,
          subfolder: entry.subfolder,
          outputPath: path.join(AUDIO_ROOT, lang, entry.subfolder, `${fileKey}.mp3`),
        });
      }
    }
  }

  return jobs;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function buildVoiceSettings() {
  const stability = numberEnv("ELEVENLABS_STABILITY");
  const similarityBoost = numberEnv("ELEVENLABS_SIMILARITY_BOOST");
  const style = numberEnv("ELEVENLABS_STYLE");
  const useSpeakerBoost = booleanEnv("ELEVENLABS_USE_SPEAKER_BOOST");

  const settings = {
    ...(stability !== undefined ? { stability } : {}),
    ...(similarityBoost !== undefined ? { similarity_boost: similarityBoost } : {}),
    ...(style !== undefined ? { style } : {}),
    ...(useSpeakerBoost !== undefined ? { use_speaker_boost: useSpeakerBoost } : {}),
  };

  return Object.keys(settings).length ? settings : undefined;
}

function numberEnv(name: string): number | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Environment variable ${name} must be a number.`);
  }
  return parsed;
}

function booleanEnv(name: string): boolean | undefined {
  const value = process.env[name];
  if (!value) return undefined;
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  throw new Error(`Environment variable ${name} must be true/false or 1/0.`);
}

async function generateAudio(job: AudioJob, apiKey: string, voiceId: string, modelId: string, outputFormat: string) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${encodeURIComponent(outputFormat)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: job.synthesisText,
        model_id: modelId,
        language_code: LANGUAGE_CODES[job.lang],
        voice_settings: buildVoiceSettings(),
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `ElevenLabs request failed for ${job.lang}/${job.fileKey}: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ""}`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(job.outputPath), { recursive: true });
  await writeFile(job.outputPath, buffer);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey && !options.dryRun) {
    throw new Error("ELEVENLABS_API_KEY is required.");
  }

  const jobs = buildJobs(options.langs, options.categories);
  if (!jobs.length) {
    console.log("No audio jobs found.");
    return;
  }

  console.log(`Preparing ${jobs.length} audio jobs for ${options.langs.join(", ")} (${options.categories.join(", ")}).`);

  let created = 0;
  let skipped = 0;

  for (const job of jobs) {
    const exists = await fileExists(job.outputPath);
    if (exists && !options.overwrite) {
      skipped += 1;
      console.log(`skip ${path.relative(REPO_ROOT, job.outputPath)}`);
      continue;
    }

    console.log(
      `${options.dryRun ? "plan" : "make"} ${job.lang}/${job.subfolder}/${job.fileKey}.mp3 <- "${job.text}" | synth "${job.synthesisText}"`,
    );

    if (options.dryRun) {
      continue;
    }

    const voiceIdEnv = LANGUAGE_VOICE_ENV[job.lang];
    const voiceId = process.env[voiceIdEnv];
    if (!voiceId) {
      throw new Error(`Missing ${voiceIdEnv} for language ${job.lang}.`);
    }

    await generateAudio(job, apiKey!, voiceId, options.modelId, options.outputFormat);
    created += 1;
  }

  console.log(`Done. Created ${created}, skipped ${skipped}.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
