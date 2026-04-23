import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, MoveType, ALL_MOVES } from '@/lib/i18n';
import { SpaceSize } from '@/lib/training-config';

export interface TrainingStats {
  durationSeconds: number;
  caloriesBurned: number;
  commandsCalled: number;
  moveCounts: Record<string, number>;
}

export interface LocalSession {
  id: string;
  trainingType: string;
  durationSeconds: number;
  caloriesBurned: number;
  commandsCalled: number;
  language: Language;
  completedAt: string;
  moveCounts: Record<string, number>;
}

interface TrainingState {
  language: Language;
  setLanguage: (lang: Language) => void;

  selectedTrainingType: string | null;
  setSelectedTrainingType: (type: string) => void;

  durationMinutes: number;
  selectedMoves: MoveType[];
  pauseSeconds: number;
  warmupPauseSeconds: number;
  cooldownPauseSeconds: number;

  setDurationMinutes: (min: number) => void;
  setSelectedMoves: (moves: MoveType[]) => void;
  toggleMove: (move: MoveType) => void;
  setPauseSeconds: (sec: number) => void;
  setWarmupPauseSeconds: (sec: number) => void;
  setCooldownPauseSeconds: (sec: number) => void;

  spaceSize: SpaceSize;
  setSpaceSize: (size: SpaceSize) => void;

  disabledWarmupExercises: string[];
  disabledCooldownExercises: string[];
  toggleWarmupExercise: (exercise: string) => void;
  toggleCooldownExercise: (exercise: string) => void;

  // Audio
  musicEnabled: boolean;
  musicVolume: number;
  speechVolume: number;
  setMusicEnabled: (on: boolean) => void;
  setMusicVolume: (vol: number) => void;
  setSpeechVolume: (vol: number) => void;

  // Current session (temporary, not persisted across page reloads)
  lastSessionStats: TrainingStats | null;
  setLastSessionStats: (stats: TrainingStats) => void;

  // Local history — persisted per device, private to each user
  localHistory: LocalSession[];
  addToLocalHistory: (session: LocalSession) => void;
  clearLocalHistory: () => void;

  resetSettings: () => void;
}

export const useTrainingStore = create<TrainingState>()(
  persist(
    (set) => ({
      language: 'de',
      setLanguage: (lang) => set({ language: lang }),

      selectedTrainingType: null,
      setSelectedTrainingType: (type) => set({ selectedTrainingType: type }),

      durationMinutes: 10,
      selectedMoves: [...ALL_MOVES],
      pauseSeconds: 3,
      warmupPauseSeconds: 8,
      cooldownPauseSeconds: 12,

      setDurationMinutes: (min) => set({ durationMinutes: min }),
      setSelectedMoves: (moves) => set({
        selectedMoves: moves.includes('engarde') ? moves : ['engarde', ...moves]
      }),
      toggleMove: (move) => set((state) => {
        if (move === 'engarde') return {};
        return {
          selectedMoves: state.selectedMoves.includes(move)
            ? state.selectedMoves.filter(m => m !== move)
            : [...state.selectedMoves, move]
        };
      }),
      setPauseSeconds: (sec) => set({ pauseSeconds: sec }),
      setWarmupPauseSeconds: (sec) => set({ warmupPauseSeconds: sec }),
      setCooldownPauseSeconds: (sec) => set({ cooldownPauseSeconds: sec }),

      spaceSize: 'medium' as SpaceSize,
      setSpaceSize: (size) => set({ spaceSize: size }),

      disabledWarmupExercises: [],
      disabledCooldownExercises: [],
      toggleWarmupExercise: (exercise) => set((state) => ({
        disabledWarmupExercises: state.disabledWarmupExercises.includes(exercise)
          ? state.disabledWarmupExercises.filter(e => e !== exercise)
          : [...state.disabledWarmupExercises, exercise]
      })),
      toggleCooldownExercise: (exercise) => set((state) => ({
        disabledCooldownExercises: state.disabledCooldownExercises.includes(exercise)
          ? state.disabledCooldownExercises.filter(e => e !== exercise)
          : [...state.disabledCooldownExercises, exercise]
      })),

      musicEnabled: true,
      musicVolume: 0.22,
      speechVolume: 1.0,
      setMusicEnabled: (on) => set({ musicEnabled: on }),
      setMusicVolume: (vol) => set({ musicVolume: vol }),
      setSpeechVolume: (vol) => set({ speechVolume: vol }),

      lastSessionStats: null,
      setLastSessionStats: (stats) => set({ lastSessionStats: stats }),

      localHistory: [],
      addToLocalHistory: (session) => set((state) => ({
        localHistory: [session, ...state.localHistory].slice(0, 50), // keep last 50
      })),
      clearLocalHistory: () => set({ localHistory: [] }),

      resetSettings: () => set({
        durationMinutes: 10,
        selectedMoves: [...ALL_MOVES],
        pauseSeconds: 3,
        warmupPauseSeconds: 8,
        cooldownPauseSeconds: 12,
        selectedTrainingType: null,
      }),
    }),
    {
      name: 'sabre-training-storage',
      partialize: (state) => ({
        language: state.language,
        musicEnabled: state.musicEnabled,
        musicVolume: state.musicVolume,
        speechVolume: state.speechVolume,
        localHistory: state.localHistory,
        disabledWarmupExercises: state.disabledWarmupExercises,
        disabledCooldownExercises: state.disabledCooldownExercises,
        spaceSize: state.spaceSize,
        warmupPauseSeconds: state.warmupPauseSeconds,
        cooldownPauseSeconds: state.cooldownPauseSeconds,
      }),
    }
  )
);
