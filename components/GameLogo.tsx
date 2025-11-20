
import React from 'react';

interface GameLogoProps {
  className?: string;
}

const GameLogo: React.FC<GameLogoProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="p1-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4" /> {/* Cyan-500 */}
          <stop offset="100%" stopColor="#3b82f6" /> {/* Blue-500 */}
        </linearGradient>
        <linearGradient id="p2-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" /> {/* Amber-500 */}
          <stop offset="100%" stopColor="#ef4444" /> {/* Red-500 */}
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background Grid Elements - Subtle & Dark */}
      <g opacity="0.5">
        <rect x="45" y="45" width="30" height="30" rx="6" fill="#1e293b" />
        <rect x="85" y="45" width="30" height="30" rx="6" fill="#1e293b" />
        <rect x="125" y="45" width="30" height="30" rx="6" fill="#1e293b" />
        
        <rect x="45" y="85" width="30" height="30" rx="6" fill="#1e293b" />
        {/* Center Void */}
        <rect x="85" y="85" width="30" height="30" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
        <rect x="125" y="85" width="30" height="30" rx="6" fill="#1e293b" />
        
        <rect x="45" y="125" width="30" height="30" rx="6" fill="#1e293b" />
        <rect x="85" y="125" width="30" height="30" rx="6" fill="#1e293b" />
        <rect x="125" y="125" width="30" height="30" rx="6" fill="#1e293b" />
      </g>

      {/* Foreground - Dynamic Action */}
      {/* Player 1 Piece (Left) */}
      <g transform="translate(0, 0)">
         <rect x="35" y="75" width="50" height="50" rx="12" fill="url(#p1-grad)" className="drop-shadow-2xl" filter="url(#glow)" opacity="0.9" />
         <text x="60" y="108" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="monospace">7</text>
      </g>

      {/* Player 2 Piece (Right - Overlapping slightly) */}
      <g transform="translate(0, 0)">
         <rect x="115" y="75" width="50" height="50" rx="12" fill="url(#p2-grad)" className="drop-shadow-2xl" filter="url(#glow)" opacity="0.9" />
          <text x="140" y="108" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="monospace">5</text>
      </g>

      {/* Connection Line */}
      <path d="M85 100 H115" stroke="white" strokeWidth="3" strokeDasharray="4 4" strokeOpacity="0.3" />

    </svg>
  );
};

export default GameLogo;
