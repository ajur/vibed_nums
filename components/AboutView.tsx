
import React from 'react';
import GameLogo from './GameLogo';

interface AboutViewProps {
  onBack: () => void;
}

const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 my-auto">
      
      <div className="w-20 h-20 md:w-24 md:h-24 mb-6 shrink-0 opacity-80 hover:opacity-100 transition-opacity duration-500">
         <GameLogo className="w-full h-full" />
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-slate-100 mb-8 tracking-tight text-center drop-shadow-xl">About Nums</h1>

      <div className="bg-slate-900/60 p-6 md:p-10 rounded-3xl border border-slate-800 shadow-2xl backdrop-blur-md w-full">
        
        {/* Section 1: The Concept */}
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                The Concept
            </h3>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed text-justify md:text-left">
              Nums is a tactical puzzle disguised as a simple math game. While the goal is to collect the highest score from the board, the real challenge lies in the movement: every number you pick dictates exactly where your opponent can move next. It is a strategic tug-of-war where you must constantly weigh immediate gains against the risk of opening up a high-scoring opportunity for your rival.
            </p>
        </div>

        {/* Section 2: Origin Story */}
        <div className="border-t border-slate-800 pt-8 mb-8">
            <h3 className="text-2xl font-bold text-slate-200 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                The Origin Story
            </h3>
            <div className="space-y-4 text-base md:text-lg text-slate-400 leading-relaxed text-justify md:text-left">
                <p>
                This project is a tribute to a lost digital relic. I originally discovered this game decades ago, back in the era of 5.25-inch floppy disks and MS-DOS. It arrived on a disk given to me by my brother, likely passed around his university campus among students and coding enthusiasts.
                </p>
                <p>
                The original game had a simple, keyboard-driven interface and no commercial packaging. The name of the original author—and the game's true title—have been lost to time. I published a <a href="https://ajur.pl/old-nums/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">first implementation</a> a few years ago, but this new version is a complete reimagining designed to bring that addictive logic puzzle to the modern web.
                </p>
            </div>
        </div>

        {/* Section 3: Credits & Links */}
        <div className="border-t border-slate-800 pt-6 mt-2 flex flex-col items-center text-center gap-6">
            <p className="text-slate-500 text-sm italic max-w-xl">
                This modern reimagining was created as an experiment in AI-assisted software development using <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-slate-300 font-semibold not-italic hover:text-white transition-colors underline decoration-slate-600 underline-offset-4">Google AI Studio</a>.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm">
                <span className="text-slate-400">
                    Prompted by <a href="https://ajur.pl/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors ml-1">AJur</a>
                </span>

                <a 
                    href="https://github.com/ajur/vibed_nums" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-950/50 px-4 py-2 rounded-lg border border-slate-800 hover:border-slate-600 hover:bg-slate-900"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    <span>Source Code</span>
                </a>
            </div>
        </div>

      </div>

      <div className="mt-10 shrink-0">
        <button 
           onClick={onBack}
           className="px-10 py-3 rounded-full bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 hover:text-white transition-all border border-slate-700 hover:border-slate-500 shadow-lg"
        >
            Back to Main Menu
        </button>
      </div>
    </div>
  );
};

export default AboutView;
