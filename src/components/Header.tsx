import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Sync with audio engine state
    const unsubscribe = soundEngine.subscribe((isPlaying, isMuted) => {
      setIsAudioActive(isPlaying && !isMuted);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleAudioToggle = () => {
    soundEngine.toggle();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#07131C]/85 backdrop-blur-xl border-b border-[#C5CDD0]/10 py-3 shadow-2xl shadow-black/50'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="text-lg md:text-xl font-cinzel tracking-[0.28em] font-medium text-[#E7E8E4] hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            DARANY
          </a>

          {/* Zone 2: Navigation Links in smooth pill container */}
          <nav className="hidden md:flex items-center gap-1.5 text-[12px] tracking-[0.2em] uppercase font-medium text-[#C5CDD0]/80 bg-[#102631]/40 border border-[#C5CDD0]/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            <a
              href="#shop"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              CDs · $15
            </a>
            <a
              href="#world"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              The Artist
            </a>
            <a
              href="#upcoming"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              Mariposa
            </a>
            <a
              href="#music"
              className="px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all"
            >
              Music
            </a>
            <button
              onClick={onOpenContact}
              className="px-3.5 py-1.5 rounded-full uppercase tracking-[0.2em] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Dedicated Top-Right Mute Button for « Make a Wish (interlude) » */}
            <button
              onClick={() => soundEngine.toggleMute()}
              title={isAudioActive ? 'Mute « Make a Wish (interlude) »' : 'Unmute « Make a Wish (interlude) »'}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                isAudioActive
                  ? 'bg-[#102631]/80 text-[#E7E8E4] border-[#C5CDD0]/40 hover:border-white shadow-lg shadow-cyan-950/30'
                  : 'bg-[#07131C]/60 text-[#75838B] border-[#C5CDD0]/15 hover:text-white hover:border-[#C5CDD0]/30'
              }`}
              aria-label={isAudioActive ? 'Mute sound' : 'Unmute sound'}
            >
              {isAudioActive ? (
                <>
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-[2px] bg-[#C5CDD0] animate-pulse h-3 rounded-full" />
                    <span className="w-[2px] bg-[#C5CDD0] animate-pulse h-1.5 rounded-full" style={{ animationDelay: '150ms' }} />
                    <span className="w-[2px] bg-[#C5CDD0] animate-pulse h-2.5 rounded-full" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[11px] font-semibold text-[#E7E8E4]">Mute</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#75838B]" />
                  <span className="text-[11px] text-[#75838B]">Unmute</span>
                </>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              aria-label="View shopping bag"
              className="flex items-center gap-2.5 px-4 py-2 rounded-full text-xs tracking-[0.16em] uppercase font-medium bg-[#102631]/60 hover:bg-[#102631] text-[#E7E8E4] border border-[#C5CDD0]/15 hover:border-[#C5CDD0]/35 transition-all duration-300 cursor-pointer whitespace-nowrap shadow-md"
            >
              <ShoppingBag className="w-4 h-4 text-[#C5CDD0]" />
              <span>Bag</span>
              {cartCount > 0 && (
                <span className="font-mono text-[11px] px-2 py-0.5 bg-[#C5CDD0] text-[#07131C] font-semibold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-[#102631]/50 border border-[#C5CDD0]/10 text-[#C5CDD0] hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with smooth rounded corners */}
      {mobileMenuOpen && (
        <div className="fixed inset-4 z-40 bg-[#07131C]/95 backdrop-blur-2xl rounded-3xl border border-[#C5CDD0]/15 md:hidden pt-20 px-8 pb-10 flex flex-col justify-between shadow-2xl">
          <nav className="flex flex-col gap-4 text-base font-cinzel tracking-[0.25em] uppercase text-[#E7E8E4]">
            <a
              href="#shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-2xl bg-[#102631]/30 border border-[#C5CDD0]/10 hover:text-white hover:bg-[#102631]/60 transition-colors"
            >
              Physical CDs · $15
            </a>
            <a
              href="#world"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-2xl bg-[#102631]/30 border border-[#C5CDD0]/10 hover:text-white hover:bg-[#102631]/60 transition-colors"
            >
              The Artist (French & Cambodian)
            </a>
            <a
              href="#upcoming"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-2xl bg-[#102631]/30 border border-[#C5CDD0]/10 hover:text-white hover:bg-[#102631]/60 transition-colors"
            >
              MARIPOSA (Upcoming)
            </a>
            <a
              href="#music"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-4 rounded-2xl bg-[#102631]/30 border border-[#C5CDD0]/10 hover:text-white hover:bg-[#102631]/60 transition-colors"
            >
              Music & Spotify
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="text-left py-3 px-4 rounded-2xl bg-[#102631]/30 border border-[#C5CDD0]/10 uppercase font-cinzel tracking-[0.25em] hover:text-white hover:bg-[#102631]/60 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <div className="space-y-4 pt-6 text-xs text-[#75838B] tracking-wider">
            <p className="font-cinzel tracking-[0.2em] text-[#C5CDD0]">DARANY UNIVERSE</p>
            <p>Official merchandise and soundscapes.</p>
            <a
              href="https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH?si=5tn60416SMC86WfJA2RYZQ&utm_source=copy-link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[#C5CDD0] underline underline-offset-4"
            >
              Listen on Spotify →
            </a>
          </div>
        </div>
      )}
    </>
  );
};
