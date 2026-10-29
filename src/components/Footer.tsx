import React, { useState } from 'react';
import { ExternalLink, X, Mail, MapPin, Send } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  isContactOpen: boolean;
  onCloseContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  isContactOpen,
  onCloseContact,
}) => {
  const [modalType, setModalType] = useState<'shipping' | 'privacy' | 'terms' | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Inquiry', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      onCloseContact();
      setContactForm({ name: '', email: '', subject: 'Inquiry', message: '' });
    }, 1800);
  };

  const spotifyUrl =
    'https://open.spotify.com/artist/6WSMhnCFhu5pqknyWdb9IH?si=5tn60416SMC86WfJA2RYZQ&utm_source=copy-link';

  return (
    <>
      <footer className="relative bg-[#050b10] border-t border-[#C5CDD0]/10 text-[#75838B] pt-20 pb-16 px-6 md:px-12 select-none">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Brand & Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#C5CDD0]/10">
            {/* Column 1: DARANY Wordmark & Essence */}
            <div className="space-y-4 md:col-span-1">
              <span className="font-cinzel tracking-[0.28em] text-2xl font-light text-[#E7E8E4] block">
                DARANY
              </span>
              <p className="text-xs text-[#75838B] leading-relaxed font-light">
                An independent sonic and visual project. Dark waters, mythical folklore, and tangible artifacts from beneath the surface.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-[#C5CDD0] mb-4">
                Explore
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#shop" className="hover:text-white transition-colors">
                    Physical CDs ($15)
                  </a>
                </li>
                <li>
                  <a href="#world" className="hover:text-white transition-colors">
                    The Artist (French & Cambodian)
                  </a>
                </li>
                <li>
                  <a href="#upcoming" className="hover:text-white transition-colors">
                    MARIPOSA (Upcoming Era)
                  </a>
                </li>
                <li>
                  <a href="#music" className="hover:text-white transition-colors">
                    Music & Spotify
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenContact}
                    className="hover:text-white transition-colors text-left"
                  >
                    Contact Management
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Policies */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-[#C5CDD0] mb-4">
                Assistance
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    onClick={() => setModalType('shipping')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Shipping & Worldwide Delivery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('shipping')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Returns & Exchanges
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('privacy')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalType('terms')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Streaming & Social Coordinates */}
            <div>
              <h4 className="text-xs uppercase font-mono tracking-[0.2em] text-[#C5CDD0] mb-4">
                Signals
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href={spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Spotify Official</span>
                    <ExternalLink className="w-3 h-3 text-[#75838B]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-3 h-3 text-[#75838B]" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>TikTok</span>
                    <ExternalLink className="w-3 h-3 text-[#75838B]" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row: Subtle final phrase & Copyright */}
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-xs font-light text-[#75838B]">
              © {new Date().getFullYear()} DARANY. All rights reserved. Built for independent sound.
            </p>

            {/* The final required phrase */}
            <div className="font-cinzel tracking-[0.3em] text-sm text-[#C5CDD0]/80">
              SEE YOU BELOW.
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={onCloseContact} />
          <div className="flex min-h-full items-center justify-center p-4 relative z-10">
            <div className="relative w-full max-w-lg bg-[#07131C] border border-[#C5CDD0]/20 rounded-3xl p-6 sm:p-8 text-[#E7E8E4] shadow-2xl">
              <button
                onClick={onCloseContact}
                className="absolute top-4 right-4 p-2.5 text-[#75838B] hover:text-white rounded-full bg-[#102631]/40 border border-[#C5CDD0]/10 hover:border-[#C5CDD0]/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs uppercase font-mono tracking-widest text-[#75838B] block mb-1">
                Communications
              </span>
              <h3 className="font-cinzel text-2xl text-[#E7E8E4] tracking-wide mb-2">
                CONTACT DARANY
              </h3>
              <p className="text-xs text-[#75838B] font-light mb-6">
                For order support, archival inquiries, editorial press, or bookings.
              </p>

              {contactSubmitted ? (
                <div className="p-8 text-center bg-[#102631]/40 border border-[#C5CDD0]/20 rounded-2xl">
                  <h4 className="font-cinzel text-lg text-[#E7E8E4] mb-2">MESSAGE TRANSMITTED</h4>
                  <p className="text-xs text-[#75838B]">
                    Our management team will reply beneath the tide within 24 to 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-[#050e14] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                      placeholder="Name or Organization"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-[#050e14] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full bg-[#050e14] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                    >
                      <option value="Merchandise & Orders">Merchandise & Order Inquiries</option>
                      <option value="Press & Editorial">Press, Editorial & Interviews</option>
                      <option value="Booking & Live Performances">Booking & Live Performances</option>
                      <option value="Other">General Transmission</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-[#050e14] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                      placeholder="Write your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Information Modal (Shipping / Privacy / Terms) */}
      {modalType && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setModalType(null)} />
          <div className="flex min-h-full items-center justify-center p-4 relative z-10">
            <div className="relative w-full max-w-xl bg-[#07131C] border border-[#C5CDD0]/20 rounded-3xl p-6 sm:p-8 text-[#E7E8E4] shadow-2xl">
              <button
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 p-2.5 text-[#75838B] hover:text-white rounded-full bg-[#102631]/40 border border-[#C5CDD0]/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {modalType === 'shipping' && (
                <div className="space-y-4">
                  <h3 className="font-cinzel text-xl text-[#E7E8E4]">
                    SHIPPING & WORLDWIDE DISPATCH
                  </h3>
                  <div className="text-xs text-[#75838B] leading-relaxed space-y-3 font-light">
                    <p>
                      All DARANY artifacts are hand-inspected and dispatched in protective, climate-resistant matte packaging. Orders ship within 48 to 72 hours from our fulfillment hub.
                    </p>
                    <p>
                      <strong>Domestic Shipping (4–7 business days):</strong> $10.00 or complimentary for orders over $100.
                    </p>
                    <p>
                      <strong>International Priority Courier (3–5 business days):</strong> Available at checkout with full doorstep tracking and prepaid customs clearance.
                    </p>
                    <p>
                      <strong>Returns & Exchanges:</strong> Unworn items in original condition may be returned within 30 days of arrival. Art prints and limited editions are final sale due to their numbered provenance.
                    </p>
                  </div>
                </div>
              )}

              {modalType === 'privacy' && (
                <div className="space-y-4">
                  <h3 className="font-cinzel text-xl text-[#E7E8E4]">PRIVACY POLICY</h3>
                  <div className="text-xs text-[#75838B] leading-relaxed space-y-3 font-light">
                    <p>
                      We collect strictly essential information (shipping address, email, contact name) required to deliver your orders and transmit artist updates if opted in.
                    </p>
                    <p>
                      Your data is encrypted end-to-end and never sold, shared, or exchanged with third-party advertising networks. You may request total erasure of your customer profile at any time.
                    </p>
                  </div>
                </div>
              )}

              {modalType === 'terms' && (
                <div className="space-y-4">
                  <h3 className="font-cinzel text-xl text-[#E7E8E4]">TERMS & CONDITIONS</h3>
                  <div className="text-xs text-[#75838B] leading-relaxed space-y-3 font-light">
                    <p>
                      All content, recordings, visual imagery, graphics, and apparel silhouettes are intellectual property of DARANY and affiliated creative partners.
                    </p>
                    <p>
                      Limited edition prints and jewelry are strictly capped as stated. Resale of signed or numbered artifacts above market face value is prohibited.
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={() => setModalType(null)}
                className="mt-6 px-7 py-2.5 text-xs uppercase tracking-widest bg-[#102631] text-[#E7E8E4] border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/50 rounded-full transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
