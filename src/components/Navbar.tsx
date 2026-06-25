import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useSettings, useNavItems } from '../data/queries/storeQueries';
import { ShoppingCart, Menu, X, Sparkles, MessageSquare, Flame, Check, Trash2, Plus, Minus, CreditCard, Sun, Moon, ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../components/ui/sheet';
import { Badge } from '../../components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { data: settings } = useSettings();
  const { data: headerNav } = useNavItems('header');
  const { cartItems, cartCount, cartTotal, updateQty, removeFromCart, clearCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Simple checkout state
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    email: '',
    paymentMethod: 'whatsapp'
  });

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
      setIsSubmitting(false);
      setIsCheckoutSuccess(true);
      clearCart();
    }, 1200);
  };

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 backdrop-blur-md ${
        theme === 'dark' ? 'border-white/5 bg-neutral-950/90' : 'border-neutral-200 bg-white/90'
      }`}>
        {/* Top Promo Banner Strip */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-white text-[10px] sm:text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 relative z-50 select-none shadow-sm shadow-orange-500/10">
          <span>🔥 PROMOS FLASH DE LA SEMAINE : ÉCONOMISEZ JUSQU'À -70% SUR TOUTES NOS LICENCES !</span>
          <Link to="/produits?filter=promo" className="underline hover:text-neutral-100 flex items-center gap-0.5">
            Découvrir <Sparkles className="h-3.5 w-3.5 inline animate-pulse" />
          </Link>
        </div>

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl font-black tracking-wider text-orange-500">
              TUNI<span className={theme === 'dark' ? 'text-white' : 'text-neutral-900'}>BOTS</span>
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
                className={`w-56 rounded-full border px-4 py-1.5 text-xs outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 ${
                  theme === 'dark'
                    ? 'border-white/10 bg-neutral-900 text-white placeholder-neutral-500'
                    : 'border-neutral-200 bg-neutral-100 text-neutral-900 placeholder-neutral-400'
                }`}
              />
            </form>

            {/* Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`rounded-full transition-colors ${
                theme === 'dark' 
                  ? 'text-neutral-300 hover:text-white hover:bg-white/5' 
                  : 'text-neutral-600 hover:text-neutral-955 hover:bg-neutral-100'
              }`}
              title="Changer le thème"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

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
                        : 'text-neutral-600 hover:text-neutral-955 hover:bg-neutral-100'
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
                      cartItems.map((item) => (
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
                      ))
                    )}
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className={`p-6 border-t space-y-4 ${
                    theme === 'dark' 
                      ? 'border-white/5 bg-neutral-950' 
                      : 'border-neutral-200 bg-neutral-50'
                  }`}>
                    <div className="flex justify-between items-center text-sm">
                      <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}>Sous-total</span>
                      <span className="text-lg font-mono font-black text-orange-500">{cartTotal.toFixed(1)} DT</span>
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

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${
                theme === 'dark' 
                  ? 'text-neutral-300 hover:text-white hover:bg-white/5' 
                  : 'text-neutral-600 hover:text-neutral-955 hover:bg-neutral-100'
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Subheader menu (Driffle style) */}
        <div className={`hidden md:flex border-t h-11 items-center justify-between text-xs px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full transition-all ${
          theme === 'dark' ? 'border-white/5 bg-neutral-950 text-neutral-400' : 'border-neutral-200 bg-white text-neutral-600'
        }`}>
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
    </>
  );
};
