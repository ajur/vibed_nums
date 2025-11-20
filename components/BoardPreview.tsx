
import React from 'react';
import { BoardDefinition } from '../types';

interface BoardPreviewProps {
  board: BoardDefinition;
  className?: string;
}

const BoardPreview: React.FC<BoardPreviewProps> = ({ board, className = "" }) => {
  const rows = board.layout;
  const height = rows.length;
  const width = rows[0].length;

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {rows.map((row, y) => 
        row.split('').map((char, x) => {
          if (char === ' ') return null;
          return (
            <rect 
              key={`${x}-${y}`}
              x={x + 0.1} 
              y={y + 0.1} 
              width={0.8} 
              height={0.8} 
              rx={0.15}
              fill="currentColor"
            />
          );
        })
      )}
    </svg>
  );
};

export default BoardPreview;
