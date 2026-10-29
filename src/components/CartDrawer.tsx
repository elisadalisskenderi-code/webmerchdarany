import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#07131C] border-l border-[#C5CDD0]/15 flex flex-col justify-between shadow-2xl sm:rounded-l-3xl overflow-hidden">
          {/* Cart Header */}
          <div className="p-6 border-b border-[#C5CDD0]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#C5CDD0]" />
              <h2 className="font-cinzel text-lg tracking-[0.2em] uppercase text-[#E7E8E4]">
                Your Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#75838B] hover:text-white rounded-full bg-[#102631]/40 border border-[#C5CDD0]/10 transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping & Archival Perk Gauge */}
          <div className="px-6 py-3.5 bg-[#102631]/40 border-b border-[#C5CDD0]/10 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-[#C5CDD0] font-light">
                ✦ <span className="font-medium">Complimentary Insured Shipping</span> unlocked + Archival Audio Postcard included.
              </p>
            ) : (
              <p className="text-[#75838B] font-light">
                Add <span className="text-[#E7E8E4] font-mono tabular-nums">${amountNeeded}</span> more for complimentary worldwide shipping.
              </p>
            )}
            <div className="w-full bg-[#07131C] h-1.5 mt-2 rounded-full overflow-hidden border border-[#C5CDD0]/10">
              <div
                className="bg-[#C5CDD0] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#75838B]">
                <div className="w-16 h-16 rounded-full bg-[#102631]/40 border border-[#C5CDD0]/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#75838B]" />
                </div>
                <p className="font-cinzel text-base text-[#E7E8E4] tracking-wider mb-2">
                  THE BAG IS EMPTY
                </p>
                <p className="text-xs max-w-xs font-light mb-6">
                  No artifacts have been selected from beneath the surface yet.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs tracking-[0.2em] uppercase font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-xl transition-all cursor-pointer shadow-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-[#C5CDD0]/10 group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#102631] shrink-0 overflow-hidden border border-[#C5CDD0]/10 rounded-xl shadow-md">
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-cinzel text-sm text-[#E7E8E4] tracking-wide leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#75838B] hover:text-rose-400 p-1.5 rounded-full hover:bg-[#102631] transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#75838B] mt-1 space-x-2 font-mono">
                        <span>Physical Audio CD</span>
                        <span>·</span>
                        <span>{item.selectedColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#C5CDD0]/20 rounded-full bg-[#07131C] p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#102631] text-[#C5CDD0] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono tabular-nums text-[#E7E8E4]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#102631] text-[#C5CDD0] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price calculation */}
                      <span className="font-mono tabular-nums text-sm font-medium text-[#E7E8E4]">
                        ${item.product.price * item.quantity}.00
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#C5CDD0]/10 bg-[#050e14] space-y-4">
              <div className="space-y-1.5 text-xs font-light">
                <div className="flex justify-between text-[#75838B]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#E7E8E4]">${subtotal}.00</span>
                </div>
                <div className="flex justify-between text-[#75838B]">
                  <span>Shipping</span>
                  <span className="font-mono text-[#E7E8E4]">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$10.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-[#E7E8E4] pt-2 border-t border-[#C5CDD0]/10">
                  <span className="font-cinzel tracking-wider">Estimated Total</span>
                  <span className="font-mono tabular-nums">
                    ${subtotal + (subtotal >= freeShippingThreshold ? 0 : 10)}.00
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-4 text-xs tracking-[0.25em] uppercase font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-black/50"
              >
                <span>Proceed To Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#75838B] font-light">
                Taxes calculated at checkout. Dispatched in discreet archival packaging.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
