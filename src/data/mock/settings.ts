import { StoreSettings } from '../types';

export const mockStoreSettings: StoreSettings = {
  storeName: 'TUNIBOTS',
  logoUrl: '/logo.png', // Fallback to premium text logo
  supportEmail: 'support@tunibots.com',
  whatsappNumber: '+216 22 111 222',
  socials: {
    facebook: 'https://facebook.com/tunibots',
    instagram: 'https://instagram.com/tunibots',
    discord: 'https://discord.gg/tunibots',
    youtube: 'https://youtube.com/tunibots'
  }
};
