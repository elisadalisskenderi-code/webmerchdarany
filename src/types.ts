export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: 'albums' | 'eps' | 'singles';
  categoryLabel: string;
  description: string;
  lore: string;
  primaryImage: string;
  secondaryImage: string;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  specs: { label: string; value: string }[];
  inStock: boolean;
  editionLimit?: string;
  tracklist?: string[];
  releaseYear?: string;
  spotifyUri?: string;
}

export interface UpcomingProject {
  id: string;
  title: string;
  subtitle: string;
  format: string;
  releaseWindow: string;
  status: string;
  description: string;
  aestheticNotes: string;
  lore: string;
  image: string;
  secondaryImage?: string;
  trackCount: number;
  details: { label: string; value: string }[];
}

export interface CartItem {
  id: string; // unique item instance id: `${productId}-${size}-${color}`
  product: Product;
  selectedSize?: string;
  selectedColor: string;
  quantity: number;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  shippingSpeed: 'standard' | 'express';
  notes?: string;
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
}
