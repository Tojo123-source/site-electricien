import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { contactSchema, type ContactSchemaType } from '@/lib/schema';
import { saveContactMessage } from '@/lib/supabase';
import { sendContactEmail } from '@/lib/brevo';
import confetti from 'canvas-confetti';

const services = [
  'Installation électrique complète',
  'Mise aux normes NF C 15-100',
  'Domotique & Maison Intelligente',
  'Éclairage LED design',
  'Borne de recharge véhicule électrique',
  'Dépannage électrique urgent',
  'Chauffage électrique & PAC',
  'Câblage réseau & interphonie',
  'Autre demande',
];

const contactInfo = [
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+261 36 77 299 58',
    href: 'tel:+261367729958',
    color: 'cyan',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+261 36 77 299 58',
    href: 'https://wa.me/261367729958',
    color: 'green',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'tojo.devpro@gmail.com',
    href: 'mailto:tojo.devpro@gmail.com',
    color: 'blue',
  },
  {
    icon: MapPin,
    label: 'Zone d\'intervention',
    value: 'Val-d\'Oise (95) & IDF',
    href: '#',
    color: 'orange',
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun-Sam: 8h-20h | Urgence 24h/24',
    href: '#',
    color: 'purple',
  },
];

function SuccessAnimation({ onReset }: { onReset: () => void }) {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#f59e0b', '#10b981'],
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center"
      >
        <CheckCircle className="w-12 h-12 text-white" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-3">Message envoyé !</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        Merci de nous avoir contacté. Nous vous répondrons dans les plus brefs délais, 
        généralement sous 24 heures.
      </p>
      <Button
        onClick={onReset}
        variant="outline"
        className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
      >
        Envoyer un autre message
      </Button>
    </motion.div>
  );
}

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: '',
      email: '',
      telephone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactSchemaType) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Sauvegarder dans Supabase
      await saveContactMessage(data);

      // Envoyer l'email via Brevo
      await sendContactEmail(data);

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setError(null);
    form.reset();
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Demandez votre{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                devis gratuit
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Remplissez le formulaire ci-dessous et nous vous contacterons sous 24h 
              pour étudier votre projet.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      info.color === 'green' ? 'bg-green-500/20 text-green-400' :
                      info.color === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                      info.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                      info.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">{info.label}</p>
                      <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Quick CTA */}
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-2xl border border-cyan-500/20">
                <h3 className="text-white font-semibold mb-3">Besoin d'une intervention urgente ?</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Notre service d'urgence est disponible 24h/24, 7j/7 pour tous vos problèmes électriques.
                </p>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => window.open('https://wa.me/261367729958', '_blank')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    onClick={() => window.open('tel:+261367729958', '_self')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Appeler
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <SuccessAnimation onReset={resetForm} />
                  ) : (
                    <motion.form
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Nom */}
                        <div className="space-y-2">
                          <Label htmlFor="nom" className="text-slate-300">
                            Nom complet <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="nom"
                            placeholder="Jean Dupont"
                            {...form.register('nom')}
                            className={`bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 ${
                              form.formState.errors.nom ? 'border-red-500' : ''
                            }`}
                          />
                          {form.formState.errors.nom && (
                            <p className="text-red-400 text-sm">{form.formState.errors.nom.message}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-300">
                            Email <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="jean.dupont@email.com"
                            {...form.register('email')}
                            className={`bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 ${
                              form.formState.errors.email ? 'border-red-500' : ''
                            }`}
                          />
                          {form.formState.errors.email && (
                            <p className="text-red-400 text-sm">{form.formState.errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        {/* Téléphone */}
                        <div className="space-y-2">
                          <Label htmlFor="telephone" className="text-slate-300">
                            Téléphone <span className="text-red-400">*</span>
                          </Label>
                          <Input
                            id="telephone"
                            placeholder="06 12 34 56 78"
                            {...form.register('telephone')}
                            className={`bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 ${
                              form.formState.errors.telephone ? 'border-red-500' : ''
                            }`}
                          />
                          {form.formState.errors.telephone && (
                            <p className="text-red-400 text-sm">{form.formState.errors.telephone.message}</p>
                          )}
                        </div>

                        {/* Service */}
                        <div className="space-y-2">
                          <Label htmlFor="service" className="text-slate-300">
                            Service souhaité <span className="text-red-400">*</span>
                          </Label>
                          <Select
                            onValueChange={(value) => form.setValue('service', value)}
                            value={form.watch('service')}
                          >
                            <SelectTrigger className={`bg-slate-900/50 border-slate-700 text-white focus:ring-cyan-500/20 ${
                              form.formState.errors.service ? 'border-red-500' : ''
                            }`}>
                              <SelectValue placeholder="Sélectionnez un service" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              {services.map((service) => (
                                <SelectItem
                                  key={service}
                                  value={service}
                                  className="text-white hover:bg-slate-700 focus:bg-slate-700"
                                >
                                  {service}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {form.formState.errors.service && (
                            <p className="text-red-400 text-sm">{form.formState.errors.service.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-slate-300">
                          Message <span className="text-red-400">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Décrivez votre projet en détail..."
                          rows={5}
                          {...form.register('message')}
                          className={`bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 resize-none ${
                            form.formState.errors.message ? 'border-red-500' : ''
                          }`}
                        />
                        {form.formState.errors.message && (
                          <p className="text-red-400 text-sm">{form.formState.errors.message.message}</p>
                        )}
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <p className="text-red-400 text-sm">{error}</p>
                        </motion.div>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-6 text-lg shadow-xl shadow-cyan-500/25 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Envoyer ma demande
                          </>
                        )}
                      </Button>

                      <p className="text-center text-slate-500 text-sm">
                        En envoyant ce formulaire, vous acceptez d'être contacté par nos services.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
