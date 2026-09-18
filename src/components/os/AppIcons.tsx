'use client';

import React from 'react';

export type IconProps = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Akal OS — Custom SVG App Icons
 *
 * A collection of detailed, gradient-rich app icons rendered as inline SVG.
 * Each icon is self-contained (no external assets) and uses the macOS-style
 * rounded-square squircle background with a distinct colored gradient per app.
 */

const Squircle = ({ children, gradient, size = 48, radius = 0.22 }: IconProps & { gradient: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`bg-${gradient}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={gradient} stopOpacity="1" />
        <stop offset="100%" stopColor={gradient} stopOpacity="0.78" />
      </linearGradient>
      <linearGradient id={`sheen-${gradient}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.32" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Squircle background */}
    <rect x="1" y="1" width="46" height="46" rx={48 * radius} fill={`url(#bg-${gradient})`} />
    {/* Top sheen for glossy look */}
    <rect x="1" y="1" width="46" height="23" rx={48 * radius} fill={`url(#sheen-${gradient})`} />
    {/* Inner stroke */}
    <rect x="1" y="1" width="46" height="46" rx={48 * radius} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
    {children}
  </svg>
);

/* ---------- Individual app icons ---------- */

export const FinderIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#1B6AE1" {...p}>
    <path d="M14 14 L24 24 L34 14 M14 34 L24 24 L34 34" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="24" cy="24" r="2" fill="#fff" />
  </Squircle>
);

export const SafariIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#e8eef5" {...p}>
    <circle cx="24" cy="24" r="14" fill="none" stroke="#1d1d1f" strokeWidth="2" />
    <circle cx="24" cy="24" r="14" fill="#1d1d1f" fillOpacity="0.06" />
    <path d="M24 14 L28 22 L24 24 Z" fill="#ff3b30" />
    <path d="M24 34 L20 26 L24 24 Z" fill="#fff" />
    <circle cx="24" cy="24" r="1.5" fill="#1d1d1f" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i / 12) * Math.PI * 2;
      return <line key={i} x1={24 + Math.cos(a) * 14} y1={24 + Math.sin(a) * 14} x2={24 + Math.cos(a) * 16} y2={24 + Math.sin(a) * 16} stroke="#1d1d1f" strokeWidth="1" opacity="0.5" />;
    })}
  </Squircle>
);

export const MailIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#3478F6" {...p}>
    <rect x="12" y="15" width="24" height="18" rx="3" fill="#fff" />
    <path d="M12 17 L24 26 L36 17" stroke="#3478F6" strokeWidth="2" fill="none" strokeLinecap="round" />
  </Squircle>
);

export const MessagesIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#3DDB76" {...p}>
    <path d="M24 13 C17 13 12 17.5 12 23 C12 26 13.5 28.5 16 30.5 L15 35 L20 32.5 C21.2 32.8 22.6 33 24 33 C31 33 36 28.5 36 23 C36 17.5 31 13 24 13 Z" fill="#fff" />
    <circle cx="19" cy="23" r="1.6" fill="#3DDB76" />
    <circle cx="24" cy="23" r="1.6" fill="#3DDB76" />
    <circle cx="29" cy="23" r="1.6" fill="#3DDB76" />
  </Squircle>
);

export const FaceTimeIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#3DD68C" {...p}>
    <rect x="12" y="17" width="18" height="14" rx="3" fill="#fff" />
    <path d="M30 21 L36 17 V31 L30 27 Z" fill="#fff" />
  </Squircle>
);

export const MapsIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#e8efd5" {...p}>
    <path d="M14 16 L20 14 L28 17 L34 15 V32 L28 34 L20 31 L14 33 Z" fill="#7dd87a" />
    <path d="M20 14 V31 M28 17 V34" stroke="#3a7a3a" strokeWidth="1.2" opacity="0.5" />
    <path d="M24 19 C21 19 19 21 19 24 C19 27 24 32 24 32 C24 32 29 27 29 24 C29 21 27 19 24 19 Z" fill="#ff3b30" />
    <circle cx="24" cy="24" r="1.8" fill="#fff" />
  </Squircle>
);

export const PhotosIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#fff" {...p}>
    {['#ff5e3a', '#ffbd2e', '#44d85a', '#2cc1ff', '#5b6bff', '#d44cff'].map((c, i) => {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      return <ellipse key={i} cx={24 + Math.cos(a) * 5} cy={24 + Math.sin(a) * 5} rx="6" ry="4" fill={c} opacity="0.85" transform={`rotate(${(i * 60) + 90} ${24 + Math.cos(a) * 5} ${24 + Math.sin(a) * 5})`} />;
    })}
    <circle cx="24" cy="24" r="4" fill="#fff" />
  </Squircle>
);

export const MusicIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#FC3C44" {...p}>
    <path d="M20 14 L32 11 V28" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="18" cy="30" r="4" fill="#fff" />
    <circle cx="30" cy="28" r="4" fill="#fff" />
    <path d="M20 30 V17 M32 28 V14" stroke="#fff" strokeWidth="2.5" />
  </Squircle>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#fff" {...p}>
    <rect x="11" y="13" width="26" height="24" rx="2" fill="#fff" stroke="#e0e0e0" />
    <rect x="11" y="13" width="26" height="6" fill="#ff3b30" />
    <text x="24" y="34" textAnchor="middle" fill="#1d1d1f" fontSize="14" fontWeight="700" fontFamily="-apple-system, sans-serif">{new Date().getDate()}</text>
  </Squircle>
);

export const NotesIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#fffbe0" {...p}>
    <rect x="12" y="13" width="24" height="22" rx="2" fill="#fff" stroke="#e8d878" />
    <rect x="12" y="13" width="24" height="5" fill="#ffd60a" />
    <line x1="16" y1="23" x2="32" y2="23" stroke="#d4c44a" strokeWidth="1" />
    <line x1="16" y1="27" x2="32" y2="27" stroke="#d4c44a" strokeWidth="1" />
    <line x1="16" y1="31" x2="26" y2="31" stroke="#d4c44a" strokeWidth="1" />
  </Squircle>
);

export const RemindersIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#FF9F0A" {...p}>
    <circle cx="18" cy="18" r="2.5" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle cx="18" cy="25" r="2.5" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle cx="18" cy="32" r="2.5" fill="none" stroke="#fff" strokeWidth="1.6" />
    <circle cx="18" cy="18" r="1.3" fill="#fff" />
    <line x1="23" y1="18" x2="33" y2="18" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="23" y1="25" x2="33" y2="25" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="23" y1="32" x2="29" y2="32" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
  </Squircle>
);

export const CalculatorIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#1d1d1f" {...p}>
    <rect x="14" y="11" width="20" height="26" rx="2" fill="#3a3a3c" />
    <rect x="16" y="13" width="16" height="6" rx="1" fill="#1d1d1f" />
    <text x="30" y="18" textAnchor="end" fill="#fff" fontSize="5" fontFamily="monospace">0</text>
    {[[17, 23], [21, 23], [25, 23], [29, 23], [17, 27], [21, 27], [25, 27], [29, 27], [17, 31], [21, 31], [25, 31]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="1.4" fill="#666" />
    ))}
    <rect x="28.5" y="29.5" width="3" height="3" rx="0.8" fill="#ff9500" />
  </Squircle>
);

export const TerminalIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#2a2a2a" {...p}>
    <rect x="10" y="13" width="28" height="22" rx="2" fill="#1a1a1a" stroke="#444" />
    <circle cx="13" cy="16" r="0.9" fill="#ff5f57" />
    <circle cx="16" cy="16" r="0.9" fill="#febc2e" />
    <circle cx="19" cy="16" r="0.9" fill="#28c840" />
    <path d="M14 22 L18 25 L14 28" stroke="#33d17a" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="28" x2="28" y2="28" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
  </Squircle>
);

export const WeatherIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#32ADE6" {...p}>
    <circle cx="20" cy="20" r="6" fill="#ffd60a" />
    <circle cx="28" cy="28" r="7" fill="#fff" />
    <circle cx="20" cy="29" r="5" fill="#fff" />
  </Squircle>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#636366" {...p}>
    <g transform="translate(24,24)">
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return <rect key={i} x={Math.cos(a) * 7 - 1.5} y={Math.sin(a) * 7 - 4} width="3" height="8" rx="1" fill="#fff" transform={`rotate(${(i * 45) + 90})`} />;
      })}
      <circle r="6" fill="#636366" stroke="#fff" strokeWidth="2" />
      <circle r="2.5" fill="#fff" />
    </g>
  </Squircle>
);

export const AppStoreIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#0071E3" {...p}>
    <path d="M15 30 L21 20 L24 25 M27 30 L20 18 M27 30 L33 30" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="15" cy="30" r="2" fill="#fff" />
    <circle cx="27" cy="30" r="2" fill="#fff" />
    <circle cx="33" cy="30" r="2" fill="#fff" />
  </Squircle>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#636366" {...p}>
    <path d="M18 17 L19 35 H29 L30 17 Z" fill="none" stroke="#fff" strokeWidth="1.6" />
    <line x1="15" y1="17" x2="33" y2="17" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="13" x2="26" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="20" x2="22" y2="32" stroke="#fff" strokeWidth="1" opacity="0.6" />
    <line x1="26" y1="20" x2="26" y2="32" stroke="#fff" strokeWidth="1" opacity="0.6" />
  </Squircle>
);

export const LaunchpadIcon: React.FC<IconProps> = ({ size = 48, ...p }) => (
  <Squircle size={size} gradient="#8e8e93" {...p}>
    {[[16, 16], [24, 16], [32, 16], [16, 24], [24, 24], [32, 24], [16, 32], [24, 32], [32, 32]].map(([x, y], i) => (
      <rect key={i} x={x - 2.5} y={y - 2.5} width="5" height="5" rx="1.2" fill="#fff" opacity={i === 4 ? 0.5 : 0.85} />
    ))}
  </Squircle>
);

/* Extra launchpad-only icons (no dock entry) */
export const GenericIcon: React.FC<IconProps & { emoji?: string; color?: string }> = ({ size = 48, emoji = '📱', color = '#8e8e93', ...p }) => (
  <Squircle size={size} gradient={color} {...p}>
    <text x="24" y="32" textAnchor="middle" fontSize="20">{emoji}</text>
  </Squircle>
);

/** Master map: appId → icon component */
export const AppIcons: Record<string, React.FC<IconProps>> = {
  finder: FinderIcon,
  safari: SafariIcon,
  mail: MailIcon,
  messages: MessagesIcon,
  facetime: FaceTimeIcon,
  maps: MapsIcon,
  photos: PhotosIcon,
  music: MusicIcon,
  calendar: CalendarIcon,
  notes: NotesIcon,
  reminders: RemindersIcon,
  calculator: CalculatorIcon,
  terminal: TerminalIcon,
  weather: WeatherIcon,
  settings: SettingsIcon,
  appstore: AppStoreIcon,
  trash: TrashIcon,
  launchpad: LaunchpadIcon,
  stocks: (p) => <GenericIcon emoji="📈" color="#30D158" {...p} />,
  books: (p) => <GenericIcon emoji="📚" color="#FF6B00" {...p} />,
  news: (p) => <GenericIcon emoji="📰" color="#FF2D55" {...p} />,
  podcasts: (p) => <GenericIcon emoji="🎙️" color="#B45BFF" {...p} />,
  tv: (p) => <GenericIcon emoji="📺" color="#1D1D1F" {...p} />,
  contacts: (p) => <GenericIcon emoji="👤" color="#636366" {...p} />,
  chess: (p) => <GenericIcon emoji="♟️" color="#1C1C1E" {...p} />,
  dictionary: (p) => <GenericIcon emoji="📖" color="#5E5CE6" {...p} />,
};

/** Color map for squircle backgrounds (used by neomorphic + glow effects) */
export const AppColors: Record<string, string> = {
  finder: '#1B6AE1', safari: '#e8eef5', mail: '#3478F6', messages: '#3DDB76',
  facetime: '#3DD68C', maps: '#e8efd5', photos: '#FF6B6B', music: '#FC3C44',
  calendar: '#FF3B30', notes: '#FFD60A', reminders: '#FF9F0A', calculator: '#1d1d1f',
  terminal: '#2a2a2a', weather: '#32ADE6', settings: '#636366', appstore: '#0071E3',
  trash: '#636366', launchpad: '#8e8e93',
};
