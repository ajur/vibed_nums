
import React from 'react';
import { GameState, Orientation, Point } from '../types';
import Cell from './Cell';

interface BoardProps {
  gameState: GameState;
  validMoves: Point[];
  onCellClick: (p: Point) => void;
}

const Board: React.FC<BoardProps> = ({ gameState, validMoves, onCellClick }) => {
  const { grid, width, height, lastMove, currentConstraint, constraintIndex } = gameState;

  // Create an array of indicators for rows and cols
  const cols = Array.from({ length: width }, (_, i) => i);
  const rows = Array.from({ length: height }, (_, i) => i);

  const indicatorClass = gameState.isGameOver
    ? 'bg-red-500/30 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.4)] z-20'
    : 'bg-yellow-400/5 transition-all duration-300 z-0';

  return (
    <div className="relative p-4 bg-slate-900/50 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-800 select-none">
      
      {/* Highlight Lines */}
      {/* This visualizes the current constraint (Row or Column). 
          When Game Over: Flashes RED to indicate "No Moves Left" in this line. 
          When Active: Shows subtle yellow highlight. */}
      <div 
        className={`absolute pointer-events-none rounded-lg ${indicatorClass}`}
        style={{
          left: currentConstraint === Orientation.VERTICAL ? `calc((100% - 32px) / ${width} * ${constraintIndex} + 16px)` : '16px',
          top: currentConstraint === Orientation.HORIZONTAL ? `calc((100% - 32px) / ${height} * ${constraintIndex} + 16px)` : '16px',
          width: currentConstraint === Orientation.VERTICAL ? `calc((100% - 32px) / ${width})` : 'calc(100% - 32px)',
          height: currentConstraint === Orientation.HORIZONTAL ? `calc((100% - 32px) / ${height})` : 'calc(100% - 32px)',
        }}
      />

      <div 
        className="grid gap-1 md:gap-2 relative z-10"
        style={{
          gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
          // Aspect ratio logic handled by cells, but we want to limit max width
          maxWidth: '100%',
        }}
      >
        {/* Render in Column-Major order? 
            CSS Grid fills Row by Row.
            Our grid is grid[x][y] (col[row]).
            So we need to iterate y then x to map to CSS grid properly.
        */}
        {rows.map((y) => (
           cols.map((x) => {
             const cell = grid[x][y];
             const point = { x, y };
             const isValid = validMoves.some(m => m.x === x && m.y === y);
             const isLast = !!lastMove && lastMove.x === x && lastMove.y === y;
             
             return (
               <Cell 
                 key={`${x}-${y}`}
                 cell={cell}
                 point={point}
                 isValidMove={isValid}
                 isLastMove={isLast}
                 onClick={onCellClick}
               />
             );
           })
        ))}
      </div>
    </div>
  );
};

export default Board;
