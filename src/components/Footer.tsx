import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings, useNavItems } from '../data/queries/storeQueries';
import { Mail, Phone, Flame, Facebook, Instagram, ShieldCheck, HelpCircle, Crown } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data: settings } = useSettings();
  const { data: footerNav } = useNavItems('footer');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Store Intro */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-display text-2xl font-black tracking-wider text-orange-500">
                TUNI<span className="text-white">BOTS</span>
              </span>
              <div className="rounded-full bg-orange-500/10 p-1 text-orange-500">
                <Flame className="h-4 w-4 fill-orange-500/20" />
              </div>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed">
              La boutique tunisienne de référence pour vos produits digitaux, comptes premium, boosting pro et licences d'intelligence artificielle au meilleur prix national.
            </p>
            <div className="flex space-x-4 pt-2">
              {settings?.socials.facebook && (
                <a href={settings.socials.facebook} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {settings?.socials.instagram && (
                <a href={settings.socials.instagram} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick links */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-white tracking-wide">La Boutique</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/produits" className="hover:text-orange-500 transition-colors">Tous les Produits</Link>
              </li>
              <li>
                <Link to="/produits?category=outils-ia" className="hover:text-orange-500 transition-colors">Licences & Outils IA</Link>
              </li>
              <li>
                <Link to="/produits?category=gaming" className="hover:text-orange-500 transition-colors">Gaming & Clés Steam</Link>
              </li>
              <li>
                <Link to="/connexion" className="hover:text-amber-500 transition-colors flex items-center gap-1 font-semibold text-amber-500/90">
                  <Crown className="h-3 w-3 shrink-0" /> Espace VIP / Connexion
                </Link>
              </li>
              <li>
                <Link to="/inscription" className="hover:text-orange-500 transition-colors">Créer un Compte Club</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Information & FAQ */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-white tracking-wide">Informations</h4>
            <ul className="space-y-2 text-xs">
              {footerNav?.map((item) => (
                <li key={item.id}>
                  <Link to={item.url} className="hover:text-orange-500 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Support */}
          <div className="space-y-4">
            <h4 className="font-display text-sm font-semibold text-white tracking-wide">Support Client</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-500 text-[10px] uppercase font-bold tracking-wider">WhatsApp 7j/7</span>
                  <a href={`https://wa.me/${settings?.whatsappNumber?.replace(/\s+/g, '')}`} target="_blank" rel="noreferrer" className="text-white font-bold hover:text-orange-500 font-mono transition-colors">
                    {settings?.whatsappNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-500 text-[10px] uppercase font-bold tracking-wider">E-mail support</span>
                  <a href={`mailto:${settings?.supportEmail}`} className="text-white hover:text-orange-500 transition-colors">
                    {settings?.supportEmail}
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Payment methods */}
        <div className="mt-12 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500">
          <div>
            <p>© {currentYear} TUNIBOTS. Tous droits réservés.</p>
            <p className="text-[10px] text-neutral-600 mt-1">
              Les marques citées (Steam, Netflix, Epic Games...) restent la propriété de leurs éditeurs respectifs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-1.5 rounded bg-white/5 px-2.5 py-1 text-white border border-white/5">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider font-mono">100% Sécurisé</span>
            </div>
            <div className="text-[10px] text-neutral-400 flex items-center space-x-2">
              <span>Moyens Acceptés :</span>
              <span className="font-bold text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded border border-white/5">D17</span>
              <span className="font-bold text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded border border-white/5">Sobflous</span>
              <span className="font-bold text-white font-mono bg-neutral-900 px-1.5 py-0.5 rounded border border-white/5">Carte Bancaire</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
