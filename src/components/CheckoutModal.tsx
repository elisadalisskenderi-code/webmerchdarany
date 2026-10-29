import React, { useState } from 'react';
import { X, CheckCircle2, Lock, CreditCard, Shield, ArrowRight, Printer } from 'lucide-react';
import { CartItem, CustomerDetails, OrderConfirmation } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: OrderConfirmation) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= 100;
  const [shippingSpeed, setShippingSpeed] = useState<'standard' | 'express'>('standard');
  const shippingCost = isFreeShipping
    ? 0
    : shippingSpeed === 'express'
    ? 22
    : 10;
  const orderTotal = subtotal + shippingCost;

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    country: 'United States',
    postalCode: '',
    shippingSpeed: 'standard',
  });

  const [paymentType, setPaymentType] = useState<'card' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      errs.email = 'Valid email is required';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal / ZIP code is required';

    if (paymentType === 'card') {
      if (cardNumber.replace(/\s+/g, '').length < 15) {
        errs.cardNumber = 'Enter a valid 16-digit card number';
      }
      if (!cardExpiry.includes('/')) {
        errs.cardExpiry = 'MM/YY required';
      }
      if (cardCvc.length < 3) {
        errs.cardCvc = '3 or 4 digits required';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrder: OrderConfirmation = {
        orderId: `DRN-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        customer: { ...formData, shippingSpeed },
        items: [...items],
        subtotal,
        shipping: shippingCost,
        total: orderTotal,
      };

      setConfirmation(generatedOrder);
      setIsProcessing(false);
      onOrderComplete(generatedOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={() => !isProcessing && onClose()}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6 md:p-10 relative z-10">
        <div className="relative w-full max-w-3xl bg-[#07131C] border border-[#C5CDD0]/20 rounded-3xl shadow-2xl shadow-black/90 p-6 sm:p-10 text-[#E7E8E4]">
          {/* Close button */}
          {!confirmation && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 text-[#75838B] hover:text-white rounded-full bg-[#102631]/40 border border-[#C5CDD0]/10 hover:border-[#C5CDD0]/30 transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {confirmation ? (
            /* Order Confirmation View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#102631] border border-[#C5CDD0]/30 mx-auto flex items-center justify-center text-[#C5CDD0] animate-bounce">
                <CheckCircle2 className="w-8 h-8 text-[#E7E8E4]" />
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-[0.3em] text-[#75838B] block mb-1">
                  Dispatch Confirmed
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl text-[#E7E8E4] tracking-wide mb-2">
                  ORDER #{confirmation.orderId}
                </h2>
                <p className="text-sm text-[#C5CDD0]/90 font-light max-w-md mx-auto">
                  Thank you, {confirmation.customer.fullName}. Your artifact package has been prepared for dispatch from our nocturnal archives.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="ocean-card rounded-2xl p-6 border border-[#C5CDD0]/10 text-left max-w-xl mx-auto space-y-4">
                <div className="border-b border-[#C5CDD0]/10 pb-3 flex justify-between text-xs font-mono text-[#75838B]">
                  <span>DATE: {confirmation.date}</span>
                  <span>DESTINATION: {confirmation.customer.city}, {confirmation.customer.country}</span>
                </div>

                <div className="space-y-3">
                  {confirmation.items.map((it) => (
                    <div key={it.id} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-cinzel text-sm text-[#E7E8E4]">{it.product.name}</span>
                        <div className="text-[11px] text-[#75838B]">
                          Qty: {it.quantity} · Physical Audio CD · {it.selectedColor}
                        </div>
                      </div>
                      <span className="font-mono tabular-nums text-sm">
                        ${it.product.price * it.quantity}.00
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#C5CDD0]/10 pt-3 space-y-1.5 text-xs text-[#75838B]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-mono tabular-nums text-[#E7E8E4]">${confirmation.subtotal}.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-mono text-[#E7E8E4]">
                      {confirmation.shipping === 0 ? 'Complimentary' : `$${confirmation.shipping}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#E7E8E4] pt-2 border-t border-[#C5CDD0]/10">
                    <span className="font-cinzel">Total Paid</span>
                    <span className="font-mono tabular-nums">${confirmation.total}.00</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#75838B] max-w-md mx-auto font-light">
                A verification receipt and tracking coordinates have been transmitted to <span className="text-[#E7E8E4] font-mono">{confirmation.customer.email}</span>.
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium border border-[#C5CDD0]/20 hover:border-[#C5CDD0]/60 text-[#C5CDD0] rounded-full flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-2.5 text-xs uppercase tracking-[0.2em] font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-xl transition-all shadow-md"
                >
                  Return To Ocean
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-[0.25em] text-[#75838B] mb-1">
                  <Lock className="w-3.5 h-3.5 text-[#C5CDD0]" />
                  <span>Encrypted Checkout</span>
                </div>
                <h2 className="font-cinzel text-2xl sm:text-3xl text-[#E7E8E4] tracking-wide">
                  DISPATCH DETAILS
                </h2>
              </div>

              {/* Order Items Preview Ribbon */}
              <div className="p-4 bg-[#102631]/40 border border-[#C5CDD0]/10 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-[#75838B]">Cart items ({items.length}):</span>
                  <span className="text-[#E7E8E4] font-mono">
                    {items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                  </span>
                </div>
                <span className="font-mono text-sm font-semibold text-[#E7E8E4] shrink-0 ml-2">
                  ${orderTotal}.00
                </span>
              </div>

              {/* 1. Customer Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase font-mono tracking-widest text-[#C5CDD0] border-b border-[#C5CDD0]/10 pb-1.5">
                  1. Shipping Destination
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Marina Thorne"
                      className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                    />
                    {errors.fullName && <p className="text-[10px] text-rose-300 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.name@domain.com"
                      className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                    />
                    {errors.email && <p className="text-[10px] text-rose-300 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="742 Evergreen Ocean Way, Suite 4B"
                    className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                  />
                  {errors.address && <p className="text-[10px] text-rose-300 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Seattle"
                      className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                    />
                    {errors.city && <p className="text-[10px] text-rose-300 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Australia">Australia</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="98101"
                      className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                    />
                    {errors.postalCode && <p className="text-[10px] text-rose-300 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShippingSpeed('standard')}
                    className={`p-3.5 text-left border rounded-2xl transition-all ${
                      shippingSpeed === 'standard'
                        ? 'border-[#C5CDD0] bg-[#102631]/60 shadow-md'
                        : 'border-[#C5CDD0]/10 hover:border-[#C5CDD0]/30'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-cinzel text-[#E7E8E4]">Standard Sea Mail</span>
                      <span className="font-mono">{isFreeShipping ? 'FREE' : '$10.00'}</span>
                    </div>
                    <p className="text-[10px] text-[#75838B] mt-0.5 font-light">4–7 Business Days</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShippingSpeed('express')}
                    className={`p-3.5 text-left border rounded-2xl transition-all ${
                      shippingSpeed === 'express'
                        ? 'border-[#C5CDD0] bg-[#102631]/60 shadow-md'
                        : 'border-[#C5CDD0]/10 hover:border-[#C5CDD0]/30'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-cinzel text-[#E7E8E4]">Express Nocturnal Courier</span>
                      <span className="font-mono">$22.00</span>
                    </div>
                    <p className="text-[10px] text-[#75838B] mt-0.5 font-light">2–3 Business Days (Priority)</p>
                  </button>
                </div>
              </div>

              {/* 2. Payment Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#C5CDD0]/10 pb-1.5">
                  <h3 className="text-xs uppercase font-mono tracking-widest text-[#C5CDD0]">
                    2. Payment Method
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#75838B]">
                    <Shield className="w-3 h-3 text-[#C5CDD0]" />
                    <span>256-bit TLS</span>
                  </div>
                </div>

                {/* Method selector */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentType('card')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border rounded-full text-xs uppercase tracking-wider transition-all ${
                      paymentType === 'card'
                        ? 'border-[#C5CDD0] bg-[#102631]/80 text-white shadow-sm'
                        : 'border-[#C5CDD0]/20 text-[#75838B] hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Credit / Debit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('apple_pay')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border rounded-full text-xs uppercase tracking-wider transition-all ${
                      paymentType === 'apple_pay'
                        ? 'border-[#C5CDD0] bg-[#102631]/80 text-white shadow-sm'
                        : 'border-[#C5CDD0]/20 text-[#75838B] hover:text-white'
                    }`}
                  >
                    <span> Apple Pay / Wallets</span>
                  </button>
                </div>

                {paymentType === 'card' ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 ···· ···· 8921"
                        className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                      />
                      {errors.cardNumber && <p className="text-[10px] text-rose-300 mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                          Expiry (MM/YY) *
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="11/28"
                          className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                        />
                        {errors.cardExpiry && <p className="text-[10px] text-rose-300 mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[#75838B] mb-1">
                          CVC / CVV *
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="···"
                          className="w-full bg-[#07131C] border border-[#C5CDD0]/20 rounded-xl px-3.5 py-2.5 text-xs font-mono text-[#E7E8E4] focus:outline-none focus:border-[#C5CDD0]"
                        />
                        {errors.cardCvc && <p className="text-[10px] text-rose-300 mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-[#102631]/40 border border-[#C5CDD0]/10 rounded-2xl text-center text-xs text-[#C5CDD0] space-y-2">
                    <p>Device wallet tokenization enabled. Click below to confirm dispatch with biometric passkey.</p>
                  </div>
                )}
              </div>

              {/* Total Summary and Submit Button */}
              <div className="pt-4 border-t border-[#C5CDD0]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left w-full sm:w-auto">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#75838B] block">
                    Total Due
                  </span>
                  <span className="font-mono text-2xl font-semibold text-[#E7E8E4]">
                    ${orderTotal}.00
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-10 py-3.5 text-xs uppercase tracking-[0.25em] font-medium text-[#E7E8E4] bg-white/10 hover:bg-white/20 border border-[#C5CDD0]/30 hover:border-[#C5CDD0]/60 rounded-full backdrop-blur-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-black/60 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Verifying Transmission...</span>
                  ) : (
                    <>
                      <span>Complete Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-center text-[#75838B] font-light">
                Direct artist storefront transaction. To integrate custom production Stripe/Shopify webhooks, configure keys in environment.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
