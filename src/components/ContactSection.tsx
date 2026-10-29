import React, { useState } from 'react';
import { Mail, Send, Check, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry & Connection',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.email.includes('@') || !form.message.trim()) {
      setStatus('error');
      setErrorMessage('Please include your valid email and a message.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setErrorMessage('');
      setForm({ name: '', email: '', subject: 'General Inquiry & Connection', message: '' });
    }, 800);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterStatus('loading');
    setTimeout(() => {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative py-28 sm:py-36 px-6 md:px-12 bg-gradient-to-b from-[#07131C] via-[#102631]/25 to-[#050b10] text-[#E7E8E4] overflow-hidden border-t border-[#C5CDD0]/10 select-none"
    >
      {/* Background Spectral Water & Glow Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102631]/40 via-[#07131C]/60 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#102631]/80 to-[#07131C]/90 border border-[#C5CDD0]/20 rounded-full text-[11px] uppercase tracking-[0.3em] font-mono mb-4 shadow-lg">
            <MessageSquare className="w-3.5 h-3.5 text-[#C5CDD0]" />
            <span className="text-gradient-silver font-medium">Direct Line · Surface & Depths</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-6xl tracking-[0.16em] font-light text-gradient-silver mb-3">
            CONTACT SPACE.
          </h2>
          <p className="font-serif italic text-base sm:text-xl text-[#C5CDD0]/85 tracking-wide">
            Direct management transmission for orders, booking, press, and artistic connection.
          </p>
        </div>

        {/* Dual Pillar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Pillar 1: Transmission Form (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-card rounded-3xl p-6 sm:p-10 border border-[#C5CDD0]/15 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between border-b border-[#C5CDD0]/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#75838B] block">
                  Encrypted Channel
                </span>
                <h3 className="font-cinzel text-lg sm:text-xl text-gradient-silver tracking-wide">
                  SEND A TRANSMISSION
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full">
                ● Replies in 24–48h
              </span>
            </div>

            {status === 'success' ? (
              <div className="py-12 px-6 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#102631] to-[#07131C] border border-[#C5CDD0]/30 mx-auto flex items-center justify-center text-emerald-400 shadow-xl">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-cinzel text-xl text-gradient-silver tracking-wider">
                  MESSAGE TRANSMITTED
                </h4>
                <p className="text-xs text-[#75838B] max-w-md mx-auto leading-relaxed">
                  Your words have drifted through to DARANY’s management and studio team. Expect an answer beneath the surface shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest bg-gradient-ocean-btn border border-[#C5CDD0]/20 rounded-full text-[#E7E8E4] hover:text-white cursor-pointer transition-all"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] font-mono mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe or Collective"
                      className="w-full bg-[#050e14]/90 border border-[#C5CDD0]/20 rounded-xl px-4 py-3 text-xs text-[#E7E8E4] placeholder-[#75838B] focus:outline-none focus:border-[#C5CDD0]/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] font-mono mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="name@domain.com"
                      className="w-full bg-[#050e14]/90 border border-[#C5CDD0]/20 rounded-xl px-4 py-3 text-xs text-[#E7E8E4] placeholder-[#75838B] focus:outline-none focus:border-[#C5CDD0]/70 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#75838B] font-mono mb-1.5">
                    Subject Matter
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full bg-[#050e14]/90 border border-[#C5CDD0]/20 rounded-xl px-4 py-3 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]/70 transition-colors cursor-pointer"
                  >
                    <option value="CD Order & Merch Fulfillment">CD Order & Fulfillment Inquiry</option>
                    <option value="Booking & Live Performances">Booking & Live Performances</option>
                    <option value="Press, Editorial & Interviews">Press, Editorial & Interviews</option>
                    <option value="Music Licensing & Sync">Music Licensing & Sync (Film/Fashion)</option>
                    <option value="General Inquiry & Connection">General Inquiry & Connection</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#75838B] font-mono mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your thoughts, questions, or project propositions..."
                    className="w-full bg-[#050e14]/90 border border-[#C5CDD0]/20 rounded-xl px-4 py-3 text-xs text-[#E7E8E4] placeholder-[#75838B] focus:outline-none focus:border-[#C5CDD0]/70 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs text-rose-300 font-mono">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 text-xs uppercase tracking-[0.25em] font-medium text-[#07131C] bg-gradient-mist-btn hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{status === 'loading' ? 'Transmitting...' : 'Transmit Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Pillar 2: Coordinates, Direct Emails & Stay Under (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Coordinates Card */}
            <div className="bg-gradient-card rounded-3xl p-6 sm:p-8 border border-[#C5CDD0]/15 shadow-2xl backdrop-blur-2xl space-y-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#75838B] block">
                Official Directory
              </span>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#050e14]/70 border border-[#C5CDD0]/10 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#102631] to-[#07131C] border border-[#C5CDD0]/25 flex items-center justify-center text-[#C5CDD0] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#75838B] block">Management & Booking</span>
                    <a
                      href="mailto:management@darany.art"
                      className="text-xs font-mono text-[#E7E8E4] hover:text-white transition-colors"
                    >
                      management@darany.art
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#050e14]/70 border border-[#C5CDD0]/10 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#102631] to-[#07131C] border border-[#C5CDD0]/25 flex items-center justify-center text-[#C5CDD0] shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#75838B] block">Physical CD Fulfillment</span>
                    <span className="text-xs font-mono text-[#E7E8E4]">
                      fulfillment@darany.art
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#C5CDD0]/10">
                <span className="text-[11px] font-mono text-[#75838B] block">
                  Physical distribution handled from Paris & Phnom Penh. Worldwide carbon-neutral delivery.
                </span>
              </div>
            </div>

            {/* Newsletter Mini Card inside Contact Space */}
            <div className="bg-gradient-card rounded-3xl p-6 sm:p-8 border border-[#C5CDD0]/15 shadow-2xl backdrop-blur-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#C5CDD0]" />
                <h4 className="font-cinzel text-base text-gradient-silver tracking-wider">
                  STAY UNDER (DISPATCHES)
                </h4>
              </div>
              <p className="text-xs text-[#75838B] leading-relaxed mb-4">
                Receive secret pop-up notices, vinyl announcements, and unreleased voice memos before anyone else.
              </p>

              {newsletterStatus === 'success' ? (
                <div className="p-3 bg-gradient-to-r from-emerald-950/40 to-[#07131C] border border-emerald-500/30 rounded-xl text-center">
                  <span className="text-xs text-emerald-400 font-mono">
                    ✓ Coordinates logged in the archives.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="flex-1 bg-[#050e14]/90 border border-[#C5CDD0]/20 rounded-full px-4 py-2 text-xs text-[#E7E8E4] placeholder-[#75838B] focus:outline-none focus:border-[#C5CDD0]"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'loading'}
                    className="px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[#07131C] bg-gradient-mist-btn rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
