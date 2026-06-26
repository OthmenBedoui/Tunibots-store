import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCategories, useProducts, useReviews, useBlogPosts } from '../data/queries/storeQueries';
import { SlideHero } from '../components/SlideHero';
import { ProductCard } from '../components/ProductCard';
import { useTheme } from '../context/ThemeContext';
import * as Icons from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { motion } from 'motion/react';
import { toast } from 'sonner';

// Helper to render Lucide icons dynamically from names stored in the mocks
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

const platformsList = [
  {
    name: 'Rockstar Games',
    slug: 'rockstar',
    link: '/produits?search=Rockstar',
    bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center gap-2">
        <div className="bg-[#fcbe13] text-black font-extrabold px-2.5 py-1 rounded shadow-lg font-sans text-base select-none relative shrink-0">
          R<span className="text-[7px] text-white absolute bottom-0.5 right-0.5 font-black">★</span>
        </div>
        <span className="font-display font-black tracking-tight text-white text-xs sm:text-sm drop-shadow-md">Rockstar Games</span>
      </div>
    )
  },
  {
    name: 'EA Play',
    slug: 'ea-play',
    link: '/produits?search=EA',
    bgImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center gap-2">
        <div className="bg-[#f51e38] text-white font-display font-extrabold tracking-wider px-2 py-1 rounded shadow-lg text-[10px] italic uppercase shrink-0">
          EA PLAY
        </div>
        <span className="font-display font-black tracking-tight text-white text-xs sm:text-sm drop-shadow-md">EA Play</span>
      </div>
    )
  },
  {
    name: 'Steam',
    slug: 'steam',
    link: '/produits?category=gaming',
    bgImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center gap-2">
        <div className="bg-blue-600/90 backdrop-blur-md p-1.5 rounded-full text-white shadow-lg shrink-0">
          <Icons.Layers className="h-3.5 w-3.5" />
        </div>
        <span className="font-display font-black tracking-wider text-white text-xs sm:text-sm drop-shadow-md uppercase">STEAM</span>
      </div>
    )
  },
  {
    name: 'Xbox',
    slug: 'xbox',
    link: '/produits?category=abonnements',
    bgImage: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center gap-2">
        <div className="bg-[#107c10]/95 backdrop-blur-md p-1.5 rounded-full text-white shadow-lg flex items-center justify-center shrink-0">
          <Icons.Gamepad2 className="h-3.5 w-3.5" />
        </div>
        <span className="font-display font-black tracking-tight text-white text-xs sm:text-sm drop-shadow-md uppercase">XBOX</span>
      </div>
    )
  },
  {
    name: 'PSN',
    slug: 'psn',
    link: '/produits?category=recharges',
    bgImage: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center gap-2">
        <div className="bg-[#003087]/95 backdrop-blur-md p-1.5 rounded-full text-white shadow-lg flex items-center justify-center shrink-0">
          <Icons.Cpu className="h-3.5 w-3.5" />
        </div>
        <span className="font-display font-black tracking-tight text-white text-xs sm:text-sm drop-shadow-md">PlayStation</span>
      </div>
    )
  },
  {
    name: 'Nintendo',
    slug: 'nintendo',
    link: '/produits?search=Nintendo',
    bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center justify-center bg-[#e60012]/95 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-white/20 shrink-0">
        <span className="font-display font-black tracking-widest text-white text-[10px] uppercase">Nintendo</span>
      </div>
    )
  },
  {
    name: 'Epic Games',
    slug: 'epic-games',
    link: '/produits?category=gaming',
    bgImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center gap-2">
        <div className="bg-neutral-900/95 border border-white/10 p-1.5 rounded text-white shadow-lg shrink-0">
          <Icons.Terminal className="h-3.5 w-3.5" />
        </div>
        <span className="font-display font-black tracking-tight text-white text-xs sm:text-sm drop-shadow-md uppercase">EPIC GAMES</span>
      </div>
    )
  },
  {
    name: 'GOG.COM',
    slug: 'gog-com',
    link: '/produits?category=gaming',
    bgImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500&auto=format&fit=crop&q=80',
    logo: (
      <div className="flex items-center gap-1.5">
        <span className="font-display font-black tracking-tighter text-white text-sm sm:text-base drop-shadow-md">GOG</span>
        <span className="font-mono text-[8px] text-purple-300 font-extrabold tracking-widest bg-purple-500/35 border border-purple-500/40 px-1 py-0.5 rounded">COM</span>
      </div>
    )
  }
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: featuredProducts, isLoading: isProductsLoading } = useProducts({ isFeatured: true });
  const { data: allProducts } = useProducts();
  const { data: reviews } = useReviews();
  const { data: blogPosts } = useBlogPosts();

  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'discount'>('featured');

  // Filter products for different tabs
  const getTabProducts = () => {
    if (!allProducts) return [];
    if (activeTab === 'new') {
      return [...allProducts].reverse().slice(0, 8);
    }
    if (activeTab === 'discount') {
      return allProducts.filter(p => p.discountPct > 0).slice(0, 8);
    }
    return featuredProducts ? featuredProducts.slice(0, 8) : [];
  };

  // Driffle-style Product Row Slider Component
  const ProductSlider = ({ title, subtitle, products }: { title: string; subtitle?: string; products: any[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.75 : scrollLeft + clientWidth * 0.75;
        scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    };

    if (!products || products.length === 0) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <h2 className={`font-display text-xl sm:text-2xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-xs ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {subtitle}
              </p>
            )}
          </div>
          {/* Slider edge arrows controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              className={`rounded-full border p-2 transition-all ${
                theme === 'dark' 
                  ? 'border-white/5 bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800' 
                  : 'border-neutral-200 bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
              aria-label="Scroll left"
            >
              <Icons.ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`rounded-full border p-2 transition-all ${
                theme === 'dark' 
                  ? 'border-white/5 bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800' 
                  : 'border-neutral-200 bg-neutral-100 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200'
              }`}
              aria-label="Scroll right"
            >
              <Icons.ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Horizontal scrollable box with native snapping */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-[240px] sm:w-[260px] md:w-[280px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Trust/Value props
  const trustBenefits = [
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
      title: 'Support National',
      description: 'Une équipe de conseillers francophones à votre écoute 7j/7 via WhatsApp et Mail.'
    },
    {
      icon: 'Coins',
      title: 'Paiements Variés',
      description: 'D17, virement bancaire, Sobflous ou carte bancaire. Payez en toute sécurité.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Bento Grid Section */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main SlideHero Carousel (Left column, spanning 8 cols) */}
          <div className="lg:col-span-8 h-[350px] sm:h-[400px] lg:h-[450px]">
            <SlideHero />
          </div>

          {/* Right Promotion column (Spanning 4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
            {/* Promo Card 1: AC Black Flag Resynced (Pre-order style) */}
            <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-neutral-900 h-[165px] sm:h-[190px] lg:h-[215px]">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
                alt="Assassin's Creed Black Flag Resynced"
                className="h-full w-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 space-y-2.5">
                <div>
                  <span className="text-[9px] font-black font-mono text-orange-500 uppercase tracking-widest bg-orange-500/15 px-2 py-0.5 rounded">PRE-COMMANDER</span>
                  <h3 className="font-display text-sm sm:text-base font-black text-white leading-tight mt-1 group-hover:text-orange-500 transition-colors">
                    Assassin's Creed: Black Flag Resynced
                  </h3>
                </div>
                <Link
                  to="/produits?search=Assassin"
                  className="w-fit bg-white hover:bg-neutral-100 text-neutral-950 text-[10px] font-black uppercase tracking-wider px-5 py-2 rounded-full transition-all"
                >
                  PRE-ORDER
                </Link>
              </div>
            </div>

            {/* Promo Card 2: PlayStation Store Gift Cards */}
            <div className="relative group overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-blue-950 to-blue-900 h-[165px] sm:h-[190px] lg:h-[215px]">
              <img
                src="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop&q=80"
                alt="PlayStation Gift Cards"
                className="h-full w-full object-cover opacity-35 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5 space-y-2.5">
                <div>
                  <span className="text-[9px] font-black font-mono text-blue-400 uppercase tracking-widest bg-blue-500/15 px-2 py-0.5 rounded">RECHARGES</span>
                  <h3 className="font-display text-sm sm:text-base font-black text-white leading-tight mt-1 group-hover:text-blue-400 transition-colors">
                    Cartes Cadeaux PlayStation Network
                  </h3>
                </div>
                <Link
                  to="/produits?category=recharges"
                  className="w-fit bg-white hover:bg-neutral-100 text-neutral-950 text-[10px] font-black uppercase tracking-wider px-5 py-2 rounded-full transition-all"
                >
                  GIFT CARDS
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Wide horizontal banner promo blocks below the bento header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card A: Roblox Gift Cards (violet/purple background) */}
          <Link
            to="/produits?search=Roblox"
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-violet-600 to-indigo-700 h-[110px] flex items-center p-6 transition-all hover:shadow-lg hover:shadow-indigo-500/10 hover:border-violet-500/30"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden select-none pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&auto=format&fit=crop&q=80"
                alt="Roblox"
                className="h-full w-full object-cover opacity-30 transform translate-x-4 rotate-3 transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
              <div>
                <h4 className="font-display text-base font-black text-white tracking-wide uppercase leading-none">ROBLOX</h4>
                <p className="text-[10px] text-violet-100 mt-1">Crédits, Robux & Abonnements</p>
              </div>
              <span className="w-fit bg-white text-neutral-950 text-[9px] font-extrabold px-4 py-1.5 rounded uppercase tracking-wider transition-colors group-hover:bg-neutral-100">
                GIFT CARDS
              </span>
            </div>
          </Link>

          {/* Card B: Random Game Keys (dark luxury keys) */}
          <Link
            to="/produits?category=gaming"
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-neutral-950 h-[110px] flex items-center p-6 transition-all hover:shadow-lg hover:shadow-black/20 hover:border-neutral-700"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden select-none pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80"
                alt="Random Keys"
                className="h-full w-full object-cover opacity-35 transform translate-x-4 rotate-3 transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
              <div>
                <h4 className="font-display text-base font-black text-white tracking-wide uppercase leading-none">CLÉS MYSTÈRES</h4>
                <p className="text-[10px] text-neutral-400 mt-1">Gagnez des jeux Steam légendaires</p>
              </div>
              <span className="w-fit bg-white text-neutral-950 text-[9px] font-extrabold px-4 py-1.5 rounded uppercase tracking-wider transition-colors group-hover:bg-neutral-100">
                GAMES
              </span>
            </div>
          </Link>

          {/* Card C: Xbox Subscriptions (green background with console graphics) */}
          <Link
            to="/produits?category=abonnements"
            className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-r from-green-600 to-emerald-700 h-[110px] flex items-center p-6 transition-all hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/30"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden select-none pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=400&auto=format&fit=crop&q=80"
                alt="Xbox"
                className="h-full w-full object-cover opacity-30 transform translate-x-4 rotate-3 transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-transparent to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full space-y-2">
              <div>
                <h4 className="font-display text-base font-black text-white tracking-wide uppercase leading-none">XBOX LIVE</h4>
                <p className="text-[10px] text-green-100 mt-1">Game Pass Ultimate & Abonnements</p>
              </div>
              <span className="w-fit bg-white text-neutral-950 text-[9px] font-extrabold px-4 py-1.5 rounded uppercase tracking-wider transition-colors group-hover:bg-neutral-100">
                SUBSCRIPTIONS
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left space-y-2 mb-8">
          <h2 className={`font-display text-2xl font-black tracking-tight uppercase ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}>
            PARCOUREZ NOS <span className="text-orange-500">CATÉGORIES</span>
          </h2>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Trouvez les meilleurs services digitaux adaptés à vos besoins.
          </p>
        </div>

        {isCategoriesLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className={`h-32 rounded-xl animate-pulse ${
                theme === 'dark' ? 'bg-neutral-900 border border-white/5' : 'bg-neutral-100 border border-neutral-200'
              }`} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                to={`/produits?category=${cat.slug}`}
                className={`group relative overflow-hidden rounded-xl border p-5 text-center transition-all hover:border-orange-500/20 ${
                  theme === 'dark' 
                    ? 'border-white/5 bg-neutral-900/40 hover:bg-neutral-900' 
                    : 'border-neutral-200 bg-white hover:bg-neutral-50'
                }`}
              >
                {/* Background glowing shape */}
                <div className={`absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-gradient-to-br ${cat.gradientFrom} ${cat.gradientTo} opacity-5 blur-xl group-hover:opacity-15 transition-opacity`} />
                
                {/* Icon wrapper */}
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${cat.gradientFrom} ${cat.gradientTo} text-white shadow-md shadow-black/40 group-hover:scale-110 transition-transform`}>
                  <DynamicIcon name={cat.icon} className="h-5 w-5" />
                </div>
                
                <h3 className={`font-display text-xs font-extrabold group-hover:text-orange-500 transition-colors ${
                  theme === 'dark' ? 'text-neutral-200' : 'text-neutral-700'
                }`}>
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Selective Selection tabs (Dynamic Sliding Product Row) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h2 className={`font-display text-2xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              SÉLECTION <span className="text-orange-500">EXCLUSIVE</span>
            </h2>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Découvrez nos produits digitaux les plus vendus et nos nouveautés.
            </p>
          </div>

          {/* Tabs selectors */}
          <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-full md:w-auto">
            <TabsList className={`grid w-full grid-cols-3 border p-1 rounded-lg ${
              theme === 'dark' ? 'bg-neutral-900 border-white/5' : 'bg-neutral-100 border-neutral-200'
            }`}>
              <TabsTrigger value="featured" className="text-xs font-bold py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Populaires
              </TabsTrigger>
              <TabsTrigger value="new" className="text-xs font-bold py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Nouveaux
              </TabsTrigger>
              <TabsTrigger value="discount" className="text-xs font-bold py-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Promos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {isProductsLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className={`flex flex-col rounded-xl p-4 space-y-4 animate-pulse border ${
                theme === 'dark' ? 'border-white/5 bg-neutral-900' : 'border-neutral-200 bg-neutral-100'
              }`}>
                <div className="aspect-video bg-neutral-800 rounded-lg"></div>
                <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
                <div className="h-3 w-1/2 bg-neutral-800 rounded"></div>
                <div className="h-8 w-full bg-neutral-800 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {getTabProducts().slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="text-center pt-4">
          <Button
            onClick={() => navigate('/produits')}
            className={`border font-bold h-11 px-8 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'border-white/10 bg-neutral-900 hover:bg-neutral-800 text-white hover:text-orange-500'
                : 'border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-orange-500'
            }`}
          >
            Voir toute la boutique
          </Button>
        </div>
      </section>

      {/* Platform Banner Marquee */}
      <section className="relative py-12 overflow-hidden select-none">
        {/* Glow Ambient Blur in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <div className="absolute w-[300px] sm:w-[600px] h-[150px] rounded-full filter blur-[80px] opacity-[0.18] dark:opacity-[0.25] transition-colors duration-500 bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
          <div className="text-center md:text-left space-y-1">
            <h2 className={`font-display text-2xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              EXPLORE PAR <span className="text-orange-500">PLATEFORME</span>
            </h2>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Retrouvez vos plateformes et services favoris au meilleur prix en Tunisie.
            </p>
          </div>
        </div>

        {/* Marquee Track Container */}
        <div className="relative w-full overflow-hidden flex items-center py-2 z-10">
          {/* Edge Fades for Modern Slick Look */}
          <div className={`absolute left-0 top-0 bottom-0 w-16 sm:w-40 z-20 pointer-events-none bg-gradient-to-r ${
            theme === 'dark' ? 'from-[#050505] to-transparent' : 'from-[#fcfcfc] to-transparent'
          }`} />
          <div className={`absolute right-0 top-0 bottom-0 w-16 sm:w-40 z-20 pointer-events-none bg-gradient-to-l ${
            theme === 'dark' ? 'from-[#050505] to-transparent' : 'from-[#fcfcfc] to-transparent'
          }`} />

          {/* Scrolling Marquee */}
          <div className="animate-marquee gap-5 flex items-center whitespace-nowrap">
            {[...platformsList, ...platformsList, ...platformsList].map((platform, idx) => (
              <div
                key={`${platform.slug}-${idx}`}
                className="relative shrink-0 w-[210px] h-[75px] rounded-2xl group overflow-visible"
              >
                {/* Dynamic back blur acting as a premium colored ambient glow/shadow */}
                <div
                  className="absolute inset-1 rounded-2xl bg-cover bg-center opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300 scale-102 pointer-events-none"
                  style={{ backgroundImage: `url(${platform.bgImage})` }}
                />

                {/* Main Link containing the actual image card with backdrop blur border */}
                <Link
                  to={platform.link}
                  className="relative z-10 flex items-center justify-center w-full h-full rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/40 dark:bg-black/50 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg"
                >
                  {/* Real Background Image */}
                  <img
                    src={platform.bgImage}
                    alt={platform.name}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-50 group-hover:opacity-65 transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dark Overlay gradient to pop the logo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />

                  {/* Logo / Content */}
                  <div className="relative z-20 flex items-center justify-center p-3 w-full h-full">
                    {platform.logo}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended For You sliding carousel (Fills the center of the viewport perfectly) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductSlider 
          title="RECOMMANDÉ POUR VOUS" 
          subtitle="Sélection personnalisée selon vos préférences d'achat"
          products={allProducts ? allProducts.slice(0, 8) : []}
        />
      </section>

      {/* Best Selling Games sliding carousel (Gaming specific) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductSlider 
          title="MEILLEURES VENTES JEUX PC" 
          subtitle="Clés de jeux Steam, Epic Games et Ubisoft à prix imbattables"
          products={allProducts ? allProducts.filter(p => p.productType === 'game_key') : []}
        />
      </section>

      {/* Trust & Guarantee Section */}
      <section className={`relative overflow-hidden border-y py-16 ${
        theme === 'dark' ? 'bg-neutral-950/60 border-white/5' : 'bg-neutral-50/60 border-neutral-200'
      }`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.02),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trustBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center md:items-start text-center md:text-left space-y-3 p-4 rounded-xl transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <DynamicIcon name={benefit.icon} className="h-6 w-6" />
                </div>
                <h3 className={`font-display text-sm font-black ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>{benefit.title}</h3>
                <p className={`text-[11px] leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                }`}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Reviews Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <h2 className={`font-display text-2xl font-black tracking-tight uppercase ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}>
            AVIS DE NOS <span className="text-orange-500">CLIENTS</span>
          </h2>
          <p className={`text-xs ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Découvrez les retours d'expérience de nos utilisateurs vérifiés.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews?.slice(0, 3).map((review) => (
            <Card key={review.id} className={`transition-all rounded-xl p-6 border ${
              theme === 'dark' 
                ? 'bg-neutral-900/30 border-white/5 hover:border-orange-500/20' 
                : 'bg-white border-neutral-200 hover:border-orange-500/20 hover:shadow-md'
            }`}>
              <CardContent className="p-0 space-y-4">
                {/* Rating stars */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Icons.Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                {/* Text comment */}
                <p className={`text-xs italic leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                }`}>
                  "{review.text}"
                </p>
                {/* Author profile */}
                <div className="flex items-center space-x-3 pt-2">
                  {review.avatar && (
                    <img src={review.avatar} alt={review.author} className="h-10 w-10 rounded-full object-cover border border-white/10" />
                  )}
                  <div>
                    <h4 className={`text-xs font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}>{review.author}</h4>
                    {review.role && <span className="text-[9px] text-orange-500 font-mono block mt-0.5">{review.role}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-2">
            <h2 className={`font-display text-2xl font-black tracking-tight uppercase ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              GUIDES & <span className="text-orange-500">ACTUALITÉS</span>
            </h2>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Apprenez à optimiser vos outils numériques et restez informé.
            </p>
          </div>
          <Link to="/blog" className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
            Voir le blog <Icons.ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {blogPosts?.slice(0, 2).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`group flex flex-col sm:flex-row gap-4 p-4 rounded-xl border transition-all ${
                theme === 'dark' 
                  ? 'bg-neutral-900/30 border-white/5 hover:border-orange-500/20 hover:bg-neutral-900' 
                  : 'bg-white border-neutral-200 hover:border-orange-500/20 hover:bg-neutral-50'
              }`}
            >
              {post.coverImage && (
                <img src={post.coverImage} alt={post.title} className="h-36 sm:w-44 rounded-lg object-cover group-hover:scale-102 transition-transform shrink-0" />
              )}
              <div className="flex flex-col justify-between py-1">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[9px] font-bold text-orange-500 uppercase tracking-wider font-mono bg-orange-500/10 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className={`font-display text-sm font-bold group-hover:text-orange-500 transition-colors line-clamp-2 ${
                    theme === 'dark' ? 'text-white' : 'text-neutral-950'
                  }`}>
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                      theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                    }`}>
                      {post.excerpt}
                    </p>
                  )}
                </div>
                <span className="text-[9px] text-neutral-500 font-mono mt-3">
                  Publié le {new Date(post.publishedAt || '').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Community Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 px-6 py-12 text-center md:px-12 md:py-16 shadow-xl shadow-orange-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
              REJOIGNEZ LA COMMUNAUTÉ TUNIBOTS !
            </h2>
            <p className="text-sm text-amber-50 leading-relaxed max-w-lg mx-auto">
              Ne manquez plus aucune de nos offres flash hebdomadaires, codes de réduction et astuces tech. Entrez votre email pour vous inscrire à notre newsletter.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success('Merci pour votre inscription ! Notre newsletter arrive bientôt.');
              }}
              className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                className="flex-1 rounded-lg border-none bg-black/20 px-4 py-2.5 text-sm text-white placeholder-amber-200 outline-none focus:bg-black/30"
              />
              <Button type="submit" className="bg-white hover:bg-neutral-100 text-orange-600 font-bold h-11 px-6 rounded-lg">
                S'abonner
              </Button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};
