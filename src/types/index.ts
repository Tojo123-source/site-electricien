// Types pour le site ÉlecPro 95

export interface ContactFormData {
  nom: string;
  email: string;
  telephone: string;
  service: string;
  message: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface Realisation {
  id: string;
  title: string;
  category: 'residentiel' | 'domotique' | 'borne-ve' | 'avant-apres';
  image: string;
  description: string;
}

export interface AvisClient {
  id: string;
  nom: string;
  note: number;
  commentaire: string;
  date: string;
  ville: string;
}

export interface NavItem {
  label: string;
  href: string;
}
