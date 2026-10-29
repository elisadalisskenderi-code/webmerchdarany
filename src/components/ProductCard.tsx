import React, { useState } from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onQuickAdd: (product: Product, size?: string, color?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onQuickAdd,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes ? product.sizes[0] : undefined;
    const defaultColor = product.colors[0]?.name;
    onQuickAdd(product, defaultSize, defaultColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1500);
  };

  return (
    <div
      className="group relative flex flex-col items-center cursor-pointer transition-all duration-500 py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onQuickView(product);
      }}
    >
      {/* Tactile Media Stage: Jewel Case + Slide-out Circular Compact Disc (No nested squares) */}
      <div className="relative w-full aspect-square max-w-[320px] flex items-center justify-center select-none">
        {/* Soft Ambient Glow under active media */}
        <div className="absolute inset-4 rounded-full bg-[#102631]/30 blur-2xl group-hover:bg-[#102631]/60 transition-all duration-700 pointer-events-none" />

        {/* Jewel Case / Digipak Slipcase (Slightly tilted behind) */}
        <div
          className="relative w-[78%] aspect-square rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out z-10 border border-[#C5CDD0]/15"
          style={{
            transform: isHovered
              ? 'translateX(-18px) rotateY(-8deg) scale(0.96)'
              : 'translateX(0) rotateY(0) scale(1)',
          }}
        >
          <img
            src={product.primaryImage}
            alt={`${product.name} packaging`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Jewel Case Glass Spine & Edge Sheen */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-white/20 to-transparent pointer-events-none" />

          {/* Status Badge */}
          {product.editionLimit && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#07131C]/90 backdrop-blur-md border border-[#C5CDD0]/20 text-[9px] uppercase font-mono tracking-widest text-[#E7E8E4]">
              {product.editionLimit.includes('100') ? 'Ltd 100' : 'Archival'}
            </div>
          )}
        </div>

        {/* Circular Compact Disc (Slides out from inside the jewel case on hover) */}
        <div
          className="absolute w-[74%] aspect-square rounded-full transition-all duration-700 ease-out z-20"
          style={{
            transform: isHovered
              ? 'translateX(34px) rotate(45deg) scale(1.02)'
              : 'translateX(0) rotate(0deg) scale(0.92)',
            opacity: isHovered ? 1 : 0.85,
          }}
        >
          {/* Circular Disc with authentic iridescent rainbow sheen & center hole */}
          <div className="relative w-full h-full rounded-full overflow-hidden border border-[#C5CDD0]/50 shadow-[0_15px_35px_rgba(0,0,0,0.85),inset_0_0_10px_rgba(255,255,255,0.4)]">
            <img
              src={product.secondaryImage}
              alt={`${product.name} disc`}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover rounded-full ${
                isHovered ? 'animate-cd-spin-medium' : ''
              }`}
            />

            {/* Iridescent Spectral Conic Sheen */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none mix-blend-screen opacity-60"
              style={{
                background:
                  'conic-gradient(from 60deg at 50% 50%, rgba(255,255,255,0) 0deg, rgba(160,230,255,0.3) 45deg, rgba(255,180,240,0.2) 90deg, rgba(180,255,210,0.2) 135deg, rgba(255,255,255,0) 180deg, rgba(160,230,255,0.3) 225deg, rgba(255,180,240,0.2) 270deg, rgba(180,255,210,0.2) 315deg, rgba(255,255,255,0) 360deg)',
              }}
            />

            {/* Clear Hub & Spindle Hole */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36%] h-[36%] rounded-full border border-white/30 bg-gradient-to-tr from-white/20 via-black/40 to-white/10 backdrop-blur-[2px] flex items-center justify-center">
              <div className="w-[50%] h-[50%] rounded-full bg-[#07131C] border border-[#C5CDD0]/70" />
            </div>
          </div>
        </div>
      </div>

      {/* Pure Floating Editorial Metadata (No enclosing boxes or rigid borders) */}
      <div className="w-full text-center mt-5 space-y-2 px-2">
        {/* Category & Track Tag */}
        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#75838B] font-mono">
          <span>{product.categoryLabel}</span>
          {product.tracklist && (
            <>
              <span>·</span>
              <span>{product.tracklist.length} Tracks</span>
            </>
          )}
          {product.releaseYear && (
            <>
              <span>·</span>
              <span>{product.releaseYear}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-cinzel text-lg sm:text-xl text-[#E7E8E4] group-hover:text-white transition-colors tracking-wide leading-tight">
          {product.name}
        </h3>

        {/* Subtitle */}
        <p className="text-xs text-[#75838B] line-clamp-1 font-light max-w-xs mx-auto">
          {product.subtitle}
        </p>

        {/* Price & Action Pills */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className="font-mono text-sm font-semibold text-[#E7E8E4]">
            ${product.price}.00
          </span>

          <span className="text-[#75838B] text-xs">·</span>

          <button
            onClick={handleQuickAdd}
            className="px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-md transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            {addedNotice ? (
              <>
                <Check className="w-3 h-3 text-emerald-800" />
                <span>In Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3 h-3" />
                <span>Add CD · $15</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-1.5 text-[#75838B] hover:text-[#E7E8E4] rounded-full hover:bg-[#102631]/60 transition-colors"
            title="View Disc Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
