import React from 'react';
import { Cell as CellType, CellStatus, CellType as ECellType, Point } from '../types';

interface CellProps {
  cell: CellType;
  point: Point;
  isValidMove: boolean;
  isLastMove: boolean;
  onClick: (p: Point) => void;
  cellSize?: string;
}

const Cell: React.FC<CellProps> = ({ 
  cell, 
  point, 
  isValidMove, 
  isLastMove, 
  onClick,
}) => {
  const isVoid = cell.type === ECellType.VOID;
  const isTaken = cell.status === CellStatus.TAKEN;

  if (isVoid) {
    return <div className="aspect-square opacity-0 pointer-events-none" />;
  }

  // Base styles
  let bgClass = 'bg-slate-800';
  let borderClass = 'border-2 border-slate-700';
  let textClass = 'text-slate-400';
  let hoverClass = '';
  let cursorClass = 'cursor-default';
  
  // Logic for Content: If taken, show nothing (empty).
  const content = isTaken ? '' : cell.value.toString();

  // Logic for styling
  if (isTaken) {
    // Taken cells become dark "holes", but we keep the border neutral
    bgClass = 'bg-slate-900'; // Darker to look like a hole
    borderClass = 'border-2 border-slate-800'; 
    
    // Highlight the LAST move specifically as the anchor
    if (isLastMove) {
        borderClass = 'border-4 border-white shadow-lg z-10';
    }
  } else if (isValidMove) {
    // Valid Move styles
    bgClass = 'bg-slate-700';
    
    // Apply red tint to negative values even if valid
    textClass = cell.value < 0 ? 'text-red-300' : 'text-white';

    borderClass = 'border-2 border-emerald-400/50 shadow-[0_0_10px_rgba(52,211,153,0.3)]';
    hoverClass = 'hover:bg-emerald-600 hover:border-emerald-400 hover:scale-105 transition-transform';
    cursorClass = 'cursor-pointer';
  } else {
    // Available but not valid (or just standard available state)
    // Check for negative values
    if (cell.value < 0) {
        textClass = 'text-red-400/50';
    }
  }

  return (
    <div
      onClick={() => isValidMove && onClick(point)}
      className={`
        aspect-square rounded-lg flex items-center justify-center 
        font-bold text-sm md:text-lg select-none
        transition-all duration-200 ease-out
        ${bgClass} ${borderClass} ${textClass} ${hoverClass} ${cursorClass}
      `}
    >
      {content}
    </div>
  );
};

export default Cell;