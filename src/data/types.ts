export type ProductType = 'game_key' | 'account' | 'ai_tool' | 'boosting' | 'subscription' | 'topup' | 'other';

export interface Product {
  id: string;
  slug: string;
  title: string;
  productType: ProductType;
  description?: string;
  originalPrice: number;
  price: number;
  discountPct: number;
  rating: number;
  ratingCount: number;
  platforms: string[];
  genres: string[];
  features: string[];
  coverImage?: string;
  bannerImage?: string;
  screenshots: string[];
  attributes: Record<string, unknown>;
  requiresManualDelivery: boolean;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string; // Lucide icon name or emoji
  gradientFrom: string; // Tailwind color class e.g., 'orange-500'
  gradientTo: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  startsAt?: string;
  endsAt?: string;
  sortOrder: number;
  isActive: boolean;
}

export type HomeSectionKey = 'hero' | 'featured' | 'categories' | 'trust' | 'reviews' | 'blog_latest' | 'cta';

export interface HomeSection {
  id: string;
  sectionKey: HomeSectionKey;
  title?: string;
  payload: Record<string, unknown>;
  sortOrder: number;
  isActive: boolean;
}

export interface NavItem {
  id: string;
  location: 'header' | 'footer';
  label: string;
  url: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  body: unknown; // Can be string containing markdown or rich block structure
  tags: string[];
  status: 'draft' | 'published';
  publishedAt?: string;
  seo: Record<string, unknown>;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  role?: string; // Optional helper
  date?: string; // Optional helper
}

export interface StoreSettings {
  storeName: string;
  logoUrl?: string;
  supportEmail?: string;
  whatsappNumber?: string;
  socials: Record<string, string>;
}

export interface CartItem {
  productId: string;
  title: string;
  coverImage?: string;
  platform?: string;
  unitPrice: number;
  qty: number;
}
