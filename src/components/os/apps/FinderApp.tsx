'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

type SidebarSectionKey = 'favorites' | 'icloud' | 'locations' | 'tags';

const sidebarItems: { section: SidebarSectionKey; items: { name: string; icon: string }[] }[] = [
  { section: 'favorites', items: [
    { name: 'AirDrop', icon: '📡' },
    { name: 'Recents', icon: '🕐' },
    { name: 'Applications', icon: '📱' },
    { name: 'Desktop', icon: '🖥️' },
    { name: 'Documents', icon: '📄' },
    { name: 'Downloads', icon: '⬇️' },
  ]},
  { section: 'icloud', items: [
    { name: 'iCloud Drive', icon: '☁️' },
    { name: 'Desktop', icon: '🖥️' },
    { name: 'Documents', icon: '📄' },
  ]},
  { section: 'locations', items: [
    { name: '__MACINTOSH_HD__', icon: '💾' },
    { name: 'Network', icon: '🌐' },
  ]},
  { section: 'tags', items: [
    { name: 'Red', icon: '🔴' },
    { name: 'Orange', icon: '🟠' },
    { name: 'Yellow', icon: '🟡' },
    { name: 'Green', icon: '🟢' },
    { name: 'Blue', icon: '🔵' },
    { name: 'Purple', icon: '🟣' },
  ]},
];

const fileTree: Record<string, { name: string; icon: string; type: 'folder' | 'file'; size?: string; modified?: string }[]> = {
  root: [
    { name: 'Applications', icon: '📱', type: 'folder', modified: 'Today' },
    { name: 'Desktop', icon: '🖥️', type: 'folder', modified: 'Today' },
    { name: 'Documents', icon: '📄', type: 'folder', modified: 'Yesterday' },
    { name: 'Downloads', icon: '⬇️', type: 'folder', modified: 'Today' },
    { name: 'Library', icon: '📚', type: 'folder', modified: 'Last week' },
    { name: 'Movies', icon: '🎬', type: 'folder', modified: 'Last month' },
    { name: 'Music', icon: '🎵', type: 'folder', modified: 'Last week' },
    { name: 'Pictures', icon: '🖼️', type: 'folder', modified: 'Yesterday' },
    { name: 'Public', icon: '📁', type: 'folder', modified: 'Last month' },
  ],
  Documents: [
    { name: 'Report 2024.pdf', icon: '📄', type: 'file', size: '2.4 MB', modified: 'Today' },
    { name: 'Budget.xlsx', icon: '📊', type: 'file', size: '1.2 MB', modified: 'Yesterday' },
    { name: 'Presentation.pptx', icon: '📑', type: 'file', size: '8.5 MB', modified: 'Last week' },
    { name: 'Notes.txt', icon: '📝', type: 'file', size: '12 KB', modified: 'Today' },
    { name: 'Project Files', icon: '📁', type: 'folder', modified: 'Yesterday' },
    { name: 'Archive', icon: '📦', type: 'folder', modified: 'Last month' },
  ],
  Downloads: [
    { name: 'Akal_OS_1.0.dmg', icon: '💿', type: 'file', size: '4.2 GB', modified: 'Today' },
    { name: 'wallpaper_pack.zip', icon: '🗜️', type: 'file', size: '256 MB', modified: 'Yesterday' },
    { name: 'setup.exe', icon: '⚙️', type: 'file', size: '89 MB', modified: 'Last week' },
  ],
  Applications: [
    { name: 'Safari', icon: '🧭', type: 'file', size: '45 MB', modified: 'Last week' },
    { name: 'Mail', icon: '✉️', type: 'file', size: '32 MB', modified: 'Last week' },
    { name: 'Messages', icon: '💬', type: 'file', size: '28 MB', modified: 'Last week' },
    { name: 'Photos', icon: '🖼️', type: 'file', size: '120 MB', modified: 'Last week' },
    { name: 'Music', icon: '🎵', type: 'file', size: '78 MB', modified: 'Last week' },
    { name: 'Calendar', icon: '📅', type: 'file', size: '18 MB', modified: 'Last week' },
    { name: 'Notes', icon: '📝', type: 'file', size: '15 MB', modified: 'Last week' },
    { name: 'Terminal', icon: '⌨️', type: 'file', size: '8 MB', modified: 'Last week' },
  ],
};

const sectionLabel = (key: SidebarSectionKey, t: ReturnType<typeof useT>): string => {
  switch (key) {
    case 'favorites': return t.finder.favorites;
    case 'icloud': return t.finder.icloud;
    case 'locations': return t.finder.locations;
    case 'tags': return t.finder.tags;
  }
};

const FinderApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [currentPath, setCurrentPath] = useState('root');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'icons' | 'list'>('icons');
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState<string[]>(['root']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const files = fileTree[currentPath] || fileTree['root'];
  const filteredFiles = searchQuery ? files.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase())) : files;

  const navigateTo = (path: string) => {
    if (fileTree[path] || path === 'root') {
      const newHistory = [...history.slice(0, historyIndex + 1), path];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentPath(path);
      setSelectedItem(null);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const pathParts = currentPath === 'root' ? [t.finder.macintoshHD] : [t.finder.macintoshHD, currentPath];
  const subTextColor = 'rgba(255,255,255,0.55)';

  return (
    <div className="glass-surface flex h-full" style={{ color: '#fff', borderRadius: 0 }}>
      <div className="glass-sidebar w-48 flex-shrink-0 overflow-y-auto py-2">
        {sidebarItems.map((section) => (
          <div key={section.section} className="mb-2">
            <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wide" style={{ color: subTextColor }}>
              {sectionLabel(section.section, t).toUpperCase()}
            </div>
            {section.items.map((item) => {
              const isMacHD = item.name === '__MACINTOSH_HD__';
              const displayName = isMacHD ? t.finder.macintoshHD : item.name;
              const targetPath = section.section === 'locations' && isMacHD ? 'root' : item.name;
              const isActive = currentPath === targetPath;
              return (
                <button
                  key={item.name}
                  onClick={() => navigateTo(targetPath)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg mx-1 transition-colors relative"
                  style={{
                    background: isActive ? ACCENT_SOFT : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.85)',
                    borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
                    width: 'calc(100% - 8px)',
                  }}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="truncate">{displayName}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="glass-topbar flex items-center gap-2 px-3 py-2">
          <button onClick={goBack} disabled={historyIndex === 0} className="glass-btn !p-1.5 disabled:opacity-30" aria-label="Back">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={goForward} disabled={historyIndex >= history.length - 1} className="glass-btn !p-1.5 disabled:opacity-30" aria-label="Forward">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="flex items-center gap-1 flex-1 text-sm">
            {pathParts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="opacity-40">›</span>}
                <button
                  className="transition-colors"
                  style={{ color: i === pathParts.length - 1 ? '#fff' : subTextColor }}
                  onClick={() => i === 0 && navigateTo('root')}
                >
                  {part}
                </button>
              </React.Fragment>
            ))}
          </div>

          <div className="flex gap-1">
            {(['icons', 'list'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="glass-btn !p-1.5 !text-xs"
                style={viewMode === mode ? { background: ACCENT, borderColor: ACCENT } : undefined}
                aria-label={`${mode} view`}
              >
                {mode === 'icons' ? '⊞' : '☰'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 px-2 py-1">
            <svg className="w-3.5 h-3.5 opacity-50" fill="currentColor" viewBox="0 0 20 20" style={{ color: '#fff' }}>
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input
              type="text"
              placeholder={t.common.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input !bg-transparent !border-0 !py-0.5 !px-1 w-28 text-sm"
              style={{ color: '#fff' }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {viewMode === 'icons' ? (
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}>
              {filteredFiles.map((file) => {
                const isSelected = selectedItem === file.name;
                return (
                  <button
                    key={file.name}
                    className="glass-card flex flex-col items-center gap-1 p-2 text-center"
                    style={{
                      borderColor: isSelected ? ACCENT : undefined,
                      background: isSelected ? ACCENT_SOFT : undefined,
                    }}
                    onClick={() => setSelectedItem(file.name)}
                    onDoubleClick={() => file.type === 'folder' && navigateTo(file.name)}
                  >
                    <span className="text-4xl">{file.icon}</span>
                    <span className="text-xs leading-tight break-words w-full text-white">{file.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                  <th className="text-left py-2 px-2 font-medium opacity-60 text-white">{t.finder.name}</th>
                  <th className="text-left py-2 px-2 font-medium opacity-60 text-white">{t.finder.modified}</th>
                  <th className="text-left py-2 px-2 font-medium opacity-60 text-white">{t.finder.size}</th>
                  <th className="text-left py-2 px-2 font-medium opacity-60 text-white">{t.finder.kind}</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => {
                  const isSelected = selectedItem === file.name;
                  return (
                    <tr
                      key={file.name}
                      className="cursor-pointer transition-colors"
                      style={{
                        background: isSelected ? ACCENT_SOFT : 'transparent',
                        color: '#fff',
                        boxShadow: isSelected ? `inset 3px 0 0 ${ACCENT}` : 'none',
                      }}
                      onClick={() => setSelectedItem(file.name)}
                      onDoubleClick={() => file.type === 'folder' && navigateTo(file.name)}
                    >
                      <td className="py-1.5 px-2"><span className="inline-flex items-center gap-2"><span>{file.icon}</span><span>{file.name}</span></span></td>
                      <td className="py-1.5 px-2 opacity-70">{file.modified || '-'}</td>
                      <td className="py-1.5 px-2 opacity-70">{file.size || '-'}</td>
                      <td className="py-1.5 px-2 opacity-70">{file.type === 'folder' ? t.finder.folder : t.finder.document}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="glass-topbar flex items-center justify-between px-4 py-1 text-xs" style={{ color: subTextColor, borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: 'none' }}>
          <span>{filteredFiles.length} {t.finder.items}</span>
          {selectedItem && <span>{selectedItem}</span>}
          <span>{t.finder.available}</span>
        </div>
      </div>
    </div>
  );
};

export default FinderApp;
