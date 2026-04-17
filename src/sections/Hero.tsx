import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroText, staggerContainer, staggerItem } from '@/lib/animations';

const stats = [
  { icon: Shield, value: '15+', label: 'Ans d\'expérience' },
  { icon: Award, value: '500+', label: 'Projets réalisés' },
  { icon: Clock, value: '24h', label: 'Devis rapide' },
];

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1920&q=80"
          alt="Installation électrique moderne"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-transparent to-slate-900/80" />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div variants={staggerItem} className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  Électricien agréé - Val-d'Oise (95)
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={heroText}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6"
              >
                Votre{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  électricien
                </span>{' '}
                professionnel dans le 95
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={staggerItem}
                className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0"
              >
                Installation, rénovation, dépannage et mise aux normes NF C 15-100. 
                Intervention rapide 7j/7 dans tout le Val-d'Oise et l'Île-de-France.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={staggerItem}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-0 shadow-xl shadow-cyan-500/30 text-lg px-8 py-6 group"
                  onClick={() => scrollToSection('#contact')}
                >
                  Obtenir un devis gratuit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <div className="flex gap-3 justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                    onClick={() => window.open('https://wa.me/261367729958', '_blank')}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                    onClick={() => window.open('tel:+261367729958', '_self')}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Appeler
                  </Button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {[
                {
                  title: 'Installation Neuve',
                  desc: 'Maison & appartement',
                  icon: '⚡',
                },
                {
                  title: 'Mise aux Normes',
                  desc: 'NF C 15-100',
                  icon: '✓',
                },
                {
                  title: 'Domotique',
                  desc: 'Maison connectée',
                  icon: '🏠',
                },
                {
                  title: 'Borne VE',
                  desc: 'Recharge véhicule',
                  icon: '🔌',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-slate-500 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
