import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '../data/queries/storeQueries';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Gamepad2, Users, Cpu, Flame, Tv, Coins, CircleDot, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { motion } from 'motion/react';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Local filter states derived from or syncing with URL search parameters
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';
  const [selectedType, setSelectedType] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<number>(200);

  // Sync category filter with URL
  const setCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  // Sync search query with URL
  const [searchInput, setSearchInput] = useState(searchParam);
  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setSelectedType('');
    setSortBy('featured');
    setPriceRange(200);
    setSearchInput('');
  };

  // Queries
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts({
    categorySlug: categoryParam,
    search: searchParam,
    productType: selectedType || undefined
  });

  // Apply secondary local sorting and manual price-range filter
  const getProcessedProducts = () => {
    if (!products) return [];
    let list = products.filter(p => p.price <= priceRange);

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  };

  const processedProducts = getProcessedProducts();

  // Types list for manual filtering
  const productTypes = [
    { key: 'game_key', label: 'Clé de jeu', icon: <Gamepad2 className="h-3 w-3 mr-1" /> },
    { key: 'account', label: 'Compte Premium', icon: <Users className="h-3 w-3 mr-1" /> },
    { key: 'ai_tool', label: 'Outil IA', icon: <Cpu className="h-3 w-3 mr-1" /> },
    { key: 'boosting', label: 'Boosting Pro', icon: <Flame className="h-3 w-3 mr-1" /> },
    { key: 'subscription', label: 'Abonnement', icon: <Tv className="h-3 w-3 mr-1" /> },
    { key: 'topup', label: 'Recharge / Crédits', icon: <Coins className="h-3 w-3 mr-1" /> }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title & Breadcrumb */}
      <div className="text-center md:text-left space-y-1.5">
        <h1 className="font-display text-3xl font-black text-white tracking-tight">
          BOUTIQUE <span className="text-orange-500">TUNIBOTS</span>
        </h1>
        <p className="text-xs text-neutral-400">
          Clés d'activation instantanées, comptes premium, IA et recharges en Tunisie.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Filters */}
        <aside className="space-y-6 lg:col-span-1 border-r border-white/5 pr-0 lg:pr-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
              <SlidersHorizontal className="h-4 w-4 text-orange-500" /> Filtres
            </h3>
            <button onClick={handleResetFilters} className="text-[10px] text-neutral-500 hover:text-orange-500 flex items-center gap-1 font-bold">
              <RefreshCw className="h-3 w-3" /> Réinitialiser
            </button>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full text-xs rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-white placeholder-neutral-500 outline-none focus:border-orange-500"
            />
            <button type="submit" className="absolute right-3 top-3 text-neutral-500 hover:text-white">
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Category List */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Catégories</h4>
            <div className="flex flex-col space-y-1.5">
              <button
                onClick={() => setCategory('')}
                className={`text-xs text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between font-medium ${
                  !categoryParam ? 'bg-orange-500/10 text-orange-500 font-bold' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Toutes les catégories</span>
                <CircleDot className="h-3 w-3" />
              </button>
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.slug)}
                  className={`text-xs text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between font-medium ${
                    categoryParam === cat.slug ? 'bg-orange-500/10 text-orange-500 font-bold' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Type filters */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Format du Produit</h4>
            <div className="flex flex-wrap gap-1.5">
              {productTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setSelectedType(selectedType === type.key ? '' : type.key)}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold border transition-all ${
                    selectedType === type.key
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white hover:border-white/15'
                  }`}
                >
                  {type.icon}
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Prix Maximum</h4>
              <span className="font-mono text-orange-500 font-bold">{priceRange.toFixed(0)} DT</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-orange-500 h-1 rounded-full bg-neutral-800 outline-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-neutral-500 font-mono">
              <span>10 DT</span>
              <span>200 DT</span>
            </div>
          </div>

        </aside>

        {/* Products Grid Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 rounded-xl bg-neutral-900/20 border border-white/5 text-xs">
            <span className="text-neutral-400 font-medium">
              {processedProducts.length} produit(s) trouvé(s)
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-neutral-500">Trier par :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-900 border border-white/10 rounded-md py-1.5 px-3 text-white text-xs outline-none focus:border-orange-500"
              >
                <option value="featured">Pertinence</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>
            </div>
          </div>

          {/* Skeletons loader or Active grid */}
          {isProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex flex-col rounded-xl border border-white/5 bg-neutral-900 p-4 space-y-4 animate-pulse">
                  <div className="aspect-video bg-neutral-800 rounded-lg"></div>
                  <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
                  <div className="h-3 w-1/2 bg-neutral-800 rounded"></div>
                  <div className="h-8 w-full bg-neutral-800 rounded"></div>
                </div>
              ))}
            </div>
          ) : processedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/5 rounded-2xl bg-neutral-900/10">
              <SlidersHorizontal className="h-12 w-12 text-neutral-600 mb-4 stroke-[1.5]" />
              <h3 className="font-display text-sm font-black text-white">Aucun produit ne correspond</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                Veuillez réinitialiser vos filtres ou affiner vos termes de recherche pour explorer de nouvelles options.
              </p>
              <Button
                onClick={handleResetFilters}
                className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold h-10 px-6 rounded"
              >
                Voir toute la boutique
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
