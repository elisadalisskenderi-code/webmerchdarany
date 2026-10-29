import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ExternalLink, Volume2, Pause } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeroProps {
  onExploreMerch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMerch }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy handled gracefully
      });
    }

    const unsubscribe = soundEngine.subscribe((isPlaying, isMuted) => {
      setIsPlayingAudio(isPlaying && !isMuted);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden select-none">
      {/* Full-Screen Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/video-stills/moon_ocean.jpg"
        onLoadedData={() => setVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 scale-[1.01]"
        style={{ filter: 'brightness(0.9) contrast(1.05)' }}
      >
        <source
          src="/assets/aistudio/Mermaid_folklore_aesthetic_video__1080p_20261016161321_3bd7b3ad.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Subtle Measured Cinematic Scrim to ensure 4.5:1 text contrast while preserving video visibility */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(7, 19, 28, 0.32) 0%, rgba(7, 19, 28, 0.65) 75%, rgba(7, 19, 28, 0.88) 100%)',
        }}
      />

      {/* Gentle bottom feather to blend smoothly into the merchandise section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07131C] to-transparent z-10 pointer-events-none" />

      {/* Centered Artist Signature Typography and Actions */}
      <div className="relative z-20 text-center max-w-4xl mx-auto px-6 flex flex-col items-center">
        {/* Poetic Pre-Title Kicker */}
        <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-[#C5CDD0]/80 font-light mb-4 block">
          A world beneath the surface
        </span>

        {/* DARANY Artist Signature Wordmark */}
        <h1 className="font-cinzel text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.22em] font-light text-[#E7E8E4] drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)] mb-6 transition-transform duration-700">
          DARANY
        </h1>

        {/* Core Artist Manifesto Statement */}
        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#C5CDD0] tracking-[0.12em] font-light max-w-2xl text-balance mb-10 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
          “NOT OF THIS WORLD.”
        </p>

        {/* Minimalist Dual CTA Buttons with smooth organic curves */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Button 1: Explore CDs (Translucent Glass) */}
          <button
            onClick={onExploreMerch}
            className="w-full sm:w-auto px-9 py-4 rounded-full text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 backdrop-blur-xl transition-all duration-500 shadow-xl shadow-black/40 hover:shadow-[0_12px_35px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Explore The CDs · $15
          </button>

          {/* Button 2: Listen on Spotify (Translucent Glass) */}
          <a
            href="https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH?si=5tn60416SMC86WfJA2RYZQ&utm_source=copy-link"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-xs sm:text-sm tracking-[0.25em] uppercase font-medium text-[#C5CDD0] hover:text-[#E7E8E4] bg-[#102631]/40 hover:bg-[#102631]/70 border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/50 backdrop-blur-xl transition-all duration-500 shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Listen To Darany</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C5CDD0]" />
          </a>
        </div>

        {/* Site Soundtrack: « Make a Wish (interlude) » in smooth rounded pill */}
        <button
          onClick={() => soundEngine.toggleMute()}
          className="mt-8 flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#07131C]/80 hover:bg-[#102631] border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/50 backdrop-blur-xl text-xs text-[#C5CDD0] transition-all duration-500 hover:shadow-lg hover:scale-105 cursor-pointer"
        >
          {isPlayingAudio ? (
            <>
              <div className="flex items-end gap-[2px] h-3">
                <span className="w-[2px] bg-[#E7E8E4] animate-pulse h-3 rounded-full" />
                <span className="w-[2px] bg-[#E7E8E4] animate-pulse h-1.5 rounded-full" style={{ animationDelay: '150ms' }} />
                <span className="w-[2px] bg-[#E7E8E4] animate-pulse h-2.5 rounded-full" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="font-mono text-[11px] text-[#E7E8E4]">
                Soundtrack Playing: « Make a Wish (interlude) »
              </span>
              <Pause className="w-3 h-3 text-[#C5CDD0] ml-1" />
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#C5CDD0]" />
              <span className="font-mono text-[11px]">
                Immerse in Website Soundtrack: « Make a Wish (interlude) »
              </span>
            </>
          )}
        </button>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        onClick={onExploreMerch}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#C5CDD0]/70 hover:text-[#E7E8E4] transition-colors cursor-pointer group py-2 px-4 rounded-full hover:bg-white/5 backdrop-blur-sm"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-light group-hover:tracking-[0.35em] transition-all">
          Descend
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#C5CDD0]" />
      </div>
    </section>
  );
};
