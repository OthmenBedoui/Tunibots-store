import { Slide } from '../types';

export const mockSlides: Slide[] = [
  {
    id: 'slide-1',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1600&auto=format&fit=crop&q=80',
    title: 'VOTRE PARTENAIRE GAMING & IA N°1 EN TUNISIE',
    subtitle: 'Clés de jeux Steam, abonnements premium, comptes exclusifs et recharges rapides. Livraison en 15 minutes chrono.',
    ctaLabel: 'Découvrir la Boutique',
    ctaUrl: '/produits',
    startsAt: '2026-01-01',
    endsAt: '2026-12-31',
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'slide-2',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80',
    title: 'BOOSTEZ VOTRE PRODUCTIVITÉ AVEC L\'IA',
    subtitle: 'ChatGPT Plus, Canva Pro, Midjourney aux tarifs les plus bas du marché. Comptes privatifs ou partagés garantis.',
    ctaLabel: 'Voir les Outils IA',
    ctaUrl: '/produits?category=outils-ia',
    startsAt: '2026-01-01',
    endsAt: '2026-12-31',
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'slide-3',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80',
    title: 'COMPTES & BOOSTING JEUX COMPÉTITIFS',
    subtitle: 'Montez en grade sur Valorant, League of Legends ou Apex avec notre équipe de joueurs pros agréés.',
    ctaLabel: 'Nos Services Boosting',
    ctaUrl: '/produits?category=boosting',
    startsAt: '2026-01-01',
    endsAt: '2026-12-31',
    sortOrder: 3,
    isActive: true,
  }
];
