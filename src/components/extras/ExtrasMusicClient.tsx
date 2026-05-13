'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HierarchyNav from '@/components/nav/HierarchyNav';
import HierarchyChipRow from '@/components/nav/HierarchyChipRow';
import type { MusicPlaylist, MusicRootCategory } from '@/types/extras-music';

/**
 * Music room UI: `HierarchyNav` picks root → playlists; chips pick track; Howler powers local `src`, otherwise `embedHtml`.
 */

type Selection = { playlistIndex: number; trackIndex: number };

/** First track that actually has audio or embed so the UI doesn't land on an empty row. */
function pickInitialTrackIndex(playlist: MusicPlaylist): number {
  const tracks = playlist.tracks;
  for (let ti = 0; ti < tracks.length; ti++) {
    const t = tracks[ti];
    if (t?.src?.trim() || t?.embedHtml) return ti;
  }
  return 0;
}

function pickInitialSelection(playlists: MusicPlaylist[]): Selection {
  for (let pi = 0; pi < playlists.length; pi++) {
    const pl = playlists[pi];
    if (!pl) continue;
    const ti = pickInitialTrackIndex(pl);
    const t = pl.tracks[ti];
    if (t?.src?.trim() || t?.embedHtml) return { playlistIndex: pi, trackIndex: ti };
  }
  return { playlistIndex: 0, trackIndex: 0 };
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function ExtrasMusicClient({ roots }: { roots: MusicRootCategory[] }) {
  const [howlerMod, setHowlerMod] = useState<typeof import('howler') | null>(null);
  useEffect(() => {
    void import('howler').then(setHowlerMod);
  }, []);

  const [rootId, setRootId] = useState(() => roots[0]?.id ?? 'vgm');

  const playlists = useMemo(
    () => roots.find((r) => r.id === rootId)?.playlists ?? [],
    [roots, rootId],
  );

  const [sel, setSel] = useState<Selection>(() => pickInitialSelection(roots[0]?.playlists ?? []));
  const [playing, setPlaying] = useState(false);
  const [loopOn, setLoopOn] = useState(false);
  const [volume, setVolumeState] = useState(0.85);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  const howlRef = useRef<InstanceType<(typeof import('howler'))['Howl']> | null>(null);

  useEffect(() => {
    setSel(pickInitialSelection(playlists));
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setScrubbing(false);
  }, [rootId, playlists]);

  const playlist = playlists[sel.playlistIndex];
  const track = playlist?.tracks[sel.trackIndex];
  const useLocal = !!(track?.src && track.src.trim());
  const hasEmbedOnly = !!(track?.embedHtml && !useLocal);

  const selectTrack = useCallback((playlistIndex: number, trackIndex: number) => {
    setSel({ playlistIndex, trackIndex });
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setScrubbing(false);
  }, []);

  useEffect(() => {
    const howlCurrent = howlRef.current;
    howlCurrent?.unload();
    howlRef.current = null;

    if (!howlerMod || !useLocal || !track?.src) {
      setDuration(0);
      setProgress(0);
      return;
    }

    const h = new howlerMod.Howl({
      src: [track.src],
      html5: true,
      volume,
    });

    howlRef.current = h;

    h.loop(loopOn);
    const onLoad = () => setDuration(h.duration() || 0);
    h.once('load', onLoad);

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onStop = () => {
      setPlaying(false);
      setProgress(0);
    };
    const onEnd = () => {
      setPlaying(false);
      if (!loopOn) setProgress(0);
    };

    h.on('play', onPlay);
    h.on('pause', onPause);
    h.on('stop', onStop);
    h.on('end', onEnd);

    return () => {
      h.off('load', onLoad);
      h.off('play', onPlay);
      h.off('pause', onPause);
      h.off('stop', onStop);
      h.off('end', onEnd);
      h.unload();
      if (howlRef.current === h) howlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- omit loopOn/volume; synced below
  }, [howlerMod, useLocal, track?.src, playlist?.id, sel.playlistIndex, sel.trackIndex]);

  useEffect(() => {
    const h = howlRef.current;
    if (h && useLocal) h.loop(loopOn);
  }, [loopOn, useLocal]);

  useEffect(() => {
    howlRef.current?.volume(volume);
  }, [volume]);

  useEffect(() => {
    if (!playing || scrubbing || !useLocal || !howlRef.current) return;
    const id = window.setInterval(() => {
      const h = howlRef.current;
      if (!h?.playing()) return;
      const d = h.duration() || duration;
      if (d <= 0) return;
      setProgress(Math.min(1, h.seek() / d));
    }, 240);
    return () => window.clearInterval(id);
  }, [playing, scrubbing, useLocal, duration]);

  const togglePlay = () => {
    const h = howlRef.current;
    if (!h) return;
    if (h.playing()) {
      h.pause();
    } else {
      void h.play();
    }
  };

  const seekFromInput = (ratio: number) => {
    const h = howlRef.current;
    if (!h || !duration) return;
    const clamped = Math.min(1, Math.max(0, ratio));
    h.seek(clamped * duration);
    setProgress(clamped);
  };

  const clampVolume = useCallback((v: number) => {
    const n = Math.min(1, Math.max(0, v));
    setVolumeState(n);
  }, []);

  if (roots.length === 0) {
    return <p className='extras-panel__p'>No music categories configured yet.</p>;
  }

  const parentNav = roots.map((r) => ({
    id: r.id,
    label: r.title,
    selected: r.id === rootId,
    onSelect: () => setRootId(r.id),
  }));

  const playlistChips = playlists.map((pl, i) => ({
    id: pl.id,
    label: pl.title,
    selected: sel.playlistIndex === i,
    onSelect: () => selectTrack(i, pickInitialTrackIndex(pl)),
  }));

  const trackChips =
    playlist?.tracks.map((tr, trackIndex) => ({
      id: `${playlist.id}-tr-${trackIndex}`,
      label: tr.name,
      selected: sel.trackIndex === trackIndex,
      onSelect: () => selectTrack(sel.playlistIndex, trackIndex),
    })) ?? [];

  return (
    <>
      <HierarchyNav
        ariaLabel='Music library'
        parents={parentNav}
        subitems={playlistChips}
        parentVariant='underline'
      />

      <div className='extras-music-layout'>
        <section className='extras-music-layout__player' aria-labelledby='extras-music-playback'>
          <h3 id='extras-music-playback' className='extras-music-layout__h'>
            <span className='extras-panel-badge'>Listen</span>
            <span>Playback</span>
          </h3>
          <div className='extras-music-player extras-music-player--panel'>
            <div className='extras-music-player__label'>
              Now playing
              {playlist && track && (
                <>
                  {' '}
                  · {playlist.title} — {track.name}
                </>
              )}
            </div>

            {!useLocal && track?.embedHtml && (
              <div className='extras-music-player__embed'>
                <div dangerouslySetInnerHTML={{ __html: track.embedHtml }} />
              </div>
            )}

            {useLocal && (
              <>
                {!howlerMod ? (
                  <p className='extras-music-player__hint'>Loading audio engine…</p>
                ) : (
                  <>
                    <div className='extras-music-player__transport' role='group' aria-label='Playback controls'>
                      <button type='button' className='extras-music-player__play' aria-pressed={playing} onClick={togglePlay}>
                        {playing ? 'Pause' : 'Play'}
                      </button>
                      <div className='extras-music-player__progress'>
                        <label className='sr-only' htmlFor='extras-audio-progress'>
                          Seek audio
                        </label>
                        <input
                          id='extras-audio-progress'
                          type='range'
                          className='extras-music-player__range'
                          min={0}
                          max={1}
                          step={0.001}
                          value={progress}
                          onChange={(e) => {
                            seekFromInput(Number(e.target.value));
                          }}
                          onMouseDown={() => setScrubbing(true)}
                          onMouseUp={() => setScrubbing(false)}
                          onTouchStart={() => setScrubbing(true)}
                          onTouchEnd={() => setScrubbing(false)}
                          disabled={duration <= 0}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(progress * 100)}
                        />
                        <div className='extras-music-player__times'>
                          <span>{formatTime(progress * duration)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                      <div className='extras-music-player__side-controls'>
                        <button
                          type='button'
                          className='extras-music-player__loop-toggle'
                          data-on={loopOn}
                          aria-pressed={loopOn}
                          onClick={() => setLoopOn((x) => !x)}
                        >
                          Loop {loopOn ? 'on' : 'off'}
                        </button>
                        <label className='sr-only' htmlFor='extras-audio-volume'>
                          Volume
                        </label>
                        <input
                          id='extras-audio-volume'
                          type='range'
                          className='extras-music-player__volume'
                          min={0}
                          max={1}
                          step={0.03}
                          value={volume}
                          onChange={(e) => clampVolume(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {!useLocal && !hasEmbedOnly && (
              <div className='extras-music-player__empty'>
                Add src in extras-music (paths like /audio/track.mp3) under public/audio, or set embedHtml for a streaming embed.
              </div>
            )}
          </div>
        </section>

        <div className='extras-music-layout__split'>
          <section className='extras-music-layout__tracks' aria-labelledby='extras-music-tracks'>
            <h3 id='extras-music-tracks' className='extras-music-layout__h'>
              <span className='extras-panel-badge'>Pick</span>
              <span>Tracks</span>
            </h3>
            {trackChips.length > 0 ? (
              <HierarchyChipRow
                className='extras-music-layout__track-chips'
                items={trackChips}
                ariaLabel='Tracks in playlist'
              />
            ) : (
              <p className='extras-music-stack__empty'>Pick a category with playlists to load tracks.</p>
            )}
          </section>

          <aside className='extras-music-layout__about-panel' aria-labelledby='extras-music-about-track'>
            <h3 id='extras-music-about-track' className='extras-music-layout__h'>
              <span className='extras-panel-badge'>Notes</span>
              <span>About this track</span>
            </h3>
            <div className='extras-music-about'>
              <p className='extras-music-about__track'>{track?.name ?? '—'}</p>
              <p className='extras-music-about__body'>
                {track?.description?.trim() ||
                  'Optional: set `description` on each track in extras-music.ts — it appears here when you select that track.'}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
