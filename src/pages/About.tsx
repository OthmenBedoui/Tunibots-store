import React from 'react';
import { useSettings } from '../data/queries/storeQueries';
import { ShieldCheck, Heart, Users, MessageSquareCode, Award, ShieldAlert, Check } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';

export const About: React.FC = () => {
  const { data: settings } = useSettings();

  const milestones = [
    {
      icon: <Award className="h-5 w-5 text-orange-500" />,
      title: "100% Produits Authentiques",
      description: "Nous collaborons directement avec les principaux grossistes de clés d'activation mondiaux pour vous fournir des licences légales et durables."
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-orange-500" />,
      title: "Garantie Totale de Remplacement",
      description: "En cas de problème technique ou de dysfonctionnement sur un compte ou une clé, notre SAV s'engage à vous remplacer l'accès sous 24h maximum."
    },
    {
      icon: <Users className="h-5 w-5 text-orange-500" />,
      title: "+1 500 Clients Satisfaits",
      description: "Une communauté active et engagée en Tunisie qui nous fait confiance quotidiennement pour leurs besoins gaming, divertissement et professionnels."
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      
      {/* Title Header */}
      <div className="text-center space-y-3">
        <Badge className="bg-orange-500/10 text-orange-500 hover:bg-orange-500/10 border-none px-3 py-1 rounded font-bold text-xs">
          À Propos de Nous
        </Badge>
        <h1 className="font-display text-3xl font-black text-white tracking-tight sm:text-4xl">
          L'HISTOIRE DE <span className="text-orange-500">TUNIBOTS</span>
        </h1>
        <p className="text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Découvrez la mission de notre plateforme digitale et notre engagement à démocratiser l'accès aux technologies premium et au gaming en Tunisie.
        </p>
      </div>

      {/* Intro section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-white leading-tight">
            Pourquoi avoir créé TUNIBOTS ?
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            En Tunisie, se procurer des licences de logiciels de design (Canva), des accès d'intelligence artificielle (ChatGPT Plus) ou des jeux vidéo récents (Steam, PlayStation) s'avère souvent complexe en raison des restrictions sur les devises internationales et des tarifs prohibitifs.
          </p>
          <p className="text-xs text-neutral-300 leading-relaxed">
            TUNIBOTS est née d'une idée simple : **permettre à chaque Tunisien — étudiant, gamer ou professionnel — d'acheter ces services essentiels de manière sécurisée, abordable et ultra-rapide**, en payant tout simplement en Dinars Tunisiens (DT).
          </p>
        </div>
        <div className="rounded-xl overflow-hidden aspect-video bg-neutral-900 border border-white/5 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"
            alt="TUNIBOTS Workspace"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute bottom-4 left-4 z-20 space-y-1">
            <span className="text-[10px] text-orange-500 font-mono font-bold uppercase tracking-wider">Plateforme Nationale</span>
            <h4 className="text-sm font-bold text-white">Livraison instantanée par e-mail & SMS</h4>
          </div>
        </div>
      </section>

      {/* Milestones grid */}
      <section className="space-y-6 pt-6">
        <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider text-center border-b border-white/5 pb-4">
          Nos engagements et garanties phares :
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((ms, idx) => (
            <Card key={idx} className="bg-neutral-900/40 border-white/5 p-6 rounded-xl space-y-3">
              <CardContent className="p-0 space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  {ms.icon}
                </div>
                <h4 className="font-display text-xs font-black text-white">{ms.title}</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{ms.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Support CTA card */}
      <section className="p-8 rounded-2xl bg-neutral-900/60 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="font-display text-base font-black text-white flex items-center justify-center md:justify-start gap-1.5 uppercase tracking-wide">
            <MessageSquareCode className="h-5 w-5 text-orange-500" /> Des questions ? Notre support WhatsApp est là !
          </h4>
          <p className="text-xs text-neutral-400 max-w-lg">
            Vous avez un doute avant d'acheter ou vous souhaitez un devis personnalisé pour votre entreprise ? Contactez nos conseillers nationaux, nous répondons en moins de 10 minutes.
          </p>
        </div>
        <a
          href={`https://wa.me/${settings?.whatsappNumber?.replace(/\s+/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white px-6 transition-colors shadow-lg shadow-orange-500/15"
        >
          Discuter sur WhatsApp ({settings?.whatsappNumber})
        </a>
      </section>

    </div>
  );
};
