import { useCallback, useEffect, useRef } from 'react';
import { Language } from '@/lib/i18n';

const LANG_MAP: Record<Language, string> = {
  de: 'de-DE',
  en: 'en-US',
  fr: 'fr-FR',
};

function pickVoice(lang: Language): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const code = LANG_MAP[lang];
  const prefix = code.slice(0, 2);
  const exact = voices.filter(v => v.localService && v.lang === code);
  if (exact.length) return exact[0];
  const anyLocal = voices.filter(v => v.localService && v.lang.startsWith(prefix));
  if (anyLocal.length) return anyLocal[0];
  const exactRemote = voices.filter(v => v.lang === code);
  if (exactRemote.length) return exactRemote[0];
  const anyRemote = voices.filter(v => v.lang.startsWith(prefix));
  if (anyRemote.length) return anyRemote[0];
  return null;
}

/**
 * Converts a spoken label to an audio file key.
 * E.g. "w_laufen" → "w_laufen", "vor" → "vor"
 * This key maps to: public/audio/{lang}/{subfolder}/{key}.mp3
 */
function labelToFileKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

const BASE = import.meta.env.BASE_URL ?? '/';

const AUDIO_SUBFOLDER: Record<string, string> = {
  laufen: 'aufwaermen',
  hampelmann: 'aufwaermen',
  knie_heben: 'aufwaermen',
  arme_kreisen: 'aufwaermen',
  schultern_kreisen: 'aufwaermen',
  rumpf_drehen: 'aufwaermen',
  leichte_spruenge: 'aufwaermen',
  tiefe_hocke: 'aufwaermen',
  tief_atmen: 'abkuehlen',
  schulter_dehnen: 'abkuehlen',
  wade_dehnen: 'abkuehlen',
  oberschenkel_dehnen: 'abkuehlen',
  seitendehnung: 'abkuehlen',
  nacken_lockern: 'abkuehlen',
  langsam_gehen: 'abkuehlen',
  ruecken_dehnen: 'abkuehlen',
  en_garde: 'training',
  vor: 'training',
  zurueck: 'training',
  ausfall: 'training',
  quart: 'training',
  oktav: 'training',
  quint: 'training',
  riposte: 'training',
  balestra: 'training',
  motiv_1: 'motivation',
  motiv_2: 'motivation',
  motiv_3: 'motivation',
  motiv_4: 'motivation',
  motiv_5: 'motivation',
  motiv_6: 'motivation',
};

/**
 * Module-level audio cache: key → HTMLAudioElement
 * Persists across hook re-renders and component re-mounts.
 */
const audioCache = new Map<string, HTMLAudioElement>();

/**
 * Preload all known audio files for the given language into the cache.
 * Each Audio element gets preload="auto" and is immediately buffered via .load().
 */
function preloadAudioFiles(lang: Language): void {
  for (const [key, subfolder] of Object.entries(AUDIO_SUBFOLDER)) {
    const cacheKey = `${lang}:${key}`;
    if (audioCache.has(cacheKey)) continue;
    const url = `${BASE}audio/${lang}/${subfolder}/${key}.mp3`;
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();
    audioCache.set(cacheKey, audio);
  }
}

/**
 * Try to play a custom audio file from public/audio/{lang}/{subfolder}/{key}.mp3
 * Uses the preloaded cache when available.
 * Returns true if played successfully, false if file not found or error.
 */
function tryPlayAudioFile(key: string, lang: Language, volume: number): Promise<boolean> {
  const subfolder = AUDIO_SUBFOLDER[key];
  if (!subfolder) return Promise.resolve(false);

  return new Promise(resolve => {
    const cacheKey = `${lang}:${key}`;
    const cached = audioCache.get(cacheKey);

    // If cached but already in a failed/no-source state, skip immediately
    if (cached) {
      if (
        cached.error !== null ||
        cached.networkState === HTMLMediaElement.NETWORK_NO_SOURCE
      ) {
        return resolve(false);
      }
    }

    let audio: HTMLAudioElement;
    let isCached = false;
    if (cached) {
      audio = cached;
      isCached = true;
      // Rewind so it can be replayed
      audio.currentTime = 0;
    } else {
      const url = `${BASE}audio/${lang}/${subfolder}/${key}.mp3`;
      audio = new Audio(url);
    }

    audio.volume = Math.max(0, Math.min(1, volume));
    let settled = false;

    const settle = (success: boolean) => {
      if (settled) return;
      settled = true;
      audio.removeEventListener('canplaythrough', onCanPlay);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      resolve(success);
    };

    const onEnded = () => settle(true);
    const onError = () => settle(false);
    const onCanPlay = () => {
      clearTimeout(timeout);
      audio.play().catch(() => settle(false));
    };

    audio.addEventListener('ended', onEnded, { once: true });
    audio.addEventListener('error', onError, { once: true });

    let timeout: ReturnType<typeof setTimeout>;

    if (audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      // Already buffered — play immediately (no timeout needed)
      audio.play().catch(() => settle(false));
    } else if (isCached) {
      // Cached but still loading — wait up to 3000ms
      timeout = setTimeout(() => settle(false), 3000);
      audio.addEventListener('canplaythrough', onCanPlay, { once: true });
    } else {
      // Not cached — original short-timeout path (600ms)
      timeout = setTimeout(() => {
        audio.src = '';
        settle(false);
      }, 600);
      audio.addEventListener('canplaythrough', onCanPlay, { once: true });
      audio.load();
    }
  });
}

export function useSpeech(language: Language, volumeRef?: React.MutableRefObject<number>) {
  const forceResolveRef = useRef<(() => void) | null>(null);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    window.speechSynthesis.getVoices();
    const h = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', h);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', h);
  }, []);

  /**
   * Speak a label. First tries public/audio/{lang}/{subfolder}/{key}.mp3.
   * Falls back to Web Speech API TTS if no file found or key is unmapped.
   * Resolves when speech/audio finishes OR when stopAll() is called.
   */
  const speak = useCallback((text: string, fileKey?: string): Promise<void> => {
    if (isCancelledRef.current) return Promise.resolve();

    return new Promise<void>(async (resolve) => {
      if (isCancelledRef.current) { resolve(); return; }

      forceResolveRef.current = resolve;
      const vol = volumeRef?.current ?? 1.0;
      const resolvedFileKey = fileKey ?? labelToFileKey(text);

      // ── Try audio file first ──────────────────────────────────────────────
      const played = await tryPlayAudioFile(resolvedFileKey, language, vol);
      if (played) {
        if (forceResolveRef.current === resolve) forceResolveRef.current = null;
        resolve();
        return;
      }

      // ── Fall back to Web Speech API TTS ───────────────────────────────────
      if (isCancelledRef.current) { resolve(); return; }

      window.speechSynthesis.cancel();
      forceResolveRef.current = resolve;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANG_MAP[language];
      utterance.volume = vol;
      utterance.rate = language === 'de' ? 0.88 : language === 'fr' ? 0.92 : 0.95;
      utterance.pitch = 1.05;

      const voice = pickVoice(language);
      if (voice) utterance.voice = voice;

      // Safety timeout: max 8s
      const safetyTimer = setTimeout(() => {
        if (forceResolveRef.current === resolve) {
          forceResolveRef.current = null;
          resolve();
        }
      }, 8000);

      const done = () => {
        clearTimeout(safetyTimer);
        if (forceResolveRef.current === resolve) forceResolveRef.current = null;
        resolve();
      };

      utterance.onend = done;
      utterance.onerror = done;
      window.speechSynthesis.speak(utterance);
    });
  }, [language, volumeRef]);

  /**
   * Stop all speech immediately and force-resolve any pending speak() call.
   * This unblocks the command loop so it can exit cleanly.
   */
  const stopAll = useCallback(() => {
    isCancelledRef.current = true;
    window.speechSynthesis.cancel();
    if (forceResolveRef.current) {
      forceResolveRef.current();
      forceResolveRef.current = null;
    }
  }, []);

  const resetCancelled = useCallback(() => { isCancelledRef.current = false; }, []);

  const initSpeech = useCallback(() => {
    isCancelledRef.current = false;
    const u = new SpeechSynthesisUtterance('');
    u.volume = 0;
    window.speechSynthesis.speak(u);
  }, []);

  const preloadAudio = useCallback((lang: Language) => {
    preloadAudioFiles(lang);
  }, []);

  return { speak, stopAll, resetCancelled, initSpeech, preloadAudio };
}
