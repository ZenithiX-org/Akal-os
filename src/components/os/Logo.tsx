'use client';

import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** color override; defaults to currentColor */
  color?: string;
}

/**
 * Akal OS Logo
 * A stylized abstract mark inspired by the concept of "Akal" (timeless/eternal).
 * The design features concentric arcs forming an abstract eye/sun rising over
 * a horizon — a modern geometric emblem with subtle Punjabi cultural resonance
 * (the chakra / rising sun motif). Rendered as crisp SVG.
 */
const Logo: React.FC<LogoProps> = ({ size = 24, className, style, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    aria-label="Akal OS"
  >
    {/* Outer ring */}
    <circle cx="24" cy="24" r="22" stroke={color} strokeWidth="2.5" opacity="0.25" />
    {/* Rising sun arcs (timeless/eternal emblem) */}
    <path
      d="M10 30 A 16 16 0 0 1 38 30"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M14 30 A 12 12 0 0 1 34 30"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M18 30 A 8 8 0 0 1 30 30"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.45"
    />
    {/* Horizon line */}
    <path d="M6 30 H 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {/* Center dot — the timeless core */}
    <circle cx="24" cy="30" r="2.5" fill={color} />
    {/* Radiating rays */}
    <path d="M24 8 V 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M13 13 L 16 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <path d="M35 13 L 32 16" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    <path d="M6 22 H 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    <path d="M38 22 H 42" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export default Logo;
