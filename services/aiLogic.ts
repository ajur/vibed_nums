
import { GameState, Point, PlayerType } from '../types';
import { getValidMoves, applyMove } from './gameLogic';

/**
 * Main entry point to get the AI's move choice.
 */
export const getAiMove = (gameState: GameState): Point | null => {
  const currentPlayer = gameState.players[gameState.currentPlayerIdx];
  const validMoves = getValidMoves(gameState);

  if (validMoves.length === 0) return null;
  
  // Optimization: If only one move is available, take it immediately.
  if (validMoves.length === 1) return validMoves[0];

  switch (currentPlayer.type) {
    case PlayerType.AI_RANDOM:
      return getRandomMove(validMoves);
    case PlayerType.AI_GREEDY:
      // Depth 1: Just pick the best immediate move
      return getBestMove(gameState, validMoves, 1, currentPlayer.id);
    case PlayerType.AI_SMART:
      // Depth 2: Look ahead at opponent's response
      return getBestMove(gameState, validMoves, 2, currentPlayer.id);
    case PlayerType.AI_GENIUS:
      // Depth 3: Look ahead at my response to their response
      return getBestMove(gameState, validMoves, 3, currentPlayer.id);
    default:
      return validMoves[0];
  }
};

const getRandomMove = (moves: Point[]): Point => {
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
};

const getBestMove = (
  state: GameState, 
  validMoves: Point[], 
  depth: number, 
  playerId: string
): Point => {
  const { move } = minimax(state, depth, -Infinity, Infinity, true, playerId);
  return move || validMoves[0];
};

/**
 * Minimax Algorithm with Alpha-Beta Pruning
 */
const minimax = (
  state: GameState, 
  depth: number, 
  alpha: number, 
  beta: number, 
  isMaximizing: boolean,
  maximizingPlayerId: string
): { score: number, move: Point | null } => {

  // Terminal conditions
  if (state.isGameOver || depth === 0) {
    return { score: evaluateState(state, maximizingPlayerId), move: null };
  }

  const validMoves = getValidMoves(state);
  
  if (validMoves.length === 0) {
    return { score: evaluateState(state, maximizingPlayerId), move: null };
  }

  let bestMove: Point | null = null;

  if (isMaximizing) {
    let maxEval = -Infinity;
    
    // Optimization: Sort moves by immediate value desc
    const sortedMoves = sortMoves(validMoves, state, true);

    for (const move of sortedMoves) {
      const nextState = applyMove(state, move);
      const evaluation = minimax(nextState, depth - 1, alpha, beta, false, maximizingPlayerId).score;

      if (evaluation > maxEval) {
        maxEval = evaluation;
        bestMove = move;
      }
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break; // Prune
    }
    return { score: maxEval, move: bestMove };
  } else {
    let minEval = Infinity;
    
    // Sort moves ascending
    const sortedMoves = sortMoves(validMoves, state, false);

    for (const move of sortedMoves) {
      const nextState = applyMove(state, move);
      const evaluation = minimax(nextState, depth - 1, alpha, beta, true, maximizingPlayerId).score;

      if (evaluation < minEval) {
        minEval = evaluation;
        bestMove = move;
      }
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break; // Prune
    }
    return { score: minEval, move: bestMove };
  }
};

/**
 * Heuristic Evaluation Function
 */
const evaluateState = (state: GameState, maximizingPlayerId: string): number => {
  const p1 = state.players[0];
  const p2 = state.players[1];
  
  const scoreDiff = p1.id === maximizingPlayerId 
    ? p1.score - p2.score 
    : p2.score - p1.score;

  // Huge bonus/penalty for game over states
  if (state.isGameOver) {
     if (state.winnerId === maximizingPlayerId) return 10000 + scoreDiff;
     if (state.winnerId && state.winnerId !== 'DRAW') return -10000 + scoreDiff;
  }

  return scoreDiff;
};

/**
 * Sorts moves based on immediate cell value to improve Alpha-Beta pruning efficiency.
 */
const sortMoves = (moves: Point[], state: GameState, descending: boolean): Point[] => {
  return moves.sort((a, b) => {
    const valA = state.grid[a.x][a.y].value;
    const valB = state.grid[b.x][b.y].value;
    return descending ? valB - valA : valA - valB;
  });
};
