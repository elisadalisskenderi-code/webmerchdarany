import React from 'react';
import { ExternalLink, Radio, Disc3 } from 'lucide-react';

export const MusicSection: React.FC = () => {
  const spotifyProfileUrl =
    'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH?si=5tn60416SMC86WfJA2RYZQ&utm_source=copy-link';

  return (
    <section id="music" className="relative py-20 sm:py-28 px-6 md:px-12 bg-[#07131C] text-[#E7E8E4]">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#102631]/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.35em] text-[#75838B] font-mono block mb-2">
            Streaming & Discography
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl tracking-[0.16em] font-light text-[#E7E8E4] mb-3">
            ENTER THE SOUND.
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-[#C5CDD0]/80 tracking-wide">
            Stream directly on Spotify or listen through the player.
          </p>
        </div>

        {/* Music Player & Spotify Link Directly Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Left Column: Spotify Link & Artist Profile Card */}
          <div className="ocean-card rounded-3xl p-6 sm:p-8 border border-[#C5CDD0]/15 shadow-2xl flex flex-col justify-between h-full min-h-[352px]">
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#102631] border border-[#C5CDD0]/20 flex items-center justify-center text-[#C5CDD0] shrink-0">
                  <Disc3 className="w-6 h-6 animate-spin text-[#C5CDD0]" style={{ animationDuration: '14s' }} />
                </div>
                <div>
                  <h3 className="font-cinzel text-xl tracking-wider text-[#E7E8E4]">DARANY</h3>
                  <p className="text-xs text-[#75838B] font-mono uppercase tracking-widest">
                    Official Spotify Artist Profile
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#C5CDD0]/90 leading-relaxed font-light mb-4">
                Listen to Darany’s complete catalog on Spotify. Subterranean electronic soul, ethereal vocal treatments, and nocturnal oceanic soundscapes.
              </p>

              <div className="p-3.5 bg-[#07131C]/60 rounded-2xl border border-[#C5CDD0]/10 text-xs italic font-serif text-[#75838B] leading-relaxed">
                “Sound traveling through water moves faster than through air. It reaches the bone before the ear.”
              </div>
            </div>

            <div className="pt-4 border-t border-[#C5CDD0]/10 flex flex-col gap-2.5 mt-4">
              <a
                href={spotifyProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#E7E8E4] bg-[#1DB954]/20 hover:bg-[#1DB954]/30 border border-[#1DB954]/40 hover:border-[#1DB954]/70 rounded-full backdrop-blur-xl transition-all shadow-lg shadow-black/40 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-[#1ed760]" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.496 17.306c-.215.352-.676.463-1.028.247-2.822-1.724-6.374-2.114-10.558-1.157-.402.092-.801-.159-.893-.561-.092-.402.159-.801.561-.893 4.582-1.047 8.513-.6 11.666 1.332.352.215.467.678.252 1.032zm1.467-3.26c-.27.441-.849.58-1.29.31-3.23-1.986-8.155-2.56-11.977-1.4-1.5-.497-.33-.997.168-1.494.498-4.372-1.326-9.813-.678-13.518 1.602-.441.27-.58.849-.31 1.29zm.126-3.393C15.222 8.35 8.84 8.14 5.143 9.263c-.59.179-1.218-.163-1.398-.753-.18-.59.163-1.218.753-1.398 4.25-1.29 11.298-1.05 15.74 1.587.531.315.704 1.002.39 1.533-.315.531-1.002.705-1.534.39z" />
                </svg>
                <span>Open Spotify Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5CDD0]" />
              </a>

              <div className="flex items-center justify-between text-[11px] text-[#75838B] font-mono px-1">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-[#C5CDD0]" />
                  <span>Active Streaming</span>
                </span>
                <span>Albums, EPs & Singles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Spotify Artist Player (Directly Side-by-Side) */}
          <div className="ocean-card rounded-3xl p-3 sm:p-4 border border-[#C5CDD0]/15 relative shadow-2xl shadow-black/80 overflow-hidden flex flex-col justify-center h-full min-h-[352px]">
            <iframe
              title="DARANY Spotify Artist Embed"
              style={{ borderRadius: '20px' }}
              src="https://open.spotify.com/embed/artist/6WSMhnCFhu5pqknyWdb9IH?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full bg-[#07131C] rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
