
import React, { useState } from 'react';
import { PlayerType, BoardDefinition } from '../types';
import { THEME_P1, THEME_P2, AI_NAMES } from '../constants';
import { BOARDS } from '../data/boards';
import BoardPreview from './BoardPreview';

interface NewGameMenuProps {
  p1Name: string;
  p2Name: string;
  onP1NameChange: (name: string) => void;
  onP2NameChange: (name: string) => void;
  
  p1Type: PlayerType;
  p2Type: PlayerType;
  onP1TypeChange: (type: PlayerType) => void;
  onP2TypeChange: (type: PlayerType) => void;

  selectedBoard: BoardDefinition;
  onSelectBoard: (board: BoardDefinition) => void;

  onStartGame: () => void;
  onBack: () => void;
}

const NewGameMenu: React.FC<NewGameMenuProps> = ({ 
  p1Name, 
  p2Name, 
  onP1NameChange, 
  onP2NameChange,
  p1Type,
  p2Type,
  onP1TypeChange,
  onP2TypeChange,
  selectedBoard,
  onSelectBoard,
  onStartGame,
  onBack
}) => {
  const [isSelectingBoard, setIsSelectingBoard] = useState(false);

  // Auto-update names when type changes if AI
  const handleTypeChange = (isP1: boolean, type: PlayerType) => {
    const setType = isP1 ? onP1TypeChange : onP2TypeChange;
    const setName = isP1 ? onP1NameChange : onP2NameChange;
    
    setType(type);
    
    if (type !== PlayerType.HUMAN) {
      setName(AI_NAMES[type]);
    } else {
      setName(isP1 ? 'Player 1' : 'Player 2');
    }
  };

  // --- VIEW: BOARD SELECTOR ---
  if (isSelectingBoard) {
    return (
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-right-8 duration-300">
        <div className="w-full flex items-center justify-center mb-8 shrink-0 sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md py-4 border-b border-slate-800/50">
           <h2 className="text-2xl font-bold text-slate-100 tracking-tight">Select Board</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {BOARDS.map(board => {
            const isSelected = selectedBoard.id === board.id;
            return (
              <button 
                key={board.id}
                onClick={() => { onSelectBoard(board); setIsSelectingBoard(false); }}
                className={`
                  group relative overflow-hidden rounded-2xl p-6 text-left border transition-all duration-300 flex flex-row items-center justify-between gap-4
                  ${isSelected 
                    ? 'bg-slate-800 border-emerald-500 shadow-2xl shadow-emerald-900/20 ring-1 ring-emerald-500' 
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-600'
                  }
                `}
              >
                <div className="flex-1 relative z-10">
                  <h3 className={`text-xl font-bold mb-2 transition-colors ${isSelected ? 'text-emerald-400' : 'text-slate-300 group-hover:text-white'}`}>
                    {board.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 group-hover:text-slate-400 transition-colors leading-relaxed">
                    {board.description}
                  </p>
                   {isSelected && (
                      <span className="inline-block text-xs font-bold text-emerald-500 uppercase tracking-wider bg-emerald-950/30 px-2 py-1 rounded border border-emerald-900/50">
                          Selected
                      </span>
                   )}
                </div>

                <div className={`w-20 h-20 md:w-24 md:h-24 shrink-0 p-2 rounded-xl transition-all duration-300 ${isSelected ? 'text-emerald-500/80 bg-emerald-900/10' : 'text-slate-600 bg-slate-950/30 group-hover:text-slate-400 group-hover:bg-slate-950/50'}`}>
                   <BoardPreview board={board} className="w-full h-full" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="shrink-0 mt-8 w-full flex justify-center pb-6">
            <button 
                onClick={() => setIsSelectingBoard(false)}
                className="px-10 py-3 rounded-full bg-slate-800 text-slate-400 font-bold text-lg hover:bg-slate-700 hover:text-white transition-all shadow-lg border border-slate-700"
            >
                Cancel
            </button>
        </div>
      </div>
    );
  }

  // --- VIEW: MAIN SETUP ---
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-300 my-auto">
      
      {/* Header */}
      <div className="w-full flex items-center justify-center mb-6 shrink-0">
         <h2 className="text-2xl md:text-3xl font-bold text-slate-100 tracking-tight">Setup Game</h2>
      </div>

      {/* Player Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8 shrink-0">
        
        {/* Player 1 */}
        <div className={`bg-slate-900/50 border-l-4 border-${THEME_P1}-500 rounded-r-2xl p-6 flex flex-col gap-4`}>
            <div className="relative">
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Player 1 Type</label>
              <select 
                value={p1Type}
                onChange={(e) => handleTypeChange(true, e.target.value as PlayerType)}
                className={`w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-${THEME_P1}-400 font-semibold focus:outline-none focus:border-${THEME_P1}-500 appearance-none cursor-pointer`}
              >
                <option value={PlayerType.HUMAN}>Human</option>
                <option value={PlayerType.AI_RANDOM}>AI Lvl 0 (Bender)</option>
                <option value={PlayerType.AI_GREEDY}>AI Lvl 1 (GLaDOS)</option>
                <option value={PlayerType.AI_SMART}>AI Lvl 2 (Cortana)</option>
                <option value={PlayerType.AI_GENIUS}>AI Lvl 3 (HAL 9000)</option>
              </select>
               <div className="absolute right-3 top-[28px] pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

             <div>
                <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Name</label>
                <input 
                  type="text" 
                  value={p1Name}
                  onChange={(e) => onP1NameChange(e.target.value)}
                  disabled={p1Type !== PlayerType.HUMAN}
                  className={`w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-${THEME_P1}-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                />
             </div>
        </div>

        {/* Player 2 */}
        <div className={`bg-slate-900/50 border-l-4 border-${THEME_P2}-500 rounded-r-2xl p-6 flex flex-col gap-4`}>
            <div className="relative">
              <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Player 2 Type</label>
              <select 
                value={p2Type}
                onChange={(e) => handleTypeChange(false, e.target.value as PlayerType)}
                className={`w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-${THEME_P2}-400 font-semibold focus:outline-none focus:border-${THEME_P2}-500 appearance-none cursor-pointer`}
              >
                <option value={PlayerType.HUMAN}>Human</option>
                <option value={PlayerType.AI_RANDOM}>Chaotic AI</option>
                <option value={PlayerType.AI_GREEDY}>Greedy AI</option>
                <option value={PlayerType.AI_SMART}>Smart AI</option>
                <option value={PlayerType.AI_GENIUS}>Genius AI</option>
              </select>
              <div className="absolute right-3 top-[28px] pointer-events-none text-slate-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

             <div>
                <label className="block text-slate-500 text-xs uppercase font-bold mb-1">Name</label>
                <input 
                  type="text" 
                  value={p2Name}
                  onChange={(e) => onP2NameChange(e.target.value)}
                  disabled={p2Type !== PlayerType.HUMAN}
                  className={`w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-${THEME_P2}-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                />
             </div>
        </div>
      </div>

      <div className="w-full max-w-3xl h-px bg-slate-800 mb-8 shrink-0" />

      {/* Selected Board Display */}
      <div className="w-full max-w-3xl mb-10 shrink-0">
         <h3 className="text-slate-400 text-sm uppercase font-bold mb-3 tracking-wider">Battlefield</h3>
         <button 
            onClick={() => setIsSelectingBoard(true)}
            className="w-full group relative overflow-hidden rounded-2xl bg-slate-800 p-6 text-left border border-slate-700 hover:border-slate-500 hover:bg-slate-750 transition-all duration-300 shadow-xl flex items-center gap-4 md:gap-6"
         >
              {/* Board Preview on Left */}
              <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 text-emerald-500/80 p-1 bg-slate-900/30 rounded-xl border border-slate-700/30 backdrop-blur-sm">
                <BoardPreview board={selectedBoard} className="w-full h-full" />
              </div>
              
              <div className="flex-1 relative z-10 flex items-center justify-between">
                 <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 group-hover:text-white transition-colors">
                      {selectedBoard.name}
                    </h3>
                    <p className="text-slate-400 text-sm max-w-md group-hover:text-slate-300 line-clamp-2 md:line-clamp-none">
                      {selectedBoard.description}
                    </p>
                 </div>
                 
                 <div className="hidden md:flex items-center gap-2 text-slate-400 group-hover:text-white bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700 group-hover:border-slate-500 transition-all">
                    <span>Change</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                 </div>
              </div>
         </button>
      </div>
      
      {/* Footer Actions */}
      <div className="shrink-0 flex flex-col-reverse md:flex-row items-center gap-4 md:gap-6 w-full justify-center">
         <button 
            onClick={onBack}
            className="px-12 py-5 rounded-full bg-slate-800 text-slate-400 font-bold text-lg shadow-lg border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all duration-200"
          >
            Back
          </button>

         <button 
          onClick={onStartGame}
          className="group relative px-16 py-5 rounded-full bg-emerald-500 text-white font-bold text-xl shadow-lg shadow-emerald-900/40 hover:bg-emerald-400 hover:scale-105 hover:shadow-emerald-900/60 transition-all duration-200 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Start Match
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>

    </div>
  );
};

export default NewGameMenu;
