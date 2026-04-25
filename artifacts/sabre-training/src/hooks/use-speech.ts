import { useCallback, useEffect, useRef } from 'react';
import { AUDIO_SUBFOLDER, resolveAudioFileKey } from '@/lib/audio-files';
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
  const exact = voices.filter((v) => v.localService && v.lang === code);
  if (exact.length) return exact[0];
  const anyLocal = voices.filter((v) => v.localService && v.lang.startsWith(prefix));
  if (anyLocal.length) return anyLocal[0];
  const exactRemote = voices.filter((v) => v.lang === code);
  if (exactRemote.length) return exactRemote[0];
  const anyRemote = voices.filter((v) => v.lang.startsWith(prefix));
  if (anyRemote.length) return anyRemote[0];
  return null;
}

const BASE = import.meta.env.BASE_URL ?? '/';
const AUDIO_CACHE = 'sabre-command-audio-v1';

const audioCache = new Map<string, HTMLAudioElement>();

async function persistAudioResponse(url: string): Promise<void> {
  if (typeof window === 'undefined' || !('caches' in window)) return;

  try {
    const cache = await window.caches.open(AUDIO_CACHE);
    const existing = await cache.match(url);
    if (existing) return;

    const response = await fetch(url, { cache: 'force-cache' });
    if (response.ok) {
      await cache.put(url, response.clone());
    }
  } catch {
    // Best-effort only. If this fails, normal runtime fetches still work.
  }
}

async function preloadAudioFiles(lang: Language): Promise<void> {
  const cacheTasks: Promise<void>[] = [];

  for (const [baseKey, subfolder] of Object.entries(AUDIO_SUBFOLDER)) {
    const cacheKey = `${lang}:${baseKey}`;
    if (audioCache.has(cacheKey)) continue;
    const url = `${BASE}audio/${lang}/${subfolder}/${baseKey}.mp3`;
    const audio = new Audio(url);
    audio.preload = 'auto';
    audio.load();
    audioCache.set(cacheKey, audio);
    cacheTasks.push(persistAudioResponse(url));
  }

  await Promise.allSettled(cacheTasks);
}

function tryPlayAudioFile(key: string, lang: Language, volume: number): Promise<boolean> {
  const subfolder = AUDIO_SUBFOLDER[key];
  if (!subfolder) return Promise.resolve(false);

  return new Promise((resolve) => {
    const cacheKey = `${lang}:${key}`;
    const cached = audioCache.get(cacheKey);

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
      audio.play().catch(() => settle(false));
    } else if (isCached) {
      timeout = setTimeout(() => settle(false), 3000);
      audio.addEventListener('canplaythrough', onCanPlay, { once: true });
    } else {
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

  const speak = useCallback((text: string, fileKey?: string): Promise<void> => {
    if (isCancelledRef.current) return Promise.resolve();

    return new Promise<void>(async (resolve) => {
      if (isCancelledRef.current) {
        resolve();
        return;
      }

      forceResolveRef.current = resolve;
      const vol = volumeRef?.current ?? 1.0;
      const resolvedFileKey = fileKey
        ? resolveAudioFileKey(fileKey, language, text)
        : resolveAudioFileKey(text, language, text);

      const played = await tryPlayAudioFile(resolvedFileKey, language, vol);
      if (played) {
        if (forceResolveRef.current === resolve) forceResolveRef.current = null;
        resolve();
        return;
      }

      if (isCancelledRef.current) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      forceResolveRef.current = resolve;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANG_MAP[language];
      utterance.volume = vol;
      utterance.rate = language === 'de' ? 0.88 : language === 'fr' ? 0.92 : 0.95;
      utterance.pitch = 1.05;

      const voice = pickVoice(language);
      if (voice) utterance.voice = voice;

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

  const stopAll = useCallback(() => {
    isCancelledRef.current = true;
    window.speechSynthesis.cancel();
    if (forceResolveRef.current) {
      forceResolveRef.current();
      forceResolveRef.current = null;
    }
  }, []);

  const resetCancelled = useCallback(() => {
    isCancelledRef.current = false;
  }, []);

  const initSpeech = useCallback(() => {
    isCancelledRef.current = false;
    const u = new SpeechSynthesisUtterance('');
    u.volume = 0;
    window.speechSynthesis.speak(u);
  }, []);

  const preloadAudio = useCallback(async (lang: Language) => {
    await preloadAudioFiles(lang);
  }, []);

  return { speak, stopAll, resetCancelled, initSpeech, preloadAudio };
}
