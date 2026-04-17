import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Clock, MapPin, CheckCircle, Users, Wrench, FileCheck } from 'lucide-react';

const qualifications = [
  {
    icon: FileCheck,
    title: 'Qualification RGE',
    description: 'Reconnu Garant de l\'Environnement pour vos travaux de rénovation énergétique.',
  },
  {
    icon: Shield,
    title: 'Garantie Décennale',
    description: 'Assurance professionnelle couvrant tous nos travaux pendant 10 ans.',
  },
  {
    icon: Award,
    title: 'Certification NF C 15-100',
    description: 'Toutes nos installations sont conformes aux normes en vigueur.',
  },
  {
    icon: Clock,
    title: 'Intervention 7j/7',
    description: 'Disponible tous les jours pour vos urgences électriques.',
  },
];

const chiffres = [
  { valeur: '15+', label: 'Années d\'expérience', icon: Clock },
  { valeur: '500+', label: 'Projets réalisés', icon: Wrench },
  { valeur: '98%', label: 'Clients satisfaits', icon: Users },
  { valeur: '95', label: 'Val-d\'Oise & IDF', icon: MapPin },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="about" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
                À Propos
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Votre électricien de confiance dans le{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Val-d'Oise
                </span>
              </h2>
              <div className="space-y-4 text-slate-300 text-lg">
                <p>
                  Fort de plus de 15 ans d'expérience dans le domaine de l'électricité, 
                  je mets mon expertise au service des particuliers et professionnels du 
                  Val-d'Oise et de l'Île-de-France.
                </p>
                <p>
                  De l'installation neuve à la rénovation, en passant par la domotique et 
                  les bornes de recharge pour véhicules électriques, j'accompagne mes clients 
                  dans tous leurs projets électriques avec professionnalisme et rigueur.
                </p>
                <p>
                  Ma priorité : votre satisfaction. C'est pourquoi je m'engage à vous 
                  fournir des devis clairs et détaillés, à respecter les délais convenus, 
                  et à garantir la qualité de mes interventions.
                </p>
              </div>

              {/* Checklist */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  'Devis gratuit sous 24h',
                  'Intervention d\'urgence 7j/7',
                  'Travaux garantis 10 ans',
                  'Respect des normes NF C 15-100',
                  'Matériel de qualité professionnelle',
                  'Propreté des chantiers garantie',
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    <span className="text-slate-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Stats & Qualifications */}
            <div className="space-y-8">
              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                {chiffres.map((chiffre, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center group hover:border-cyan-500/50 transition-colors"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-600/30 transition-colors">
                      <chiffre.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{chiffre.valeur}</div>
                    <div className="text-sm text-slate-400">{chiffre.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Qualifications */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-white mb-4">Nos certifications</h3>
                {qualifications.map((qualif, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700/30 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <qualif.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{qualif.title}</h4>
                      <p className="text-slate-400 text-sm">{qualif.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Zone d'intervention */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-2xl border border-cyan-500/20"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Zone d'intervention</h3>
                  <p className="text-slate-400">
                    Val-d'Oise (95) et toute l'Île-de-France
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['Cergy', 'Argenteuil', 'Saint-Ouen-l\'Aumône', 'Ermont', 'Franconville', 'Sannois', 'Garges-lès-Gonesse', 'Goussainville'].map((ville) => (
                  <span
                    key={ville}
                    className="px-4 py-2 bg-slate-800/50 rounded-full text-slate-300 text-sm border border-slate-700/50"
                  >
                    {ville}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
