import { Review } from '../types';

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    author: 'Mohamed Ali B.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Service incroyablement rapide ! J\'ai acheté un compte Netflix UHD et j\'ai reçu mes accès par email en moins de 10 minutes. Le profil est super stable, rien à redire. Je recommande TUNIBOTS à 100% !',
    role: 'Client Vérifié',
    date: 'Il y a 3 jours'
  },
  {
    id: 'rev-2',
    author: 'Yasmine K.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'J\'avais des doutes pour Canva Pro mais l\'invitation équipe sur mon propre e-mail s\'est faite sans accroc. Le support client sur WhatsApp est super réactif et poli. Merci infiniment !',
    role: 'Graphiste Freelance',
    date: 'Il y a 1 semaine'
  },
  {
    id: 'rev-3',
    author: 'Skander J.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Achat d\'une clé Elden Ring Steam PC. Activation immédiate, aucun problème régional. C\'est de loin le site le plus sérieux de Tunisie pour l\'achat de jeux vidéo !',
    role: 'Gamer Passionné',
    date: 'Il y a 2 semaines'
  },
  {
    id: 'rev-4',
    author: 'Amine T.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4,
    text: 'Service de boosting sur Valorant impeccable. Le booster a été très pro, sympa et discret. Mon compte est passé de Gold 2 à Plat 1 en un temps record. Petit retard de lancement de 2h mais vite rattrapé.',
    role: 'Joueur Valorant',
    date: 'Il y a 1 mois'
  }
];
