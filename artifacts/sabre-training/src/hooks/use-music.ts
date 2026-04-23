import { useRef, useCallback, useEffect } from 'react';

/**
 * Generates a rhythmic athletic beat using Web Audio API.
 * No external files needed — all synthesis done in browser.
 */
export function useMusic() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const isPlayingRef = useRef(false);
  const volumeRef = useRef(0.22); // default quiet background volume

  const BPM = 128;
  const STEPS = 16; // 16th notes in a bar
  const STEP_TIME = (60 / BPM) / 4; // seconds per 16th note
  const LOOK_AHEAD = 0.1; // seconds ahead to schedule
  const SCHEDULE_INTERVAL = 50; // ms

  // Kick drum
  const scheduleKick = (ctx: AudioContext, dest: AudioNode, time: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(dest);
    osc.frequency.setValueAtTime(180, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.08);
    gain.gain.setValueAtTime(1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
    osc.start(time);
    osc.stop(time + 0.3);
  };

  // Snare
  const scheduleSnare = (ctx: AudioContext, dest: AudioNode, time: number) => {
    const noise = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    noise.type = 'sawtooth';
    noise.frequency.value = 100;
    filter.type = 'highpass';
    filter.frequency.value = 800;
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(dest);
    noiseGain.gain.setValueAtTime(0.6, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    noise.start(time);
    noise.stop(time + 0.2);
  };

  // Hi-hat
  const scheduleHihat = (ctx: AudioContext, dest: AudioNode, time: number, open = false) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'square';
    osc.frequency.value = 8000;
    filter.type = 'highpass';
    filter.frequency.value = 7000;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    const decay = open ? 0.3 : 0.04;
    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + decay);
    osc.start(time);
    osc.stop(time + decay + 0.01);
  };

  // Bass synth note
  const scheduleBass = (ctx: AudioContext, dest: AudioNode, time: number, freq: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + STEP_TIME * 0.8);
    osc.start(time);
    osc.stop(time + STEP_TIME);
  };

  // 16-step patterns
  const KICK_PATTERN    = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0]; // four-on-the-floor
  const SNARE_PATTERN   = [0,0,0,0, 1,0,0,0, 0,0,0,0, 1,0,0,0]; // 2 and 4
  const HIHAT_PATTERN   = [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,1];
  const OPEN_HAT        = [0,0,0,0, 0,0,0,1, 0,0,0,0, 0,0,0,0];
  const BASS_FREQS      = [55,0,0,55, 55,0,0,0, 58,0,0,58, 55,0,0,0];

  const scheduleStep = useCallback((ctx: AudioContext, dest: AudioNode, step: number, time: number) => {
    if (KICK_PATTERN[step]) scheduleKick(ctx, dest, time);
    if (SNARE_PATTERN[step]) scheduleSnare(ctx, dest, time);
    if (HIHAT_PATTERN[step]) scheduleHihat(ctx, dest, time, false);
    if (OPEN_HAT[step]) scheduleHihat(ctx, dest, time, true);
    if (BASS_FREQS[step]) scheduleBass(ctx, dest, time, BASS_FREQS[step]);
  }, []);

  const schedulerTick = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    while (nextNoteTimeRef.current < ctx.currentTime + LOOK_AHEAD) {
      scheduleStep(ctx, master, currentBeatRef.current % STEPS, nextNoteTimeRef.current);
      nextNoteTimeRef.current += STEP_TIME;
      currentBeatRef.current += 1;
    }
  }, [scheduleStep]);

  const start = useCallback(() => {
    if (isPlayingRef.current) return;

    const ctx = new AudioContext();
    const master = ctx.createGain();
    master.gain.value = volumeRef.current;
    master.connect(ctx.destination);

    ctxRef.current = ctx;
    masterGainRef.current = master;
    nextNoteTimeRef.current = ctx.currentTime + 0.1;
    currentBeatRef.current = 0;
    isPlayingRef.current = true;

    schedulerRef.current = setInterval(schedulerTick, SCHEDULE_INTERVAL);
  }, [schedulerTick]);

  const stop = useCallback(() => {
    if (!isPlayingRef.current) return;
    isPlayingRef.current = false;

    if (schedulerRef.current) {
      clearInterval(schedulerRef.current);
      schedulerRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close();
      ctxRef.current = null;
    }
    masterGainRef.current = null;
  }, []);

  const setVolume = useCallback((vol: number) => {
    volumeRef.current = vol;
    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(vol, ctxRef.current!.currentTime, 0.1);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => { stop(); };
  }, [stop]);

  return { start, stop, setVolume };
}
