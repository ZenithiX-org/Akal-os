'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '@/lib/os-store';
import { useT } from '@/lib/use-i18n';

const ACCENT = '#d70a53';
const ACCENT_SOFT = 'rgba(215, 10, 83, 0.18)';

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
  void darkMode;
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

  const subText = 'rgba(255,255,255,0.5)';

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
    <div className="flex h-full flex-col glass-surface" style={{ color: '#fff', borderRadius: 0 }}>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="glass-sidebar w-52 flex-shrink-0 p-3 overflow-y-auto">
          <h2 className="font-bold text-lg mb-3 text-white">{t.music.title}</h2>
          <div className="text-xs font-semibold mb-2" style={{ color: subText }}>{t.music.library}</div>
          {libraryItems.map((item, i) => {
            const isActive = selectedPlaylist === null && i === 0;
            return (
              <button
                key={item.label}
                onClick={() => setSelectedPlaylist(null)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/10"
                style={{
                  color: isActive ? ACCENT : '#fff',
                  background: isActive ? ACCENT_SOFT : 'transparent',
                  borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            );
          })}
          <div className="text-xs font-semibold mb-2 mt-4" style={{ color: subText }}>{t.music.playlists}</div>
          {playlists.map((pl) => {
            const isActive = selectedPlaylist === pl.id;
            return (
              <button
                key={pl.id}
                onClick={() => setSelectedPlaylist(pl.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors hover:bg-white/10"
                style={{
                  color: isActive ? ACCENT : '#fff',
                  background: isActive ? ACCENT_SOFT : 'transparent',
                  borderLeft: isActive ? `3px solid ${ACCENT}` : '3px solid transparent',
                }}
              >
                <div className="w-6 h-6 rounded flex items-center justify-center text-xs" style={{ background: pl.color + '33' }}>{pl.icon}</div>
                <span className="truncate">{pl.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main content */}
        <div className="glass-surface flex-1 overflow-y-auto" style={{ borderRadius: 0 }}>
          {/* Header */}
          <div className="p-6" style={{ background: `linear-gradient(180deg, ${currentTrack?.color || ACCENT}33, transparent)` }}>
            <div className="flex items-end gap-6 mb-6">
              <div
                className="glass-card w-40 h-40 !rounded-2xl flex items-center justify-center text-7xl flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${currentTrack?.color || ACCENT}, ${currentTrack?.color || ACCENT}88)` }}
              >
                {currentTrack?.cover || '🎵'}
              </div>
              <div className="pb-2">
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: subText }}>{t.music.playlists.replace(/S$/, '')}</div>
                <h1 className="text-4xl font-bold mb-2 text-white">{selectedPlaylist ? playlists.find((p) => p.id === selectedPlaylist)?.name : t.music.songs}</h1>
                <p className="text-sm" style={{ color: subText }}>{tracks.length} {t.music.songs.toLowerCase()} · {Math.floor(tracks.reduce((a, t2) => a + t2.duration, 0) / 60)} min</p>
              </div>
            </div>
          </div>

          {/* Track list */}
          <div className="px-6 pb-4">
            <div className="grid items-center gap-2 px-3 py-2 text-xs font-semibold uppercase border-b" style={{ color: subText, gridTemplateColumns: '40px 1fr 1fr 60px', borderColor: 'rgba(255,255,255,0.08)' }}>
              <span>#</span>
              <span>{t.common.name}</span>
              <span>{t.music.albums}</span>
              <span className="text-right">⏱</span>
            </div>
            {tracks.map((track, i) => {
              const isActive = currentTrack?.id === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => playTrack(track)}
                  className="glass-card grid items-center gap-2 px-3 py-2 !rounded-lg text-left transition-colors hover:!bg-white/10 w-full mt-1"
                  style={{
                    gridTemplateColumns: '40px 1fr 1fr 60px',
                    background: isActive ? ACCENT_SOFT : 'transparent',
                    borderColor: isActive ? ACCENT : 'transparent',
                  }}
                >
                  <span className="text-sm" style={{ color: isActive ? ACCENT : subText }}>
                    {isActive && isPlaying ? '🎵' : i + 1}
                  </span>
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded flex items-center justify-center text-sm flex-shrink-0" style={{ background: track.color + '33' }}>{track.cover}</div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: isActive ? ACCENT : '#fff' }}>{track.title}</div>
                      <div className="text-xs truncate" style={{ color: subText }}>{track.artist}</div>
                    </div>
                  </div>
                  <span className="text-sm truncate" style={{ color: subText }}>{track.album}</span>
                  <span className="text-sm text-right" style={{ color: subText }}>{formatTime(track.duration)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Player bar */}
      {currentTrack && (
        <div className="glass-topbar flex items-center px-4 py-3 flex-shrink-0 gap-4">
          {/* Current track */}
          <div className="flex items-center gap-3 w-56 flex-shrink-0">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{ background: currentTrack.color + '33' }}>{currentTrack.cover}</div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate text-white">{currentTrack.title}</div>
              <div className="text-xs truncate" style={{ color: subText }}>{currentTrack.artist}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="flex items-center gap-4">
              <button onClick={() => setShuffle(!shuffle)} className="text-sm transition-opacity" style={{ color: shuffle ? ACCENT : subText, opacity: shuffle ? 1 : 0.6 }}>🔀</button>
              <button onClick={prevTrack} className="text-lg transition-opacity hover:opacity-100 text-white" style={{ opacity: 0.8 }}>⏮</button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="glass-btn !w-9 !h-9 !p-0 !rounded-full flex items-center justify-center text-base text-white" style={{ background: ACCENT, borderColor: ACCENT }}>
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button onClick={nextTrack} className="text-lg transition-opacity hover:opacity-100 text-white" style={{ opacity: 0.8 }}>⏭</button>
              <button onClick={() => setRepeat(!repeat)} className="text-sm transition-opacity" style={{ color: repeat ? ACCENT : subText, opacity: repeat ? 1 : 0.6 }}>🔁</button>
            </div>
            {/* Progress */}
            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-[10px] w-8 text-right" style={{ color: subText }}>{formatTime(progress)}</span>
              <div className="flex-1 h-1 rounded-full overflow-hidden cursor-pointer" style={{ background: 'rgba(255,255,255,0.18)' }} onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(Math.floor(((e.clientX - rect.left) / rect.width) * currentTrack.duration)); }}>
                <div className="h-full rounded-full" style={{ width: `${(progress / currentTrack.duration) * 100}%`, background: ACCENT }} />
              </div>
              <span className="text-[10px] w-8" style={{ color: subText }}>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2 w-32 flex-shrink-0">
            <span className="text-sm">🔊</span>
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.18)' }}>
              <div className="h-full rounded-full" style={{ width: '75%', background: ACCENT }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicApp;
