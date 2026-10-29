import React, { useState, useRef } from 'react';

interface CompactDisc3DProps {
  discImage: string;
  title: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpinning?: boolean;
  interactiveTilt?: boolean;
  showReflection?: boolean;
  showAura?: boolean;
  onClick?: () => void;
  className?: string;
  badge?: string;
}

export const CompactDisc3D: React.FC<CompactDisc3DProps> = ({
  discImage,
  title,
  size = 'lg',
  isSpinning = true,
  interactiveTilt = true,
  showReflection = true,
  showAura = false,
  onClick,
  className = '',
  badge,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [sheenAngle, setSheenAngle] = useState(45);
  const discRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-40 h-40 sm:w-48 sm:h-48',
    lg: 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
    xl: 'w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]',
  }[size];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveTilt || !discRef.current) return;
    const rect = discRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const mult = 14;
    setRotateX((-y / (rect.height / 2)) * mult);
    setRotateY((x / (rect.width / 2)) * mult);
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 180;
    setSheenAngle(angle);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setSheenAngle(45);
  };

  return (
    <div
      className={`relative select-none flex flex-col items-center justify-center ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      } ${className}`}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* 3D Tilting Disc Stage */}
      <div
        ref={discRef}
        className={`relative ${sizeClasses} rounded-full transition-transform duration-300 ease-out`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating Ambient Shadow Behind Disc */}
        <div className="absolute inset-0 rounded-full bg-black/70 blur-2xl -translate-y-2 scale-95 pointer-events-none" />

        {/* Signature A24 Organic Looping Aura Ring */}
        {showAura && (
          <div className="absolute -inset-8 sm:-inset-10 rounded-full pointer-events-none animate-aura-pulse flex items-center justify-center z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="47.5"
                fill="none"
                stroke="url(#auraGrad)"
                strokeWidth="1.2"
                strokeDasharray="5 3 2 3"
                className="opacity-80"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="rgba(197, 205, 208, 0.2)"
                strokeWidth="0.6"
                strokeDasharray="2 4"
              />
              <defs>
                <linearGradient id="auraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#C5CDD0" stopOpacity="0.7" />
                  <stop offset="70%" stopColor="#102631" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E7E8E4" stopOpacity="0.85" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        {/* The Compact Disc Body */}
        <div
          className={`relative w-full h-full rounded-full overflow-hidden border border-[#C5CDD0]/40 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_0_12px_rgba(255,255,255,0.35)] ${
            isSpinning ? 'animate-cd-spin-slow animate-cd-spin-paused' : ''
          }`}
          style={{ willChange: 'transform' }}
        >
          {/* Circular Printed Disc Artwork */}
          <img
            src={discImage}
            alt={title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full filter contrast-105"
            draggable={false}
          />

          {/* Micro-Grooves Optical Spiral Texture */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                'radial-gradient(circle, transparent 20%, rgba(255,255,255,0.06) 22%, transparent 24%, rgba(0,0,0,0.15) 26%, transparent 28%, rgba(255,255,255,0.05) 30%, transparent 32%, rgba(0,0,0,0.15) 34%, transparent 36%, rgba(255,255,255,0.05) 38%, transparent 40%, rgba(0,0,0,0.15) 42%, transparent 44%, rgba(255,255,255,0.06) 46%, transparent 48%, rgba(0,0,0,0.15) 50%, transparent 52%, rgba(255,255,255,0.05) 54%, transparent 56%, rgba(0,0,0,0.15) 58%, transparent 60%, rgba(255,255,255,0.06) 62%, transparent 64%, rgba(0,0,0,0.15) 66%, transparent 68%, rgba(255,255,255,0.05) 70%, transparent 72%, rgba(0,0,0,0.15) 74%, transparent 76%, rgba(255,255,255,0.05) 78%, transparent 80%, rgba(0,0,0,0.15) 82%, transparent 84%, rgba(255,255,255,0.06) 86%, transparent 88%, rgba(0,0,0,0.15) 90%, transparent 92%, rgba(255,255,255,0.08) 94%, transparent 96%)',
            }}
          />

          {/* Holographic Iridescent Spectral Laser Reflection */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-65 transition-transform duration-700"
            style={{
              background: `conic-gradient(from ${sheenAngle}deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(160,230,255,0.35) 40deg, rgba(255,180,240,0.25) 80deg, rgba(180,255,210,0.25) 120deg, rgba(255,255,255,0.05) 160deg, rgba(160,230,255,0.35) 220deg, rgba(255,180,240,0.25) 260deg, rgba(180,255,210,0.25) 300deg, rgba(255,255,255,0) 360deg)`,
            }}
          />

          {/* Polycarbonate Clear Inner Hub Mirror Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] h-[38%] rounded-full border border-white/25 bg-gradient-to-tr from-white/20 via-black/30 to-white/10 backdrop-blur-[2px] shadow-[inset_0_0_10px_rgba(0,0,0,0.7)] flex items-center justify-center pointer-events-none">
            {/* Matrix Stamping Ring */}
            <div className="absolute inset-1 rounded-full border border-white/15 flex items-center justify-center">
              <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.25em] text-white/50 select-none">
                DARANY AUDIO · 44.1kHz
              </span>
            </div>

            {/* Inner Clear Plastic Clamp Ring */}
            <div className="w-[62%] h-[62%] rounded-full border border-white/30 bg-[#07131C]/60 backdrop-blur-md flex items-center justify-center">
              {/* Center Spindle Hole (See-through to the background) */}
              <div className="w-[52%] h-[52%] rounded-full bg-[#050e14] border border-[#C5CDD0]/70 shadow-[inset_0_0_8px_rgba(0,0,0,0.95)]" />
            </div>
          </div>

          {/* Outer Chiseled Silver Edge Bevel */}
          <div className="absolute inset-0 rounded-full border-[2px] border-white/15 pointer-events-none" />
        </div>

        {/* Optional Badge on Active Disc */}
        {badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#07131C]/90 backdrop-blur-md border border-[#C5CDD0]/25 rounded-full text-[10px] font-mono tracking-widest text-[#E7E8E4] uppercase shadow-lg z-20 pointer-events-none">
            {badge}
          </div>
        )}
      </div>

      {/* Realistic Floor Reflection Under Disc */}
      {showReflection && (
        <div
          className={`relative ${sizeClasses} h-12 -mt-4 opacity-25 filter blur-[3px] pointer-events-none overflow-hidden`}
          style={{
            transform: 'scaleY(-1) rotateX(75deg)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
          }}
        >
          <img
            src={discImage}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      )}
    </div>
  );
};
