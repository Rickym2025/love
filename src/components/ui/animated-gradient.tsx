'use client';

import React from 'react';

interface AnimatedGradientProps {
  config?: { preset?: 'Aurora' | 'WarmGold' | 'SkyBlue' };
  radius?: string;
  children?: React.ReactNode;
  className?: string;
}

export function AnimatedGradient({
  config = { preset: 'Aurora' },
  radius = '16px',
  children,
  className = '',
}: AnimatedGradientProps) {
  const preset = config.preset || 'Aurora';

  let gradientColors = 'from-amber-200/40 via-rose-300/30 to-amber-500/20';
  if (preset === 'WarmGold') {
    gradientColors = 'from-amber-300/40 via-yellow-200/30 to-amber-600/20';
  } else if (preset === 'SkyBlue') {
    gradientColors = 'from-sky-300/40 via-blue-200/30 to-amber-200/20';
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: radius }}
    >
      {/* Sfondo animato aurora */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${gradientColors} animate-pulse blur-2xl opacity-80 scale-125 pointer-events-none`}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
