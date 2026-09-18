'use client';

import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  /** fill color for the logo shapes; defaults to brand orange */
  color?: string;
  /** render the solid black background tile (default: false, transparent) */
  withBackground?: boolean;
}

/**
 * Akal OS Logo
 *
 * A geometric emblem: a broken circle (four arc segments with gaps at the
 * cardinal points) pierced by a central vertical spear/needle. The design
 * evokes a compass rose / timeless directional mark.
 *
 * Default brand color is vibrant orange (#F57C00) on transparent background.
 * Pass `withBackground` to render the solid black tile variant.
 */
const Logo: React.FC<LogoProps> = ({ size = 24, className, style, color = '#F57C00', withBackground = false }) => (
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
    {withBackground && <rect width="48" height="48" rx="10" fill="#000000" />}

    {/* Broken circle — four arc segments with gaps at N, E, S, W */}
    <g fill="none" stroke={color} strokeWidth="4.5" strokeLinecap="round">
      {/* Top-right arc (from ~290° to ~340°) */}
      <path d="M 30.84 5.21 A 20 20 0 0 1 42.79 17.16" />
      {/* Bottom-right arc (from ~20° to ~70°) */}
      <path d="M 42.79 30.84 A 20 20 0 0 1 30.84 42.79" />
      {/* Bottom-left arc (from ~110° to ~160°) */}
      <path d="M 17.16 42.79 A 20 20 0 0 1 5.21 30.84" />
      {/* Top-left arc (from ~200° to ~250°) */}
      <path d="M 5.21 17.16 A 20 20 0 0 1 17.16 5.21" />
    </g>

    {/* Central spear / needle — vertical symmetrical shape */}
    <path
      d="M 24 4 L 29.5 15 L 25.5 22 L 27.5 33 L 24 44 L 20.5 33 L 22.5 22 L 18.5 15 Z"
      fill={color}
    />
  </svg>
);

export default Logo;
