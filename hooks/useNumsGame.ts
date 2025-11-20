
import { useState, useCallback, useEffect } from 'react';
import { 
  GameState, 
  Point,
  PlayerType,
  BoardDefinition
} from '../types';
import { 
  createInitialGameState, 
  getValidMoves, 
  applyMove,
  restoreSnapshot
} from '../services/gameLogic';
import { getAiMove } from '../services/aiLogic';

export interface GameConfig {
  player1Name: string;
  player1Type: PlayerType;
  player2Name: string;
  player2Type: PlayerType;
  boardDefinition: BoardDefinition;
}

export const useNumsGame = (config: GameConfig) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [initialState, setInitialState] = useState<GameState | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const startNewGame = useCallback(() => {
    const state = createInitialGameState(
      config.boardDefinition,
      config.player1Name,
      config.player1Type,
      config.player2Name,
      config.player2Type
    );
    
    setGameState(state);
    setInitialState(JSON.parse(JSON.stringify(state)));
    setIsAiThinking(false);
  }, [
    config.boardDefinition, 
    config.player1Name, 
    config.player1Type, 
    config.player2Name, 
    config.player2Type
  ]);

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Effect 1: Detect AI turn and set thinking flag
  useEffect(() => {
    if (!gameState || gameState.isGameOver) return;

    const currentPlayer = gameState.players[gameState.currentPlayerIdx];
    
    // Only trigger if it's AI turn and we aren't already thinking
    if (currentPlayer.type !== PlayerType.HUMAN) {
      setIsAiThinking(true);
    }
  }, [gameState?.currentPlayerIdx, gameState?.isGameOver, gameState?.players]);

  // Effect 2: Execute AI move when thinking flag is set
  useEffect(() => {
    if (!isAiThinking) return;

    const timer = setTimeout(() => {
      setGameState(prevState => {
        if (!prevState) return null;

        // Double check it is still AI's turn (prevents race conditions)
        const currentPlayer = prevState.players[prevState.currentPlayerIdx];
        if (currentPlayer.type === PlayerType.HUMAN) return prevState;

        try {
          const bestMove = getAiMove(prevState);
          if (bestMove) {
            return applyMove(prevState, bestMove);
          }
        } catch (error) {
          console.error("AI Logic Error:", error);
        }
        return prevState;
      });
      
      // Stop thinking after move is applied (or attempted)
      setIsAiThinking(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [isAiThinking]);

  const handleCellClick = useCallback((point: Point) => {
    if (!gameState) return;
    if (gameState.isGameOver) return;
    if (isAiThinking) return; // Prevent clicking while AI thinks

    // Prevent human from clicking if it's AI turn (extra safety)
    const currentPlayer = gameState.players[gameState.currentPlayerIdx];
    if (currentPlayer.type !== PlayerType.HUMAN) return;

    const validMoves = getValidMoves(gameState);
    const isValid = validMoves.some(m => m.x === point.x && m.y === point.y);

    if (isValid) {
      const nextState = applyMove(gameState, point);
      setGameState(nextState);
    }
  }, [gameState, isAiThinking]);

  const undo = useCallback(() => {
    if (!gameState || gameState.moveHistory.length === 0) return;
    if (isAiThinking) return;

    const previousSnapshot = gameState.moveHistory[gameState.moveHistory.length - 1];
    const newHistory = gameState.moveHistory.slice(0, -1);
    
    const restoredState = restoreSnapshot(previousSnapshot, newHistory);
    setGameState(restoredState);
    
    // If we undo into an AI turn, the Effect will pick it up and play again.
  }, [gameState, isAiThinking]);

  // Restart the current match with the same board
  const restartMatch = useCallback(() => {
    if (initialState) {
        setGameState(JSON.parse(JSON.stringify(initialState)));
        setIsAiThinking(false);
    }
  }, [initialState]);

  // Generate a completely new board (reshuffle numbers, but same board shape/players)
  const rematch = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  // Get valid moves for highlighting UI
  const validMoves = gameState && !gameState.isGameOver ? getValidMoves(gameState) : [];

  return {
    gameState,
    validMoves,
    handleCellClick,
    undo,
    restartMatch,
    rematch,
    isAiThinking
  };
};
