import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address from your surface world.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setErrorMessage('');
    }, 600);
  };

  return (
    <section className="relative py-28 sm:py-36 px-6 md:px-12 bg-[#050e14] text-[#E7E8E4] overflow-hidden border-t border-[#C5CDD0]/10">
      {/* Background Water Caustics / Ripple Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/video-stills/ocean_ripples.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050e14] via-[#050e14]/80 to-[#050e14] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <span className="text-xs uppercase tracking-[0.35em] text-[#75838B] font-mono block mb-3">
          Transmission
        </span>
        <h2 className="font-cinzel text-3xl sm:text-5xl tracking-[0.18em] font-light text-gradient-silver mb-3">
          STAY UNDER.
        </h2>
        <p className="font-serif italic text-base sm:text-xl text-[#C5CDD0]/85 tracking-wide mb-10">
          New pieces, new sounds, and messages from beneath the surface.
        </p>

        {status === 'success' ? (
          <div className="bg-gradient-card rounded-3xl p-8 border border-[#C5CDD0]/20 max-w-lg mx-auto text-center animate-fade-in shadow-2xl backdrop-blur-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#102631] to-[#07131C] border border-[#C5CDD0]/30 mx-auto flex items-center justify-center text-[#C5CDD0] mb-4">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-cinzel text-lg tracking-widest text-gradient-silver mb-2">
              YOU ARE IN THE DEEP.
            </h3>
            <p className="text-xs text-[#75838B] leading-relaxed font-light">
              We have dispatched your nocturnal welcome transmission to <span className="text-[#E7E8E4] font-mono">{email}</span>. You will receive private access to upcoming music releases, secret pop-ups, and limited edition artifact drops.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-gradient-to-r from-[#102631]/60 via-[#07131C] to-[#102631]/60 border border-[#C5CDD0]/20 rounded-full p-1.5 focus-within:border-[#C5CDD0]/70 transition-colors shadow-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                className="flex-1 bg-transparent px-5 py-2.5 text-xs tracking-wider text-[#E7E8E4] placeholder-[#75838B] focus:outline-none rounded-full"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-2.5 text-xs tracking-[0.2em] uppercase font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 backdrop-blur-xl rounded-full transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50 shadow-md"
              >
                <span>{status === 'loading' ? 'Subscribing...' : 'Join The World'}</span>
                {status !== 'loading' && <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>

            {status === 'error' && (
              <p className="text-xs text-rose-300 font-light text-left pl-1">
                {errorMessage}
              </p>
            )}

            <p className="text-[11px] text-[#75838B] font-light">
              No spam. Strictly unreleased transmissions & secret artifact previews. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
