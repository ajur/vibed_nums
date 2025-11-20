import React from 'react';

interface BoardPickerProps {
  onSelectBoard: () => void;
}

const BoardPicker: React.FC<BoardPickerProps> = ({ onSelectBoard }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full max-w-4xl mx-auto p-6">
      <h1 className="text-4xl md:text-6xl font-black text-slate-100 mb-2 tracking-tight">NUMS</h1>
      <p className="text-slate-400 mb-12 text-lg">Choose your battlefield</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Cross Board Option */}
        <button 
          onClick={onSelectBoard}
          className="group relative overflow-hidden rounded-2xl bg-slate-800 p-6 text-left border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-900/20"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 2h2v9h9v2h-9v9h-2v-9h-9v-2h9z" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Classic Cross</h3>
            <p className="text-slate-400 text-sm mb-4">The standard 9x11 irregular grid. Balanced gameplay with strategic voids.</p>
            <div className="flex items-center text-cyan-500 text-sm font-semibold">
              Play Now 
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </button>

        {/* Placeholder for future boards */}
        <button 
          disabled
          className="group relative overflow-hidden rounded-2xl bg-slate-900/50 p-6 text-left border border-slate-800 opacity-60 cursor-not-allowed"
        >
           <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3z" />
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-slate-500 mb-2">Coming Soon</h3>
            <p className="text-slate-600 text-sm mb-4">More board shapes and custom editor integration coming in future updates.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BoardPicker;