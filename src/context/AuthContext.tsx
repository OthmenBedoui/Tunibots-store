import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'standard' | 'vip';
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  bio?: string;
  discord?: string;
  steamId?: string;
  otpEnabled?: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isVIP: boolean;
  login: (email: string, role: 'standard' | 'vip', name?: string) => void;
  signUp: (name: string, email: string, role: 'standard' | 'vip') => void;
  logout: () => void;
  toggleRole: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  isOtpEnabled: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get registry from localStorage
const getUsersRegistry = (): Record<string, Partial<User>> => {
  try {
    const saved = localStorage.getItem('tunibots_registered_users');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const saveUserToRegistry = (user: User) => {
  try {
    const registry = getUsersRegistry();
    registry[user.email.toLowerCase()] = user;
    localStorage.setItem('tunibots_registered_users', JSON.stringify(registry));
  } catch (e) {
    console.error(e);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('tunibots_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('tunibots_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tunibots_user');
    }
  }, [user]);

  const login = (email: string, role: 'standard' | 'vip', name?: string) => {
    const defaultName = name || (role === 'vip' ? 'Gamer VIP Pro' : 'Utilisateur');
    const registry = getUsersRegistry();
    const existing = registry[email.toLowerCase()];

    const newUser: User = {
      id: existing?.id || Math.random().toString(36).substr(2, 9),
      name: existing?.name || defaultName,
      email,
      role: existing?.role || role,
      phone: existing?.phone || '',
      address: existing?.address || '',
      city: existing?.city || '',
      postalCode: existing?.postalCode || '',
      discord: existing?.discord || '',
      steamId: existing?.steamId || '',
      bio: existing?.bio || '',
      otpEnabled: existing?.otpEnabled !== undefined ? existing.otpEnabled : true,
      avatar: existing?.avatar || '',
    };
    setUser(newUser);
    saveUserToRegistry(newUser);

    if (role === 'vip') {
      toast.success(`Bienvenue, Membre VIP ${newUser.name} ! Tarif Gold activé. 🌟`, {
        description: 'Bénéficiez de -15% de réduction supplémentaire sur tous nos produits !',
        duration: 5000,
      });
    } else {
      toast.success(`Connexion réussie ! Bienvenue ${newUser.name}.`);
    }
  };

  const signUp = (name: string, email: string, role: 'standard' | 'vip') => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      discord: '',
      steamId: '',
      bio: '',
      otpEnabled: true, // defaults to true on signup
      avatar: '',
    };
    setUser(newUser);
    saveUserToRegistry(newUser);

    if (role === 'vip') {
      toast.success(`Inscription VIP réussie ! Bienvenue ${name} 🌟`, {
        description: 'Tarif Gold de -15% appliqué automatiquement !',
        duration: 5000,
      });
    } else {
      toast.success(`Compte créé avec succès ! Bienvenue ${name}.`);
    }
  };

  const logout = () => {
    const oldName = user?.name;
    setUser(null);
    toast.info(`Déconnexion réussie. À bientôt ${oldName || ''} !`);
  };

  const toggleRole = () => {
    if (!user) {
      // If not logged in, log in as VIP
      login('vip@tunibots.com', 'vip', 'Démonstration VIP');
      return;
    }
    const newRole = user.role === 'vip' ? 'standard' : 'vip';
    const updated = { ...user, role: newRole };
    setUser(updated);
    saveUserToRegistry(updated);
    if (newRole === 'vip') {
      toast.success(`Statut VIP Activé ! 🌟 Tarifs Gold (-15%) débloqués.`, {
        duration: 4000,
      });
    } else {
      toast.info(`Statut Standard Activé. Tarifs réguliers appliqués.`, {
        duration: 4000,
      });
    }
  };

  const updateProfile = (updatedData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const next = { ...prev, ...updatedData };
      saveUserToRegistry(next);
      return next;
    });
    toast.success("Profil mis à jour avec succès ! ✨");
  };

  const isOtpEnabled = (email: string) => {
    const registry = getUsersRegistry();
    const existing = registry[email.toLowerCase()];
    return existing?.otpEnabled !== undefined ? existing.otpEnabled : true;
  };

  const isVIP = user?.role === 'vip';

  return (
    <AuthContext.Provider value={{ user, isVIP, login, signUp, logout, toggleRole, updateProfile, isOtpEnabled }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
