import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SONGS_CATALOG, SongIntro } from '../data/songs';
import { CompactDisc3D } from './CompactDisc3D';
import { soundEngine } from '../utils/audio';
import { Play, Pause, ExternalLink, ChevronLeft, ChevronRight, Disc3, Volume2, ArrowDown, Eye } from 'lucide-react';

interface SongsIntroSectionProps {
  onScrollToShop: () => void;
}

export const SongsIntroSection: React.FC<SongsIntroSectionProps> = ({ onScrollToShop }) => {
  const [activeSongIndex, setActiveSongIndex] = useState(0);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [isSiteAudioMuted, setIsSiteAudioMuted] = useState(soundEngine.isSoundMuted());

  // Smooth dragging state for the gliding track
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const activeSong: SongIntro = SONGS_CATALOG[activeSongIndex] || SONGS_CATALOG[0];

  const handleNext = useCallback(() => {
    setActiveSongIndex((prev) => (prev + 1) % SONGS_CATALOG.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSongIndex((prev) => (prev - 1 + SONGS_CATALOG.length) % SONGS_CATALOG.length);
  }, []);

  // Sync with audio engine state
  useEffect(() => {
    const unsubscribe = soundEngine.subscribe((_isPlaying, muted) => {
      setIsSiteAudioMuted(muted);
    });
    return unsubscribe;
  }, []);

  // Keyboard navigation for smooth gliding
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch and mouse drag mechanics for fluid horizontal gliding
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (diff > 60) {
      handlePrev();
      setIsDragging(false);
    } else if (diff < -60) {
      handleNext();
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff > 50) handlePrev();
    else if (diff < -50) handleNext();
  };

  // Preview play toggle
  const togglePlayAudio = () => {
    if (activeSong.audioSample) {
      if (isSiteAudioMuted) {
        soundEngine.unmute();
        setIsPlayingSample(true);
      } else {
        soundEngine.toggle();
        setIsPlayingSample(!isSiteAudioMuted);
      }
    } else {
      window.open(activeSong.spotifyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="songs"
      className="relative py-28 sm:py-36 px-6 md:px-12 bg-gradient-to-b from-[#050e14] via-[#07131C] to-[#050e14] text-[#E7E8E4] overflow-hidden select-none border-b border-[#C5CDD0]/10"
    >
      {/* Background Ambience: Deep Radial Glows & Spectral Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102631]/35 via-[#07131C]/60 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 border-b border-[#C5CDD0]/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#102631]/80 to-[#07131C]/90 border border-[#C5CDD0]/20 rounded-full text-[11px] uppercase tracking-[0.3em] font-mono mb-3 shadow-lg">
              <Disc3 className="w-3.5 h-3.5 text-[#C5CDD0] animate-spin" style={{ animationDuration: '14s' }} />
              <span className="text-gradient-silver font-medium">Song Archive · Listening Lounge</span>
            </div>
            <h2 className="font-cinzel text-4xl sm:text-6xl md:text-7xl tracking-[0.14em] font-light text-gradient-silver">
              THE COMPOSITIONS.
            </h2>
            <p className="font-serif italic text-base sm:text-xl text-[#C5CDD0]/85 tracking-wide mt-2">
              Gliding presentation of the discography. Singles are digital exclusives; physical editions available in shop below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs font-mono text-[#75838B]">
            <span className="px-3 py-1.5 rounded-full bg-[#102631]/40 border border-[#C5CDD0]/15 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Gliding Display · View Only (Non-Clickable)</span>
            </span>
          </div>
        </div>

        {/* The A24-Grade Gliding 3D Disc Track Stage */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full py-12 overflow-x-clip select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: '1800px' }}
        >
          {/* Luminous Floor Reflection Track */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-52 bg-gradient-to-r from-transparent via-[#102631]/35 to-transparent blur-3xl pointer-events-none" />

          {/* 3D Track Row - Generous Height to guarantee 100% full visibility of whole CD, edge to edge */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 min-h-[460px] sm:min-h-[520px] md:min-h-[560px] relative">
            {SONGS_CATALOG.map((song, idx) => {
              const offset = idx - activeSongIndex;
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible && Math.abs(offset) > 3) return null;

              // Silky smooth translation coordinates with wider spacing so the whole CD is uncropped
              const translateX = offset * 240;
              const rotateY = offset * -14;
              const scale = isActive ? 1.05 : Math.max(0.68, 1 - Math.abs(offset) * 0.18);
              const opacity = isActive ? 1 : Math.max(0.2, 0.72 - Math.abs(offset) * 0.26);
              const zIndex = 30 - Math.abs(offset);

              return (
                <div
                  key={song.id}
                  /* NOT CLICKABLE: The whole CD is purely viewable, clicks do nothing */
                  className="absolute flex flex-col items-center justify-center pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                  style={{
                    transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Standalone Circular Compact Disc - Completely viewable, unclickable */}
                  <div className="relative p-4 flex items-center justify-center">
                    <CompactDisc3D
                      discImage={song.discImage}
                      title={song.title}
                      size={isActive ? 'lg' : 'md'}
                      isSpinning={isActive}
                      interactiveTilt={false}
                      showReflection={true}
                      showAura={isActive}
                      className="pointer-events-none select-none"
                    />
                  </div>

                  {/* Disc Label Beneath (Active or Adjacent) */}
                  <div className="mt-2 text-center transition-opacity duration-700 pointer-events-none">
                    <span
                      className={`font-cinzel text-xs sm:text-sm tracking-wider block max-w-[220px] truncate ${
                        isActive ? 'text-gradient-silver font-medium scale-105' : 'text-[#75838B]'
                      }`}
                    >
                      {song.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#75838B] uppercase tracking-widest block mt-0.5">
                      {song.type} · {song.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prev / Next Floating Gliding Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-6 pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-[#07131C] to-[#102631]/90 border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/70 text-[#E7E8E4] transition-all hover:scale-110 shadow-2xl backdrop-blur-md cursor-pointer"
              aria-label="Previous Track"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="pointer-events-auto p-3.5 sm:p-4 rounded-full bg-gradient-to-l from-[#07131C] to-[#102631]/90 border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/70 text-[#E7E8E4] transition-all hover:scale-110 shadow-2xl backdrop-blur-md cursor-pointer"
              aria-label="Next Track"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Smooth Song Selector Pills Bar: glide to any song with ease */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-8 max-w-4xl mx-auto px-4">
            {SONGS_CATALOG.map((song, i) => {
              const isSelected = i === activeSongIndex;
              return (
                <button
                  key={song.id}
                  onClick={() => setActiveSongIndex(i)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-500 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-mist-btn text-[#07131C] font-semibold shadow-[0_0_15px_rgba(255,255,255,0.35)] scale-105'
                      : 'bg-[#102631]/40 hover:bg-[#102631]/80 text-[#75838B] hover:text-[#E7E8E4] border border-[#C5CDD0]/10'
                  }`}
                >
                  <span className="opacity-60 mr-1.5">{i + 1 < 10 ? `0${i + 1}` : i + 1}.</span>
                  <span>{song.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Song Dossier with Audio Listening Option */}
        <div className="mt-8 p-6 sm:p-10 rounded-3xl bg-gradient-card border border-[#C5CDD0]/15 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Spotify Cover Still + Digital Status */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4">
              <div className="relative aspect-square w-full max-w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-[#C5CDD0]/20 group">
                <img
                  src={activeSong.coverImage}
                  alt={activeSong.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07131C]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#07131C]/90 backdrop-blur-md border border-[#C5CDD0]/20 text-[10px] font-mono uppercase tracking-widest text-[#E7E8E4]">
                  {activeSong.type}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#E7E8E4] bg-[#07131C]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C5CDD0]/20">
                  <span className="text-emerald-400">● Streaming On Spotify</span>
                  <span>{activeSong.duration}</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[11px] font-mono text-[#75838B]">
                  Release Year: {activeSong.releaseYear} · Original Studio Mix
                </span>
              </div>
            </div>

            {/* Right: Narrative, Audio Player, Lyrical Meaning */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-[#75838B] mb-2">
                  <span className="text-gradient-silver font-semibold">
                    SONG [{activeSongIndex + 1 < 10 ? `0${activeSongIndex + 1}` : activeSongIndex + 1} / {SONGS_CATALOG.length < 10 ? `0${SONGS_CATALOG.length}` : SONGS_CATALOG.length}]
                  </span>
                  <span>{activeSong.key || 'D Minor'} · {activeSong.bpm || 80} BPM</span>
                </div>

                <h3 className="font-cinzel text-3xl sm:text-5xl text-gradient-silver tracking-wide mb-3 leading-tight">
                  “{activeSong.title}”
                </h3>

                <p className="text-sm text-[#C5CDD0]/90 leading-relaxed font-light mb-4">
                  {activeSong.description}
                </p>

                {/* Song Story & Origin */}
                <div className="p-4 bg-gradient-to-r from-[#102631]/50 to-[#07131C]/40 rounded-2xl border-l-2 border-[#C5CDD0]/60 text-xs italic font-serif text-[#C5CDD0] leading-relaxed shadow-inner">
                  {activeSong.story}
                </div>
              </div>

              {/* Audio Listening Control Panel */}
              <div className="p-4 rounded-2xl bg-[#07131C]/80 border border-[#C5CDD0]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5CDD0] flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5 text-[#C5CDD0]" />
                    <span>Auditory Preview & Atmosphere</span>
                  </span>

                  {/* Pulsing Audio Waveform Bars */}
                  <div className="flex items-center gap-1 h-4">
                    <span className="w-1 bg-[#C5CDD0] rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
                    <span className="w-1 bg-[#E7E8E4] rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
                    <span className="w-1 bg-[#75838B] rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
                    <span className="w-1 bg-[#C5CDD0] rounded-full animate-bounce h-3.5" style={{ animationDelay: '450ms' }} />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <button
                    onClick={togglePlayAudio}
                    className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium bg-gradient-mist-btn text-[#07131C] rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all"
                  >
                    {!isSiteAudioMuted ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Listen To Sound</span>
                      </>
                    )}
                  </button>

                  <a
                    href={activeSong.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium border border-[#C5CDD0]/25 hover:border-[#C5CDD0]/70 text-[#E7E8E4] rounded-full transition-all flex items-center justify-center gap-2 bg-[#102631]/40"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Stream On Spotify</span>
                  </a>
                </div>
              </div>

              {/* Non-physical disclaimer & Transition to physical CD shop */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <span className="text-[11px] font-mono text-[#75838B] text-center sm:text-left">
                  Singles remain digital exclusives. Looking for physical audio CD copies?
                </span>

                <button
                  onClick={onScrollToShop}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E7E8E4] hover:text-white underline underline-offset-4 decoration-[#C5CDD0]/40 transition-colors cursor-pointer"
                >
                  <span>Explore Album & EP CDs ($15)</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
