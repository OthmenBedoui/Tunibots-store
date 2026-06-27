import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { User, Crown, Sparkles, Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight, Star, Heart, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

interface AuthPageProps {
  initialMode?: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ initialMode = 'login' }) => {
  const { user, login, signUp, isVIP, toggleRole, isOtpEnabled } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Mode state: 'login' | 'signup'
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'standard' | 'vip'>('standard');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // OTP verification states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Sync mode with prop changes (e.g. navigation between routes)
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // If user is already logged in, redirect them
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/';
      // If they just logged in, take them back or to products
      navigate(from === '/connexion' || from === '/inscription' ? '/' : from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === 'signup' && !name)) {
      toast.error('Veuillez remplir tous les champs requis.');
      return;
    }

    setIsLoading(true);
    // Simulate minor network delay for luxury feeling
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Check if OTP is needed (always on signup/verification, or on login if enabled for this email)
      const needsOtp = mode === 'signup' || isOtpEnabled(email);

      if (needsOtp) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setGeneratedOtp(code);
        setEnteredOtp('');
        setOtpError('');
        setShowOtpModal(true);
        setIsLoading(false);

        toast.info(`🔑 Code de sécurité envoyé !`, {
          description: `Un code de validation OTP a été simulé et envoyé à l'adresse ${email}.`,
          duration: 6000,
        });
      } else {
        login(email, role, name || undefined);
        setIsLoading(false);
      }
    } catch (err) {
      toast.error("Une erreur s'est produite lors de l'authentification.");
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.length < 6) {
      setOtpError('Veuillez saisir les 6 chiffres du code OTP.');
      return;
    }

    if (enteredOtp !== generatedOtp) {
      setOtpError('Code OTP incorrect ou expiré. Veuillez réessayer.');
      toast.error('Code OTP invalide ! ❌');
      return;
    }

    setIsVerifyingOtp(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      if (mode === 'login') {
        login(email, role, name || undefined);
      } else {
        signUp(name, email, role);
      }
      setShowOtpModal(false);
    } catch (err) {
      setOtpError("Échec de la validation. Veuillez réessayer.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setEnteredOtp('');
    setOtpError('');
    toast.success('Nouveau code OTP envoyé ! 📧', {
      description: `Vérifiez votre boîte e-mail : ${email}`,
      duration: 5000,
    });
  };

  const handleQuickDemo = (demoRole: 'standard' | 'vip') => {
    setIsLoading(true);
    setTimeout(() => {
      if (demoRole === 'vip') {
        login('vip@tunibots.com', 'vip', 'Sami VIP Gold 👑');
      } else {
        login('client@tunibots.com', 'standard', 'Amir Client Standard 👤');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="py-12 md:py-20 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-center min-h-[calc(100vh-140px)] relative z-10">
      {/* Background radial overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-transparent pointer-events-none -z-10" />

      {/* Left side: Premium Marketing details & Club VIP benefits with high-end dark gaming grid background */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 max-w-md w-full relative group"
      >
        <div className="relative rounded-2xl border border-white/5 bg-neutral-950/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl overflow-hidden text-left h-full flex flex-col justify-between">
          {/* Creative tech grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          
          {/* Animated Ambient Light Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 1],
              x: [0, 15, 0],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-10 -right-10 w-44 h-44 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              x: [0, -20, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-20 -left-10 w-52 h-52 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none"
          />
          <div className="absolute -left-20 top-1/4 w-32 h-32 bg-purple-600/5 rounded-full blur-[50px] pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="space-y-3">
              <Badge className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-[10px] tracking-wider uppercase border-none py-1 px-3">
                ✨ CLUB PRIVÉ TUNIBOTS
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight leading-none text-white">
                Rejoignez l'élite des <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400">Gamers VIP</span>.
              </h1>
              <p className="text-sm leading-relaxed text-neutral-400">
                Créez un compte ou connectez-vous pour débloquer immédiatement vos tarifs préférentiels, suivre vos commandes, et bénéficier du support prioritaire WhatsApp 24/7.
              </p>
            </div>

            {/* Perks Grid */}
            <div className="space-y-4 pt-2">
              {/* Perk 1: Gold Discount */}
              <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/60 hover:border-amber-500/20 transition-all group">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/10">
                  <Crown className="h-5 w-5 fill-amber-500/5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Tarifs Gold VIP <span className="text-xs text-amber-500 font-mono font-black">-15%</span>
                  </h4>
                  <p className="text-xs mt-1 text-neutral-400">
                    Réduction de 15% appliquée automatiquement sur l'intégralité du catalogue Tunibots.
                  </p>
                </div>
              </div>

              {/* Perk 2: Early access */}
              <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/60 hover:border-orange-500/20 transition-all group">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/10">
                  <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Nouveautés & Codes Exclusifs</h4>
                  <p className="text-xs mt-1 text-neutral-400">
                    Accès anticipé aux lancements de clés de jeux, abonnements premium, et recharges avant tout le monde.
                  </p>
                </div>
              </div>

              {/* Perk 3: Secure Delivery */}
              <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-neutral-900/40 hover:bg-neutral-900/60 hover:border-orange-500/10 transition-all">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-400 border border-white/5">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-300">Garantie Livraison 100% Sécurisée</h4>
                  <p className="text-xs mt-1 text-neutral-400">
                    Toutes vos transactions sont cryptées et le support client Tunisie valide chaque achat instantanément.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right side: Splendid Authentic form wrapper with high-end dark gaming grid background */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md relative"
      >
        <div className="rounded-2xl border border-white/5 bg-neutral-950/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-white shadow-orange-500/5">
          {/* Creative tech grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Animated Ambient Light Orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.15, 1],
              x: [0, -10, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-10 -left-10 w-44 h-44 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 15, 0],
              y: [0, -15, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-20 -right-10 w-52 h-52 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none"
          />

          {/* Shimmer overlay for VIP theme */}
          {role === 'vip' && (
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 animate-pulse z-20" />
          )}

          {/* Modes selector tab */}
          <div className="flex bg-neutral-900 p-1.5 rounded-xl border border-white/5 mb-6">
            <button
              onClick={() => {
                setMode('login');
                navigate('/connexion');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-black tracking-wide uppercase transition-all ${
                mode === 'login'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Se Connecter
            </button>
            <button
              onClick={() => {
                setMode('signup');
                navigate('/inscription');
              }}
              className={`flex-1 py-2 rounded-lg text-xs font-black tracking-wide uppercase transition-all ${
                mode === 'signup'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Créer un Compte
            </button>
          </div>

          {/* Demo Sandbox Quick Login shortcuts */}
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 mb-6 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-black text-amber-500 tracking-wide uppercase">
                <Crown className="h-4 w-4 fill-amber-500/10" />
                Accès Démo Rapide
              </span>
              <Badge className="bg-amber-500/20 text-amber-400 border-none text-[9px] font-bold">1-CLIC</Badge>
            </div>
            <p className="text-[11px] text-neutral-400 leading-normal">
              Utilisez ces boutons de test instantanés pour découvrir immédiatement l'expérience client et les réductions :
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleQuickDemo('vip')}
                disabled={isLoading}
                className="bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-700 text-neutral-950 text-[10px] font-black py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all shadow-md shadow-amber-500/10 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <Crown className="h-3.5 w-3.5 fill-neutral-950/20" />
                Tester VIP (-15%)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('standard')}
                disabled={isLoading}
                className="bg-neutral-800 hover:bg-neutral-700 text-white text-[10px] font-black py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 transition-all border border-white/5 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              >
                <User className="h-3.5 w-3.5" />
                Client Standard
              </button>
            </div>
          </div>

          {/* Core Interactive Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Nom Complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Adel Ben Ali"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl bg-neutral-900 border border-white/5 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Adresse Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                <input
                  type="email"
                  required
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-neutral-900 border border-white/5 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400">Mot de Passe</label>
                {mode === 'login' && (
                  <Link to="#" onClick={() => toast.info("Fonctionnalité de démonstration. Utilisez l'accès 1-clic ci-dessus !")} className="text-[10px] text-orange-500 font-bold hover:underline">
                    Mot de passe oublié ?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-neutral-900 border border-white/5 pl-10 pr-10 py-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-neutral-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Custom Interactive Role Selection */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block">Choisissez votre statut</label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  role === 'standard' 
                    ? 'border-orange-500 bg-orange-500/10 text-white' 
                    : 'border-white/5 bg-neutral-900/60 text-neutral-400 hover:bg-neutral-900'
                }`}>
                  <input
                    type="radio"
                    name="page_auth_role"
                    checked={role === 'standard'}
                    onChange={() => setRole('standard')}
                    className="sr-only"
                  />
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                    role === 'standard' ? 'border-orange-500' : 'border-neutral-700'
                  }`}>
                    {role === 'standard' && <div className="h-2 w-2 rounded-full bg-orange-500" />}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold">Standard</p>
                    <p className="text-[9px] leading-none opacity-60 mt-0.5">Tarifs réguliers</p>
                  </div>
                </label>

                <label className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                  role === 'vip' 
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.1)]' 
                    : 'border-white/5 bg-neutral-900/60 text-neutral-400 hover:bg-neutral-900'
                }`}>
                  <input
                    type="radio"
                    name="page_auth_role"
                    checked={role === 'vip'}
                    onChange={() => setRole('vip')}
                    className="sr-only"
                  />
                  <div className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
                    role === 'vip' ? 'border-amber-500' : 'border-neutral-700'
                  }`}>
                    {role === 'vip' && <div className="h-2 w-2 rounded-full bg-amber-500" />}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-extrabold flex items-center gap-0.5">VIP Gold <Crown className="h-3 w-3 text-amber-500 fill-amber-500/10" /></p>
                    <p className="text-[9px] leading-none opacity-60 mt-0.5">Remise -15% incluse</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full font-black h-11 rounded-xl transition-all hover:scale-[1.01] active:scale-95 duration-200 mt-4 text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-lg ${
                role === 'vip'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 shadow-amber-500/10'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/15'
              }`}
            >
              {isLoading ? (
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Se Connecter' : 'Créer mon Compte Club'}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer of card toggler */}
          <div className="mt-6 text-center text-xs">
            <span className="text-neutral-500">
              {mode === 'login' ? "Nouveau sur Tunibots ? " : "Vous avez déjà un compte ? "}
            </span>
            <button
              onClick={() => {
                const target = mode === 'login' ? 'signup' : 'login';
                setMode(target);
                navigate(target === 'login' ? '/connexion' : '/inscription');
              }}
              className="text-orange-500 font-extrabold hover:underline"
            >
              {mode === 'login' ? "Créer un compte" : "Se connecter"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* OTP Verification Premium Modal overlay */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-neutral-950 p-6 md:p-8 shadow-2xl relative overflow-hidden text-center before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-500/5 before:to-transparent before:pointer-events-none"
            >
              {/* Creative Tech Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="relative z-10 space-y-5">
                {/* Shield Icon with animated ring */}
                <div className="mx-auto h-14 w-14 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 relative">
                  <Lock className="h-6 w-6" />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-orange-500/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-white">Vérification OTP de Sécurité</h3>
                  <p className="text-xs text-neutral-400">
                    {mode === 'signup' 
                      ? "Pour finaliser la création de votre compte, veuillez saisir le code de vérification."
                      : "Une double authentification par e-mail (OTP) est active sur votre compte."
                    }
                  </p>
                </div>

                {/* Email Address Indicator */}
                <div className="p-3 rounded-xl bg-neutral-900 border border-white/5 space-y-1">
                  <p className="text-[10px] text-neutral-500 font-mono tracking-wider uppercase leading-none">CODE OTP ENVOYÉ À l'EMAIL</p>
                  <p className="text-xs font-bold text-white truncate">{email}</p>
                </div>

                {/* OTP Code Monospace Input */}
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 block">Saisir le code à 6 chiffres</label>
                    <input
                      type="text"
                      maxLength={6}
                      pattern="[0-9]*"
                      required
                      value={enteredOtp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        setEnteredOtp(val);
                        if (val.length === 6) setOtpError('');
                      }}
                      placeholder="000000"
                      className="w-full text-center py-3 bg-neutral-900 border border-white/10 rounded-xl text-2xl font-black font-mono tracking-[0.5em] text-orange-500 placeholder-neutral-700 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                    />
                    {otpError && (
                      <p className="text-[11px] text-red-500 font-semibold">{otpError}</p>
                    )}
                  </div>

                  {/* Mailbox Simulator Interactive helper */}
                  <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 text-[10px] text-amber-500 leading-normal text-left">
                    <div className="flex gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <p className="font-extrabold uppercase tracking-wider text-[9px] mb-0.5">Simulateur de Boîte Mail Tunibots</p>
                        <p className="opacity-95 leading-normal">
                          Le code envoyé à votre e-mail est : <strong className="text-white font-mono bg-orange-500 px-1.5 py-0.5 rounded text-xs select-all ml-1">{generatedOtp}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowOtpModal(false)}
                      className="flex-1 py-2.5 h-11 border-white/5 hover:bg-neutral-900 hover:text-white rounded-xl text-xs uppercase font-extrabold"
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={isVerifyingOtp}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-11 rounded-xl text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5"
                    >
                      {isVerifyingOtp ? (
                        <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Valider
                          <CheckCircle2 className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Resend button */}
                <div className="text-center text-xs pt-1">
                  <span className="text-neutral-500">Vous n'avez rien reçu ? </span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="text-orange-500 font-extrabold hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Renvoyer le code
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
