
import { PlayerType } from './types';

export const BOARD_SIZE_COLS = 9;
export const BOARD_SIZE_ROWS = 11;

export const MIN_VALUE = -20;
export const MAX_VALUE = 50;

export const PLAYER_1_ID = 'p1';
export const PLAYER_2_ID = 'p2';

export const THEME_P1 = 'cyan';
export const THEME_P2 = 'amber';

export const AI_NAMES: Record<string, string> = {
  [PlayerType.AI_RANDOM]: 'Bender',      // Chaotic
  [PlayerType.AI_GREEDY]: 'GLaDOS',      // Greedy/Selfish
  [PlayerType.AI_SMART]: 'Cortana',      // Smart
  [PlayerType.AI_GENIUS]: 'HAL 9000',    // Genius
};
