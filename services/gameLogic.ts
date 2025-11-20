
import { 
  BoardGrid, 
  CellStatus, 
  CellType, 
  GameState, 
  GameStateSnapshot, 
  Orientation, 
  Player, 
  Point,
  PlayerType,
  BoardDefinition
} from '../types';
import { MAX_VALUE, MIN_VALUE, PLAYER_1_ID, PLAYER_2_ID, THEME_P1, THEME_P2 } from '../constants';

// --- Board Generation ---

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createEmptyGrid = (width: number, height: number): BoardGrid => {
  return Array.from({ length: width }, () => 
    Array.from({ length: height }, () => ({
      type: CellType.VOID,
      value: 0,
      status: CellStatus.AVAILABLE,
    }))
  );
};

export const createInitialGameState = (
  boardDef: BoardDefinition,
  p1Name: string,
  p1Type: PlayerType,
  p2Name: string,
  p2Type: PlayerType
): GameState => {
  // 1. Parse Layout to determine dimensions and grid
  const rows = boardDef.layout;
  const height = rows.length;
  const width = rows[0].length;

  const grid = createEmptyGrid(width, height);

  for (let y = 0; y < height; y++) {
    const rowStr = rows[y];
    for (let x = 0; x < width; x++) {
      // Safety check for row length
      if (x >= rowStr.length) continue;

      const char = rowStr[x];
      // Space is VOID, anything else is PLAYABLE
      if (char !== ' ') {
        grid[x][y] = {
          type: CellType.PLAYABLE,
          value: randomInt(MIN_VALUE, MAX_VALUE),
          status: CellStatus.AVAILABLE,
        };
      } else {
         grid[x][y] = {
          type: CellType.VOID,
          value: 0,
          status: CellStatus.AVAILABLE,
        };
      }
    }
  }

  // 2. Initialize Players
  const players: Player[] = [
    { id: PLAYER_1_ID, name: p1Name, type: p1Type, color: THEME_P1, score: 0 },
    { id: PLAYER_2_ID, name: p2Name, type: p2Type, color: THEME_P2, score: 0 },
  ];

  // 3. Determine Start Constraints
  // Pick a random option from the board definition
  const startOption = boardDef.startOptions[Math.floor(Math.random() * boardDef.startOptions.length)];
  const startIndex = startOption.indices[Math.floor(Math.random() * startOption.indices.length)];

  return {
    grid,
    width,
    height,
    players,
    currentPlayerIdx: 0, // Player 1 always starts for now
    lastMove: null,
    currentConstraint: startOption.orientation,
    constraintIndex: startIndex,
    winnerId: null,
    isGameOver: false,
    moveHistory: [],
  };
};

// --- Move Validation & Logic ---

/**
 * Determines if a specific cell is a valid move given the current state constraints.
 */
export const isValidMove = (
  gameState: GameState,
  target: Point
): boolean => {
  const { grid, currentConstraint, constraintIndex, lastMove } = gameState;
  const { x, y } = target;

  // 1. Check bounds
  if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) return false;

  const cell = grid[x][y];

  // 2. Cell must be PLAYABLE and AVAILABLE
  if (cell.type === CellType.VOID) return false;
  if (cell.status === CellStatus.TAKEN) return false;

  // 3. Check Constraint Alignment
  if (currentConstraint === Orientation.HORIZONTAL) {
    // Must be in the specific Row (y must equal constraintIndex)
    if (y !== constraintIndex) return false;
  } else {
    // Must be in the specific Column (x must equal constraintIndex)
    if (x !== constraintIndex) return false;
  }

  // 4. Check Line-of-Sight / Void Obstruction Logic
  if (!lastMove) return true;

  // Check obstruction between lastMove and target
  if (currentConstraint === Orientation.HORIZONTAL) {
    // Moving along a row (y is constant). Check x range.
    const startX = Math.min(lastMove.x, x);
    const endX = Math.max(lastMove.x, x);
    const row = y;
    
    for (let i = startX + 1; i < endX; i++) {
      if (grid[i][row].type === CellType.VOID) {
        return false; // Blocked by void
      }
    }
  } else {
    // Moving along a column (x is constant). Check y range.
    const startY = Math.min(lastMove.y, y);
    const endY = Math.max(lastMove.y, y);
    const col = x;

    for (let i = startY + 1; i < endY; i++) {
      if (grid[col][i].type === CellType.VOID) {
        return false; // Blocked by void
      }
    }
  }

  return true;
};

/**
 * Returns all valid moves for the current state.
 */
export const getValidMoves = (gameState: GameState): Point[] => {
  const moves: Point[] = [];
  const { width, height, currentConstraint, constraintIndex } = gameState;

  if (currentConstraint === Orientation.HORIZONTAL) {
    // Iterate through the row
    // Safety check for constraintIndex within bounds
    if (constraintIndex >= 0 && constraintIndex < height) {
      const y = constraintIndex;
      for (let x = 0; x < width; x++) {
        if (isValidMove(gameState, { x, y })) {
          moves.push({ x, y });
        }
      }
    }
  } else {
    // Iterate through the col
    if (constraintIndex >= 0 && constraintIndex < width) {
      const x = constraintIndex;
      for (let y = 0; y < height; y++) {
        if (isValidMove(gameState, { x, y })) {
          moves.push({ x, y });
        }
      }
    }
  }
  return moves;
};

/**
 * Executes a move and returns the new Game State.
 */
export const applyMove = (currentState: GameState, move: Point): GameState => {
  const { grid, players, currentPlayerIdx, moveHistory } = currentState;
  
  const newGrid = grid.map(col => col.map(cell => ({ ...cell })));
  
  const player = players[currentPlayerIdx];
  const cell = newGrid[move.x][move.y];
  cell.status = CellStatus.TAKEN;
  cell.ownerId = player.id;

  const newPlayers = players.map((p, idx) => {
    if (idx === currentPlayerIdx) {
      return { ...p, score: p.score + cell.value };
    }
    return p;
  });

  const nextConstraint = currentState.currentConstraint === Orientation.HORIZONTAL 
    ? Orientation.VERTICAL 
    : Orientation.HORIZONTAL;
    
  const nextConstraintIndex = nextConstraint === Orientation.VERTICAL 
    ? move.x 
    : move.y;

  const nextPlayerIdx = (currentPlayerIdx + 1) % players.length;

  const nextState: GameState = {
    ...currentState,
    grid: newGrid,
    players: newPlayers,
    currentPlayerIdx: nextPlayerIdx,
    lastMove: move,
    currentConstraint: nextConstraint,
    constraintIndex: nextConstraintIndex,
    moveHistory: [...moveHistory, createSnapshot(currentState)],
  };

  // Check Game Over
  const validMovesNext = getValidMoves(nextState);
  
  if (validMovesNext.length === 0) {
    nextState.isGameOver = true;
    const p1 = nextState.players[0];
    const p2 = nextState.players[1];
    if (p1.score > p2.score) nextState.winnerId = p1.id;
    else if (p2.score > p1.score) nextState.winnerId = p2.id;
    else nextState.winnerId = 'DRAW';
  }

  return nextState;
};

export const createSnapshot = (state: GameState): GameStateSnapshot => {
  const gridCopy = state.grid.map(col => col.map(cell => ({ ...cell })));
  return {
    grid: gridCopy,
    players: [...state.players],
    currentPlayerIdx: state.currentPlayerIdx,
    lastMove: state.lastMove,
    currentConstraint: state.currentConstraint,
    constraintIndex: state.constraintIndex,
    winnerId: state.winnerId,
    isGameOver: state.isGameOver
  };
};

export const restoreSnapshot = (snapshot: GameStateSnapshot, fullHistory: GameStateSnapshot[]): GameState => {
    const gridCopy = snapshot.grid.map(col => col.map(cell => ({ ...cell })));
    return {
        ...snapshot,
        grid: gridCopy,
        width: snapshot.grid.length,
        height: snapshot.grid[0].length,
        moveHistory: fullHistory
    };
};
