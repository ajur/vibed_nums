
import React from 'react';
import { Player, PlayerType } from '../types';
import { THEME_P1, THEME_P2 } from '../constants';

interface GameOverModalProps {
  winnerId: string | null;
  players: Player[];
  onRematch: () => void;
  onNewGame: () => void;
  onMainMenu: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ 
  winnerId, 
  players, 
  onRematch, 
  onNewGame, 
  onMainMenu 
}) => {
  const p1 = players[0];
  const p2 = players[1];
  
  // Determine context: Is this Player (Human) vs AI?
  const isPvE = p1.type === PlayerType.HUMAN && p2.type !== PlayerType.HUMAN;

  let title = "";
  let subtitle = "";
  let colorClass = "text-white";

  if (winnerId === 'DRAW') {
    title = "It's a Draw!";
    subtitle = "A perfectly balanced game.";
    colorClass = "text-slate-300";
  } else if (isPvE) {
    if (winnerId === p1.id) {
      title = "Victory!";
      subtitle = `You defeated ${p2.name}!`;
      colorClass = "text-emerald-400";
    } else {
      title = "Defeat";
      subtitle = `${p2.name} outsmarted you.`;
      colorClass = "text-red-400";
    }
  } else {
    // PvP or AI vs AI
    const winner = players.find(p => p.id === winnerId);
    title = `${winner?.name} Wins!`;
    subtitle = "Well played.";
    colorClass = winner?.id === p1.id ? `text-${THEME_P1}-400` : `text-${THEME_P2}-400`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-sm md:max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        
        <h2 className={`text-4xl md:text-5xl font-black tracking-tight mb-2 drop-shadow-lg ${colorClass}`}>
          {title}
        </h2>
        
        <p className="text-slate-400 text-lg mb-8 font-medium">
          {subtitle}
        </p>
        
        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={onRematch}
            className="group relative w-full py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-900/20 hover:bg-emerald-400 hover:scale-[1.02] transition-all overflow-hidden"
          >
             <span className="relative z-10 flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 16H3v5" />
                </svg>
                Rematch
             </span>
          </button>
          
          <button 
            onClick={onNewGame}
            className="w-full py-4 rounded-xl bg-slate-800 text-slate-300 font-bold text-lg border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all"
          >
            Change Setup
          </button>

           <button 
            onClick={onMainMenu}
            className="w-full py-3 rounded-xl text-slate-500 hover:text-slate-400 hover:bg-slate-800/50 font-semibold transition-all mt-2 text-sm uppercase tracking-wider"
          >
            Back to Main Menu
          </button>
        </div>

      </div>
    </div>
  );
};

export default GameOverModal;
