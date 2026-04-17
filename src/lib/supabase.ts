import { createClient } from '@supabase/supabase-js';
import type { ContactFormData } from '@/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Variables d\'environnement Supabase manquantes');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export async function saveContactMessage(data: ContactFormData) {
  try {
    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          nom: data.nom,
          email: data.email,
          telephone: data.telephone,
          service: data.service,
          message: data.message,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Erreur Supabase:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    throw error;
  }
}
