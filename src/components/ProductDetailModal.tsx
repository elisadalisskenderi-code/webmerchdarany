import React, { useState } from 'react';
import { X, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { CompactDisc3D } from './CompactDisc3D';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.secondaryImage || product.primaryImage);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotice, setAddedNotice] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize || undefined, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
        <div className="relative w-full max-w-4xl bg-[#07131C] border border-[#C5CDD0]/20 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden text-[#E7E8E4]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 text-[#75838B] hover:text-white bg-[#07131C]/70 rounded-full backdrop-blur-sm transition-colors border border-[#C5CDD0]/10 hover:border-[#C5CDD0]/30 shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Gallery & 3D Disc Inspection */}
            <div className="bg-[#0b1a23]/80 p-6 sm:p-8 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-[#C5CDD0]/10">
              <div className="relative w-full aspect-square flex items-center justify-center my-auto">
                {activeImage === product.secondaryImage ? (
                  <CompactDisc3D
                    discImage={product.secondaryImage}
                    title={product.name}
                    size="lg"
                    isSpinning={true}
                    interactiveTilt={true}
                    showReflection={false}
                  />
                ) : (
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-[#C5CDD0]/15">
                    <img
                      src={product.primaryImage}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/30 pointer-events-none" />
                  </div>
                )}
                {product.editionLimit && (
                  <span className="absolute top-0 left-0 text-[10px] uppercase font-mono tracking-widest px-3 py-1 bg-[#07131C]/90 rounded-full border border-[#C5CDD0]/20 text-[#E7E8E4]">
                    {product.editionLimit}
                  </span>
                )}
              </div>

              {/* Media Switcher Pills */}
              <div className="grid grid-cols-2 gap-3 w-full mt-6">
                <button
                  onClick={() => setActiveImage(product.primaryImage)}
                  className={`py-2 px-3 rounded-full text-center text-xs font-mono uppercase tracking-wider border transition-all ${
                    activeImage === product.primaryImage
                      ? 'border-[#C5CDD0] bg-[#102631]/80 text-white shadow-md'
                      : 'border-[#C5CDD0]/15 text-[#75838B] hover:text-white'
                  }`}
                >
                  01. Front & Case
                </button>

                <button
                  onClick={() => setActiveImage(product.secondaryImage)}
                  className={`py-2 px-3 rounded-full text-center text-xs font-mono uppercase tracking-wider border transition-all ${
                    activeImage === product.secondaryImage
                      ? 'border-[#C5CDD0] bg-[#102631]/80 text-white shadow-md'
                      : 'border-[#C5CDD0]/15 text-[#75838B] hover:text-white'
                  }`}
                >
                  02. 3D Audio CD
                </button>
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                {/* Category label */}
                <span className="text-xs uppercase tracking-[0.25em] text-[#75838B] font-mono block mb-1">
                  {product.categoryLabel}
                </span>

                {/* Product Name */}
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#E7E8E4] tracking-wide mb-2">
                  {product.name}
                </h2>

                {/* Price */}
                <div className="font-mono text-xl sm:text-2xl text-[#E7E8E4] mb-4">
                  ${product.price}.00
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#C5CDD0]/90 leading-relaxed font-light mb-4">
                  {product.description}
                </p>

                {/* Poetic lore quote */}
                <div className="p-4 bg-[#102631]/40 rounded-2xl border-l-2 border-[#C5CDD0]/40 text-xs italic font-serif text-[#C5CDD0] mb-6">
                  {product.lore}
                </div>

                {/* Color Selection */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs tracking-wider uppercase mb-2">
                    <span className="text-[#75838B]">Color:</span>
                    <span className="text-[#E7E8E4] font-medium">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-full text-xs transition-all ${
                          selectedColor === c.name
                            ? 'border-[#C5CDD0] bg-[#102631]/80 text-white shadow-sm'
                            : 'border-[#C5CDD0]/20 text-[#75838B] hover:text-white hover:border-[#C5CDD0]/40'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection (if applicable) */}
                {product.sizes && (
                  <div className="mb-6">
                    <div className="flex justify-between text-xs tracking-wider uppercase mb-2">
                      <span className="text-[#75838B]">Size:</span>
                      <span className="text-[#75838B] font-mono">Unisex Fit</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`w-11 h-10 flex items-center justify-center font-mono text-xs uppercase border rounded-xl transition-all ${
                            selectedSize === s
                              ? 'border-[#C5CDD0] bg-[#E7E8E4] text-[#07131C] font-semibold'
                              : 'border-[#C5CDD0]/20 text-[#C5CDD0] hover:border-[#C5CDD0]/50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-xs uppercase tracking-wider text-[#75838B]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#C5CDD0]/20 rounded-full bg-[#07131C] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs hover:bg-[#102631] text-[#C5CDD0] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono tabular-nums">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs hover:bg-[#102631] text-[#C5CDD0] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Trust Indicators */}
              <div className="space-y-4 pt-4 border-t border-[#C5CDD0]/10">
                <button
                  onClick={handleAdd}
                  disabled={addedNotice}
                  className="w-full py-4 text-xs tracking-[0.25em] uppercase font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-black/40"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>CD Added To Bag</span>
                    </>
                  ) : (
                    <span>Add CD To Bag · ${product.price * quantity}.00</span>
                  )}
                </button>

                {/* Guarantee strip */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-[#75838B] font-light text-center border-t border-[#C5CDD0]/10">
                  <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#102631]/20">
                    <Truck className="w-3.5 h-3.5 text-[#C5CDD0]" />
                    <span>Global CD Mailer</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#102631]/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5CDD0]" />
                    <span>Official Spotify Master</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[#102631]/20">
                    <RefreshCw className="w-3.5 h-3.5 text-[#C5CDD0]" />
                    <span>16-Bit / 44.1kHz</span>
                  </div>
                </div>

                {/* Technical Specifications Accordion / Specs */}
                <div className="pt-2 text-xs border-t border-[#C5CDD0]/10 space-y-1">
                  <div className="text-[11px] uppercase font-mono tracking-wider text-[#C5CDD0] mb-1">
                    Specifications
                  </div>
                  {product.specs.map((sp) => (
                    <div key={sp.label} className="flex justify-between text-[#75838B]">
                      <span>{sp.label}</span>
                      <span className="text-[#E7E8E4]">{sp.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tracklist Display for Physical CDs */}
                {product.tracklist && product.tracklist.length > 0 && (
                  <div className="pt-3 text-xs border-t border-[#C5CDD0]/10 space-y-2">
                    <div className="flex justify-between items-center text-[11px] uppercase font-mono tracking-wider text-[#C5CDD0]">
                      <span>Tracklist</span>
                      <span className="text-[#75838B]">{product.tracklist.length} Tracks · Uncompressed Audio</span>
                    </div>
                    <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                      {product.tracklist.map((track, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1.5 px-3 bg-[#102631]/30 border border-[#C5CDD0]/5 rounded-xl text-xs text-[#E7E8E4] font-light"
                        >
                          <span className="font-mono text-[#C5CDD0]/90">{track}</span>
                          <span className="text-[10px] text-[#75838B] font-mono">Stereo CD</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
