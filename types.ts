
// Core coordinates: x = column, y = row
export interface Point {
  x: number;
  y: number;
}

export enum CellType {
  VOID = 'VOID',
  PLAYABLE = 'PLAYABLE',
}

export enum CellStatus {
  AVAILABLE = 'AVAILABLE',
  TAKEN = 'TAKEN',
}

export interface Cell {
  type: CellType;
  value: number;
  status: CellStatus;
  ownerId?: string; // Player ID who took this cell
}

// A sparsely populated grid
export type BoardGrid = Cell[][];

export enum Orientation {
  HORIZONTAL = 'HORIZONTAL', // Constrained to a Row, picking a column
  VERTICAL = 'VERTICAL',     // Constrained to a Column, picking a row
}

export enum PlayerType {
  HUMAN = 'HUMAN',
  AI_RANDOM = 'AI_RANDOM', // Level 0
  AI_GREEDY = 'AI_GREEDY', // Level 1
  AI_SMART = 'AI_SMART',   // Level 2
  AI_GENIUS = 'AI_GENIUS', // Level 3
}

export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  color: string; // Tailwind color name prefix, e.g., 'cyan' -> cyan-500
  score: number;
}

export interface BoardDefinition {
  id: string;
  name: string;
  description: string;
  // Array of strings representing rows. 
  // ' ' (space) = Void/Empty
  // Any other char (e.g. 'X') = Playable
  layout: string[]; 
  startOptions: {
    orientation: Orientation;
    indices: number[]; // List of valid row/col indices to start on
  }[];
}

export interface GameState {
  grid: BoardGrid;
  width: number;
  height: number;
  players: Player[];
  currentPlayerIdx: number;
  // The position of the LAST move made. 
  // If null, it's the start of the game (handled by initial config)
  lastMove: Point | null; 
  // The constraint for the CURRENT player. 
  // e.g. if currentConstraint is HORIZONTAL, player must pick within a Row (y is fixed).
  currentConstraint: Orientation; 
  // To handle initial state where we might start on a specific row/col without a previous move point
  constraintIndex: number; 
  
  winnerId: string | null;
  isGameOver: boolean;
  
  // For History/Undo
  moveHistory: GameStateSnapshot[];
}

export interface GameStateSnapshot {
  grid: BoardGrid; // Deep copy needed
  players: Player[];
  currentPlayerIdx: number;
  lastMove: Point | null;
  currentConstraint: Orientation;
  constraintIndex: number;
  winnerId: string | null;
  isGameOver: boolean;
}

export interface MoveResult {
  isValid: boolean;
  reason?: string;
}
