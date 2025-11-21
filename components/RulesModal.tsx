
import React from 'react';

interface RulesModalProps {
  onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
            </svg>
        </button>

        <h2 className="text-2xl font-bold text-slate-100 mb-4">How to Play</h2>
        
        <div className="space-y-5 text-slate-300 text-sm md:text-base leading-relaxed">
            <p>
                <strong className="text-white">Objective:</strong> Accumulate the highest score by selecting numbers on the grid.
            </p>
            
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                <h3 className="font-bold text-emerald-500 mb-2 text-xs uppercase tracking-wider">Movement Rules</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-400">
                    <li>
                        If the previous player moved horizontally (picking a cell in a row), you must move <strong>vertically</strong> (picking a cell in that column).
                    </li>
                    <li>
                         If they moved vertically, you must move <strong>horizontally</strong>.
                    </li>
                    <li>
                        You cannot jump over "Void" spaces (gaps in the board).
                    </li>
                </ul>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/50">
                <h3 className="font-bold text-red-400 mb-2 text-xs uppercase tracking-wider">Game Over</h3>
                <p className="text-slate-400">
                    The game ends <strong>immediately</strong> when it is your turn but you have <strong>no valid moves</strong> (all cells in your constrained line are taken or blocked).
                </p>
                <p className="text-slate-400 mt-2">
                    The player with the highest total score wins. It is possible to force the game to end early to secure a win!
                </p>
            </div>

            <p>
                <strong className="text-white">Strategy:</strong> Positive numbers increase your score, negative numbers decrease it. Sometimes taking a small negative hit is worth it to trap your opponent!
            </p>
        </div>

        <div className="mt-8 flex justify-center sticky bottom-0 pt-4 bg-slate-900">
             <button 
                onClick={onClose}
                className="px-8 py-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 font-bold transition-colors shadow-lg shadow-emerald-900/20"
            >
                Got it
            </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;