import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const avisClients = [
  {
    id: 1,
    nom: 'Marie Dupont',
    note: 5,
    commentaire: 'Excellent travail ! L\'électricien était professionnel, ponctuel et a fait un travail impeccable. Mon installation est maintenant aux normes et fonctionne parfaitement. Je recommande vivement.',
    date: '15 janvier 2026',
    ville: 'Cergy',
  },
  {
    id: 2,
    nom: 'Pierre Martin',
    note: 5,
    commentaire: 'Installation de ma borne de recharge Tesla réalisée en une journée. Travail soigné, devis respecté, et conseils précieux. Une équipe très compétente et sympathique.',
    date: '8 janvier 2026',
    ville: 'Argenteuil',
  },
  {
    id: 3,
    nom: 'Sophie Bernard',
    note: 5,
    commentaire: 'Mise en place complète de la domotique dans notre nouvelle maison. Éclairage, volets, chauffage... tout est pilotable depuis notre téléphone. Un vrai confort au quotidien !',
    date: '28 décembre 2025',
    ville: 'Saint-Ouen-l\'Aumône',
  },
  {
    id: 4,
    nom: 'Jean-Claude Leroy',
    note: 5,
    commentaire: 'Dépannage en urgence un dimanche soir pour une panne de courant. Intervention rapide et efficace. Prix très correct pour un service d\'urgence. Merci encore !',
    date: '20 décembre 2025',
    ville: 'Ermont',
  },
  {
    id: 5,
    nom: 'Isabelle Petit',
    note: 5,
    commentaire: 'Rénovation complète de l\'électricité de notre appartement ancien. Travail méticuleux, propreté irréprochable et respect des délais. Résultat au-delà de nos attentes.',
    date: '12 décembre 2025',
    ville: 'Franconville',
  },
  {
    id: 6,
    nom: 'Marc Dubois',
    note: 5,
    commentaire: 'Installation d\'éclairage LED design dans notre salon. Le résultat est magnifique ! Ambiance moderne et économies d\'énergie au rendez-vous.',
    date: '5 décembre 2025',
    ville: 'Sannois',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
          }`}
        />
      ))}
    </div>
  );
}

export function AvisClients() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % avisClients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const navigate = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) =>
      direction === 'next'
        ? (prev + 1) % avisClients.length
        : (prev - 1 + avisClients.length) % avisClients.length
    );
  };

  return (
    <section id="avis" className="relative py-24 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
              Témoignages
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ce que disent nos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                clients
              </span>
            </h2>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-2xl font-bold">5.0</span>
              </div>
              <span className="text-slate-400">|</span>
              <span className="text-slate-400">Basé sur {avisClients.length} avis Google</span>
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Navigation Buttons */}
            <div className="absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('prev')}
                className="w-12 h-12 rounded-full border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('next')}
                className="w-12 h-12 rounded-full border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Cards Container */}
            <div className="overflow-hidden px-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  {[0, 1].map((offset) => {
                    const index = (currentIndex + offset) % avisClients.length;
                    const avis = avisClients[index];
                    return (
                      <motion.div
                        key={avis.id}
                        className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 relative"
                      >
                        {/* Quote Icon */}
                        <Quote className="absolute top-6 right-6 w-10 h-10 text-cyan-500/20" />

                        {/* Rating */}
                        <StarRating rating={avis.note} />

                        {/* Comment */}
                        <p className="text-slate-300 mt-4 mb-6 text-lg leading-relaxed">
                          "{avis.commentaire}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {avis.nom.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-semibold">{avis.nom}</p>
                            <p className="text-slate-400 text-sm">
                              {avis.ville} • {avis.date}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {avisClients.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-gradient-to-r from-cyan-500 to-blue-600'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
