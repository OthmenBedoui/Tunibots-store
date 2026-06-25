import React from 'react';
import { Shield, BookOpen, HelpCircle, MessageSquareText } from 'lucide-react';

// CGV (Conditions Générales de Vente) Component
export const CGV: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-bold text-orange-500 font-mono uppercase tracking-wider">
          <BookOpen className="h-3 w-3" />
          <span>LÉGAL / SÉCURITÉ</span>
        </div>
        <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight sm:text-3xl">
          Conditions Générales de <span className="text-orange-500">Vente</span>
        </h1>
        <p className="text-xs text-neutral-400">Dernière mise à jour : 25 Juin 2026</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121212] border border-white/5 space-y-6 text-neutral-300 text-xs leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            1. Objet et acceptation des conditions
          </h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les transactions effectuées sur le site TUNIBOTS. Toute commande passée implique l'acceptation sans réserve des présentes conditions par l'acheteur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            2. Nature des produits digitaux
          </h2>
          <p>
            TUNIBOTS commercialise exclusivement des produits et services numériques (licences logicielles, clés de jeux, boosting, abonnements de streaming, recharges de comptes). En raison de la nature numérique de ces articles, aucun retour physique n'est envisageable ni requis.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            3. Livraison et activation des clés
          </h2>
          <p>
            Les clés d'activation ou comptes d'accès sont délivrés par courriel électronique et/ou directement via une confirmation par message WhatsApp immédiatement après validation du paiement. L'acheteur est responsable de saisir une adresse email et un numéro de téléphone valides lors du processus d'achat.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            4. Absence de Droit de Rétractation
          </h2>
          <p>
            Conformément à la réglementation sur les contenus numériques et les services immédiatement exécutés, le droit de rétractation ne peut être exercé dès lors que le processus de livraison de la clé d'activation ou du produit digital a commencé ou a été complété.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            5. Tarifs et modes de paiement
          </h2>
          <p>
            Les tarifs indiqués en Dinars Tunisiens (TND) sont fermes. TUNIBOTS accepte divers moyens de paiement tunisiens populaires, y compris le virement ou versement D17, le virement bancaire et les cartes de crédit locales pour garantir un maximum de sécurité et de commodité.
          </p>
        </section>
      </div>
    </div>
  );
};

// Confidentialite (Privacy Policy) Component
export const Confidentialite: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-bold text-orange-500 font-mono uppercase tracking-wider">
          <Shield className="h-3 w-3" />
          <span>CONFIDENTIALITÉ</span>
        </div>
        <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight sm:text-3xl">
          Politique de <span className="text-orange-500">Confidentialité</span>
        </h1>
        <p className="text-xs text-neutral-400">Dernière mise à jour : 25 Juin 2026</p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#121212] border border-white/5 space-y-6 text-neutral-300 text-xs leading-relaxed">
        <p>
          Chez TUNIBOTS, nous prenons la protection de vos données personnelles très au sérieux. Cette page vous explique comment nous collectons, utilisons et protégeons vos données.
        </p>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            Collecte des données
          </h2>
          <p>
            Nous recueillons uniquement les informations indispensables pour traiter vos commandes et vous contacter de manière professionnelle : adresse e-mail, nom de l'acheteur, et numéro WhatsApp. Les coordonnées de facturation sensibles ne transitent jamais sur nos serveurs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            Utilisation des informations
          </h2>
          <p>
            Vos données de contact sont exclusivement réservées à l'envoi de vos clés d'activation, à la validation de vos paiements D17/virements et au support client. Nous nous interdisons formellement de louer, vendre ou transférer vos données à des tiers publicitaires.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
            Sécurité de vos données
          </h2>
          <p>
            Toutes les communications sur TUNIBOTS sont cryptées à l'aide de protocoles de sécurité SSL/TLS de niveau industriel. De plus, les données d'achat localisées (comme votre panier d'achat) sont conservées localement dans votre propre navigateur pour préserver au maximum votre vie privée.
          </p>
        </section>
      </div>
    </div>
  );
};

// FAQ Component
export const FAQ: React.FC = () => {
  const faqItems = [
    {
      q: "Combien de temps faut-il pour recevoir mon produit ?",
      a: "La livraison de nos produits numériques est instantanée ! Une fois le paiement validé (particulièrement via virement D17 ou carte de crédit), vous recevrez votre clé de licence ou vos identifiants d'accès immédiatement par e-mail et via WhatsApp sous 5 à 15 minutes."
    },
    {
      q: "Quels sont les modes de paiement acceptés en Tunisie ?",
      a: "Pour s'adapter aux habitudes tunisiennes, nous supportons les paiements via D17 (virement postal ultra-rapide), les transferts bancaires directs, Sobflous, ainsi que les cartes bancaires nationales et postales."
    },
    {
      q: "Comment valider mon paiement par D17 / Virement ?",
      a: "C'est très simple ! Lors du passage de votre commande sur notre boutique, sélectionnez l'option D17 / Virement. Effectuez le transfert postal, puis transmettez une capture d'écran de confirmation à notre support technique via le bouton de discussion WhatsApp dédié. Votre produit sera activé instantanément."
    },
    {
      q: "Les clés d'activation sont-elles garanties ?",
      a: "Oui, absolument. Toutes les clés, abonnements et comptes vendus sur TUNIBOTS sont 100% officiels, d'origine certifiée, et bénéficient d'une garantie totale de fonctionnement. En cas de moindre problème technique durant l'activation, notre service après-vente remplace immédiatement l'article."
    },
    {
      q: "Puis-je commander depuis l'étranger ?",
      a: "Nos produits digitaux sont livrés par voie électronique et peuvent être activés et utilisés partout. Cependant, nos passerelles de paiement de base sont optimisées pour la Tunisie. Contactez le support WhatsApp si vous souhaitez payer via des solutions internationales."
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-bold text-orange-500 font-mono uppercase tracking-wider">
          <HelpCircle className="h-3 w-3" />
          <span>FOIRE AUX QUESTIONS</span>
        </div>
        <h1 className="font-display text-2xl font-black text-white uppercase tracking-tight sm:text-3xl">
          Foire Aux <span className="text-orange-500">Questions (FAQ)</span>
        </h1>
        <p className="text-xs text-neutral-400">Réponses claires aux questions les plus courantes sur notre service.</p>
      </div>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="p-5 sm:p-6 rounded-3xl bg-[#121212] border border-white/5 hover:border-orange-500/25 transition-all group"
          >
            <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="text-orange-500 font-mono text-xs">0{index + 1}.</span> {item.q}
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed pl-6 group-hover:text-neutral-300 transition-colors">
              {item.a}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-orange-500/5 border border-orange-500/10 text-center space-y-3">
        <p className="text-xs font-bold text-white uppercase tracking-wide">Vous avez encore des questions ?</p>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          Notre équipe technique francophone est active en ligne sur WhatsApp pour vous débloquer immédiatement.
        </p>
        <div className="inline-flex items-center gap-2">
          <a
            href="https://wa.me/21622333444"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-xs font-bold text-green-500 font-mono uppercase tracking-wider hover:bg-green-500/25 transition-colors"
          >
            <MessageSquareText className="h-3.5 w-3.5" /> Discuter sur WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
