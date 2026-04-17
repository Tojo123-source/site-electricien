import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactSchemaType } from '@/lib/schema';
import { saveContactMessage } from '@/lib/supabase';
import { sendContactEmail } from '@/lib/brevo';

export function useContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: '',
      email: '',
      telephone: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactSchemaType) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Sauvegarder dans Supabase
      await saveContactMessage(data);

      // Envoyer l'email via Brevo
      await sendContactEmail(data);

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetSuccess = () => {
    setIsSuccess(false);
    setError(null);
  };

  return {
    form,
    isSubmitting,
    isSuccess,
    error,
    onSubmit,
    resetSuccess,
  };
}
