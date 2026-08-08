# Akal OS 1.0

A premium macOS-style desktop environment that runs entirely in your browser. Built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, and Zustand.

![Akal OS](https://img.shields.io/badge/Akal%20OS-1.0-0071E3) ![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8)

## ✨ Features

- **macOS-style desktop** — menu bar, dock with magnification, draggable/resizable windows, Launchpad, Mission Control, Spotlight, Control Center, Notification Center, Lock Screen, and a boot animation
- **Glassmorphism design** — frosted-glass surfaces with blur, saturation, and inset highlights throughout
- **Bilingual** — full English + Punjabi (ਪੰਜਾਬੀ / Gurmukhi) support with instant language switching
- **Punjab references** — Weather shows Amritsar/Ludhiana/Chandigarh; Maps points to Sri Harmandir Sahib (Golden Temple); Punjab-themed wallpapers
- **Custom logo** — an abstract rising-sun emblem symbolizing "Akal" (timeless/eternal)
- **17 working apps** — Finder, Safari, Notes, Calculator, Terminal, Settings, Calendar, Music, Messages, Photos, App Store, Mail, Reminders, Maps, FaceTime, Trash, Weather

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout (Inter font)
│   ├── page.tsx              # Entry point — loads Desktop
│   └── globals.css           # Tailwind + OS styles
├── components/
│   ├── os/                   # Akal OS shell + apps
│   │   ├── Desktop.tsx       # Main desktop assembler
│   │   ├── Window.tsx        # Draggable/resizable window
│   │   ├── MenuBar.tsx       # Top menu bar
│   │   ├── Dock.tsx          # Bottom dock
│   │   ├── ControlCenter.tsx # Quick settings panel
│   │   ├── NotificationCenter.tsx
│   │   ├── Spotlight.tsx     # Search + calculator
│   │   ├── Launchpad.tsx     # App grid
│   │   ├── LockScreen.tsx
│   │   ├── MissionControl.tsx
│   │   ├── BootScreen.tsx
│   │   ├── Logo.tsx          # Custom Akal OS logo
│   │   └── apps/             # 17 applications
│   │       ├── FinderApp.tsx
│   │       ├── SafariApp.tsx
│   │       ├── CalculatorApp.tsx
│   │       ├── TerminalApp.tsx
│   │       ├── SettingsApp.tsx
│   │       ├── CalendarApp.tsx
│   │       ├── MusicApp.tsx
│   │       ├── MessagesApp.tsx
│   │       ├── PhotosApp.tsx
│   │       ├── NotesApp.tsx
│   │       ├── MailApp.tsx
│   │       ├── RemindersApp.tsx
│   │       ├── MapsApp.tsx
│   │       ├── FaceTimeApp.tsx
│   │       ├── WeatherApp.tsx
│   │       ├── AppStoreApp.tsx
│   │       └── TrashApp.tsx
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── os-store.ts           # Zustand store (windows, theme, language)
│   ├── os-types.ts           # TypeScript interfaces
│   ├── i18n.ts               # English + Punjabi translations
│   ├── use-i18n.ts           # useT() / useLanguage() hooks
│   └── db.ts                 # Prisma client
└── hooks/                    # React hooks
```

## 🌐 Internationalization

The OS supports English and Punjabi (Gurmukhi). Translations live in `src/lib/i18n.ts`. To switch language at runtime:

- **Control Center** → click the grid icon (top-right) → 🌐 Language → choose English or ਪੰਜਾਬੀ
- **System Settings** → Language section

The `useT()` hook returns the current translation object. Example:

```tsx
import { useT } from '@/lib/use-i18n';

function MyComponent() {
  const t = useT();
  return <h1>{t.common.welcome}</h1>; // "Welcome to Akal OS" / "ਅਕਾਲ OS ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ"
}
```

## 🎨 Customization

### Wallpapers
Edit the `WALLPAPERS` array in `src/lib/os-store.ts` to add your own gradient wallpapers.

### Accent Colors
Change the accent color in Settings → Appearance.

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [date-fns](https://date-fns.org/) | Date formatting |
| [Prisma](https://www.prisma.io/) | ORM (SQLite) |
| [shadcn/ui](https://ui.shadcn.com/) | UI components |
---

**Akal OS** — *ਅਕਾਲ OS* — Made with ❤️ in Punjab.
