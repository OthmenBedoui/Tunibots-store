import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/types';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Star, ShoppingCart, ArrowRight, ShieldAlert, Cpu, Gamepad2, Users, Flame, Tv, Coins } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { theme } = useTheme();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      title: product.title,
      coverImage: product.coverImage,
      platform: product.platforms[0] || 'Digital',
      unitPrice: product.price,
    });
  };

  // Icon chooser helper
  const getTypeIcon = () => {
    switch (product.productType) {
      case 'game_key': return <Gamepad2 className="h-3 w-3" />;
      case 'account': return <Users className="h-3 w-3" />;
      case 'ai_tool': return <Cpu className="h-3 w-3" />;
      case 'boosting': return <Flame className="h-3 w-3" />;
      case 'subscription': return <Tv className="h-3 w-3" />;
      case 'topup': return <Coins className="h-3 w-3" />;
      default: return null;
    }
  };

  const getTypeNameFr = () => {
    switch (product.productType) {
      case 'game_key': return 'Clé de jeu';
      case 'account': return 'Compte Premium';
      case 'ai_tool': return 'Outil IA';
      case 'boosting': return 'Boosting Pro';
      case 'subscription': return 'Abonnement';
      case 'topup': return 'Recharge / Jetons';
      default: return 'Digital';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5 ${
        theme === 'dark' 
          ? 'border-white/5 bg-neutral-900/60 text-white' 
          : 'border-neutral-200 bg-white text-neutral-900'
      }`}
    >
      <Link to={`/produit/${product.slug}`} className="flex flex-col h-full">
        {/* Cover Image & Badges */}
        <div className={`relative aspect-[16/11.5] w-full overflow-hidden flex items-center justify-center ${
          theme === 'dark' ? 'bg-neutral-900' : 'bg-neutral-100'
        }`}>
          {product.coverImage ? (
            <>
              {product.productType !== 'game_key' && product.productType !== 'boosting' ? (
                <>
                  <img
                    src={product.coverImage}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover opacity-30 blur-md select-none pointer-events-none scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="relative z-10 h-full w-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                  />
                </>
              ) : (
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              )}
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-950 font-display text-2xl font-bold text-orange-500/20">
              TUNIBOTS
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            <Badge className="flex items-center gap-1 border-none bg-neutral-950/80 backdrop-blur text-[10px] font-bold text-neutral-300">
              {getTypeIcon()}
              <span>{getTypeNameFr()}</span>
            </Badge>
          </div>

          {/* Discount Badge */}
          {product.discountPct > 0 && (
            <div className="absolute top-2 right-2 rounded bg-orange-500 px-1.5 py-0.5 text-[10px] font-black font-mono text-white">
              -{product.discountPct}%
            </div>
          )}

          {/* Manual delivery warning */}
          {product.requiresManualDelivery && (
            <div className="absolute bottom-2 left-2 rounded bg-neutral-950/90 backdrop-blur px-1.5 py-0.5 text-[8px] font-bold text-orange-400 flex items-center gap-1 border border-orange-500/10">
              <ShieldAlert className="h-2.5 w-2.5" />
              <span>Sûr & Garanti</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              {/* Platform indicators */}
              <div className="flex flex-wrap gap-1">
                {product.platforms.slice(0, 2).map((p) => (
                  <span key={p} className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider font-mono">
                    {p}
                  </span>
                ))}
              </div>
              
              {/* Ratings */}
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span className={`text-[10px] font-bold font-mono ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                }`}>{product.rating.toFixed(1)}</span>
              </div>
            </div>

            <h3 className={`font-display text-sm font-bold line-clamp-1 group-hover:text-orange-500 transition-colors ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              {product.title}
            </h3>

            {product.description && (
              <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                {product.description}
              </p>
            )}
          </div>

          <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
            theme === 'dark' ? 'border-white/5' : 'border-neutral-100'
          }`}>
            {/* Price section */}
            <div className="flex flex-col">
              {product.discountPct > 0 && (
                <span className="text-[10px] text-neutral-500 line-through font-mono">
                  {product.originalPrice.toFixed(1)} DT
                </span>
              )}
              <span className={`font-display text-base font-black font-mono ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                {product.price.toFixed(1)} <span className="text-xs text-orange-500 font-extrabold">DT</span>
              </span>
            </div>

            {/* Quick action button */}
            <Button
              onClick={handleAddToCart}
              size="icon"
              className="h-8 w-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-all hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
