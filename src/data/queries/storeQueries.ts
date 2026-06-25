import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { Product, Category, Slide, HomeSection, NavItem, BlogPost, StoreSettings, Review } from '../types';

// Mock imports
import { mockProducts } from '../mock/products';
import { mockCategories } from '../mock/categories';
import { mockSlides } from '../mock/slides';
import { mockHomeSections } from '../mock/homeSections';
import { mockNavItems } from '../mock/navItems';
import { mockBlogPosts } from '../mock/blogPosts';
import { mockReviews } from '../mock/reviews';
import { mockStoreSettings } from '../mock/settings';

const DELAY_MS = 600; // Simulated latency in ms

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Products Queries
export function useProducts(filters?: {
  categorySlug?: string;
  search?: string;
  productType?: string;
  isFeatured?: boolean;
}) {
  return useQuery<Product[], Error>({
    queryKey: queryKeys.products.list(filters),
    queryFn: async () => {
      await delay(DELAY_MS);
      let list = [...mockProducts];

      if (filters?.isFeatured !== undefined) {
        list = list.filter(p => p.isFeatured === filters.isFeatured);
      }

      if (filters?.productType) {
        list = list.filter(p => p.productType === filters.productType);
      }

      if (filters?.categorySlug) {
        // Simple mapping from category slug to product tags or types
        // Let's map categories to productType or platforms for richer mock filtering
        if (filters.categorySlug === 'gaming') {
          list = list.filter(p => p.productType === 'game_key');
        } else if (filters.categorySlug === 'comptes') {
          list = list.filter(p => p.productType === 'account');
        } else if (filters.categorySlug === 'outils-ia') {
          list = list.filter(p => p.productType === 'ai_tool');
        } else if (filters.categorySlug === 'boosting') {
          list = list.filter(p => p.productType === 'boosting');
        } else if (filters.categorySlug === 'abonnements') {
          list = list.filter(p => p.productType === 'subscription');
        } else if (filters.categorySlug === 'recharges') {
          list = list.filter(p => p.productType === 'topup');
        }
      }

      if (filters?.search) {
        const query = filters.search.toLowerCase();
        list = list.filter(p =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.platforms.some(pl => pl.toLowerCase().includes(query)) ||
          p.genres.some(g => g.toLowerCase().includes(query))
        );
      }

      return list.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  });
}

export function useProduct(idOrSlug: string) {
  return useQuery<Product, Error>({
    queryKey: queryKeys.products.detail(idOrSlug),
    queryFn: async () => {
      await delay(DELAY_MS);
      const product = mockProducts.find(p => p.id === idOrSlug || p.slug === idOrSlug);
      if (!product) {
        throw new Error(`Produit introuvable: ${idOrSlug}`);
      }
      return product;
    },
    enabled: !!idOrSlug
  });
}

// Categories Queries
export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: queryKeys.categories.list(),
    queryFn: async () => {
      await delay(DELAY_MS);
      return [...mockCategories]
        .filter(c => c.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
  });
}

// Slides Queries
export function useSlides() {
  return useQuery<Slide[], Error>({
    queryKey: queryKeys.slides.list(),
    queryFn: async () => {
      await delay(DELAY_MS);
      return [...mockSlides]
        .filter(s => s.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
  });
}

// Home Sections Queries
export function useHomeSections() {
  return useQuery<HomeSection[], Error>({
    queryKey: queryKeys.homeSections.list(),
    queryFn: async () => {
      await delay(DELAY_MS);
      return [...mockHomeSections]
        .filter(hs => hs.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);
    }
  });
}

// Nav Items Queries
export function useNavItems(location?: 'header' | 'footer') {
  return useQuery<NavItem[], Error>({
    queryKey: queryKeys.navItems.list(location),
    queryFn: async () => {
      await delay(DELAY_MS);
      let list = [...mockNavItems].filter(n => n.isActive);
      if (location) {
        list = list.filter(n => n.location === location);
      }
      return list.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  });
}

// Blog Posts Queries
export function useBlogPosts() {
  return useQuery<BlogPost[], Error>({
    queryKey: queryKeys.blogPosts.list(),
    queryFn: async () => {
      await delay(DELAY_MS);
      return [...mockBlogPosts]
        .filter(bp => bp.status === 'published')
        .sort((a, b) => {
          const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
          const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
          return dateB - dateA;
        });
    }
  });
}

export function useBlogPost(slug: string) {
  return useQuery<BlogPost, Error>({
    queryKey: queryKeys.blogPosts.detail(slug),
    queryFn: async () => {
      await delay(DELAY_MS);
      const post = mockBlogPosts.find(bp => bp.slug === slug);
      if (!post) {
        throw new Error(`Article introuvable: ${slug}`);
      }
      return post;
    },
    enabled: !!slug
  });
}

// Reviews Queries
export function useReviews() {
  return useQuery<Review[], Error>({
    queryKey: queryKeys.reviews.list(),
    queryFn: async () => {
      await delay(DELAY_MS);
      return [...mockReviews];
    }
  });
}

// Settings Queries
export function useSettings() {
  return useQuery<StoreSettings, Error>({
    queryKey: queryKeys.settings.detail,
    queryFn: async () => {
      await delay(DELAY_MS);
      return { ...mockStoreSettings };
    }
  });
}
