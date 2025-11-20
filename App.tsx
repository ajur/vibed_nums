
import React, { useState, useEffect } from 'react';
import { useNumsGame, GameConfig } from './hooks/useNumsGame';
import Board from './components/Board';
import GameControls from './components/GameControls';
import MainMenu from './components/MainMenu';
import NewGameMenu from './components/NewGameMenu';
import RulesModal from './components/RulesModal';
import GameOverModal from './components/GameOverModal';
import { PlayerType, BoardDefinition } from './types';
import { BOARDS } from './data/boards';
import { AI_NAMES } from './constants';

type View = 'MAIN_MENU' | 'NEW_GAME' | 'GAME' | 'SETTINGS';

interface GameSessionProps {
  config: GameConfig;
  onChangeBoard: () => void;
  onExit: () => void;
}

const GameSession: React.FC<GameSessionProps> = ({ config, onChangeBoard, onExit }) => {
  const { 
    gameState, 
    validMoves, 
    handleCellClick, 
    undo, 
    restartMatch,
    rematch,
    isAiThinking
  } = useNumsGame(config);

  const [showRules, setShowRules] = useState(false);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  // Effect to handle the Game Over delay
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (gameState?.isGameOver) {
      // Wait 2 seconds before showing the modal so user can see the "No Moves" animation
      timer = setTimeout(() => {
        setShowGameOverModal(true);
      }, 2000);
    } else {
      setShowGameOverModal(false);
    }
    return () => clearTimeout(timer);
  }, [gameState?.isGameOver]);

  if (!gameState) {
    return (
      <div className="h-full w-full flex items-center justify-center text-slate-500">
        <div className="animate-pulse">Loading Game Board...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full animate-in fade-in zoom-in-95 duration-300 py-4 md:py-8">
      
      {/* Wrapper to enforce consistent width between Controls and Board */}
      <div className="w-full max-w-lg lg:max-w-xl flex flex-col gap-4 px-2">
        
        <GameControls 
          gameState={gameState} 
          onUndo={undo}
          onRestart={restartMatch}
          onRematch={rematch}
          onChangeBoard={onChangeBoard}
          onShowRules={() => setShowRules(true)}
          onExit={onExit}
        />

        <div className={`w-full transition-opacity duration-300 ${isAiThinking ? 'opacity-90' : 'opacity-100'}`}>
          <Board 
            gameState={gameState} 
            validMoves={isAiThinking ? [] : validMoves} 
            onCellClick={handleCellClick} 
          />
        </div>

      </div>

      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      {gameState.isGameOver && showGameOverModal && (
        <GameOverModal 
          winnerId={gameState.winnerId}
          players={gameState.players}
          onRematch={rematch}
          onNewGame={onChangeBoard}
          onMainMenu={onExit}
        />
      )}
    </div>
  );
};

const SettingsPlaceholder: React.FC<{ onBack: () => void }> = ({ onBack }) => (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-in fade-in">
        <h2 className="text-3xl font-bold text-slate-200 mb-4">Settings</h2>
        <p className="text-slate-400 mb-8">Configuration options coming soon.</p>
        <button 
           onClick={onBack}
           className="px-6 py-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
        >
            Back to Menu
        </button>
    </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('MAIN_MENU');
  
  // Persistent Player Configuration
  const [p1Name, setP1Name] = useState('Player 1');
  const [p2Name, setP2Name] = useState(AI_NAMES[PlayerType.AI_RANDOM]);
  const [p1Type, setP1Type] = useState<PlayerType>(PlayerType.HUMAN);
  const [p2Type, setP2Type] = useState<PlayerType>(PlayerType.AI_RANDOM);
  const [selectedBoard, setSelectedBoard] = useState<BoardDefinition>(BOARDS[0]);

  const handleStartGame = () => {
    setCurrentView('GAME');
  };

  return (
    /* 
       CRITICAL FIX: 
       1. Use h-screen instead of min-h-screen to constrain the container to the viewport 
          so overflow-y-auto actually works against the overflow-hidden body.
       2. Use justify-start md:justify-center to prevent top-clipping on mobile when content overflows.
    */
    <div className="h-screen w-full bg-slate-950 text-slate-200 flex flex-col items-center justify-start md:justify-center p-4 overflow-y-auto scroll-smooth">
        
      {currentView === 'MAIN_MENU' && (
        <MainMenu 
            onNewGame={() => setCurrentView('NEW_GAME')} 
            onSettings={() => setCurrentView('SETTINGS')} 
        />
      )}

      {currentView === 'NEW_GAME' && (
        <NewGameMenu 
            p1Name={p1Name}
            p2Name={p2Name}
            onP1NameChange={setP1Name}
            onP2NameChange={setP2Name}
            p1Type={p1Type}
            p2Type={p2Type}
            onP1TypeChange={setP1Type}
            onP2TypeChange={setP2Type}
            selectedBoard={selectedBoard}
            onSelectBoard={setSelectedBoard}
            onStartGame={handleStartGame}
            onBack={() => setCurrentView('MAIN_MENU')}
        />
      )}

      {currentView === 'GAME' && (
        <GameSession 
            config={{ 
              player1Name: p1Name, 
              player1Type: p1Type,
              player2Name: p2Name,
              player2Type: p2Type,
              boardDefinition: selectedBoard
            }}
            onChangeBoard={() => setCurrentView('NEW_GAME')}
            onExit={() => setCurrentView('MAIN_MENU')} 
        />
      )}

      {currentView === 'SETTINGS' && (
          <SettingsPlaceholder onBack={() => setCurrentView('MAIN_MENU')} />
      )}

    </div>
  );
};

export default App;
