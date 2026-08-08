'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  color: string;
}

// Visual metadata kept static; names + songs come from translations (matched by index).
const playlistVisuals = [
  { id: '1', icon: '🎵', color: '#FC3C44' },
  { id: '2', icon: '🌊', color: '#32ADE6' },
  { id: '3', icon: '💪', color: '#FF9500' },
  { id: '4', icon: '🎯', color: '#5E5CE6' },
  { id: '5', icon: '📻', color: '#FF2D55' },
  { id: '6', icon: '🎸', color: '#FFD60A' },
];

const trackVisuals = [
  { id: 't1', duration: 214, cover: '🌃', color: '#5856D6' },
  { id: 't2', duration: 198, cover: '🌊', color: '#32ADE6' },
  { id: 't3', duration: 245, cover: '⛰️', color: '#30D158' },
  { id: 't4', duration: 187, cover: '🏜️', color: '#FF9500' },
  { id: 't5', duration: 223, cover: '🌲', color: '#34C759' },
  { id: 't6', duration: 201, cover: '🏙️', color: '#FF2D55' },
  { id: 't7', duration: 312, cover: '✨', color: '#BF5AF2' },
  { id: 't8', duration: 256, cover: '☕', color: '#964B00' },
];

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const MusicApp: React.FC = () => {
  const { darkMode } = useOSStore();
  const t = useT();

  const playlists = t.music.playlistNames.map((name, i) => ({
    id: playlistVisuals[i]?.id || String(i + 1),
    name,
    icon: playlistVisuals[i]?.icon || '🎵',
    color: playlistVisuals[i]?.color || '#FC3C44',
  }));

  const tracks: Track[] = t.music.songs_list.map((song, i) => ({
    id: trackVisuals[i]?.id || `t${i + 1}`,
    title: song.title,
    artist: song.artist,
    album: song.album,
    duration: trackVisuals[i]?.duration || 200,
    cover: trackVisuals[i]?.cover || '🎵',
    color: trackVisuals[i]?.color || '#FC3C44',
  }));

  const libraryItems = [
    { label: t.music.recentlyAdded, icon: '🕐' },
    { label: t.music.artists, icon: '🎤' },
    { label: t.music.albums, icon: '💿' },
    { label: t.music.songs, icon: '🎵' },
  ];

  const [currentTrack, setCurrentTrack] = useState<Track | null>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= currentTrack.duration) {
          // Next track
          const idx = tracks.findIndex((t2) => t2.id === currentTrack.id);
          const next = shuffle ? tracks[Math.floor(Math.random() * tracks.length)] : tracks[(idx + 1) % tracks.length];
          setCurrentTrack(next);
          return 0;
        }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, shuffle, tracks]);

  const bg = darkMode ? 'rgba(28,28,32,0.55)' : 'rgba(245,245,247,0.6)';
  const textColor = darkMode ? '#ffffff' : '#1d1d1f';
  const subText = darkMode ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)';
  const sidebarBg = darkMode ? 'rgba(44,44,46,0.5)' : 'rgba(232,232,237,0.55)';
  const playerBg = darkMode ? 'rgba(44,44,46,0.5)' : 'rgba(232,232,237,0.55)';
  const backdrop = 'blur(30px) saturate(200%)';
  const glassBorder = darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(255,255,255,0.6)';
  const glassShadow = 'inset 0 1px 1px rgba(255,255,255,0.1)';

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (!currentTrack) return;
    const idx = tracks.findIndex((t2) => t2.id === currentTrack.id);
    setCurrentTrack(shuffle ? tracks[Math.floor(Math.random() * tracks.length)] : tracks[(idx + 1) % tracks.length]);
    setProgress(0);
  };

  const prevTrack = () => {
    if (!currentTrack) return;
    if (progress > 3) { setProgress(0); return; }
    const idx = tracks.findIndex((t2) => t2.id === currentTrack.id);
    setCurrentTrack(tracks[(idx - 1 + tracks.length) % tracks.length]);
    setProgress(0);
  };

  return (
    <div className="flex h-full flex-col" style={{ background: bg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, color: textColor, border: glassBorder, boxShadow: glassShadow }}>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-52 flex-shrink-0 p-3 overflow-y-auto"
          style={{ background: sidebarBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, borderRight: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)' }}
        >
          <h2 className="font-bold text-lg mb-3" style={{ color: textColor }}>{t.music.title}</h2>
          <div className="text-xs font-semibold mb-2 opacity-50" style={{ color: textColor }}>{t.music.library}</div>
          {libraryItems.map((item, i) => (
            <button key={item.label} onClick={() => setSelectedPlaylist(null)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/10" style={{ color: selectedPlaylist === null && i === 0 ? '#FC3C44' : textColor, background: selectedPlaylist === null && i === 0 ? (darkMode ? 'rgba(252,60,68,0.18)' : 'rgba(252,60,68,0.1)') : 'transparent' }}>
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="text-xs font-semibold mb-2 mt-4 opacity-50" style={{ color: textColor }}>{t.music.playlists}</div>
          {playlists.map((pl) => (
            <button key={pl.id} onClick={() => setSelectedPlaylist(pl.id)} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/10" style={{ color: selectedPlaylist === pl.id ? '#FC3C44' : textColor }}>
              <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ background: pl.color + '33' }}>{pl.icon}</div>
              <span className="truncate">{pl.name}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="p-6" style={{ background: `linear-gradient(180deg, ${currentTrack?.color || '#FC3C44'}33, transparent)` }}>
            <div className="flex items-end gap-6 mb-6">
              <div
                className="w-40 h-40 rounded-2xl flex items-center justify-center text-7xl shadow-2xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${currentTrack?.color || '#FC3C44'}, ${currentTrack?.color || '#FC3C44'}88)`, border: glassBorder, boxShadow: glassShadow }}
              >
                {currentTrack?.cover || '🎵'}
              </div>
              <div className="pb-2">
                <div className="text-xs uppercase tracking-wider opacity-60 mb-1" style={{ color: textColor }}>{t.music.playlists.replace(/S$/, '')}</div>
                <h1 className="text-4xl font-bold mb-2" style={{ color: textColor }}>{selectedPlaylist ? playlists.find((p) => p.id === selectedPlaylist)?.name : t.music.songs}</h1>
                <p className="text-sm" style={{ color: subText }}>{tracks.length} {t.music.songs.toLowerCase()} · {Math.floor(tracks.reduce((a, t2) => a + t2.duration, 0) / 60)} min</p>
              </div>
            </div>
          </div>

          {/* Track list */}
          <div className="px-6 pb-4">
            <div className="grid items-center gap-2 px-3 py-2 text-xs font-semibold uppercase opacity-50 border-b" style={{ color: textColor, gridTemplateColumns: '40px 1fr 1fr 60px', borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)' }}>
              <span>#</span>
              <span>{t.common.name}</span>
              <span>{t.music.albums}</span>
              <span className="text-right">⏱</span>
            </div>
            {tracks.map((track, i) => (
              <button
                key={track.id}
                onClick={() => playTrack(track)}
                className="grid items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors hover:bg-white/5 w-full"
                style={{ gridTemplateColumns: '40px 1fr 1fr 60px', background: currentTrack?.id === track.id ? (darkMode ? 'rgba(252,60,68,0.12)' : 'rgba(252,60,68,0.06)') : 'transparent' }}
              >
                <span className="text-sm opacity-60" style={{ color: currentTrack?.id === track.id ? '#FC3C44' : subText }}>
                  {currentTrack?.id === track.id && isPlaying ? '🎵' : i + 1}
                </span>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded flex items-center justify-center text-sm flex-shrink-0" style={{ background: track.color + '33' }}>{track.cover}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate" style={{ color: currentTrack?.id === track.id ? '#FC3C44' : textColor }}>{track.title}</div>
                    <div className="text-xs truncate" style={{ color: subText }}>{track.artist}</div>
                  </div>
                </div>
                <span className="text-sm truncate" style={{ color: subText }}>{track.album}</span>
                <span className="text-sm text-right opacity-60" style={{ color: subText }}>{formatTime(track.duration)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player bar */}
      {currentTrack && (
        <div
          className="flex items-center px-4 py-3 flex-shrink-0 gap-4"
          style={{ background: playerBg, backdropFilter: backdrop, WebkitBackdropFilter: backdrop, borderTop: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.06)', boxShadow: glassShadow }}
        >
          {/* Current track */}
          <div className="flex items-center gap-3 w-56 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: currentTrack.color + '33' }}>{currentTrack.cover}</div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate" style={{ color: textColor }}>{currentTrack.title}</div>
              <div className="text-xs truncate" style={{ color: subText }}>{currentTrack.artist}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-4">
              <button onClick={() => setShuffle(!shuffle)} className="text-sm transition-opacity" style={{ color: shuffle ? '#FC3C44' : subText, opacity: shuffle ? 1 : 0.6 }}>🔀</button>
              <button onClick={prevTrack} className="text-lg transition-opacity hover:opacity-100" style={{ color: textColor, opacity: 0.8 }}>⏮</button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-9 h-9 rounded-full flex items-center justify-center text-base" style={{ background: textColor, color: bg }}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button onClick={nextTrack} className="text-lg transition-opacity hover:opacity-100" style={{ color: textColor, opacity: 0.8 }}>⏭</button>
              <button onClick={() => setRepeat(!repeat)} className="text-sm transition-opacity" style={{ color: repeat ? '#FC3C44' : subText, opacity: repeat ? 1 : 0.6 }}>🔁</button>
            </div>
            {/* Progress */}
            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-[10px] w-8 text-right" style={{ color: subText }}>{formatTime(progress)}</span>
              <div className="flex-1 h-1 rounded-full overflow-hidden cursor-pointer" style={{ background: darkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' }} onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(Math.floor(((e.clientX - rect.left) / rect.width) * currentTrack.duration)); }}>
                <div className="h-full rounded-full" style={{ width: `${(progress / currentTrack.duration) * 100}%`, background: '#FC3C44' }} />
              </div>
              <span className="text-[10px] w-8" style={{ color: subText }}>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 w-32 flex-shrink-0">
            <span className="text-sm">🔊</span>
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: darkMode ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.12)' }}>
              <div className="h-full rounded-full" style={{ width: '75%', background: textColor }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicApp;
