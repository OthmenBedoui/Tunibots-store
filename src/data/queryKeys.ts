export const queryKeys = {
  products: {
    all: ['products'] as const,
    list: (filters?: Record<string, unknown>) => ['products', 'list', filters] as const,
    detail: (idOrSlug: string) => ['products', 'detail', idOrSlug] as const,
  },
  categories: {
    all: ['categories'] as const,
    list: () => ['categories', 'list'] as const,
  },
  slides: {
    all: ['slides'] as const,
    list: () => ['slides', 'list'] as const,
  },
  homeSections: {
    all: ['homeSections'] as const,
    list: () => ['homeSections', 'list'] as const,
  },
  navItems: {
    all: ['navItems'] as const,
    list: (location?: 'header' | 'footer') => ['navItems', 'list', location] as const,
  },
  blogPosts: {
    all: ['blogPosts'] as const,
    list: () => ['blogPosts', 'list'] as const,
    detail: (slug: string) => ['blogPosts', 'detail', slug] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    list: () => ['reviews', 'list'] as const,
  },
  settings: {
    detail: ['settings'] as const,
  }
};
