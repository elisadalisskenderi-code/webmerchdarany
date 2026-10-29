import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { CompactDisc3D } from './CompactDisc3D';
import { Disc, ChevronLeft, ChevronRight, Eye, Plus, Check } from 'lucide-react';

interface MerchandiseSectionProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, size?: string, color?: string) => void;
}

export const MerchandiseSection: React.FC<MerchandiseSectionProps> = ({
  products,
  onQuickView,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'albums' | 'eps' | 'singles'>('all');
  const [activeDiscIndex, setActiveDiscIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  // Keep active index within bounds of filtered list
  const safeIndex = Math.min(activeDiscIndex, Math.max(0, filteredProducts.length - 1));
  const activeProduct = filteredProducts[safeIndex] || filteredProducts[0];

  useEffect(() => {
    setActiveDiscIndex(0);
  }, [activeCategory]);

  const handleNextDisc = () => {
    setActiveDiscIndex((prev) => (prev + 1) % filteredProducts.length);
  };

  const handlePrevDisc = () => {
    setActiveDiscIndex((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);
  };

  const handleSpotlightAdd = () => {
    if (!activeProduct) return;
    const defaultSize = activeProduct.sizes ? activeProduct.sizes[0] : undefined;
    const defaultColor = activeProduct.colors[0]?.name;
    onQuickAdd(activeProduct, defaultSize, defaultColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1600);
  };

  return (
    <section id="shop" className="relative py-24 sm:py-32 px-6 md:px-12 bg-[#07131C] text-[#E7E8E4] overflow-hidden">
      {/* Background Ambience: Deep oceanic caustics & lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#102631]/20 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#C5CDD0]/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#75838B] mb-2 font-mono">
              <Disc className="w-3.5 h-3.5 text-[#C5CDD0] animate-spin" style={{ animationDuration: '18s' }} />
              <span>Physical Audio Archive · $15</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-5xl md:text-6xl tracking-[0.14em] font-light text-[#E7E8E4]">
              COMPACT DISCS.
            </h2>
            <p className="font-serif italic text-base sm:text-xl text-[#C5CDD0]/80 tracking-wide mt-2">
              Circular media discs with authentic Spotify disc master prints.
            </p>
          </div>

          {/* Translucent Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#102631]/40 border border-[#C5CDD0]/15 rounded-full backdrop-blur-xl shadow-lg self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-full whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-white/15 text-[#E7E8E4] font-medium border border-[#C5CDD0]/30 backdrop-blur-md shadow-sm'
                  : 'text-[#75838B] hover:text-[#E7E8E4] hover:bg-white/5'
              }`}
            >
              All ({products.length})
            </button>
            <button
              onClick={() => setActiveCategory('albums')}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-full whitespace-nowrap cursor-pointer ${
                activeCategory === 'albums'
                  ? 'bg-white/15 text-[#E7E8E4] font-medium border border-[#C5CDD0]/30 backdrop-blur-md shadow-sm'
                  : 'text-[#75838B] hover:text-[#E7E8E4] hover:bg-white/5'
              }`}
            >
              Albums
            </button>
            <button
              onClick={() => setActiveCategory('eps')}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-full whitespace-nowrap cursor-pointer ${
                activeCategory === 'eps'
                  ? 'bg-white/15 text-[#E7E8E4] font-medium border border-[#C5CDD0]/30 backdrop-blur-md shadow-sm'
                  : 'text-[#75838B] hover:text-[#E7E8E4] hover:bg-white/5'
              }`}
            >
              EPs
            </button>
            <button
              onClick={() => setActiveCategory('singles')}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-all duration-300 rounded-full whitespace-nowrap cursor-pointer ${
                activeCategory === 'singles'
                  ? 'bg-white/15 text-[#E7E8E4] font-medium border border-[#C5CDD0]/30 backdrop-blur-md shadow-sm'
                  : 'text-[#75838B] hover:text-[#E7E8E4] hover:bg-white/5'
              }`}
            >
              Singles
            </button>
          </div>
        </div>

        {/* 1. FIRST: Horizontal 3D Disc Selector Track (Appears BEFORE the big CD showing) */}
        <div className="py-2">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#75838B]">
              Browse Media Track ({filteredProducts.length} Discs)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevDisc}
                className="p-2.5 rounded-full border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/60 text-[#C5CDD0] hover:text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-sm"
                aria-label="Previous CD"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextDisc}
                className="p-2.5 rounded-full border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/60 text-[#C5CDD0] hover:text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-sm"
                aria-label="Next CD"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* The Disc Track Row */}
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-10 overflow-x-auto no-scrollbar py-6 px-4 bg-[#102631]/20 rounded-3xl border border-[#C5CDD0]/10 backdrop-blur-sm"
          >
            {filteredProducts.map((p, idx) => {
              const isActive = idx === safeIndex;
              return (
                <div
                  key={p.id}
                  onClick={() => setActiveDiscIndex(idx)}
                  className={`flex flex-col items-center shrink-0 cursor-pointer transition-all duration-500 group select-none ${
                    isActive
                      ? 'scale-110 -translate-y-2'
                      : 'opacity-65 hover:opacity-100 scale-95'
                  }`}
                >
                  {/* Standalone Circular Disc on Track */}
                  <div className="relative">
                    <div
                      className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border transition-all duration-500 shadow-xl ${
                        isActive
                          ? 'border-[#C5CDD0] ring-4 ring-[#C5CDD0]/25 shadow-[0_15px_30px_rgba(0,0,0,0.85)]'
                          : 'border-[#C5CDD0]/25 group-hover:border-[#C5CDD0]/50'
                      }`}
                    >
                      <img
                        src={p.secondaryImage}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover rounded-full ${
                          isActive ? 'animate-cd-spin-slow' : ''
                        }`}
                      />
                      {/* Inner Spindle Hole */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34%] h-[34%] rounded-full border border-white/30 bg-[#07131C]/60 flex items-center justify-center">
                        <div className="w-[50%] h-[50%] rounded-full bg-[#050e14] border border-[#C5CDD0]/60" />
                      </div>
                    </div>

                    {/* Active Indicator Ring */}
                    {isActive && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-[#E7E8E4] shadow-[0_0_10px_#fff]" />
                    )}
                  </div>

                  {/* Disc Title under track */}
                  <span className="font-cinzel text-xs text-[#E7E8E4] mt-4 tracking-wide max-w-[130px] truncate text-center">
                    {p.name.replace(/“|”/g, '')}
                  </span>
                  <span className="font-mono text-[10px] text-[#75838B]">
                    ${p.price}.00
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. SECOND: The Big CD Showing & Editorial Information */}
        {activeProduct && (
          <div className="relative pt-6 pb-10 border-t border-[#C5CDD0]/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Left: Sole Circular 3D Compact Disc Display */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center">
                <div className="relative flex flex-col items-center justify-center w-full min-h-[380px] sm:min-h-[460px]">
                  <CompactDisc3D
                    discImage={activeProduct.secondaryImage}
                    title={activeProduct.name}
                    size="xl"
                    isSpinning={true}
                    interactiveTilt={true}
                    showReflection={true}
                    onClick={() => onQuickView(activeProduct)}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              {/* Right: Editorial Information */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  {/* Grand Title */}
                  <h3 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-[#E7E8E4] tracking-wide mb-3 leading-tight">
                    {activeProduct.name}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-[#C5CDD0]/90 leading-relaxed font-light mb-4">
                    {activeProduct.subtitle}
                  </p>

                  {/* Lore Quote */}
                  <div className="p-4 bg-[#102631]/30 rounded-2xl border-l-2 border-[#C5CDD0]/40 text-xs italic font-serif text-[#C5CDD0] leading-relaxed">
                    {activeProduct.lore}
                  </div>
                </div>

                {/* Physical Master Specs */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#102631]/20 border border-[#C5CDD0]/10">
                    <span className="text-[10px] text-[#75838B] uppercase block">Audio Encoding</span>
                    <span className="text-[#E7E8E4]">16-bit / 44.1kHz Master</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#102631]/20 border border-[#C5CDD0]/10">
                    <span className="text-[10px] text-[#75838B] uppercase block">Packaging</span>
                    <span className="text-[#E7E8E4] truncate block">{activeProduct.specs[1]?.value || 'Audio Master CD'}</span>
                  </div>
                </div>

                {/* Tracklist Preview */}
                {activeProduct.tracklist && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-widest text-[#75838B]">
                      <span>Tracklist ({activeProduct.tracklist.length} Movements)</span>
                      <span className="text-[#C5CDD0]">Stereo Master Audio</span>
                    </div>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {activeProduct.tracklist.map((track, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#102631]/20 border border-[#C5CDD0]/5 text-xs font-light text-[#E7E8E4]"
                        >
                          <span className="font-mono text-[#C5CDD0]">{track}</span>
                          <span className="text-[10px] text-[#75838B] font-mono">Audio CD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Translucent Purchase Bar */}
                <div className="pt-4 border-t border-[#C5CDD0]/10 flex flex-col sm:flex-row items-center gap-4">
                  <div className="font-mono text-2xl sm:text-3xl text-[#E7E8E4] font-semibold shrink-0">
                    ${activeProduct.price}.00
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                    {/* Translucent Glass Add to Bag Button */}
                    <button
                      onClick={handleSpotlightAdd}
                      className="flex-1 py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/40"
                    >
                      {addedNotice ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>CD Added To Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add CD To Bag · $15</span>
                        </>
                      )}
                    </button>

                    {/* Translucent Glass Booklet & Specs Button */}
                    <button
                      onClick={() => onQuickView(activeProduct)}
                      className="py-3.5 px-5 text-xs uppercase tracking-[0.15em] font-medium bg-[#102631]/40 hover:bg-[#102631]/70 border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/50 text-[#C5CDD0] hover:text-[#E7E8E4] rounded-full backdrop-blur-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Booklet & Specs</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
