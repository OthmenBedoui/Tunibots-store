import React, { useState } from 'react';
import { useSettings } from '../data/queries/storeQueries';
import { Mail, Phone, MapPin, Send, MessageSquareText, Check, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { motion, AnimatePresence } from 'motion/react';

export const Contact: React.FC = () => {
  const { data: settings } = useSettings();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'support',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setForm({ name: '', email: '', subject: 'support', message: '' });
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs font-bold text-orange-500 font-mono uppercase tracking-wider">
          <MessageSquareText className="h-3 w-3" />
          <span>CONTACTEZ-NOUS</span>
        </div>
        <h1 className="font-display text-3xl font-black text-white tracking-tight sm:text-4xl">
          UN SUPPORT À VOTRE <span className="text-orange-500 font-extrabold">ÉCOUTE</span>
        </h1>
        <p className="text-xs text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Que ce soit pour une question sur une clé d'activation, une demande de partenariat ou un devis professionnel, nos techniciens vous répondent 7j/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (Left - 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121212] border border-white/5 space-y-6 relative overflow-hidden group hover:border-orange-500/20 hover:shadow-[0_0_35px_rgba(234,88,12,0.1)] transition-all">
            <div className="absolute -right-12 -bottom-12 h-24 w-24 rounded-full bg-orange-600/10 blur-xl group-hover:bg-orange-600/20 transition-all" />
            
            <h3 className="font-display text-base font-black text-white uppercase tracking-wider border-l-2 border-orange-500 pl-3">
              Informations Directes
            </h3>

            <div className="space-y-4">
              {/* WhatsApp Option */}
              <a
                href={`https://wa.me/${settings?.whatsappNumber?.replace(/\s+/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-green-500/30 hover:bg-neutral-900 transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500 border border-green-500/20">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">WhatsApp Direct (Le + rapide)</h4>
                  <p className="text-xs font-mono font-bold text-neutral-300 mt-1">{settings?.whatsappNumber}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Assistance technique et confirmation de paiement 7j/7</p>
                </div>
              </a>

              {/* Email Option */}
              <a
                href={`mailto:${settings?.supportEmail}`}
                className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-white/5 hover:border-orange-500/30 hover:bg-neutral-900 transition-all group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">E-mail de support</h4>
                  <p className="text-xs font-mono text-neutral-300 mt-1">{settings?.supportEmail}</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Réponse garantie sous 2 heures pendant les heures ouvrables</p>
                </div>
              </a>

              {/* Location Option */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-800 text-neutral-400 border border-white/5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Siège Social</h4>
                  <p className="text-xs text-neutral-300 mt-1">Tunis, Tunisie</p>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Opérations 100% en ligne partout en Tunisie</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/15 text-center text-xs space-y-2">
              <p className="font-bold text-white flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-orange-500" /> Boutique Enregistrée
              </p>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                TUNIBOTS assure un service légal, professionnel et sécurisé. Chaque transaction fait l'objet d'un suivi automatisé.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form (Right - 7 cols) */}
        <div className="lg:col-span-7">
          <Card className="bg-[#121212] border-white/5 rounded-3xl p-6 relative overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Votre Nom Complet</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Ex: Mohamed Ben Ali"
                          className="w-full text-xs rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Adresse Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Ex: mohamed@email.tn"
                          className="w-full text-xs rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Sujet de votre message</label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full text-xs rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30"
                      >
                        <option value="support">Assistance Technique / Clé Non Reçue</option>
                        <option value="billing">Question Facturation / Paiement D17</option>
                        <option value="partnership">Demande de Partenariat / Influenceur</option>
                        <option value="other">Autre demande</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Message</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Écrivez votre message ici de manière claire..."
                        className="w-full text-xs rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-500 outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-11 transition-all rounded-xl shadow-lg shadow-orange-500/10"
                    >
                      {isSubmitting ? (
                        'Envoi en cours...'
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Send className="h-4 w-4" /> Envoyer le message
                        </span>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-8 text-center space-y-4"
                  >
                    <div className="rounded-full bg-orange-500/20 p-3 text-orange-500 w-12 h-12 mx-auto flex items-center justify-center border border-orange-500/30">
                      <Check className="h-6 w-6" />
                    </div>
                    <h4 className="font-display text-lg font-black text-white uppercase tracking-wide">Message envoyé avec succès !</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mx-auto">
                      Nous vous remercions pour votre message ! Notre équipe de support technique vous contactera par email dans un délai maximum de 2 heures.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="border-white/10 text-white hover:bg-white/5 text-xs font-bold px-6 h-10 rounded-xl"
                    >
                      Envoyer un autre message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
