import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'tous', label: 'Tous' },
  { id: 'residentiel', label: 'Résidentiel' },
  { id: 'domotique', label: 'Domotique' },
  { id: 'borne-ve', label: 'Borne VE' },
  { id: 'avant-apres', label: 'Avant/Après' },
];

const realisations = [
  {
    id: 1,
    title: 'Installation complète maison neuve',
    category: 'residentiel',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80',
    description: 'Installation électrique complète pour une maison de 150m² avec tableau 4 rangées.',
    location: 'Cergy (95)',
  },
  {
    id: 2,
    title: 'Mise aux normes appartement',
    category: 'avant-apres',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    description: "Rénovation complète de l'installation électrique d'un appartement des années 70.",
    location: 'Argenteuil (95)',
  },
  {
    id: 3,
    title: 'Maison connectée domotique',
    category: 'domotique',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
    description: 'Installation domotique complète avec éclairage connecté, volets roulants et chauffage.',
    location: "Saint-Ouen-l'Aumône (95)",
  },
  {
    id: 4,
    title: 'Borne de recharge Tesla',
    category: 'borne-ve',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
    description: 'Installation d\'une Wallbox 22kW pour véhicule électrique avec délesteur.',
    location: 'Ermont (95)',
  },
  {
    id: 5,
    title: 'Éclairage LED design salon',
    category: 'residentiel',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=800&q=80',
    description: 'Installation de spots LED encastrés et ruban LED pour ambiance moderne.',
    location: 'Sannois (95)',
  },
  {
    id: 6,
    title: 'Tableau électrique moderne',
    category: 'avant-apres',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    description: "Remplacement d'un ancien tableau par un nouveau conforme aux normes.",
    location: 'Franconville (95)',
  },
];

export function Realisations() {
  const [activeCategory, setActiveCategory] = useState('tous');
  const [selectedImage, setSelectedImage] = useState<typeof realisations[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredRealisations = activeCategory === 'tous'
    ? realisations
    : realisations.filter((r) => r.category === activeCategory);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    const currentIndex = filteredRealisations.findIndex((r) => r.id === selectedImage.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredRealisations.length
      : (currentIndex - 1 + filteredRealisations.length) % filteredRealisations.length;
    setSelectedImage(filteredRealisations[newIndex]);
  };

  return (
    <section id="realisations" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Réalisations
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Découvrez nos projets récents dans le Val-d'Oise et l'Île-de-France.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0'
                    : 'border-slate-700 text-slate-400 hover:text-white hover:border-cyan-500/50'
                }`}
              >
                {category.label}
              </Button>
            ))}
          </motion.div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredRealisations.map((realisation, index) => (
                <motion.div
                  key={realisation.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedImage(realisation)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={realisation.image}
                    alt={realisation.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Overlay Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      className="transform transition-all duration-300"
                    >
                      <span className="text-xs text-cyan-400 font-medium uppercase tracking-wider">
                        {categories.find((c) => c.id === realisation.category)?.label}
                      </span>
                      <h3 className="text-white font-semibold mt-1 group-hover:text-cyan-400 transition-colors">
                        {realisation.title}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {realisation.location}
                      </p>
                    </motion.div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              />
              <div className="mt-4 text-center">
                <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
                  {categories.find((c) => c.id === selectedImage.category)?.label}
                </span>
                <h3 className="text-white text-2xl font-bold mt-2">{selectedImage.title}</h3>
                <p className="text-slate-400 mt-2">{selectedImage.description}</p>
                <p className="text-slate-500 text-sm mt-1">{selectedImage.location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
