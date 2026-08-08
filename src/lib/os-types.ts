export interface AppWindow {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  zIndex: number;
  prevSize?: { x: number; y: number; width: number; height: number };
}

export interface AppDefinition {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: string;
}

export interface OSNotification {
  id: string;
  title: string;
  message: string;
  app: string;
  icon: string;
  time: Date;
  read: boolean;
}

export interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
}

export interface MenuItem {
  label: string;
  shortcut?: string;
  action?: () => void;
  separator?: boolean;
  submenu?: MenuItem[];
  disabled?: boolean;
}

export interface ContextMenuState {
  x: number;
  y: number;
  items: MenuItem[];
}
