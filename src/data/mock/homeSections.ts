import { HomeSection } from '../types';

export const mockHomeSections: HomeSection[] = [
  {
    id: 'section-hero',
    sectionKey: 'hero',
    title: 'Bannière Principale',
    payload: {
      autoplaySpeed: 5000,
      showArrows: true,
      showDots: true,
    },
    sortOrder: 1,
    isActive: true,
  },
  {
    id: 'section-categories',
    sectionKey: 'categories',
    title: 'Parcourez Nos Catégories',
    payload: {
      gridCols: 6,
      showDescription: true,
    },
    sortOrder: 2,
    isActive: true,
  },
  {
    id: 'section-featured',
    sectionKey: 'featured',
    title: 'Sélection Premium & Offres Spéciales',
    payload: {
      limit: 6,
      tabbed: true, // true to allow switching between Featured, New, Discounts
    },
    sortOrder: 3,
    isActive: true,
  },
  {
    id: 'section-trust',
    sectionKey: 'trust',
    title: 'Pourquoi Choisir TUNIBOTS ?',
    payload: {
      features: [
        {
          icon: 'Zap',
          title: 'Livraison Éclair',
          description: 'Vos clés d\'activation et comptes premium livrés en moins de 15 minutes par mail et SMS.'
        },
        {
          icon: 'ShieldCheck',
          title: 'Garantie Totale',
          description: 'Tous nos produits sont assortis d\'une garantie de remplacement ou de remboursement.'
        },
        {
          icon: 'MessagesSquare',
          title: 'Support Client National',
          description: 'Une équipe francophone disponible 7j/7 via WhatsApp et Mail pour vous guider.'
        },
        {
          icon: 'Coins',
          title: 'Paiement Sécurisé',
          description: 'Payez en toute confiance via Dinar Tunisien, carte de crédit ou virements nationaux.'
        }
      ]
    },
    sortOrder: 4,
    isActive: true,
  },
  {
    id: 'section-reviews',
    sectionKey: 'reviews',
    title: 'Ce Que Disent Nos Clients',
    payload: {
      avgRating: 4.8,
      totalCount: 1450,
    },
    sortOrder: 5,
    isActive: true,
  },
  {
    id: 'section-blog',
    sectionKey: 'blog_latest',
    title: 'L\'Actualité Gaming & Tech',
    payload: {
      limit: 3,
    },
    sortOrder: 6,
    isActive: true,
  },
  {
    id: 'section-cta',
    sectionKey: 'cta',
    title: 'Rejoignez la Communauté TUNIBOTS',
    payload: {
      subtitle: 'Ne manquez plus aucune offre flash et profitez de réductions réservées à nos membres.',
      buttonText: 'Créer un Compte',
      buttonUrl: '/connexion',
    },
    sortOrder: 7,
    isActive: true,
  }
];
