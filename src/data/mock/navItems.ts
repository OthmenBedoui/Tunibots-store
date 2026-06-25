import { NavItem } from '../types';

export const mockNavItems: NavItem[] = [
  // Header Navigation
  {
    id: 'nav-home',
    location: 'header',
    label: 'Accueil',
    url: '/',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'nav-products',
    location: 'header',
    label: 'Boutique',
    url: '/produits',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'nav-blog',
    location: 'header',
    label: 'Blog / Guides',
    url: '/blog',
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'nav-about',
    location: 'header',
    label: 'À propos',
    url: '/a-propos',
    sortOrder: 4,
    isActive: true
  },
  {
    id: 'nav-contact',
    location: 'header',
    label: 'Contact',
    url: '/contact',
    sortOrder: 5,
    isActive: true
  },

  // Footer Navigation - Section 1: Information
  {
    id: 'foot-cgv',
    location: 'footer',
    label: 'Conditions Générales de Vente (CGV)',
    url: '/cgv',
    sortOrder: 1,
    isActive: true
  },
  {
    id: 'foot-privacy',
    location: 'footer',
    label: 'Politique de Confidentialité',
    url: '/confidentialite',
    sortOrder: 2,
    isActive: true
  },
  {
    id: 'foot-faq',
    location: 'footer',
    label: 'Foire Aux Questions (FAQ)',
    url: '/faq',
    sortOrder: 3,
    isActive: true
  },
  {
    id: 'foot-support',
    location: 'footer',
    label: 'Centre d\'Aide / Support',
    url: '/contact',
    sortOrder: 4,
    isActive: true
  }
];
