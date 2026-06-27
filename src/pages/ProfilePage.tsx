import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Crown, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Gamepad2, 
  Search, 
  Play, 
  Download, 
  Copy, 
  Key, 
  Calendar, 
  ShieldCheck, 
  Check, 
  Save, 
  Sparkles, 
  Lock, 
  Clock, 
  Settings, 
  ChevronRight, 
  AlertCircle,
  RefreshCw,
  Cpu,
  Laptop,
  Compass,
  ShoppingBag,
  Camera,
  Upload
} from 'lucide-react';

interface LibraryItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  bannerImage?: string;
  purchaseDate: string;
  price: number;
  key: string;
  status: 'Installed' | 'Not Installed' | 'Active';
  timePlayed: string;
  platform: string;
  category?: string;
  size?: string;
  instructions?: string;
}

const DEFAULT_GAMES: LibraryItem[] = [
  {
    id: 'lib-gta-5',
    title: 'Grand Theft Auto V: Premium Edition (PC)',
    slug: 'gta-v-premium',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    purchaseDate: '24/05/2026',
    price: 89,
    key: 'GTA5-VIP-TB99-2026-X83P',
    status: 'Installed',
    timePlayed: '124 heures',
    platform: 'Rockstar Games / Epic Launcher',
    category: 'Action / Monde Ouvert',
    size: '115 GB',
    instructions: '1. Téléchargez et lancez le Rockstar Games Launcher.\n2. Connectez-vous à votre compte ou créez-en un nouveau.\n3. Cliquez sur votre profil en haut à droite et sélectionnez "Utiliser un code".\n4. Saisissez la clé ci-dessus puis cliquez sur valider.\n5. Le jeu apparaîtra dans votre bibliothèque Rockstar prêt à être téléchargé.'
  },
  {
    id: 'lib-fc-24',
    title: 'EA SPORTS FC 24 Standard Edition (PC)',
    slug: 'ea-sports-fc-24',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    purchaseDate: '12/06/2026',
    price: 139,
    key: 'FC24-GOLD-KEYS-TUNI-92X1',
    status: 'Installed',
    timePlayed: '42 heures',
    platform: 'EA App (Origin)',
    category: 'Sport / Simulation',
    size: '55 GB',
    instructions: '1. Lancez l\'application EA App sur votre ordinateur.\n2. Connectez-vous avec vos identifiants EA.\n3. Allez dans l\'onglet "Ma Collection" et cliquez sur "Utiliser un code" (Redeem Code).\n4. Saisissez la clé de licence Tunibots ci-dessus et validez.\n5. Téléchargez et profitez de votre jeu immédiatement !'
  },
  {
    id: 'lib-cyberpunk',
    title: 'Cyberpunk 2077: Phantom Liberty (DLC Key)',
    slug: 'cyberpunk-phantom-liberty',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    purchaseDate: '20/06/2026',
    price: 79,
    key: 'CYBER-PL77-NET-ROBO-PL88',
    status: 'Not Installed',
    timePlayed: '0 heure',
    platform: 'GOG Galaxy',
    category: 'RPG / Action',
    size: '70 GB',
    instructions: '1. Ouvrez GOG Galaxy ou visitez le site gog.com.\n2. Connectez-vous à votre compte GOG.\n3. Cliquez sur le logo GOG en haut à gauche, puis sélectionnez "Ajouter des jeux & codes" > "Utiliser un code GOG".\n4. Collez la clé ci-dessus.\n5. L\'extension Phantom Liberty sera liée de façon permanente à votre compte GOG Cyberpunk 2077.'
  }
];

export const ProfilePage: React.FC = () => {
  const { user, isVIP, updateProfile, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParamsState] = useSearchParams();
  
  // State for active tab
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'coordonnees' | 'library'>(
    tabParam === 'library' ? 'library' : 'coordonnees'
  );

  // Sync tab state if searchParams changes
  useEffect(() => {
    if (tabParam === 'library') {
      setActiveTab('library');
    } else if (tabParam === 'coordonnees') {
      setActiveTab('coordonnees');
    }
  }, [tabParam]);

  // Handle Tab changes
  const handleTabChange = (tab: 'coordonnees' | 'library') => {
    setActiveTab(tab);
    setSearchParamsState({ tab });
  };

  // Coordinates Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    discord: user?.discord || '',
    steamId: user?.steamId || '',
    bio: user?.bio || 'Gamer passionné et fier membre de la communauté Tunibots !'
  });

  // Sync form data if user changes (e.g. on login/signup role change)
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        discord: user.discord || '',
        steamId: user.steamId || '',
        bio: user.bio || 'Gamer passionné et fier membre de la communauté Tunibots !'
      });
    }
  }, [user]);

  // Password fields state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Library games state
  const [libraryGames, setLibraryGames] = useState<LibraryItem[]>([]);
  const [selectedGame, setSelectedGame] = useState<LibraryItem | null>(null);
  const [gameSearch, setGameSearch] = useState('');
  const [launchingGameId, setLaunchingGameId] = useState<string | null>(null);
  const [installingGameId, setInstallingGameId] = useState<string | null>(null);

  // Fetch games from defaults and user purchase logs
  useEffect(() => {
    const fetchLibrary = () => {
      const storedPurchases = localStorage.getItem('tunibots_purchased_products');
      let combined: LibraryItem[] = [...DEFAULT_GAMES];
      
      if (storedPurchases) {
        try {
          const parsed = JSON.parse(storedPurchases);
          // Map purchased product to library item format
          const formatted: LibraryItem[] = parsed.map((item: any) => ({
            id: item.id || `purchased-${item.slug}-${Math.random()}`,
            title: item.title,
            slug: item.slug,
            image: item.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
            bannerImage: item.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
            purchaseDate: item.purchaseDate || new Date().toLocaleDateString('fr-FR'),
            price: item.price,
            key: item.key || `TB-KEY-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            status: item.status || 'Not Installed',
            timePlayed: item.timePlayed || '0 heure',
            platform: item.platform || 'Licence Digitale Tunibots',
            category: 'Achat Récent Tunibots',
            size: item.slug.includes('tool') || item.slug.includes('ia') ? 'Cloud App' : 'Variable',
            instructions: `1. Copiez la clé de licence Tunibots ci-dessus.\n2. Allez sur le site officiel de l'éditeur ou lancez le launcher compatible.\n3. Activez le code dans l'espace d'activation de votre compte.\n4. Si vous rencontrez la moindre difficulté, contactez le support Tunibots WhatsApp 24/7 au +216 22 111 222.`
          }));
          
          // Remove duplicates if any
          const uniqueIds = new Set(combined.map(g => g.slug));
          const filteredNew = formatted.filter(f => !uniqueIds.has(f.slug));
          combined = [...combined, ...filteredNew];
        } catch (e) {
          console.error(e);
        }
      }
      setLibraryGames(combined);
      setSelectedGame(combined[0] || null);
    };

    fetchLibrary();
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error('Veuillez vous connecter pour accéder à votre profil.');
      navigate('/connexion');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Handle custom avatar upload
  const handleAvatarFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Format de fichier invalide. Veuillez importer une image PNG, JPG ou WEBP.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Fichier trop volumineux. La taille maximale autorisée est de 2 Mo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      if (base64) {
        updateProfile({ avatar: base64 });
        toast.success("Photo de profil mise à jour avec succès ! 📸");
      }
    };
    reader.onerror = () => {
      toast.error("Erreur lors de la lecture du fichier.");
    };
    reader.readAsDataURL(file);
  };

  // Handle saving coordinates
  const handleSaveCoordinates = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Le nom et l'email sont obligatoires !");
      return;
    }

    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      discord: formData.discord,
      steamId: formData.steamId,
      bio: formData.bio
    });
  };

  // Handle password submission simulation
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Veuillez remplir tous les champs de mot de passe.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas !");
      return;
    }

    toast.success("Votre mot de passe a été modifié avec succès ! 🛡️");
    setPasswordForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  // Handle Copy Key to clipboard
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Clé de produit copiée dans le presse-papiers ! 🔑', {
      description: 'Prête à être activée sur le launcher correspondant.',
      duration: 3000
    });
  };

  // Handle Play/Launch simulation
  const handleLaunchGame = (game: LibraryItem) => {
    if (game.status === 'Not Installed') {
      // Simulate installation first
      setInstallingGameId(game.id);
      toast.info(`Téléchargement de ${game.title} commencé... 🚀`, {
        description: `Taille du fichier : ${game.size || '70 GB'}. Veuillez patienter...`,
        duration: 3000
      });

      setTimeout(() => {
        setInstallingGameId(null);
        setLibraryGames(prev => 
          prev.map(g => g.id === game.id ? { ...g, status: 'Installed' } : g)
        );
        setSelectedGame(prev => prev && prev.id === game.id ? { ...prev, status: 'Installed' } : prev);
        toast.success(`${game.title} est maintenant installé et prêt à être lancé ! 🎉`);
      }, 3500);

    } else {
      // Launch game
      setLaunchingGameId(game.id);
      toast.loading(`Lancement du jeu... Tunibots Secure Engine connecte votre licence... 🎮`, {
        id: 'game-launcher'
      });

      setTimeout(() => {
        setLaunchingGameId(null);
        toast.success(`Succès ! ${game.title} a été lancé. Bon jeu à vous ! 🔥`, {
          id: 'game-launcher',
          description: `Steam Overlay activé. Appuyez sur Shift+Tab en jeu pour vos raccourcis.`,
          duration: 5000
        });
      }, 2500);
    }
  };

  // Filtered games based on search input
  const filteredGames = libraryGames.filter(g => 
    g.title.toLowerCase().includes(gameSearch.toLowerCase()) ||
    g.platform.toLowerCase().includes(gameSearch.toLowerCase()) ||
    (g.category && g.category.toLowerCase().includes(gameSearch.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left">
      {/* Dynamic Ambient Background Glow */}
      {theme === 'dark' ? (
        <>
          <div className="absolute top-[-50px] right-[20%] w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
          <div className="absolute bottom-10 left-[10%] w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </>
      ) : (
        <>
          <div className="absolute top-[-100px] right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-orange-200/15 to-amber-200/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
          <div className="absolute bottom-20 left-[5%] w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/10 to-orange-200/5 rounded-full blur-[140px] pointer-events-none -z-10" />
        </>
      )}

      {/* Header Profile Section with Modern Esports styling */}
      <div className={`relative rounded-2xl border backdrop-blur-xl p-6 md:p-8 mb-8 overflow-hidden shadow-2xl before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-orange-500/5 before:to-transparent before:pointer-events-none ${
        theme === 'dark' 
          ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950' 
          : 'border-orange-500/15 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/40 shadow-xl shadow-orange-500/5'
      }`}>
        {/* Background esports high-end tech grid */}
        <div className={`absolute inset-0 pointer-events-none ${
          theme === 'dark'
            ? 'opacity-100 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px]'
            : 'opacity-100 bg-[linear-gradient(to_right,rgba(249,115,22,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.02)_1px,transparent_1px)] bg-[size:20px_20px]'
        }`} />
        
        {/* Shimmer VIP line */}
        {isVIP && (
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 animate-pulse" />
        )}

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-left">
          {/* Avatar Area with RGB/Glow effect and click-to-upload */}
          <div className="relative group shrink-0">
            <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${
              isVIP ? 'from-amber-500 via-yellow-400 to-amber-600' : 'from-orange-500 to-amber-500'
            } opacity-40 blur-md group-hover:opacity-70 transition duration-500`} />
            
            <label className={`relative h-24 w-24 rounded-full flex items-center justify-center overflow-hidden text-4xl font-black shadow-inner border cursor-pointer group/avatar block ${
              theme === 'dark' ? 'border-white/10 bg-neutral-900' : 'border-orange-500/25 bg-white shadow-md'
            }`}>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAvatarFile(file);
                }}
              />
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-full w-full object-cover group-hover/avatar:scale-105 transition-transform duration-300" 
                  referrerPolicy="no-referrer"
                />
              ) : isVIP ? (
                <Crown className="h-12 w-12 text-amber-500 fill-amber-500/10 group-hover/avatar:scale-105 transition-transform duration-300" />
              ) : (
                <User className="h-12 w-12 text-orange-500 group-hover/avatar:scale-105 transition-transform duration-300" />
              )}

              {/* Hover overlay with Camera icon */}
              <div className={`absolute inset-0 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1 ${
                theme === 'dark' ? 'bg-neutral-950/70' : 'bg-white/90'
              }`}>
                <Camera className="h-5 w-5 text-orange-500" />
                <span className={`text-[8px] font-black uppercase tracking-wider ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                }`}>Modifier</span>
              </div>
            </label>

            {isVIP && (
              <span className="absolute -bottom-1 -left-1 bg-amber-500 text-neutral-950 font-mono font-black text-[9px] px-2 py-0.5 rounded-full uppercase border border-neutral-950 shadow-md">
                VIP
              </span>
            )}

            {/* Small floating action/indicator icon on bottom-right to upload custom image */}
            <label className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center border border-neutral-950 shadow-lg cursor-pointer transition-colors hover:scale-105 active:scale-95 duration-200">
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                className="hidden" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleAvatarFile(file);
                }}
              />
              <Camera className="h-3.5 w-3.5" />
            </label>
          </div>

          <div className="flex-grow space-y-4">
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center md:justify-start">
                <h2 className={`text-2xl font-black tracking-tight flex items-center gap-2 justify-center md:justify-start ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-900'
                }`}>
                  {user.name}
                </h2>
                <div className="flex gap-2 justify-center sm:justify-start">
                  {isVIP ? (
                    <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded border border-amber-500/20 uppercase">
                      MEMBRE VIP GOLD (-15%)
                    </span>
                  ) : (
                    <span className={`inline-flex items-center gap-1 text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded border uppercase ${
                      theme === 'dark' ? 'bg-neutral-900 text-neutral-400 border-white/5' : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                    }`}>
                      CLIENT STANDARD
                    </span>
                  )}
                </div>
              </div>
              <p className={`text-sm font-medium ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>{user.email}</p>
            </div>

            <p className={`text-xs italic max-w-xl mx-auto md:mx-0 ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              "{formData.bio}"
            </p>

            {/* Quick Metrics */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
                theme === 'dark' ? 'bg-neutral-900/60 border-white/5' : 'bg-white border-orange-500/10 shadow-sm'
              }`}>
                <Gamepad2 className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="text-[10px] text-neutral-500 font-mono">BIBLIOTHÈQUE</p>
                  <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{libraryGames.length} Produits</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
                theme === 'dark' ? 'bg-neutral-900/60 border-white/5' : 'bg-white border-orange-500/10 shadow-sm'
              }`}>
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <div>
                  <p className="text-[10px] text-neutral-500 font-mono">SÉCURITÉ DU COMPTE</p>
                  <p className="text-sm font-black text-emerald-400">100% Vérifié</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
                theme === 'dark' ? 'bg-neutral-900/60 border-white/5' : 'bg-white border-orange-500/10 shadow-sm'
              }`}>
                <ShoppingBag className="h-4 w-4 text-amber-500" />
                <div>
                  <p className="text-[10px] text-neutral-500 font-mono">ACHATS TOTAUX</p>
                  <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {libraryGames.reduce((acc, g) => acc + (g.price || 0), 0)} DT
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Action Button */}
          <div className="self-center md:self-start pt-2">
            <button 
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-black hover:bg-red-500/20 active:scale-95 transition-all"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={`flex border-b mb-8 gap-2 ${
        theme === 'dark' ? 'border-white/5' : 'border-neutral-200'
      }`}>
        <button
          onClick={() => handleTabChange('coordonnees')}
          className={`px-5 py-3 text-xs font-black tracking-widest uppercase border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'coordonnees'
              ? 'border-orange-500 text-orange-500 bg-orange-500/5'
              : theme === 'dark'
                ? 'border-transparent text-neutral-400 hover:text-white hover:bg-white/5'
                : 'border-transparent text-neutral-500 hover:text-orange-600 hover:bg-orange-500/5'
          }`}
        >
          <User className="h-4 w-4" />
          Mes Coordonnées & Sécurité
        </button>
        <button
          onClick={() => handleTabChange('library')}
          className={`px-5 py-3 text-xs font-black tracking-widest uppercase border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'library'
              ? 'border-orange-500 text-orange-500 bg-orange-500/5'
              : theme === 'dark'
                ? 'border-transparent text-neutral-400 hover:text-white hover:bg-white/5'
                : 'border-transparent text-neutral-500 hover:text-orange-600 hover:bg-orange-500/5'
          }`}
        >
          <Gamepad2 className="h-4 w-4" />
          Ma Bibliothèque (Historique)
        </button>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'coordonnees' ? (
          <motion.div
            key="coordonnees"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Left Column: Personal Coordinates Edit */}
            <div className="lg:col-span-8 space-y-8">
              <div className={`rounded-2xl border p-6 md:p-8 shadow-2xl relative overflow-hidden before:absolute before:-top-24 before:-left-24 before:w-48 before:h-48 before:bg-orange-500/5 before:rounded-full before:blur-3xl before:pointer-events-none ${
                theme === 'dark'
                  ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/30 to-neutral-950'
                  : 'border-orange-500/10 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40 shadow-xl'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Coordonnées du Client</h3>
                    <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Modifier vos adresses, contacts WhatsApp et pseudos gaming.</p>
                  </div>
                </div>

                <form onSubmit={handleSaveCoordinates} className="space-y-6">
                  {/* Grid fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Nom Complet */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Nom Complet</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Nom Prénom"
                          className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                            theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Adresse Email */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Adresse Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@example.com"
                          className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-xs cursor-not-allowed outline-none ${
                            theme === 'dark' ? 'border-white/5 bg-neutral-900/40 text-neutral-400' : 'border-neutral-200 bg-neutral-50 text-neutral-500'
                          }`}
                          disabled
                        />
                      </div>
                      <p className="text-[9px] text-neutral-500 font-mono">L'adresse email ne peut pas être modifiée.</p>
                    </div>

                    {/* WhatsApp / Téléphone */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Numéro WhatsApp / Téléphone</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+216 22 111 222"
                          className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                            theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                          }`}
                        />
                      </div>
                      <p className="text-[9px] text-neutral-500 font-mono">Saisir pour la livraison ultra-rapide par WhatsApp.</p>
                    </div>

                    {/* Discord Tag */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Pseudo Discord</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-black">#</span>
                        <input
                          type="text"
                          value={formData.discord}
                          onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                          placeholder="mon_pseudo_discord"
                          className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                            theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                          }`}
                        />
                      </div>
                      <p className="text-[9px] text-neutral-500 font-mono">Utile pour réclamer vos rôles VIP sur le serveur Discord.</p>
                    </div>

                    {/* Adresse de livraison */}
                    <div className="space-y-2 md:col-span-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Adresse Complète</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 h-4 w-4 text-neutral-500" />
                        <textarea
                          rows={2}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Rue, Immeuble, Appartement, Ville..."
                          className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-all resize-none ${
                            theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Ville */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Ville / Gouvernorat</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Tunis, Sousse, Sfax, Nabeul..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                          theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                        }`}
                      />
                    </div>

                    {/* Code Postal */}
                    <div className="space-y-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Code Postal</label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        placeholder="2080"
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                          theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                        }`}
                      />
                    </div>

                    {/* Steam ID */}
                    <div className="space-y-2 md:col-span-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Lien Profil Steam / Steam ID</label>
                      <div className="relative">
                        <Gamepad2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                        <input
                          type="text"
                          value={formData.steamId}
                          onChange={(e) => setFormData({ ...formData, steamId: e.target.value })}
                          placeholder="https://steamcommunity.com/profiles/76561198..."
                          className={`w-full pl-11 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                            theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Bio description */}
                    <div className="space-y-2 md:col-span-2">
                      <label className={`text-[10px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Ma Citation / Bio de Gamer</label>
                      <textarea
                        rows={2}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Parlez-nous un peu de vous..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-all resize-none ${
                          theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800 shadow-sm'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-orange-500 text-neutral-950 text-xs font-black uppercase tracking-wider hover:bg-orange-400 active:scale-95 transition-all flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Enregistrer mes informations
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Security/Password & VIP perks */}
            <div className="lg:col-span-4 space-y-8">
              {/* Security / Password Simulation */}
              <div className={`rounded-2xl border p-6 shadow-2xl relative overflow-hidden before:absolute before:-top-24 before:-right-24 before:w-48 before:h-48 before:bg-amber-500/5 before:rounded-full before:blur-3xl before:pointer-events-none ${
                theme === 'dark'
                  ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/30 to-neutral-950'
                  : 'border-orange-500/10 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40 shadow-xl'
              }`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Sécurité du Compte</h3>
                    <p className={`text-[10px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Changer de mot de passe régulièrement.</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className={`text-[9px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Ancien Mot de passe</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className={`w-full px-4 py-2 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                        theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`text-[9px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Nouveau Mot de passe</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className={`w-full px-4 py-2 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                        theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800'
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`text-[9px] font-extrabold uppercase tracking-wider ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Confirmer le Nouveau Mot de passe</label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="••••••••••••"
                      className={`w-full px-4 py-2 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                        theme === 'dark' ? 'border-white/5 bg-neutral-900/60 text-white' : 'border-orange-500/10 bg-white text-neutral-800'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-2.5 mt-2 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                      theme === 'dark' ? 'border-white/10 bg-neutral-900 hover:bg-neutral-800 text-white' : 'border-orange-500/20 bg-orange-500 hover:bg-orange-600 text-neutral-950 font-black'
                    }`}
                  >
                    Mettre à jour la clé de sécurité
                  </button>
                </form>

                {/* Double Facteur OTP Activation Toggle */}
                <div className={`border-t pt-5 mt-5 space-y-3 ${theme === 'dark' ? 'border-white/10' : 'border-neutral-200'}`}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-orange-500">Double Facteur OTP</label>
                      <p className={`text-[9px] ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>Exiger un code unique envoyé par e-mail.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentVal = user.otpEnabled !== false;
                        const nextOtp = !currentVal;
                        updateProfile({ otpEnabled: nextOtp });
                        if (nextOtp) {
                          toast.success("Double facteur (OTP) activé ! 🔒", {
                            description: "Un code OTP sera maintenant requis lors de votre connexion.",
                            duration: 4000
                          });
                        } else {
                          toast.warning("Double facteur (OTP) désactivé ! ⚠️", {
                            description: "La protection de votre compte est réduite.",
                            duration: 4000
                          });
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors outline-none ${
                        user.otpEnabled !== false ? 'bg-orange-500' : theme === 'dark' ? 'bg-neutral-800 border border-white/10' : 'bg-neutral-200 border border-neutral-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          user.otpEnabled !== false ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {user.otpEnabled !== false ? (
                    <div className={`rounded-xl p-3 text-[10px] flex items-start gap-2 leading-relaxed ${
                      theme === 'dark' ? 'bg-emerald-500/5 border border-emerald-500/10 text-emerald-400' : 'bg-emerald-50 border border-emerald-500/20 text-emerald-800'
                    }`}>
                      <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Votre compte est protégé par OTP. Un code de sécurité unique vous sera demandé à chaque connexion et lors des étapes d'achat sensibles.</span>
                    </div>
                  ) : (
                    <div className={`rounded-xl p-3 text-[10px] flex items-start gap-2 leading-relaxed ${
                      theme === 'dark' ? 'bg-amber-500/5 border border-amber-500/10 text-amber-400' : 'bg-amber-50 border border-amber-500/20 text-amber-800'
                    }`}>
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>Attention : La sécurité de votre compte est réduite. Nous vous recommandons d'activer la vérification OTP pour protéger vos clés de produits.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* VIP Benefits Box */}
              <div className={`rounded-2xl border shadow-2xl relative overflow-hidden transition-all p-6 ${
                isVIP 
                  ? (theme === 'dark' ? 'border-amber-500/30 bg-gradient-to-br from-neutral-950 via-amber-950/20 to-neutral-900' : 'border-amber-500/30 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-lg shadow-amber-500/5')
                  : (theme === 'dark' ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/30 to-neutral-950' : 'border-orange-500/10 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40 shadow-xl')
              }`}>
                {isVIP && (
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none" />
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${isVIP ? 'bg-amber-500/10 text-amber-400' : 'bg-neutral-800 text-neutral-400'}`}>
                    <Crown className="h-5 w-5 fill-amber-500/5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">Privilèges {isVIP ? 'VIP Gold' : 'Club Tunibots'}</h3>
                    <p className="text-[10px] text-neutral-400">Profitez de vos offres de gamer privilégié.</p>
                  </div>
                </div>

                <div className="space-y-3.5 pt-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-neutral-300">
                      <strong className="text-white">Remise Automatique de 15%</strong> sur l'intégralité du store (Jeux, Codes, Outils IA).
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-neutral-300">
                      <strong className="text-white">Livraison 15 Minutes</strong> par WhatsApp garantie sur toutes vos transactions.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
                    <p className="text-neutral-300">
                      <strong className="text-white">Support Prioritaire WhatsApp</strong> 24h/24, 7j/7 dédié aux membres.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="library"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT SIDEBAR: Games List & Search (Steam Style) */}
            <div className="lg:col-span-4 flex flex-col space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  value={gameSearch}
                  onChange={(e) => setGameSearch(e.target.value)}
                  placeholder="Rechercher dans la bibliothèque..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs outline-none focus:border-orange-500 transition-colors ${
                    theme === 'dark' ? 'border-white/5 bg-neutral-950/80 text-white' : 'border-orange-500/20 bg-white text-neutral-800 shadow-sm'
                  }`}
                />
              </div>

              {/* Games Vertical Scroll List */}
              <div className={`rounded-2xl border p-3 max-h-[500px] overflow-y-auto space-y-1.5 custom-scrollbar shadow-2xl ${
                theme === 'dark'
                  ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/40 to-neutral-950'
                  : 'border-orange-500/10 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40'
              }`}>
                {filteredGames.length === 0 ? (
                  <div className="py-12 text-center text-neutral-500 space-y-2">
                    <Gamepad2 className="h-8 w-8 mx-auto text-neutral-700 animate-pulse" />
                    <p className="text-xs font-bold font-mono">AUCUN PRODUIT TROUVÉ</p>
                    <p className="text-[10px] text-neutral-600">Achetez un jeu pour le voir apparaître ici.</p>
                  </div>
                ) : (
                  filteredGames.map((game) => {
                    const isSelected = selectedGame?.id === game.id;
                    return (
                      <button
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className={`w-full p-2.5 rounded-xl border transition-all text-left flex items-center gap-3.5 group relative overflow-hidden ${
                          isSelected 
                            ? theme === 'dark'
                              ? 'bg-neutral-900 border-orange-500/30 shadow-lg shadow-orange-500/5' 
                              : 'bg-orange-500/10 border-orange-500/40 shadow-md shadow-orange-500/5'
                            : theme === 'dark'
                              ? 'bg-transparent border-transparent hover:bg-neutral-900/40 hover:border-white/5'
                              : 'bg-transparent border-transparent hover:bg-orange-500/5 hover:border-orange-500/15'
                        }`}
                      >
                        {/* Selected Indicator bar */}
                        {isSelected && (
                          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500" />
                        )}

                        {/* Thumbnail */}
                        <div className="h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-white/5 relative">
                          <img 
                            src={game.image} 
                            alt={game.title} 
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                          />
                        </div>

                        {/* Text Metadata */}
                        <div className="flex-grow min-w-0">
                          <p className={`text-xs font-black truncate transition-colors ${
                            isSelected 
                              ? theme === 'dark' ? 'text-white' : 'text-neutral-950'
                              : theme === 'dark' ? 'text-neutral-300 group-hover:text-white' : 'text-neutral-700 group-hover:text-neutral-950'
                          }`}>
                            {game.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] font-mono text-neutral-500 tracking-wider">
                              {game.platform}
                            </span>
                            <span className="text-neutral-700 text-[9px]">•</span>
                            <span className="text-[9px] font-bold font-mono text-orange-500">
                              CLÉ DISPONIBLE
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Static Instruction Help Widget */}
              <div className={`rounded-2xl border p-4 space-y-3 shadow-lg ${
                theme === 'dark'
                  ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/30 to-neutral-950'
                  : 'border-orange-500/10 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40'
              }`}>
                <div className={`flex items-center gap-2 text-xs font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Activation Tunibots Protégée</span>
                </div>
                <p className={`text-[10px] leading-relaxed ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Toutes vos clés proviennent directement des éditeurs officiels. Une fois activée, la licence est liée à vie à votre compte personnel Steam, Origin, GOG, Epic ou Rockstar.
                </p>
              </div>
            </div>

            {/* RIGHT PANEL: Immersive Game detail view (Steam dashboard) */}
            <div className="lg:col-span-8">
              {selectedGame ? (
                <div className={`rounded-2xl border overflow-hidden shadow-2xl flex flex-col relative before:absolute before:top-0 before:right-0 before:w-64 before:h-64 before:bg-orange-500/5 before:rounded-full before:blur-3xl before:pointer-events-none ${
                  theme === 'dark'
                    ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950'
                    : 'border-orange-500/10 bg-gradient-to-br from-orange-50/30 via-white to-amber-50/30 shadow-2xl'
                }`}>
                  {/* Hero banner image with title and platform */}
                  <div className="relative h-48 md:h-64 w-full">
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent z-10" />
                    <img 
                      src={selectedGame.bannerImage || selectedGame.image} 
                      alt={selectedGame.title} 
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Meta Badge above banner title */}
                    <div className="absolute bottom-6 left-6 md:left-8 right-6 z-20 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-orange-500 text-neutral-950 text-[9px] font-black tracking-widest px-2 py-0.5 rounded uppercase">
                          {selectedGame.category || 'Premium Game'}
                        </span>
                        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold tracking-wider px-2 py-0.5 rounded border border-white/5">
                          {selectedGame.platform}
                        </span>
                      </div>
                      <h1 className="text-xl md:text-3xl font-black tracking-tight text-white drop-shadow-md">
                        {selectedGame.title}
                      </h1>
                    </div>
                  </div>

                  {/* Dashboard Core Metadata Ribbon */}
                  <div className={`grid grid-cols-2 sm:grid-cols-4 border-b p-4 text-center ${
                    theme === 'dark' ? 'border-white/5 bg-neutral-950' : 'border-orange-500/10 bg-orange-500/5'
                  }`}>
                    <div className={`border-r py-1 ${theme === 'dark' ? 'border-white/5' : 'border-orange-500/10'}`}>
                      <p className="text-[9px] text-neutral-500 font-mono">PRIX D'ACHAT</p>
                      <p className={`text-xs font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{selectedGame.price} DT</p>
                    </div>
                    <div className={`border-r py-1 ${theme === 'dark' ? 'border-white/5' : 'border-orange-500/10'}`}>
                      <p className="text-[9px] text-neutral-500 font-mono">DATE D'ACHAT</p>
                      <p className={`text-xs font-bold mt-1 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>{selectedGame.purchaseDate}</p>
                    </div>
                    <div className={`border-r py-1 ${theme === 'dark' ? 'border-white/5' : 'border-orange-500/10'}`}>
                      <p className="text-[9px] text-neutral-500 font-mono">STATUT DU CODE</p>
                      <p className="text-xs font-black text-emerald-400 mt-1 flex items-center justify-center gap-1">
                        <Check className="h-3 w-3" /> Activé
                      </p>
                    </div>
                    <div className="py-1">
                      <p className="text-[9px] text-neutral-500 font-mono">TYPE DE PRODUIT</p>
                      <p className="text-xs font-black text-orange-500 mt-1">Licence Digitale</p>
                    </div>
                  </div>

                  {/* Body Details panel */}
                  <div className="p-6 md:p-8 space-y-8">
                    
                    {/* Delivery & Security Certificate Bar */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/5 to-amber-500/5 border border-orange-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1.5 text-center sm:text-left">
                        <p className="text-[10px] text-orange-500 font-mono tracking-widest uppercase">COFFRE-FORT DE CLÉS SÉCURISÉ</p>
                        <h4 className={`text-sm font-black flex items-center gap-2 justify-center sm:justify-start ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                          <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                          Clé de licence 100% authentique & certifiée
                        </h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          Copiez le code de licence ci-dessous pour l'activer sur la plateforme correspondante ({selectedGame.platform}).
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopyKey(selectedGame.key)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 text-neutral-950 text-xs font-black uppercase tracking-wider hover:bg-orange-400 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                        COPIER LA CLÉ
                      </button>
                    </div>

                    {/* Activation / Serial key display box */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className={`text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          <Key className="h-3.5 w-3.5 text-orange-500" />
                          Clé d'activation du produit / Code de Licence
                        </label>
                        <span className="text-[9px] font-mono text-neutral-500">Tunibots Secure Transaction</span>
                      </div>
                      
                      <div className={`relative rounded-xl border p-4 flex items-center justify-between shadow-inner group ${
                        theme === 'dark' ? 'border-orange-500/20 bg-neutral-900/80' : 'border-orange-500/35 bg-orange-500/5'
                      }`}>
                        {/* Grid matrix overlay in the code display */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,145,0,0.015)_1px,transparent_1px)] bg-[size:10px] pointer-events-none rounded-xl" />
                        
                        <code className={`text-sm md:text-base font-black font-mono select-all tracking-wider relative z-10 ${
                          theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300' : 'text-orange-950'
                        }`}>
                          {selectedGame.key}
                        </code>

                        <button
                          onClick={() => handleCopyKey(selectedGame.key)}
                          className={`px-3.5 py-2 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 relative z-10 shrink-0 ${
                            theme === 'dark'
                              ? 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20 text-orange-400'
                              : 'bg-orange-500/20 border-orange-500/30 hover:bg-orange-500/30 text-orange-800'
                          }`}
                          title="Copier le code de licence"
                        >
                          <Copy className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Copier</span>
                        </button>
                      </div>
                    </div>

                    {/* Activation guide instructions */}
                    <div className="space-y-4">
                      <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                        <Compass className="h-4 w-4 text-orange-500" />
                        <span>Guide d'activation étape par étape</span>
                      </div>
                      
                      <div className={`rounded-xl border p-4 md:p-5 ${
                        theme === 'dark' ? 'border-white/5 bg-neutral-900/30' : 'border-orange-500/10 bg-white shadow-inner'
                      }`}>
                        <div className={`text-xs space-y-3 leading-relaxed whitespace-pre-line ${
                          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-700 font-medium'
                        }`}>
                          {selectedGame.instructions}
                        </div>
                      </div>
                    </div>

                    {/* Terms / Notice */}
                    <div className={`flex gap-3 p-4 rounded-xl border ${
                      theme === 'dark' ? 'border-white/5 bg-neutral-950/40 text-neutral-500' : 'border-orange-500/10 bg-orange-50/20 text-neutral-600'
                    } text-[10px]`}>
                      <AlertCircle className="h-4 w-4 text-neutral-600 shrink-0 mt-0.5" />
                      <p>
                        Besoin d'aide ? Cette clé est garantie à vie. Si vous rencontrez un problème d'activation, prenez une capture d'écran et contactez notre support client tunisien via WhatsApp. Aucun remboursement ne sera accepté après la révélation et copie de la clé de produit.
                      </p>
                    </div>

                  </div>
                </div>
              ) : (
                <div className={`rounded-2xl border p-20 text-center space-y-4 shadow-2xl relative before:absolute before:-bottom-24 before:-right-24 before:w-48 before:h-48 before:bg-orange-500/5 before:rounded-full before:blur-3xl ${
                  theme === 'dark'
                    ? 'border-white/10 bg-gradient-to-br from-neutral-950 via-neutral-900/40 to-neutral-950'
                    : 'border-orange-500/10 bg-gradient-to-br from-orange-50/40 via-white to-amber-50/40 shadow-xl'
                }`}>
                  <Gamepad2 className="h-12 w-12 mx-auto text-neutral-700 animate-bounce" />
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>Sélectionnez un produit</h3>
                  <p className={`text-xs max-w-xs mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Choisissez l'un de vos titres à gauche pour révéler sa clé d'activation sécurisée et ses instructions d'activation.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
