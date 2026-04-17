import axios from 'axios';
import type { ContactFormData } from '@/types';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export async function sendContactEmail(data: ContactFormData) {
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is missing in .env');
    return { success: false, error: 'Brevo API key missing' };
  }

  try {
    const response = await axios.post(
      BREVO_API_URL,
      {
        sender: {
          name: 'ÉlecPro 95',
          email: 'novaskol393@gmail.com',
        },
        to: [
          {
            email: 'tojo.devpro@gmail.com',
            name: 'ÉlecPro 95',
          },
        ],
        replyTo: {
          email: data.email,
          name: data.nom,
        },
        subject: `Nouvelle demande de devis - ${data.service || 'Contact'}`,
        htmlContent: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouvelle demande de devis - ÉlecPro 95</title>
            <style>
              body { 
                margin: 0; 
                padding: 0; 
                background: #f8fafc; 
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              }
              .container { 
                max-width: 680px; 
                margin: 30px auto; 
                background: #ffffff; 
                border-radius: 20px; 
                overflow: hidden; 
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08); 
              }
              .header { 
                background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); 
                padding: 55px 40px 45px; 
                text-align: center; 
                color: white; 
              }
              .header img { 
                width: 100%; 
                max-height: 240px; 
                object-fit: cover; 
                border-radius: 16px; 
                margin-bottom: 22px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.25); 
              }
              .header h1 { 
                margin: 0 0 10px 0; 
                font-size: 30px; 
                font-weight: 700; 
                letter-spacing: -0.5px; 
              }
              .header p { 
                margin: 0; 
                font-size: 17px; 
                opacity: 0.9; 
              }
              .content { 
                padding: 48px 42px; 
              }
              .field { 
                margin-bottom: 26px; 
              }
              .label { 
                font-size: 13.5px; 
                font-weight: 600; 
                color: #64748b; 
                text-transform: uppercase; 
                letter-spacing: 0.8px; 
                margin-bottom: 7px; 
              }
              .value { 
                background: #f8fafc; 
                padding: 15px 20px; 
                border-radius: 10px; 
                border-left: 5px solid #3b82f6; 
                font-size: 16.5px; 
                color: #1e2937; 
              }
              .message-box { 
                background: #f8fafc; 
                padding: 24px; 
                border-radius: 14px; 
                border-left: 5px solid #60a5fa; 
                white-space: pre-wrap; 
                font-size: 16px; 
                line-height: 1.65; 
              }
              .footer { 
                background: #f1f5f9; 
                padding: 35px 45px; 
                text-align: center; 
                color: #64748b; 
                font-size: 14px; 
                border-top: 1px solid #e2e8f0; 
              }
              .btn { 
                display: inline-block; 
                background: #2563eb; 
                color: white; 
                padding: 14px 36px; 
                border-radius: 10px; 
                text-decoration: none; 
                font-weight: 600; 
                margin-top: 12px; 
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://picsum.photos/id/201/680/240" alt="Électricien professionnel" style="width:100%; max-height:240px; object-fit:cover;">
                <h1>Nouvelle demande de devis</h1>
                <p>ÉlecPro 95 — Expert en électricité dans le Val-d'Oise (95)</p>
              </div>

              <div class="content">
                <div class="field">
                  <div class="label">Nom complet</div>
                  <div class="value">${data.nom}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value">${data.email}</div>
                </div>
                <div class="field">
                  <div class="label">Téléphone</div>
                  <div class="value">${data.telephone}</div>
                </div>
                <div class="field">
                  <div class="label">Service demandé</div>
                  <div class="value">${data.service}</div>
                </div>
                <div class="field">
                  <div class="label">Message du client</div>
                  <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>

              <div class="footer">
                <p>Ce message a été envoyé via le formulaire de contact du site <strong>ÉlecPro 95</strong></p>
                <p>${new Date().toLocaleString('fr-FR')}</p>
                <a href="mailto:${data.email}" class="btn">Répondre directement au client</a>
              </div>
            </div>
          </body>
          </html>
        `,
      },
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('✅ Brevo email envoyé avec succès');
    return { success: true, data: response.data };

  } catch (error: any) {
    console.error('❌ Erreur Brevo:', error.response?.data || error.message);
    throw error;
  }
}