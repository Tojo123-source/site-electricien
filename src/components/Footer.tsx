import { Zap, Phone, Mail, MapPin, MessageCircle, Instagram, Facebook, Linkedin } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Installation électrique', href: '#services' },
    { label: 'Mise aux normes', href: '#services' },
    { label: 'Domotique', href: '#services' },
    { label: 'Borne de recharge VE', href: '#services' },
    { label: 'Dépannage urgent', href: '#services' },
  ],
  company: [
    { label: 'À propos', href: '#about' },
    { label: 'Nos réalisations', href: '#realisations' },
    { label: 'Avis clients', href: '#avis' },
    { label: 'Contact', href: '#contact' },
  ],
  legal: [
    { label: 'Mentions légales', href: '#' },
    { label: 'Politique de confidentialité', href: '#' },
    { label: 'CGV', href: '#' },
  ],
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }} className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white leading-tight">
                    ÉlecPro<span className="text-cyan-400">95</span>
                  </span>
                  <span className="text-xs text-slate-400 leading-tight">Val-d'Oise</span>
                </div>
              </a>
              <p className="text-slate-400 text-sm mb-6">
                Électricien professionnel agréé dans le Val-d'Oise. 
                Installation, rénovation, dépannage et domotique pour particuliers et professionnels.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Nos Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">L'Entreprise</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href="tel:+261367729958"
                    className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="text-sm">+261 36 77 299 58</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/261367729958"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-400 hover:text-green-400 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:tojo.devpro@gmail.com"
                    className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">tojo.devpro@gmail.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Val-d'Oise (95)<br />
                    Île-de-France
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} ÉlecPro 95. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-slate-500 hover:text-slate-400 transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
