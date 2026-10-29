import React from 'react';

export const ArtistWorld: React.FC = () => {
  return (
    <section id="world" className="relative py-28 sm:py-36 px-6 md:px-12 bg-gradient-to-b from-[#050e14] via-[#060c12] to-[#07131C] text-[#E7E8E4] overflow-hidden">
      {/* Background Soft Nocturnal Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#102631]/30 via-[#07131C]/40 to-transparent rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Diary Header / Notebook Heading */}
        <div className="border-b border-[#C5CDD0]/15 pb-8 mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 text-xs font-mono text-[#75838B] mb-4">
            <span className="tracking-[0.25em] uppercase text-gradient-silver font-medium">Private Journal · Unfiltered Pages</span>
            <span className="text-[#C5CDD0]/80">Paris / Phnom Penh · 03:24 AM</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] font-light text-gradient-silver mb-3">
            DARANY.
          </h2>

          <p className="font-serif italic text-lg sm:text-2xl text-[#C5CDD0]/90 tracking-wide font-light">
            Between two bloodlines, solitary nights at the piano, and the necessity of sound.
          </p>
        </div>

        {/* First Diary Illustration: Screenshot of Person in Hero Video (Close-up turning in mist) */}
        <div className="mb-14 relative">
          <div className="relative bg-gradient-to-br from-[#0b1a23] to-[#07131C] p-4 sm:p-5 border border-[#C5CDD0]/20 rounded-2xl shadow-2xl shadow-black/90 max-w-2xl mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-700">
            {/* Visual Tape Accent with Gradient */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-r from-white/20 via-[#C5CDD0]/20 to-white/10 backdrop-blur-sm border border-[#C5CDD0]/25 rounded-full -rotate-2" />

            <div className="relative aspect-[16/10] overflow-hidden bg-[#07131C] rounded-xl">
              <img
                src="/assets/video-stills/person_profile_closeup.jpg"
                alt="Darany emerging through the mist in the hero visual"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[20%] contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07131C]/60 via-transparent to-transparent" />
            </div>

            <div className="mt-3 text-center">
              <span className="text-[11px] font-mono tracking-widest text-[#75838B] uppercase">
                Plate I — Still from nocturnal visual recordings · The emergence
              </span>
            </div>
          </div>
        </div>

        {/* Diary Prose: Flowing Organic Paragraphs (No sterile grids or PowerPoint tiles) */}
        <div className="space-y-10 sm:space-y-12 font-serif text-base sm:text-lg text-[#C5CDD0]/90 leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
          {/* Paragraph 1: Mixed Wasian Heritage & Origins */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5CDD0]/20">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#102631]/50 border border-[#C5CDD0]/10 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5CDD0] mb-2 font-normal">
              Entry 01 · Bloodlines & Duality
            </span>
            <p>
              I have spent my life standing with one foot on French soil and the other anchored in the ancient riverbeds of Cambodia. Growing up with mixed Wasian heritage is like living between two different horizons simultaneously—never feeling completely anchored to either, yet carrying the deep, unspoken ghosts and memories of both. In French, silence is guarded and polite; in Cambodian, it is steeped in reverence, surviving wars and loss. When spoken words felt too narrow or clumsy to explain who I was, music became the only sanctuary where my two halves did not conflict. In melody, they simply breathe together.
            </p>
          </div>

          {/* Paragraph 2: Music as Lifeline & Solo Production */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C5CDD0]/20">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#102631]/50 border border-[#C5CDD0]/10 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5CDD0] mb-2 font-normal">
              Entry 02 · 3:00 AM in the Bedroom Studio
            </span>
            <p>
              People sometimes ask what my backup plan is. The truth is, there has never been one. Music isn’t a hobby, a calculated industry project, or something I put on and take off depending on the room. It is my entire life. It is the only way I make sense of waking up in a world that often feels alienating and hollow. I write, compose, sing, and produce every track entirely on my own—layering vocals, tweaking synth filters, hunting for sub-bass notes that rumble deep inside the chest. That solitary independence isn’t a performance of control; it’s survival. If I let someone else dilute the sound, I would lose the only honest mirror I possess.
            </p>
          </div>

          {/* Second Diary Illustration: Frame from Video (Person rising above the dark waters) */}
          <div className="my-14 relative">
            <div className="relative bg-[#07131C] p-4 sm:p-5 border border-[#C5CDD0]/20 rounded-2xl shadow-2xl shadow-black/90 max-w-xl mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="absolute -top-3 left-1/3 -translate-x-1/2 w-24 h-5 bg-[#C5CDD0]/15 backdrop-blur-sm border border-[#C5CDD0]/20 rounded-full rotate-3" />

              <div className="relative aspect-[16/9] overflow-hidden bg-[#07131C] rounded-xl">
                <img
                  src="/assets/video-stills/person_emerging.jpg"
                  alt="Darany in water, framed in mist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover contrast-105"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="text-[11px] font-mono tracking-widest text-[#75838B] uppercase">
                  Plate II — Rising above cold tides · 04:00 AM coastal recording
                </span>
              </div>
            </div>
          </div>

          {/* Paragraph 3: Love, Vulnerability & Heartbreak */}
          <div className="relative pl-6 sm:pl-8 border-l border-[#C5CDD0]/20">
            <span className="block text-[11px] font-mono uppercase tracking-[0.3em] text-[#75838B] mb-2 font-normal">
              Entry 03 · Devotion & Heartbreak
            </span>
            <p>
              My songs are written directly from the wounds of loving too intensely. Heartbreak isn’t a clean break—it feels like being submerged without warning, watching light retreat from the surface while your lungs tighten. When I write about love, it is rarely triumphant; it is about the quiet ache of giving someone every piece of your devotion and watching the tide carry them away anyway. Songs like <em>White Roses</em> and <em>Spell</em> were never meant to be polished radio anthems. They were pages ripped out of notebooks soaked in salt water, written while sitting on cold floors trying not to collapse under the weight of an empty bed.
            </p>
          </div>

          {/* Paragraph 4: Existential Feelings & The Dark Water */}
          <div className="relative pl-6 sm:pl-8 border-l border-[#C5CDD0]/20">
            <span className="block text-[11px] font-mono uppercase tracking-[0.3em] text-[#75838B] mb-2 font-normal">
              Entry 04 · Existential Depths
            </span>
            <p>
              Why are we so terrified of being unseen, yet so terrified of being known? The visual world you see on this site—the dark ocean, the moon, the mermaid folklore—is how my internal world actually feels. The ocean doesn’t judge what you carry. In deep water, your grief, your loneliness, and your heritage don’t need an explanation; they simply float. If you discovered my music late at night, or if these songs found you while you were trying to hold yourself together, know that every chord was written for you. We are all trying to surface without drowning.
            </p>
          </div>
        </div>

        {/* Diary Sign-Off & Handwritten Closing */}
        <div className="mt-16 pt-8 border-t border-[#C5CDD0]/15 max-w-3xl mx-auto flex flex-col sm:flex-row items-baseline justify-between gap-4">
          <div className="text-xs font-mono text-[#75838B] tracking-wider">
            Written from beneath the surface.
          </div>

          <div className="text-right">
            <span className="font-cinzel text-xl sm:text-2xl tracking-[0.25em] text-[#E7E8E4] font-light block">
              DARANY
            </span>
            <span className="text-[11px] font-mono text-[#75838B]">
              Singer, Composer & Producer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
