'use client';

import React, { useState } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

// Static color/emoji info keyed by album index — the names + counts come from translations.
const albumVisuals = [
  { id: 'a1', color: 'linear-gradient(135deg, #d70a53, #5856D6)' },
  { id: 'a2', color: 'linear-gradient(135deg, #FF2D55, #FF9500)' },
  { id: 'a3', color: 'linear-gradient(135deg, #30D158, #32ADE6)' },
  { id: 'a4', color: 'linear-gradient(135deg, #FF9500, #FFD60A)' },
  { id: 'a5', color: 'linear-gradient(135deg, #BF5AF2, #FF2D55)' },
  { id: 'a6', color: 'linear-gradient(135deg, #FF6B6B, #FF9500)' },
];

// Generate placeholder photos with gradients + emojis
const photoData = [
  { id: 1, emoji: '🏔️', color: 'linear-gradient(135deg, #2C3E50, #4CA1AF)' },
  { id: 2, emoji: '🌅', color: 'linear-gradient(135deg, #FF6B6B, #FFE66D)' },
  { id: 3, emoji: '🌊', color: 'linear-gradient(135deg, #006EFC, #64D2FF)' },
  { id: 4, emoji: '🌲', color: 'linear-gradient(135deg, #0B6E4F, #30D158)' },
  { id: 5, emoji: '🌺', color: 'linear-gradient(135deg, #FF2D55, #BF5AF2)' },
  { id: 6, emoji: '🏖️', color: 'linear-gradient(135deg, #FFE66D, #FF9500)' },
  { id: 7, emoji: '🌃', color: 'linear-gradient(135deg, #1A1A2E, #5856D6)' },
  { id: 8, emoji: '🌸', color: 'linear-gradient(135deg, #FF9F0A, #FF2D55)' },
  { id: 9, emoji: '🍃', color: 'linear-gradient(135deg, #30D158, #30D158)' },
  { id: 10, emoji: '⛄', color: 'linear-gradient(135deg, #64D2FF, #d70a53)' },
  { id: 11, emoji: '🍂', color: 'linear-gradient(135deg, #FF9500, #8B4513)' },
  { id: 12, emoji: '🦋', color: 'linear-gradient(135deg, #5E5CE6, #64D2FF)' },
];

const PhotosApp: React.FC = () => {
  const { darkMode } = useOSStore();
  void darkMode;
  const t = useT();
  const [view, setView] = useState<'library' | 'albums'>('library');
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const subText = 'rgba(255,255,255,0.5)';

  const photos = photoData;
  const albums = t.photos.albumsList.map((a, i) => ({ ...a, id: albumVisuals[i]?.id || `a${i + 1}`, color: albumVisuals[i]?.color || 'linear-gradient(135deg, #d70a53, #5856D6)' }));

  const selectedAlbumName = selectedAlbum ? albums.find((a) => a.id === selectedAlbum)?.name : null;

  const isActiveAlbum = (albumId: string | null) => selectedAlbum === albumId;

  return (
    <div className="flex h-full glass-surface" style={{ color: '#fff', borderRadius: 0 }}>
      {/* Sidebar */}
      <div className="glass-sidebar w-48 flex-shrink-0 p-3 overflow-y-auto">
        <h2 className="font-bold text-lg mb-3 text-white">{t.photos.title}</h2>
        <div className="text-xs font-semibold mb-2" style={{ color: subText }}>{t.photos.library}</div>
        <button
          onClick={() => { setView('library'); setSelectedAlbum(null); }}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors"
          style={{
            background: view === 'library' && !selectedAlbum ? ACCENT_SOFT : 'transparent',
            color: view === 'library' && !selectedAlbum ? ACCENT : '#fff',
            borderLeft: view === 'library' && !selectedAlbum ? `3px solid ${ACCENT}` : '3px solid transparent',
          }}
        >
          <span>🖼️</span> {t.photos.photos}
        </button>
        <button
          onClick={() => { setView('library'); setSelectedAlbum('a2'); }}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5"
          style={{
            background: isActiveAlbum('a2') ? ACCENT_SOFT : 'transparent',
            color: isActiveAlbum('a2') ? ACCENT : '#fff',
            borderLeft: isActiveAlbum('a2') ? `3px solid ${ACCENT}` : '3px solid transparent',
          }}
        >
          <span>❤️</span> {t.photos.favorites}
        </button>
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/5 text-white">
          <span>🕐</span> {t.photos.recents}
        </button>
        <div className="text-xs font-semibold mb-2 mt-4" style={{ color: subText }}>{t.photos.albums}</div>
        {albums.map((album) => {
          const isActive = selectedAlbum === album.id;
          return (
            <button
              key={album.id}
              onClick={() => { setView('albums'); setSelectedAlbum(album.id); }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors"
              style={{
                background: isActive ? ACCENT_SOFT : 'transparent',
                color: isActive ? ACCENT : '#fff',
                borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
              }}
            >
              <div className="w-5 h-5 rounded flex items-center justify-center text-xs" style={{ background: album.color }}>{album.emoji}</div>
              <span className="truncate">{album.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <div className="glass-surface flex-1 flex flex-col overflow-hidden" style={{ borderRadius: 0 }}>
        {/* Header */}
        <div className="glass-topbar flex items-center justify-between px-4 py-3 flex-shrink-0">
          <h1 className="text-lg font-bold text-white">
            {selectedAlbumName || t.photos.library}
          </h1>
          <span className="text-sm" style={{ color: subText }}>{photos.length} {t.photos.photoCount}</span>
        </div>

        {/* Photo grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedPhoto !== null ? (
            /* Photo viewer */
            <div className="flex flex-col h-full">
              <button onClick={() => setSelectedPhoto(null)} className="glass-btn self-start mb-3 !text-sm">{t.photos.back}</button>
              <div className="glass-surface flex-1 flex items-center justify-center !rounded-2xl overflow-hidden" style={{ background: photos[selectedPhoto - 1].color }}>
                <span className="text-9xl">{photos[selectedPhoto - 1].emoji}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <button onClick={() => setSelectedPhoto(Math.max(1, selectedPhoto - 1))} className="glass-btn !text-sm">{t.photos.previous}</button>
                <button className="glass-btn !text-sm">❤️ {t.photos.favorites}</button>
                <button className="glass-btn !text-sm">{t.photos.share}</button>
                <button onClick={() => setSelectedPhoto(Math.min(photos.length, selectedPhoto + 1))} className="glass-btn !text-sm">{t.photos.next}</button>
              </div>
            </div>
          ) : (
            <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo.id)}
                  className="glass-card aspect-square flex items-center justify-center text-4xl transition-transform hover:scale-105 hover:z-10 relative overflow-hidden !rounded-lg"
                  style={{ background: photo.color }}
                >
                  {photo.emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotosApp;
