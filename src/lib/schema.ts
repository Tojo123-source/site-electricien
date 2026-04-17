import { z } from 'zod';

export const contactSchema = z.object({
  nom: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
  email: z
    .string()
    .email('Veuillez entrer une adresse email valide'),
  telephone: z
    .string()
    .min(10, 'Le numéro doit contenir au moins 10 chiffres')
    .max(15, 'Le numéro ne doit pas dépasser 15 caractères')
    .regex(/^[0-9+\s-]+$/, 'Veuillez entrer un numéro de téléphone valide'),
  service: z
    .string()
    .min(1, 'Veuillez sélectionner un service'),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne doit pas dépasser 1000 caractères'),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
