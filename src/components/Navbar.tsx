import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useSettings, useNavItems } from '../data/queries/storeQueries';
import { ShoppingCart, Menu, X, Sparkles, MessageSquare, Flame, Check, Trash2, Plus, Minus, CreditCard, Sun, Moon, ChevronDown, User, Crown, LogIn, LogOut, Settings, Bell, ShieldCheck, Gamepad2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet';
import { Badge } from '../../components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { data: settings } = useSettings();
  const { data: headerNav } = useNavItems('header');
  const { user, isVIP, login, signUp, logout, toggleRole } = useAuth();
  const { cartItems, cartCount, cartTotal, rawTotal, updateQty, removeFromCart, clearCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Simple checkout state
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'whatsapp'
  });

  // Auth modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'standard' as 'standard' | 'vip'
  });

  // Prefill checkout details when user logs in/out
  useEffect(() => {
    if (user) {
      setCheckoutForm(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    } else {
      setCheckoutForm(prev => ({
        ...prev,
        name: '',
        email: '',
      }));
    }
  }, [user]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produits?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutForm.name || !checkoutForm.phone || !checkoutForm.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Add items from cart to local game library
      try {
        const existingPurchased = localStorage.getItem('tunibots_purchased_products');
        const purchasedList = existingPurchased ? JSON.parse(existingPurchased) : [];
        
        const newPurchases = cartItems.map(item => ({
          id: `purchased-${item.productId}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          title: item.title,
          slug: item.slug,
          image: item.image,
          purchaseDate: new Date().toLocaleDateString('fr-FR'),
          price: item.unitPrice,
          key: `TB-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
          status: 'Not Installed',
          timePlayed: '0 heure',
          platform: item.slug.includes('steam') ? 'Steam (PC)' : item.slug.includes('ea') || item.slug.includes('fifa') ? 'EA App (PC)' : 'Licence Digitale Tunibots'
        }));
        
        localStorage.setItem('tunibots_purchased_products', JSON.stringify([...purchasedList, ...newPurchases]));
      } catch (err) {
        console.error("Error saving purchases to library", err);
      }

      setIsSubmitting(false);
      setIsCheckoutSuccess(true);
      clearCart();
    }, 1200);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-md ${
        theme === 'dark' 
          ? 'border-white/5 bg-neutral-950/90 text-white' 
          : 'border-orange-500/10 bg-white/95 text-neutral-900 shadow-sm'
      }`}>
        {/* Top Promo Banner Strip */}
        {isVIP && (
          <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 text-neutral-950 text-[10px] sm:text-xs font-black py-2 px-4 text-center flex items-center justify-center gap-2 relative z-50 select-none shadow-md shadow-amber-500/10">
            <Crown className="h-3.5 w-3.5 animate-pulse fill-neutral-950/10" />
            <span className="tracking-wider uppercase">✨ ESPACE PRIVÉ : MEMBRE VIP ACTIF (-15% APPLIQUÉ SUR TOUT LE SITE)</span>
            <span className="hidden sm:inline bg-neutral-950 text-amber-400 text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded leading-none">GOLD ACTIVE</span>
          </div>
        )}

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-black tracking-wider text-orange-500">
              TUNI<span className={theme === 'dark' ? 'text-white' : 'text-neutral-950'}>BOTS</span>
            </span>
            <div className="rounded-full bg-orange-500/10 p-1 text-orange-500">
              <Flame className="h-4 w-4 fill-orange-500/20" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {headerNav?.map((item) => (
              <NavLink
                key={item.id}
                to={item.url}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-orange-500 ${
                    isActive 
                      ? 'text-orange-500' 
                      : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:block relative">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-56 rounded-full border px-4 py-1.5 text-xs outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 border-white/10 bg-neutral-900 text-white placeholder-neutral-500"
              />
            </form>

            {/* Cart Button */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger
                render={
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`relative transition-colors ${
                      theme === 'dark' 
                        ? 'text-neutral-300 hover:text-white hover:bg-white/5' 
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full bg-orange-500 hover:bg-orange-600 px-0 text-white font-mono text-[10px] border-none">
                        {cartCount}
                      </Badge>
                    )}
                  </Button>
                }
              />
              <SheetContent className={`w-full sm:max-w-md flex flex-col justify-between p-0 border-l ${
                theme === 'dark' 
                  ? 'bg-neutral-950 border-white/10 text-white' 
                  : 'bg-white border-neutral-200 text-neutral-800'
              }`}>
                <div>
                  <SheetHeader className={`p-6 border-b ${
                    theme === 'dark' ? 'border-white/5' : 'border-neutral-200'
                  }`}>
                    <SheetTitle className={`font-display text-xl flex items-center gap-2 ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-900'
                    }`}>
                      <ShoppingCart className="text-orange-500 h-5 w-5" /> Votre Panier
                    </SheetTitle>
                  </SheetHeader>

                  <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center text-neutral-400">
                        <ShoppingCart className="h-12 w-12 text-neutral-600 mb-4 stroke-[1.5]" />
                        <p className="font-medium">Votre panier est vide</p>
                        <p className="text-xs text-neutral-500 mt-1">Parcourez nos produits pour trouver votre bonheur !</p>
                        <Button
                          variant="outline"
                          className="mt-6 border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-white"
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate('/produits');
                          }}
                        >
                          Découvrir nos produits
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* VIP Status Banner inside Cart */}
                        {isVIP ? (
                          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-4 text-neutral-950 font-sans shadow-md shadow-amber-500/10 mb-4 border border-amber-400/20">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none" />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Crown className="h-4 w-4 text-neutral-950 fill-neutral-950/10" />
                                <span className="text-xs font-black uppercase tracking-wider">Statut Membre VIP</span>
                              </div>
                              <Badge className="bg-neutral-950 text-amber-400 text-[9px] font-black tracking-widest border-none px-1.5 py-0.5 leading-none">GOLD ACTIVE</Badge>
                            </div>
                            <div className="mt-2">
                              <p className="text-[10px] font-medium leading-normal opacity-95">
                                Félicitations <span className="font-bold">{user?.name}</span>, votre réduction automatique VIP de <span className="font-bold">-15%</span> est bien appliquée !
                              </p>
                              <div className="flex items-center gap-1 text-[10px] font-bold mt-2 bg-neutral-950/10 px-2 py-1 rounded w-max">
                                <Sparkles className="h-3 w-3 animate-pulse" />
                                <span>Économie VIP : {(rawTotal - cartTotal).toFixed(1)} DT de rabais</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-xl border border-dashed border-amber-500/30 bg-amber-500/5 p-4 text-amber-500 text-xs font-medium relative overflow-hidden flex flex-col gap-2 mb-4">
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 font-bold">
                                <Crown className="h-4 w-4 text-amber-500 animate-bounce" />
                                Tarif VIP disponible (-15% de rabais)
                              </span>
                              <button 
                                onClick={toggleRole}
                                className="bg-amber-500 text-neutral-950 text-[10px] font-bold px-2.5 py-1 rounded-full hover:bg-amber-600 transition-all shadow shadow-amber-500/20"
                              >
                                Activer VIP
                              </button>
                            </div>
                            <p className="text-[10px] text-neutral-400 leading-normal">
                              Économisez immédiatement <span className="text-amber-500 font-bold font-mono">{(rawTotal * 0.15).toFixed(1)} DT</span> sur cette commande en devenant membre VIP.
                            </p>
                          </div>
                        )}

                        {cartItems.map((item) => (
                          <div key={item.productId} className={`flex gap-4 p-3 rounded-lg border ${
                            theme === 'dark' 
                              ? 'bg-neutral-900 border-white/5' 
                              : 'bg-neutral-50 border-neutral-200'
                          }`}>
                          {item.coverImage && (
                            <div className={`h-16 w-16 rounded overflow-hidden flex items-center justify-center shrink-0 relative ${
                              theme === 'dark' ? 'bg-neutral-950' : 'bg-neutral-200'
                            }`}>
                              <img
                                src={item.coverImage}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
                                referrerPolicy="no-referrer"
                              />
                              <img
                                src={item.coverImage}
                                alt={item.title}
                                className="relative z-10 max-h-full max-w-full object-contain p-1"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className={`text-xs font-bold line-clamp-1 ${
                                theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'
                              }`}>{item.title}</h4>
                              {item.platform && <span className="text-[10px] text-orange-500 font-mono uppercase">{item.platform}</span>}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className={`flex items-center space-x-2 border rounded ${
                                theme === 'dark' 
                                  ? 'border-white/5 bg-neutral-950' 
                                  : 'border-neutral-200 bg-neutral-100'
                              }`}>
                                <button
                                  onClick={() => updateQty(item.productId, item.qty - 1)}
                                  className={`p-1 transition-colors ${
                                    theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
                                  }`}
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className={`text-xs px-1 font-mono ${
                                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                                }`}>{item.qty}</span>
                                <button
                                  onClick={() => updateQty(item.productId, item.qty + 1)}
                                  className={`p-1 transition-colors ${
                                    theme === 'dark' ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
                                  }`}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-xs font-bold font-mono ${
                                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                                }`}>{(item.unitPrice * item.qty).toFixed(1)} DT</span>
                                <button
                                  onClick={() => removeFromCart(item.productId)}
                                  className="text-neutral-500 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className={`p-6 border-t space-y-4 ${
                    theme === 'dark' 
                      ? 'border-white/5 bg-neutral-950' 
                      : 'border-neutral-200 bg-neutral-50'
                  }`}>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}>Sous-total</span>
                        {isVIP ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs text-neutral-500 line-through font-mono">{rawTotal.toFixed(1)} DT</span>
                            <span className="text-lg font-mono font-black text-amber-500">{cartTotal.toFixed(1)} DT</span>
                          </div>
                        ) : (
                          <span className="text-lg font-mono font-black text-orange-500">{cartTotal.toFixed(1)} DT</span>
                        )}
                      </div>
                      {isVIP && (
                        <div className="flex justify-between items-center text-[10px] text-amber-500 font-bold uppercase tracking-wider">
                          <span>Remise Club VIP (-15%)</span>
                          <span>-{(rawTotal - cartTotal).toFixed(1)} DT</span>
                        </div>
                      )}
                    </div>

                    {!isCheckoutSuccess ? (
                      <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                        <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${
                          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                        }`}>DÉTAILS DE LA COMMANDE</div>
                        <input
                          type="text"
                          required
                          placeholder="Votre Nom Complet"
                          value={checkoutForm.name}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          className={`w-full text-xs rounded border px-3 py-2 outline-none transition-all focus:border-orange-500 ${
                            theme === 'dark' 
                              ? 'border-white/10 bg-neutral-900 text-white placeholder-neutral-500' 
                              : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                          }`}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="tel"
                            required
                            placeholder="N° de Téléphone"
                            value={checkoutForm.phone}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                            className={`w-full text-xs rounded border px-3 py-2 outline-none transition-all focus:border-orange-500 ${
                              theme === 'dark' 
                                ? 'border-white/10 bg-neutral-900 text-white placeholder-neutral-500' 
                                : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                            }`}
                          />
                          <input
                            type="email"
                            required
                            placeholder="Adresse Email"
                            value={checkoutForm.email}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                            className={`w-full text-xs rounded border px-3 py-2 outline-none transition-all focus:border-orange-500 ${
                              theme === 'dark' 
                                ? 'border-white/10 bg-neutral-900 text-white placeholder-neutral-500' 
                                : 'border-neutral-200 bg-white text-neutral-900 placeholder-neutral-400'
                            }`}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className={`text-[10px] font-bold uppercase tracking-wider ${
                            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>Mode de règlement</label>
                          <select
                            value={checkoutForm.paymentMethod}
                            onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
                            className={`w-full text-xs rounded border px-3 py-2 outline-none transition-all focus:border-orange-500 ${
                              theme === 'dark' 
                                ? 'border-white/10 bg-neutral-900 text-white' 
                                : 'border-neutral-200 bg-white text-neutral-900'
                            }`}
                          >
                            <option value="whatsapp">Virement + Confirmation WhatsApp (+ Rapide)</option>
                            <option value="bank">Virement Bancaire Tunisie</option>
                            <option value="delivery">Livraison Manuelle en espèces</option>
                          </select>
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-11 transition-all rounded"
                        >
                          {isSubmitting ? 'Traitement de la commande...' : 'Commander maintenant'}
                        </Button>
                      </form>
                    ) : (
                      <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 text-center space-y-3">
                        <div className="rounded-full bg-orange-500/20 p-2 text-orange-500 w-10 h-10 mx-auto flex items-center justify-center">
                          <Check className="h-6 w-6" />
                        </div>
                        <h4 className="font-bold text-sm text-white">Commande Enregistrée !</h4>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          Merci pour votre achat ! Veuillez envoyer un message WhatsApp au <span className="text-orange-500 font-mono font-bold">{settings?.whatsappNumber}</span> pour recevoir vos accès d'activation immédiatement.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-orange-500/30 text-orange-500 hover:bg-orange-500 hover:text-white"
                          onClick={() => {
                            setIsCheckoutSuccess(false);
                            setIsCartOpen(false);
                            setCheckoutForm({ name: '', phone: '', email: '', paymentMethod: 'whatsapp' });
                          }}
                        >
                          Continuer mes achats
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Auth Dropdown / Button (Espace VIP) - Placed to the right of the Cart Button */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <div className="relative">
                  {/* Clickable User Button/Badge */}
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 h-9 rounded-lg border transition-all hover:scale-[1.02] active:scale-95 cursor-pointer select-none ${
                      isVIP 
                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 font-black shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                        : theme === 'dark'
                          ? 'border-white/10 bg-neutral-900 text-neutral-300'
                          : 'border-orange-500/10 bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="h-5 w-5 rounded-full object-cover shrink-0 border border-white/20"
                        referrerPolicy="no-referrer"
                      />
                    ) : isVIP ? (
                      <Crown className="h-3.5 w-3.5 text-amber-500 animate-pulse fill-amber-500/10" />
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-orange-500 flex items-center justify-center text-[9px] text-white font-extrabold uppercase shrink-0">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden sm:inline-block max-w-[90px] truncate">{user.name}</span>
                    <span className="sm:hidden">{isVIP ? 'VIP' : '👤'}</span>
                    <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu Popup */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 mt-2 w-60 rounded-xl shadow-2xl border p-2 z-[999] origin-top-right ${
                          theme === 'dark' 
                            ? 'bg-neutral-950 border-white/5 text-white shadow-neutral-950/50' 
                            : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-950/10'
                        }`}
                      >
                        {/* User Identity Details */}
                        <div className={`p-3 border-b mb-1 text-left flex items-center gap-3 ${
                          theme === 'dark' ? 'border-white/5' : 'border-neutral-200'
                        }`}>
                          {user.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="h-10 w-10 rounded-full object-cover shrink-0 border border-white/10"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold uppercase shrink-0 text-white">
                              {user.name.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className={`text-xs font-extrabold truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{user.name}</p>
                            <p className="text-[10px] text-neutral-400 truncate mt-0.5">{user.email}</p>
                            <div className="mt-2">
                              {isVIP ? (
                                <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 text-[8px] font-black tracking-wider px-1.5 py-0.5 rounded uppercase border border-amber-500/20">
                                  <Crown className="h-2.5 w-2.5 fill-amber-500/10" /> Membre VIP Gold
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-neutral-800 text-neutral-400 text-[8px] font-black tracking-wider px-1.5 py-0.5 rounded uppercase">
                                  <User className="h-2.5 w-2.5" /> Client Standard
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="space-y-0.5 text-left animate-in fade-in-50 slide-in-from-top-1 duration-200">
                          <Link
                            to="/profil?tab=coordonnees"
                            onClick={() => setIsUserMenuOpen(false)}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-2.5 transition-colors ${
                              theme === 'dark' ? 'hover:bg-white/5 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            <User className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                            Consulter le profil
                          </Link>

                          <Link
                            to="/profil?tab=library"
                            onClick={() => setIsUserMenuOpen(false)}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-2.5 transition-colors ${
                              theme === 'dark' ? 'hover:bg-white/5 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            <Gamepad2 className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                            Ma Bibliothèque
                          </Link>

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setIsSettingsModalOpen(true);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-2.5 transition-colors ${
                              theme === 'dark' ? 'hover:bg-white/5 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            <Settings className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                            Paramètres du compte
                          </button>

                          {/* Interactive Toggle for Testing VIP mode easily */}
                          <button
                            onClick={() => {
                              toggleRole();
                            }}
                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center justify-between transition-colors ${
                              isVIP 
                                ? 'text-amber-400 hover:bg-amber-500/5' 
                                : theme === 'dark' ? 'hover:bg-white/5 text-neutral-200' : 'hover:bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <Sparkles className={`h-3.5 w-3.5 text-amber-500 shrink-0 ${isVIP ? 'animate-spin' : ''}`} />
                              Mode VIP (Démo)
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-black leading-none ${
                              isVIP 
                                ? 'bg-amber-500/20 text-amber-400' 
                                : theme === 'dark' ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {isVIP ? 'ACTIF' : 'ACTIVER'}
                            </span>
                          </button>

                          <div className={`h-px my-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-neutral-200'}`} />

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              logout();
                            }}
                            className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-2.5 text-red-500 hover:bg-red-500/5 transition-colors"
                          >
                            <LogOut className="h-3.5 w-3.5 shrink-0" />
                            Déconnexion
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button
                  onClick={() => navigate('/connexion')}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-4 py-1.5 h-9 rounded-lg text-xs shadow-md shadow-orange-500/10 hover:scale-105 transition-all flex items-center gap-1"
                >
                  <User className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Espace VIP / Connexion</span>
                  <span className="sm:hidden">Connexion</span>
                </Button>
              )}
            </div>

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-neutral-300 hover:text-white hover:bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Subheader menu (Driffle style with elegant curves) */}
        <div className="hidden md:flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-3 pt-1">
          <div className="flex h-11 w-full items-center justify-between text-xs px-6 rounded-xl border border-white/5 bg-neutral-900/60 backdrop-blur-sm text-neutral-300 shadow-lg shadow-black/10">
            <div className="flex items-center space-x-6">
              <Link to="/produits?category=gaming" className="hover:text-orange-500 font-semibold flex items-center gap-1 transition-colors">
                Jeux <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </Link>
              <Link to="/produits?category=recharges" className="hover:text-orange-500 font-semibold flex items-center gap-1 transition-colors">
                Cartes Cadeaux <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </Link>
              <Link to="/produits?category=abonnements" className="hover:text-orange-500 font-semibold flex items-center gap-1 transition-colors">
                Abonnements <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </Link>
              <Link to="/produits?category=comptes" className="hover:text-orange-500 font-semibold flex items-center gap-1 transition-colors">
                Comptes Premium <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </Link>
              <Link to="/produits?category=outils-ia" className="hover:text-orange-500 font-semibold flex items-center gap-1 transition-colors">
                Outils IA <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
              </Link>
              <Link to="/produits" className="hover:text-orange-500 font-semibold transition-colors">
                Boutique
              </Link>
              <Link to="/produits?filter=promo" className="hover:text-orange-500 font-semibold transition-colors flex items-center gap-1">
                Promos <span className="rounded bg-orange-500 text-[9px] font-black font-mono text-white px-1.5 py-0.5 leading-none animate-pulse">PLUS</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://wa.me/21622111222" target="_blank" rel="noreferrer" className="text-orange-500 font-extrabold hover:underline flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Assistance WhatsApp 7j/7
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden border-t px-4 py-4 space-y-3 overflow-hidden ${
                theme === 'dark' 
                  ? 'border-white/5 bg-neutral-950 text-white' 
                  : 'border-neutral-200 bg-white text-neutral-800'
              }`}
            >
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative pb-2">
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-md border px-4 py-2 text-xs outline-none focus:border-orange-500 ${
                    theme === 'dark'
                      ? 'border-white/10 bg-neutral-900 text-white placeholder-neutral-500'
                      : 'border-neutral-200 bg-neutral-100 text-neutral-900 placeholder-neutral-400'
                  }`}
                />
              </form>

              {headerNav?.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.url}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 text-sm font-medium transition-colors hover:text-orange-500 ${
                      isActive 
                        ? 'text-orange-500' 
                        : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Mobile Auth Block */}
              <div className={`p-4 rounded-xl border space-y-3 ${
                theme === 'dark' ? 'bg-neutral-900/60 border-white/5' : 'bg-neutral-50 border-neutral-200'
              }`}>
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {user.avatar ? (
                          <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="h-8 w-8 rounded-full object-cover border border-white/10 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                        ) : isVIP ? (
                          <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
                            <Crown className="h-4 w-4 text-amber-500 fill-amber-500/10" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-neutral-500/10 flex items-center justify-center border border-neutral-200/10">
                            <User className="h-4 w-4 text-neutral-400" />
                          </div>
                        )}
                        <div>
                          <p className="text-xs font-bold text-white leading-none">{user.name}</p>
                          <p className="text-[10px] text-neutral-500 mt-1">{user.email}</p>
                        </div>
                      </div>
                      <Badge className={isVIP ? 'bg-amber-500 text-neutral-950 border-none text-[9px] font-black' : 'bg-neutral-800 text-neutral-300 border-none text-[9px]'}>
                        {isVIP ? 'MEMBRE VIP 🌟' : 'STANDARD'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={toggleRole}
                        className={`text-xs border-amber-500/20 hover:bg-amber-500/5 ${isVIP ? 'text-amber-400' : 'text-neutral-300'}`}
                      >
                        <Sparkles className="h-3.5 w-3.5 mr-1" />
                        {isVIP ? 'Standard' : 'Devenir VIP 🌟'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={logout}
                        className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10"
                      >
                        <LogOut className="h-3.5 w-3.5 mr-1" />
                        Déconnexion
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Club VIP & Compte Client</p>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      Connectez-vous pour obtenir -15% de rabais automatique, l'effet Gold, et des nouveautés exclusives.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Button
                        size="sm"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/connexion');
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold"
                      >
                        Connexion
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          navigate('/inscription');
                        }}
                        className="border-neutral-700 text-neutral-300 hover:bg-white/5"
                      >
                        S'inscrire
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Support shortcut */}
              <a
                href={`https://wa.me/${settings?.whatsappNumber?.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 rounded-lg bg-orange-500/10 p-3 text-xs font-bold text-orange-500 border border-orange-500/20"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Besoin d'aide ? WhatsApp (+216)</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Polish Interactive Auth Modal Overlay */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className={`relative w-full max-w-md overflow-hidden rounded-2xl border p-6 shadow-2xl ${
                theme === 'dark' 
                  ? 'border-white/10 bg-neutral-950 text-white shadow-orange-500/5' 
                  : 'border-neutral-200 bg-white text-neutral-900 shadow-neutral-950/10'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-500 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Title & Tabs */}
              <div className="text-center space-y-2 mb-6">
                <div className="flex justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                    <User className="h-6 w-6" />
                  </span>
                </div>
                <h3 className="font-display text-xl font-black tracking-tight">Club Client & VIP Gold</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Rejoignez la communauté Tunibots et débloquez -15% de rabais immédiat et l'effet Gold.
                </p>

                {/* Tab buttons */}
                <div className="flex bg-neutral-900 p-1 rounded-lg mt-4 border border-white/5">
                  <button
                    onClick={() => setAuthTab('login')}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                      authTab === 'login'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Se connecter
                  </button>
                  <button
                    onClick={() => setAuthTab('signup')}
                    className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                      authTab === 'signup'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Créer un compte
                  </button>
                </div>
              </div>

              {/* Quick Login Demo Actions Block */}
              {authTab === 'login' && (
                <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 mb-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                    <Crown className="h-4 w-4 fill-amber-500/10" />
                    <span>DÉMO RAPIDE : Tester les Rôles</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-normal">
                    Connectez-vous avec ces raccourcis pré-configurés pour valider les tarifs et effets visuels :
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => {
                        login('vip@tunibots.com', 'vip', 'Sami VIP Gold 👑');
                        setIsAuthModalOpen(false);
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-neutral-950 text-[10px] font-black py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all shadow shadow-amber-500/10"
                    >
                      <Crown className="h-3.5 w-3.5 fill-neutral-950/20" />
                      Rôle VIP Or (-15%)
                    </button>
                    <button
                      onClick={() => {
                        login('client@tunibots.com', 'standard', 'Amir Client Standard 👤');
                        setIsAuthModalOpen(false);
                      }}
                      className="bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-black py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-all border border-white/5"
                    >
                      <User className="h-3.5 w-3.5" />
                      Rôle Standard
                    </button>
                  </div>
                </div>
              )}

              {/* Traditional Auth Forms */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (authTab === 'login') {
                    login(authForm.email || 'visiteur@tunibots.com', authForm.role, authForm.name || 'Gamer');
                  } else {
                    signUp(authForm.name || 'Nouveau Client', authForm.email || 'visiteur@tunibots.com', authForm.role);
                  }
                  setIsAuthModalOpen(false);
                }}
                className="space-y-4"
              >
                {authTab === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Nom Complet</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Adel Ben Ali"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                      className="w-full rounded bg-neutral-900 border border-white/5 p-2.5 text-xs text-white outline-none focus:border-orange-500"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Adresse Email</label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className="w-full rounded bg-neutral-900 border border-white/5 p-2.5 text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Mot de Passe</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className="w-full rounded bg-neutral-900 border border-white/5 p-2.5 text-xs text-white outline-none focus:border-orange-500"
                  />
                </div>

                {/* Role selection toggle for custom accounts */}
                <div className="space-y-2 pt-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Type de compte désiré</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      authForm.role === 'standard' 
                        ? 'border-orange-500 bg-orange-500/10 text-white' 
                        : 'border-white/5 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                    }`}>
                      <input
                        type="radio"
                        name="auth_role"
                        checked={authForm.role === 'standard'}
                        onChange={() => setAuthForm({ ...authForm, role: 'standard' })}
                        className="sr-only"
                      />
                      <User className="h-4 w-4 shrink-0" />
                      <div className="text-left">
                        <p className="text-[11px] font-bold">Standard</p>
                        <p className="text-[8px] leading-none opacity-60">Tarif classique</p>
                      </div>
                    </label>

                    <label className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all ${
                      authForm.role === 'vip' 
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.1)]' 
                        : 'border-white/5 bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                    }`}>
                      <input
                        type="radio"
                        name="auth_role"
                        checked={authForm.role === 'vip'}
                        onChange={() => setAuthForm({ ...authForm, role: 'vip' })}
                        className="sr-only"
                      />
                      <Crown className="h-4 w-4 shrink-0" />
                      <div className="text-left">
                        <p className="text-[11px] font-bold">Membre VIP 🌟</p>
                        <p className="text-[8px] leading-none opacity-60">Remise -15% Gold</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className={`w-full font-bold h-10 mt-2 rounded transition-all ${
                    authForm.role === 'vip'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 shadow-md shadow-amber-500/15'
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/10'
                  }`}
                >
                  {authTab === 'login' ? 'Se connecter' : 'Créer mon compte VIP/Standard'}
                </Button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileModalOpen && user && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />
            
            {/* Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-neutral-950 border-white/5 text-white shadow-orange-500/5' 
                  : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-950/10'
              }`}
            >
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* VIP Shiny header decoration if VIP */}
              {isVIP && (
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600" />
              )}

              <div className="flex flex-col items-center text-center mt-4">
                {/* Large Avatar */}
                <div className={`relative h-20 w-20 rounded-full flex items-center justify-center text-3xl font-black shadow-lg mb-4 ${
                  isVIP 
                    ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-neutral-950 ring-4 ring-amber-500/20' 
                    : 'bg-orange-500 text-white ring-4 ring-orange-500/20'
                }`}>
                  {isVIP ? (
                    <Crown className="h-10 w-10 fill-neutral-950/10" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>

                <h3 className="font-display text-xl font-black tracking-tight">{user.name}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">{user.email}</p>
                
                <div className="mt-3">
                  {isVIP ? (
                    <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase border border-amber-500/20">
                      <Crown className="h-3.5 w-3.5 fill-amber-500/10" /> Membre Privé VIP Gold
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-neutral-800 text-neutral-400 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase">
                      <User className="h-3.5 w-3.5" /> Client Standard
                    </span>
                  )}
                </div>
              </div>

              {/* Info grid */}
              <div className="mt-6 space-y-4">
                <div className={`p-4 rounded-xl text-left text-xs space-y-2.5 ${
                  theme === 'dark' ? 'bg-neutral-900/60' : 'bg-neutral-50 border border-neutral-150'
                }`}>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-neutral-400">Statut de livraison :</span>
                    <span className="font-bold text-green-500 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /> Actif & Sécurisé
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-neutral-400">Région :</span>
                    <span className="font-bold text-neutral-300">Tunisie 🇹🇳</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Support prioritaire :</span>
                    <span className="font-bold text-orange-500">WhatsApp VIP</span>
                  </div>
                </div>

                {/* VIP Perks section or Promo Banner Upgrade to VIP */}
                {isVIP ? (
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-left space-y-2">
                    <h4 className="text-xs font-black text-amber-500 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" /> Vos privilèges VIP Actifs :
                    </h4>
                    <ul className="text-[11px] text-neutral-300 space-y-1.5 list-inside list-disc">
                      <li>Remise immédiate et permanente de 15% appliquée.</li>
                      <li>Validation instantanée de vos commandes.</li>
                      <li>Accès prioritaire aux stocks limités et lancements clés.</li>
                    </ul>
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-amber-500/10 to-yellow-600/5 border border-amber-500/20 rounded-xl p-4 text-left space-y-2.5">
                    <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Crown className="h-3.5 w-3.5 text-amber-500" /> Devenez membre VIP Gold
                    </h4>
                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Économisez immédiatement 15% sur tous vos abonnements et jeux. Support ultra-prioritaire 24h/24.
                    </p>
                    <button
                      onClick={() => {
                        toggleRole();
                        toast.success("Félicitations ! Vous êtes désormais membre VIP Gold 👑. Profitez de vos -15% !");
                      }}
                      className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-neutral-950 font-black text-[10px] tracking-widest uppercase py-2.5 rounded-lg transition-all shadow-md shadow-amber-500/10 active:scale-[0.98]"
                    >
                      Activer mon statut VIP (-15%)
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <Button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold py-2 rounded-xl"
                >
                  Fermer
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />
            
            {/* Settings Dialog Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-md rounded-2xl border p-6 shadow-2xl overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-neutral-950 border-white/5 text-white shadow-orange-500/5' 
                  : 'bg-white border-neutral-200 text-neutral-900 shadow-neutral-950/10'
              }`}
            >
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="font-display text-lg font-black tracking-tight flex items-center gap-2 mb-6">
                <Settings className="h-5 w-5 text-orange-500" />
                Paramètres de votre compte
              </h3>

              <div className="space-y-5 text-left">
                {/* Notifications Setting */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-white">Alertes de livraison</h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5">Notification instantanée par SMS/WhatsApp</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                  </label>
                </div>

                {/* Language Setting */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Langue préférée</label>
                  <select
                    className="w-full rounded-xl bg-neutral-900 border border-white/5 p-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                    defaultValue="fr"
                  >
                    <option value="fr">Français (FR) 🇫🇷</option>
                    <option value="ar">العربية (AR) 🇹🇳</option>
                    <option value="en">English (US) 🇺🇸</option>
                  </select>
                </div>

                {/* Currency Setting */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Devise d'affichage</label>
                  <select
                    className="w-full rounded-xl bg-neutral-900 border border-white/5 p-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                    defaultValue="dt"
                  >
                    <option value="dt">Dinar Tunisien (DT)</option>
                    <option value="eur">Euro (€)</option>
                    <option value="usd">Dollar ($)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button
                  onClick={() => setIsSettingsModalOpen(false)}
                  variant="ghost"
                  className="flex-1 border border-neutral-700 text-neutral-300 text-xs font-bold py-2 rounded-xl"
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => {
                    setIsSettingsModalOpen(false);
                    toast.success("Vos paramètres ont été enregistrés avec succès !");
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-xl"
                >
                  Enregistrer
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
