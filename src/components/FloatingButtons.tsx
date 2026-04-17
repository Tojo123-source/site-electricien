import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/261367729958"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp
        </span>
      </motion.a>

      {/* Phone Button */}
      <motion.a
        href="tel:+261367729958"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-cyan-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity animate-pulse" />
        <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-cyan-500/30">
          <Phone className="w-6 h-6 text-white" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Appeler maintenant
        </span>
      </motion.a>
    </div>
  );
}
