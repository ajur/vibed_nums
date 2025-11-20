
import React, { useState, useRef, useEffect } from 'react';
import { GameState } from '../types';
import { THEME_P1, THEME_P2 } from '../constants';

interface GameControlsProps {
  gameState: GameState;
  onUndo: () => void;
  onRestart: () => void;
  onRematch: () => void;
  onChangeBoard: () => void;
  onShowRules: () => void;
  onExit: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  gameState, 
  onUndo, 
  onRestart, 
  onRematch, 
  onChangeBoard,
  onShowRules,
  onExit 
}) => {
  const { players, currentPlayerIdx, isGameOver, winnerId } = gameState;
  const p1 = players[0];
  const p2 = players[1];
  
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine turn text
  let statusText = "";
  let statusColor = "text-slate-400";

  if (isGameOver) {
    if (winnerId === 'DRAW') {
      statusText = "It's a Draw!";
      statusColor = "text-yellow-400";
    } else {
      const winnerName = winnerId === p1.id ? p1.name : p2.name;
      statusText = `${winnerName} Wins!`;
      statusColor = winnerId === p1.id ? `text-${THEME_P1}-400` : `text-${THEME_P2}-400`;
    }
  } else {
    const isP1Turn = currentPlayerIdx === 0;
    statusText = isP1Turn ? `${p1.name}'s Turn` : `${p2.name}'s Turn`;
    statusColor = isP1Turn ? `text-${THEME_P1}-400` : `text-${THEME_P2}-400`;
  }

  // Helper for score box styling
  const getScoreBoxStyle = (playerId: string) => {
    const isWinner = isGameOver && winnerId === playerId;
    const isTurn = !isGameOver && players[currentPlayerIdx].id === playerId;
    const theme = playerId === p1.id ? THEME_P1 : THEME_P2;

    if (isWinner) {
      return `scale-110 border-${theme}-500 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-slate-800 ring-1 ring-${theme}-400`;
    }
    if (isTurn) {
       return `border-${theme}-500/50 bg-slate-900/80`;
    }
    return isGameOver ? 'opacity-50 border-transparent' : 'border-transparent opacity-70';
  };

  return (
    <div className="w-full flex flex-col gap-4 relative z-20">
      
      {/* Header / Status */}
      <div className="flex justify-between items-center px-4 py-3 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl transition-all duration-500">
         <div className={`flex flex-col items-center w-24 overflow-hidden rounded-xl py-1 border transition-all duration-500 ${getScoreBoxStyle(p1.id)}`}>
            <span className={`text-${THEME_P1}-400 font-bold text-sm md:text-base tracking-wider truncate w-full text-center opacity-90`}>{p1.name}</span>
            <span className="text-2xl md:text-4xl font-mono font-bold text-slate-100">{p1.score}</span>
         </div>

         <div className="flex flex-col items-center justify-center flex-1 px-2">
            <div className={`text-lg md:text-2xl font-black tracking-widest uppercase ${statusColor} drop-shadow-lg transition-colors duration-300 text-center whitespace-nowrap`}>
                {statusText}
            </div>
            {!isGameOver && (
                <div className="text-xs text-slate-500 mt-1 font-mono bg-slate-950/30 px-2 py-0.5 rounded border border-slate-800/50">
                    {gameState.currentConstraint}
                </div>
            )}
         </div>

         <div className={`flex flex-col items-center w-24 overflow-hidden rounded-xl py-1 border transition-all duration-500 ${getScoreBoxStyle(p2.id)}`}>
            <span className={`text-${THEME_P2}-400 font-bold text-sm md:text-base tracking-wider truncate w-full text-center opacity-90`}>{p2.name}</span>
            <span className="text-2xl md:text-4xl font-mono font-bold text-slate-100">{p2.score}</span>
         </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={onUndo}
          disabled={gameState.moveHistory.length === 0 || isGameOver}
          className="px-6 py-2 rounded-full bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 font-semibold transition-colors border border-slate-700 flex items-center gap-2 shadow-lg text-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
            </svg>
            Undo
        </button>

        <div className="relative" ref={menuRef}>
            <button 
                onClick={() => setShowMenu(!showMenu)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors border flex items-center gap-2 shadow-lg text-sm ${
                    showMenu 
                    ? 'bg-slate-700 text-white border-slate-600' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                Menu
            </button>

            {/* Dropdown Menu - Opens Downwards */}
            {showMenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50 animate-in fade-in zoom-in-95 duration-150">
                    <button 
                        onClick={() => { onRestart(); setShowMenu(false); }}
                        className="px-4 py-3 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-3 text-sm font-medium"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                           <path d="M1 8a7 7 0 1 1 2.5 5.3" />
                           <path d="M1 8V4m0 4h4" />
                        </svg>
                        Restart Level
                    </button>
                    <button 
                        onClick={() => { onRematch(); setShowMenu(false); }}
                        className="px-4 py-3 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-3 border-t border-slate-700/50 text-sm font-medium"
                    >
                         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                           <path d="M2.5 2.5h11v11h-11z" />
                           <path d="M8 2.5v11M2.5 8h11" />
                        </svg>
                        Rematch
                    </button>
                     <button 
                        onClick={() => { onChangeBoard(); setShowMenu(false); }}
                        className="px-4 py-3 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-3 border-t border-slate-700/50 text-sm font-medium"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                           <path d="M4 4h8v8H4z" />
                           <path d="M4 1h8" />
                           <path d="M4 15h8" />
                           <path d="M1 4v8" />
                           <path d="M15 4v8" />
                        </svg>
                        Change Board
                    </button>
                    <button 
                        onClick={() => { onShowRules(); setShowMenu(false); }}
                        className="px-4 py-3 text-left text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-3 border-t border-slate-700/50 text-sm font-medium"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                        </svg>
                        How to Play
                    </button>
                     <button 
                        onClick={() => { onExit(); setShowMenu(false); }}
                        className="px-4 py-3 text-left text-red-400 hover:bg-red-900/20 transition-colors flex items-center gap-3 border-t border-slate-700/50 text-sm font-medium"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                           <path d="M10 13l-5-5 5-5M5 8h9" />
                        </svg>
                        Exit to Main Menu
                    </button>
                </div>
            )}
        </div>
      </div>

    </div>
  );
};

export default GameControls;
