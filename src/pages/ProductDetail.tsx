import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct, useProducts } from '../data/queries/storeQueries';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Star, ShoppingCart, ShieldCheck, Heart, Info, ChevronRight, MessageSquareCode, Users, Flame, Gamepad2, Cpu, Tv, Coins, CircleCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Active screenshot preview index state
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [qty, setQty] = useState(1);

  // Load product detail
  const { data: product, isLoading, isError } = useProduct(slug || '');
  
  // Load related products of the same type for bento recommendation list
  const { data: relatedProducts } = useProducts({
    productType: product?.productType,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-neutral-800 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-video bg-neutral-800 rounded-xl"></div>
          <div className="space-y-4">
            <div className="h-10 w-3/4 bg-neutral-800 rounded"></div>
            <div className="h-6 w-1/4 bg-neutral-800 rounded"></div>
            <div className="h-32 w-full bg-neutral-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center space-y-4">
        <Info className="h-12 w-12 text-orange-500 mx-auto" />
        <h2 className="font-display text-xl font-bold text-white">Produit Introuvable</h2>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Désolé, l'article demandé n'existe pas ou a été déplacé temporairement par nos techniciens.
        </p>
        <Button onClick={() => navigate('/produits')} className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded">
          Retourner à la boutique
        </Button>
      </div>
    );
  }

  // Related products filters
  const filteredRelated = relatedProducts
    ? relatedProducts.filter(p => p.id !== product.id).slice(0, 4)
    : [];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      coverImage: product.coverImage,
      platform: product.platforms[0] || 'Digital',
      unitPrice: product.price,
      qty: qty,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      title: product.title,
      coverImage: product.coverImage,
      platform: product.platforms[0] || 'Digital',
      unitPrice: product.price,
      qty: qty,
    });
    // Scroll to top and help user check out via cart drawer or simply highlight
    toast.info("Veuillez finaliser votre commande dans l'onglet panier ci-dessus !");
  };

  // Icon type mapping helper
  const getTypeIcon = () => {
    switch (product.productType) {
      case 'game_key': return <Gamepad2 className="h-4 w-4 text-orange-500" />;
      case 'account': return <Users className="h-4 w-4 text-orange-500" />;
      case 'ai_tool': return <Cpu className="h-4 w-4 text-orange-500" />;
      case 'boosting': return <Flame className="h-4 w-4 text-orange-500" />;
      case 'subscription': return <Tv className="h-4 w-4 text-orange-500" />;
      case 'topup': return <Coins className="h-4 w-4 text-orange-500" />;
      default: return null;
    }
  };

  const getTypeNameFr = () => {
    switch (product.productType) {
      case 'game_key': return 'Clé d\'activation Steam / Origin';
      case 'account': return 'Compte Premium Privé';
      case 'ai_tool': return 'Outil IA (Compte / Licence)';
      case 'boosting': return 'Service de Boosting Compétitif';
      case 'subscription': return 'Abonnement Streaming';
      case 'topup': return 'Recharge / Monnaie Virtuelle';
      default: return 'Achat Digital';
    }
  };

  const screenshotsList = product.screenshots.length > 0 
    ? [product.coverImage, ...product.screenshots].filter(Boolean) as string[]
    : [product.coverImage].filter(Boolean) as string[];

  return (
    <div className="pb-16">
      
      {/* Background Banner */}
      {product.bannerImage && (
        <div className="relative h-64 w-full overflow-hidden hidden md:block">
          <img src={product.bannerImage} alt="" className="h-full w-full object-cover opacity-15 filter blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-1.5 text-xs text-neutral-500 font-medium">
          <span className="hover:text-white cursor-pointer" onClick={() => navigate('/')}>Accueil</span>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-white cursor-pointer" onClick={() => navigate('/produits')}>Boutique</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-orange-500 truncate max-w-[200px]">{product.title}</span>
        </div>

        {/* Product Details Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Images, Screen viewer & Detailed description) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Screen viewer box */}
            <Card className="bg-neutral-900 border-white/5 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
                  {product.productType !== 'game_key' && product.productType !== 'boosting' ? (
                    <>
                      <img
                        src={screenshotsList[activeImgIdx]}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-25 blur-md select-none pointer-events-none scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <img
                        src={screenshotsList[activeImgIdx]}
                        alt={product.title}
                        className="relative z-10 max-h-full max-w-full object-contain p-4"
                        referrerPolicy="no-referrer"
                      />
                    </>
                  ) : (
                    <img
                      src={screenshotsList[activeImgIdx]}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {product.discountPct > 0 && (
                    <Badge className="absolute top-4 right-4 bg-orange-500 text-white border-none font-bold z-20">
                      PROMO -{product.discountPct}%
                    </Badge>
                  )}
                </div>

                {/* Thumbnails row */}
                {screenshotsList.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto bg-neutral-950/40 border-t border-white/5">
                    {screenshotsList.map((url, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIdx(idx)}
                        className={`relative aspect-video w-20 rounded overflow-hidden shrink-0 border-2 transition-all flex items-center justify-center ${
                          activeImgIdx === idx ? 'border-orange-500' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        {product.productType !== 'game_key' && product.productType !== 'boosting' ? (
                          <>
                            <img
                              src={url}
                              alt=""
                              className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <img
                              src={url}
                              alt=""
                              className="relative z-10 max-h-full max-w-full object-contain p-1"
                              referrerPolicy="no-referrer"
                            />
                          </>
                        ) : (
                          <img
                            src={url}
                            alt=""
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product description block */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-black text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
                Description du produit
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {product.description || "Aucune description détaillée disponible."}
              </p>
            </div>

            {/* Product core features specs list */}
            {product.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  Avantages et fonctionnalités incluses :
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-400">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 bg-neutral-900/40 p-3 rounded-lg border border-white/5">
                      <CircleCheck className="h-4.5 w-4.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right Column (Product specs purchase details & Attributes table) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-4 p-6 rounded-xl bg-neutral-900/30 border border-white/5">
              
              {/* Type, stock status & ratings */}
              <div className="flex items-center justify-between gap-4">
                <Badge className="flex items-center gap-1.5 border-none bg-orange-500/10 text-orange-500 font-bold py-1 px-3 rounded text-[10px]">
                  {getTypeIcon()}
                  <span>{getTypeNameFr()}</span>
                </Badge>

                {product.stock > 0 ? (
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    En Stock ({product.stock})
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-red-500 flex items-center gap-1">
                    Rupture de Stock
                  </span>
                )}
              </div>

              {/* Title & Platform */}
              <div className="space-y-1">
                <h1 className="font-display text-2xl font-black text-white leading-tight">
                  {product.title}
                </h1>
                <div className="flex flex-wrap gap-2 pt-1">
                  {product.platforms.map((p) => (
                    <span key={p} className="text-[10px] font-bold font-mono text-neutral-400 border border-white/10 px-2 py-0.5 rounded uppercase">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div className="flex items-center space-x-2 pb-2 border-b border-white/5">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'fill-amber-500 text-amber-500' : 'text-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-white font-mono font-bold">{product.rating.toFixed(1)}/5</span>
                <span className="text-xs text-neutral-500">({product.ratingCount} avis clients)</span>
              </div>

              {/* Pricing section */}
              <div className="flex items-baseline space-x-3 pt-2">
                <span className="font-display text-3xl font-black text-white font-mono">
                  {product.price.toFixed(1)} <span className="text-sm text-orange-500">DT</span>
                </span>
                {product.discountPct > 0 && (
                  <>
                    <span className="text-sm text-neutral-500 line-through font-mono">
                      {product.originalPrice.toFixed(1)} DT
                    </span>
                    <Badge className="bg-orange-500 text-white font-mono text-[10px] py-0.5 px-1.5 border-none">
                      Économisez {(product.originalPrice - product.price).toFixed(0)} DT
                    </Badge>
                  </>
                )}
              </div>

              {/* Delivery and Guarantee assurances */}
              <div className="text-[11px] text-neutral-400 space-y-2 bg-neutral-900/60 p-3 rounded border border-white/5">
                <p className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-orange-500 shrink-0" />
                  <span>Livraison par email & SMS sous 15 min après virement.</span>
                </p>
                <p className="flex items-center gap-2">
                  <CircleCheck className="h-4 w-4 text-orange-500 shrink-0" />
                  <span>Garantie de remplacement de 30 jours incluse par défaut.</span>
                </p>
              </div>

              {/* Quantity selector & Action Buttons */}
              {product.stock > 0 && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-400">
                    <span>Quantité :</span>
                    <div className="flex items-center space-x-3 bg-neutral-950 border border-white/5 rounded-lg p-1">
                      <button
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="p-1 text-neutral-400 hover:text-white text-base font-bold font-mono"
                      >
                        -
                      </button>
                      <span className="text-white font-mono px-2">{qty}</span>
                      <button
                        onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                        className="p-1 text-neutral-400 hover:text-white text-base font-bold font-mono"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold h-11 border border-white/10 rounded"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Ajouter au panier
                    </Button>
                    <Button
                      onClick={handleBuyNow}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-11 rounded"
                    >
                      Acheter maintenant
                    </Button>
                  </div>
                </div>
              )}

              {/* WhatsApp direct assist inquiry */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/21622111222?text=Bonjour, je souhaite avoir des renseignements sur le produit : ${product.title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 rounded bg-green-600/10 hover:bg-green-600/20 text-xs font-bold text-green-500 py-3 transition-colors border border-green-500/15"
                >
                  <MessageSquareCode className="h-4.5 w-4.5" />
                  <span>Poser une question sur WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Technical Specifications Attributes Table */}
            {Object.keys(product.attributes).length > 0 && (
              <div className="space-y-3 p-6 rounded-xl bg-neutral-900/30 border border-white/5">
                <h4 className="font-display text-xs font-black text-white uppercase tracking-wider border-l border-orange-500 pl-2">
                  Spécifications Techniques
                </h4>
                <div className="divide-y divide-white/5 text-xs">
                  {Object.entries(product.attributes).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-2">
                      <span className="text-neutral-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-white font-medium">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Recommended Related Products section */}
        {filteredRelated.length > 0 && (
          <section className="space-y-6 pt-12 border-t border-white/5">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-display text-xl font-black text-white uppercase tracking-tight">
                PRODUITS <span className="text-orange-500">SIMILAIRES</span>
              </h3>
              <p className="text-xs text-neutral-400">
                D'autres clients ont également consulté ces articles recommandés.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredRelated.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
