import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Zap, Shield, Home, Lightbulb, Car, Wrench, Thermometer, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'installation',
    title: 'Installation Électrique Complète',
    description: 'Installation électrique neuve pour maison et appartement, du tableau aux prises. Travaux conformes aux normes NF C 15-100 avec certificat de conformité.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    features: ['Neuf & Rénovation', 'Certificat de conformité', 'Garantie décennale'],
  },
  {
    id: 'normes',
    title: 'Mise aux Normes NF C 15-100',
    description: 'Mise en conformité de votre installation électrique. Diagnostic complet, remplacement du tableau, mise à la terre et certification.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    features: ['Diagnostic complet', 'Tableau électrique', 'Consuel inclus'],
  },
  {
    id: 'domotique',
    title: 'Domotique & Maison Intelligente',
    description: 'Transformez votre habitat en maison connectée. Éclairage, volets, chauffage et sécurité pilotables à distance via smartphone.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    features: ['Pilotage à distance', 'Scénarios automatiques', 'Économies d\'énergie'],
  },
  {
    id: 'eclairage',
    title: 'Éclairage LED Design & Connecté',
    description: 'Installation d\'éclairages modernes et économiques. Spots LED, rubans, suspensions design et systèmes connectés pour tous les styles.',
    icon: Lightbulb,
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
    features: ['Design sur mesure', 'Économie d\'énergie', 'Ambiance connectée'],
  },
  {
    id: 'borne',
    title: 'Borne de Recharge Véhicule Électrique',
    description: 'Installation de bornes de recharge Wallbox pour particuliers et copropriétés. Profitez du crédit d\'impôt et des aides disponibles.',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    features: ['Wallbox certifiées', 'Credit d\'impôt', 'Toutes marques VE'],
  },
  {
    id: 'depannage',
    title: 'Dépannage Électrique Urgent 7j/7',
    description: 'Intervention rapide pour tous vos problèmes électriques. Court-circuit, panne de courant, disjoncteur qui saute. Disponible 24h/24.',
    icon: Wrench,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    features: ['Intervention 24h/24', 'Déplacement rapide', 'Devis gratuit'],
  },
  {
    id: 'chauffage',
    title: 'Chauffage Électrique & Pompe à Chaleur',
    description: 'Installation de radiateurs électriques, planchers chauffants et pompes à chaleur. Solutions économiques et écologiques.',
    icon: Thermometer,
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80',
    features: ['Radiateurs connectés', 'Plancher chauffant', 'PAC air-air'],
  },
  {
    id: 'reseau',
    title: 'Câblage Réseau, Fibre & Interphonie',
    description: 'Installation de réseaux informatiques, passage de fibre optique, interphonie et vidéophonie pour maison et immeuble.',
    icon: Network,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    features: ['Réseau RJ45', 'Fibre optique', 'Vidéophonie'],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group relative bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        
        {/* Icon Badge */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <service.icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant="ghost"
          className="w-full justify-between text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 group/btn"
          onClick={scrollToContact}
        >
          Demander un devis
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
      </div>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="services" className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background Elements */}
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
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4"
            >
              Nos Prestations
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              Nos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Services
              </span>{' '}
              Électriques
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-slate-400 text-lg max-w-2xl mx-auto"
            >
              Des solutions électriques complètes pour votre habitat, du neuf à la rénovation, 
              avec la garantie d'un professionnel qualifié.
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-400 mb-4">
              Besoin d'un service personnalisé ? Contactez-nous pour discuter de votre projet.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-cyan-500/25"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Demander un devis personnalisé
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
