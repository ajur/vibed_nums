
import React from 'react';
import GameLogo from './GameLogo';

interface MainMenuProps {
  onNewGame: () => void;
  onSettings: () => void;
  onAbout: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onSettings, onAbout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto p-6 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="w-48 h-48 md:w-64 md:h-64 mb-4 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out">
        <GameLogo className="w-full h-full" />
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-slate-100 mb-4 tracking-tighter drop-shadow-2xl">NUMS</h1>
      <p className="text-slate-400 mb-16 text-xl md:text-2xl font-light tracking-wide uppercase">Strategy on the Grid</p>

      <div className="flex flex-col gap-4 w-full max-w-xs z-10">
        <button 
          onClick={onNewGame}
          className="group relative px-8 py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg shadow-lg shadow-emerald-900/20 hover:bg-emerald-400 hover:scale-105 transition-all duration-200 overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            PLAY
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </button>
        
        <button 
          onClick={onSettings}
          className="px-8 py-4 rounded-xl bg-slate-800 text-slate-300 font-semibold text-lg border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600 transition-all duration-200"
        >
          SETTINGS
        </button>

        <button 
          onClick={onAbout}
          className="px-8 py-4 rounded-xl bg-slate-900/50 text-slate-400 font-semibold text-lg border border-slate-800 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-700 transition-all duration-200"
        >
          ABOUT
        </button>
      </div>

      <div className="mt-24 text-slate-600 text-sm">
        v1.0.0 &bull; Ajur
      </div>
    </div>
  );
};

export default MainMenu;