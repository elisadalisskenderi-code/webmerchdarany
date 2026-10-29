import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MerchandiseSection } from './components/MerchandiseSection';
import { ArtistWorld } from './components/ArtistWorld';
import { MusicSection } from './components/MusicSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { UpcomingProjects } from './components/UpcomingProjects';
import { PRODUCTS } from './data/products';
import { Product, CartItem, OrderConfirmation } from './types';

import { soundEngine } from './utils/audio';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cd-album-ether-onesize-Official Album Jewel Case',
      product: PRODUCTS.find((p) => p.id === 'cd-album-ether') || PRODUCTS[0],
      selectedColor: 'Official Album Jewel Case',
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [recentOrder, setRecentOrder] = useState<OrderConfirmation | null>(null);

  // Autoplay « Make a Wish (interlude) » on loop
  useEffect(() => {
    soundEngine.initAutoplay();
  }, []);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size?: string,
    color?: string,
    quantity: number = 1
  ) => {
    const itemColor = color || product.colors[0]?.name || 'Standard';
    const itemSize = size || (product.sizes ? product.sizes[0] : undefined);
    const cartItemId = `${product.id}-${itemSize || 'onesize'}-${itemColor}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize: itemSize,
            selectedColor: itemColor,
            quantity,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderComplete = (order: OrderConfirmation) => {
    setRecentOrder(order);
    setCartItems([]);
  };

  const handleScrollToShop = () => {
    const shopElem = document.getElementById('shop');
    if (shopElem) {
      shopElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#07131C] text-[#E7E8E4] flex flex-col font-sans selection:bg-[#75838B]/30 selection:text-white">
      {/* Fixed Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Hero Section with exact video */}
        <Hero onExploreMerch={handleScrollToShop} />

        {/* Merchandise Section: Physical CDs (Albums, EPs, Singles at $15) */}
        <MerchandiseSection
          products={PRODUCTS}
          onQuickView={(prod) => setSelectedProductForDetail(prod)}
          onQuickAdd={(prod, size, color) => handleAddToCart(prod, size, color, 1)}
        />

        {/* Artist World / Get to know the artist (French & Cambodian singer, composer & producer) */}
        <ArtistWorld />

        {/* Upcoming Projects: MARIPOSA */}
        <UpcomingProjects />

        {/* Music & Spotify Integration */}
        <MusicSection />

        {/* Stay Under / Newsletter Transmission */}
        <Newsletter />
      </main>

      {/* Minimalist Dark Footer */}
      <Footer
        onOpenContact={() => setIsContactOpen(true)}
        isContactOpen={isContactOpen}
        onCloseContact={() => setIsContactOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Detail / Quick View Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        isOpen={!!selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems.length > 0 ? cartItems : recentOrder ? recentOrder.items : []}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
