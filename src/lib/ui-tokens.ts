// Akal OS — shared shell design tokens.
//
// Every piece of OS chrome (menu bar, dock, windows, overlays) reads its
// colors from here so light/dark appearance and the user-selected accent stay
// perfectly in sync. App internals (src/components/os/apps/*) intentionally
// keep their own dark-glass look, so the window content area is wrapped in a
// `theme-dark` scope and is never affected by these tokens.

/** Akal OS brand crimson — the default accent. */
export const BRAND_ACCENT = '#d70a53';
/** Akal OS brand orange — used by the logo wordmark + boot screen. */
export const BRAND_ORANGE = '#F57C00';

/** Turn `#rgb` / `#rrggbb` into an `rgba()` string. Non-hex input is returned as-is. */
export function withAlpha(color: string, alpha: number): string {
  const hex = color.trim().replace('#', '');
  const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
  if (full.length !== 6 || /[^0-9a-fA-F]/.test(full)) return color;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface ShellTokens {
  dark: boolean;
  /** Primary text on a shell surface. */
  text: string;
  /** Secondary / supporting text. */
  subText: string;
  /** Lowest-emphasis text (timestamps, captions). */
  faintText: string;
  /** Icon color for menu-bar style glyphs. */
  icon: string;
  /** Low-alpha hover wash for icon buttons. */
  hover: string;
  /** Pressed / selected wash. */
  pressed: string;
  /** Panel (overlay) background. */
  surface: string;
  /** Inner card background used inside panels. */
  surfaceMuted: string;
  /** Raised menu background (context menus, dropdowns). */
  menu: string;
  border: string;
  borderStrong: string;
  divider: string;
  /** Outer shadow for floating panels. */
  shadow: string;
  /** Softer shadow for inner cards. */
  shadowSoft: string;
  /** Inset hairline highlight for the top edge of panels. */
  highlight: string;
  accent: string;
  accentSoft: string;
  accentGlow: string;
  accentContrast: string;
  /** Glass utility classes — already appearance-aware. */
  glassClass: string;
  glassCardClass: string;
  glassTopbarClass: string;
  glassInputClass: string;
  glassPillClass: string;
}

export function shellTokens(dark: boolean, accent: string = BRAND_ACCENT): ShellTokens {
  const accentSoft = withAlpha(accent, 0.18);
  const accentGlow = withAlpha(accent, 0.45);

  if (dark) {
    return {
      dark,
      text: 'rgba(255,255,255,0.94)',
      subText: 'rgba(255,255,255,0.62)',
      faintText: 'rgba(255,255,255,0.4)',
      icon: 'rgba(255,255,255,0.82)',
      hover: 'rgba(255,255,255,0.1)',
      pressed: 'rgba(255,255,255,0.2)',
      surface: 'rgba(24,24,32,0.62)',
      surfaceMuted: 'rgba(255,255,255,0.07)',
      menu: 'rgba(28,28,36,0.96)',
      border: 'rgba(255,255,255,0.12)',
      borderStrong: 'rgba(255,255,255,0.22)',
      divider: 'rgba(255,255,255,0.1)',
      shadow: '0 24px 60px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      shadowSoft: '0 8px 22px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
      highlight: 'rgba(255,255,255,0.1)',
      accent,
      accentSoft,
      accentGlow,
      accentContrast: '#ffffff',
      glassClass: 'glass-surface',
      glassCardClass: 'glass-card',
      glassTopbarClass: 'glass-topbar',
      glassInputClass: 'glass-input',
      glassPillClass: 'glass-pill',
    };
  }

  return {
    dark,
    text: 'rgba(18,18,22,0.94)',
    subText: 'rgba(18,18,22,0.62)',
    faintText: 'rgba(18,18,22,0.42)',
    icon: 'rgba(18,18,22,0.78)',
    hover: 'rgba(0,0,0,0.07)',
    pressed: 'rgba(0,0,0,0.14)',
    surface: 'rgba(248,248,251,0.68)',
    surfaceMuted: 'rgba(0,0,0,0.05)',
    menu: 'rgba(250,250,253,0.96)',
    border: 'rgba(255,255,255,0.65)',
    borderStrong: 'rgba(255,255,255,0.85)',
    divider: 'rgba(0,0,0,0.08)',
    shadow: '0 24px 60px rgba(0,0,0,0.24), 0 2px 10px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
    shadowSoft: '0 8px 22px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.8)',
    highlight: 'rgba(255,255,255,0.8)',
    accent,
    accentSoft,
    accentGlow,
    accentContrast: '#ffffff',
    glassClass: 'glass-surface-light',
    glassCardClass: 'glass-card-light',
    glassTopbarClass: 'glass-topbar-light',
    glassInputClass: 'glass-input-light',
    glassPillClass: 'glass-pill-light',
  };
}
