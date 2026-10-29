import React, { useState } from 'react';
import { Lock, Bell, Check, Sparkles, Disc } from 'lucide-react';
import { UPCOMING_PROJECTS } from '../data/products';

export const UpcomingProjects: React.FC = () => {
  const mariposa = UPCOMING_PROJECTS[0];
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeImage, setActiveImage] = useState(mariposa?.image || '');

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
  };

  if (!mariposa) return null;

  return (
    <section id="upcoming" className="relative py-28 sm:py-36 px-6 md:px-12 bg-gradient-to-b from-[#050e14] via-[#07131C] to-[#050e14] text-[#E7E8E4] border-t border-[#C5CDD0]/10 overflow-hidden">
      {/* Background Ambience: Butterfly wing caustics & deep ocean gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102631]/35 via-[#07131C]/50 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#102631]/80 to-[#07131C]/90 border border-[#C5CDD0]/20 rounded-full text-[11px] uppercase tracking-[0.3em] font-mono mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#C5CDD0]" />
            <span className="text-gradient-silver font-medium">Sole Upcoming Studio Era</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-6xl tracking-[0.2em] font-light text-gradient-silver mb-3">
            UPCOMING: MARIPOSA
          </h2>
          <p className="font-serif italic text-base sm:text-xl text-[#C5CDD0]/85 tracking-wide">
            {mariposa.subtitle}
          </p>
        </div>

        {/* Heroic Single Project Feature Showcase with Rich Gradient Card */}
        <div className="bg-gradient-card rounded-3xl border border-[#C5CDD0]/20 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Artwork Stage with Butterfly & Chrysalis Views */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#07131C] border border-[#C5CDD0]/20 group shadow-lg">
                <img
                  src={activeImage || mariposa.image}
                  alt="MARIPOSA Artwork"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-[#07131C]/90 backdrop-blur-md border border-[#C5CDD0]/20 rounded-full text-[10px] uppercase font-mono tracking-widest text-[#E7E8E4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5CDD0]" />
                  <span>{mariposa.status}</span>
                </div>

                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#C5CDD0] bg-black/70 px-3 py-1 backdrop-blur-sm border border-[#C5CDD0]/10 rounded-full">
                  {mariposa.releaseWindow}
                </div>
              </div>

              {/* View Switcher: Cover Art vs Chrysalis Disc */}
              {mariposa.secondaryImage && (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveImage(mariposa.image)}
                    className={`py-2 px-4 text-[11px] font-mono uppercase tracking-wider border rounded-full transition-all text-center ${
                      activeImage === mariposa.image
                        ? 'border-[#C5CDD0] bg-[#102631]/80 text-white shadow-md'
                        : 'border-[#C5CDD0]/15 text-[#75838B] hover:text-white hover:border-[#C5CDD0]/30'
                    }`}
                  >
                    <span>01. Wing Cover</span>
                  </button>
                  <button
                    onClick={() => setActiveImage(mariposa.secondaryImage!)}
                    className={`py-2 px-4 text-[11px] font-mono uppercase tracking-wider border rounded-full transition-all text-center ${
                      activeImage === mariposa.secondaryImage
                        ? 'border-[#C5CDD0] bg-[#102631]/80 text-white shadow-md'
                        : 'border-[#C5CDD0]/15 text-[#75838B] hover:text-white hover:border-[#C5CDD0]/30'
                    }`}
                  >
                    <span>02. Chrysalis Disc</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: Narrative, Butterfly Aesthetic, Sealed Tracklist, Pre-Order Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#75838B] mb-2">
                  <Disc className="w-3.5 h-3.5 text-[#C5CDD0]" />
                  <span>{mariposa.format}</span>
                </div>

                <h3 className="font-cinzel text-3xl sm:text-4xl text-[#E7E8E4] tracking-wider mb-3">
                  MARIPOSA
                </h3>

                <p className="text-sm text-[#C5CDD0]/90 leading-relaxed font-light mb-4">
                  {mariposa.description}
                </p>

                {/* Lore Quote */}
                <div className="p-5 bg-[#07131C] rounded-2xl border-l-4 border-[#C5CDD0]/50 text-xs italic font-serif text-[#C5CDD0] leading-relaxed">
                  {mariposa.lore}
                </div>
              </div>

              {/* Butterfly Aesthetic Callout */}
              <div className="p-5 bg-[#102631]/30 rounded-2xl border border-[#C5CDD0]/10 text-xs text-[#75838B] font-light space-y-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#C5CDD0] block font-medium">
                  Aesthetic Architecture:
                </span>
                <p>{mariposa.aestheticNotes}</p>
              </div>

              {/* Sealed Tracklist Module */}
              <div className="border border-[#C5CDD0]/10 bg-[#07131C]/60 rounded-2xl p-6">
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="uppercase tracking-widest text-[#C5CDD0]">
                    Tracklist ({mariposa.trackCount} Movements)
                  </span>
                  <span className="flex items-center gap-1.5 text-[#75838B] text-[11px]">
                    <Lock className="w-3 h-3 text-[#C5CDD0]" />
                    <span>Sealed in Chrysalis · Titles Unrevealed</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {Array.from({ length: mariposa.trackCount }).map((_, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between px-3.5 py-2.5 bg-[#102631]/30 border border-[#C5CDD0]/10 rounded-xl text-xs font-mono text-[#75838B]"
                    >
                      <span>Movement {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                      <span className="tracking-widest opacity-60">•••••••</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* VIP Early Pre-Order Notification Form */}
              <div className="pt-2">
                {isSubscribed ? (
                  <div className="p-5 bg-[#102631]/60 border border-[#C5CDD0]/30 rounded-2xl text-center flex items-center justify-center gap-2.5 text-xs text-[#E7E8E4]">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Transmission saved for {email}. You will receive private early CD pre-order access.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNotifySubmit} className="space-y-2">
                    <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#07131C] border border-[#C5CDD0]/20 rounded-full p-1.5 focus-within:border-[#C5CDD0] transition-colors shadow-lg">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email for VIP Mariposa CD pre-order..."
                        className="flex-1 bg-transparent px-4 py-2.5 text-xs text-[#E7E8E4] placeholder-[#75838B] focus:outline-none rounded-full"
                      />
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium bg-white/10 hover:bg-white/20 text-[#E7E8E4] border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 backdrop-blur-xl rounded-full flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>Pre-Save Notice</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-[#75838B] text-center font-light">
                      Subscribers receive access to the physical CD pre-order and secret visual previews before public announcement.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
