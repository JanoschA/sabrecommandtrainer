import { MoveType, WarmupMove, CooldownMove } from './i18n';

export type SpaceSize = 'small' | 'medium' | 'large';

export const SPACE_STEP_LIMITS: Record<SpaceSize, number> = {
  small: 1,
  medium: 2,
  large: Infinity,
};

export const MOVE_DISPLACEMENT: Partial<Record<MoveType, number>> = {
  vor: 1,
  balestra: 1,
  ausfall: 1,
  zurueck: -1,
  quart: 0,
  terz: 0,
  quint: 0,
  riposte: 0,
  engarde: 0,
};

export interface TrainingConfig {
  // Fencing moves shown in Settings (empty = type has fixed exercises)
  defaultMoves: MoveType[];
  defaultPauseSeconds: number;
  isDrill: boolean;
  isCombination: boolean;
  isCalm: boolean;
  caloriesPerMinute: number;
  // Fixed moves shown in Settings instead of fencing moves (null = use defaultMoves)
  fixedExercises?: string[] | null;
  // Whether this training runs in phases (warmup → main → cooldown)
  isPhased?: boolean;
}

// Exercises used for dedicated warm-up type
export const WARMUP_EXERCISE_LIST: WarmupMove[] = [
  'w_laufen', 'w_hampelmann', 'w_knieheben', 'w_armkreisen',
  'w_schultern', 'w_rumpf', 'w_sprunge', 'w_hocke',
];

// Exercises used for dedicated cool-down type
export const COOLDOWN_EXERCISE_LIST: CooldownMove[] = [
  'c_atmen', 'c_schulter', 'c_wade', 'c_quad',
  'c_seite', 'c_nacken', 'c_gehen', 'c_ruecken',
];

export const TRAINING_CONFIGS: Record<string, TrainingConfig> = {
  complete: {
    // Uses all fencing moves in main phase; warmup/cooldown phases use exercise lists
    defaultMoves: ['vor', 'zurueck', 'ausfall', 'quart', 'terz', 'quint', 'riposte', 'balestra'],
    defaultPauseSeconds: 3,
    isDrill: false,
    isCombination: false,
    isCalm: false,
    isPhased: true,
    caloriesPerMinute: 8,
  },
  drill: {
    defaultMoves: ['vor', 'zurueck', 'ausfall', 'quart', 'terz', 'quint', 'riposte', 'balestra'],
    defaultPauseSeconds: 2,
    isDrill: true,
    isCombination: false,
    isCalm: false,
    caloriesPerMinute: 12,
  },
  warmup: {
    // No fencing moves — fixed warm-up exercises
    defaultMoves: [],
    defaultPauseSeconds: 8,
    isDrill: false,
    isCombination: false,
    isCalm: true,
    fixedExercises: WARMUP_EXERCISE_LIST,
    caloriesPerMinute: 4,
  },
  cooldown: {
    defaultMoves: [],
    defaultPauseSeconds: 12,
    isDrill: false,
    isCombination: false,
    isCalm: true,
    fixedExercises: COOLDOWN_EXERCISE_LIST,
    caloriesPerMinute: 3,
  },
  coord: {
    defaultMoves: ['vor', 'zurueck', 'ausfall', 'quart', 'terz', 'quint', 'riposte', 'balestra'],
    defaultPauseSeconds: 4,
    isDrill: false,
    isCombination: true,
    isCalm: false,
    caloriesPerMinute: 9,
  },
  footwork: {
    defaultMoves: ['vor', 'zurueck', 'ausfall', 'balestra'],
    defaultPauseSeconds: 3,
    isDrill: false,
    isCombination: false,
    isCalm: false,
    caloriesPerMinute: 7,
  },
};

/**
 * Returns the fraction boundaries for the phased complete training.
 * Phase 0 (warmup): 0 → WARMUP_END
 * Phase 1 (main):   WARMUP_END → MAIN_END
 * Phase 2 (cooldown): MAIN_END → 1.0
 */
export const PHASE_BOUNDARIES = { warmupEnd: 0.15, mainEnd: 0.90 };
