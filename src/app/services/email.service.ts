import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EmailJsConfig, isEmailJsConfigured } from '../config/emailjs.config';
import { BUSINESS_INFO } from '../config/business-info';

export interface EmailPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private config: EmailJsConfig = EMAILJS_CONFIG;

  /**
   * Permette di impostare o sovrascrivere la configurazione (es. per test)
   */
  setConfig(config: EmailJsConfig): void {
    this.config = config;
  }

  /**
   * Verifica se il servizio è pronto per l'invio reale
   */
  isConfigured(): boolean {
    return isEmailJsConfigured(this.config);
  }

  /**
   * Invia l'email con i dati del contatto tramite EmailJS
   */
  async sendContactMessage(payload: EmailPayload): Promise<{ success: boolean; simulated?: boolean }> {
    // Se le chiavi EmailJS non sono ancora state inserite, esegue una simulazione per sviluppo/test locale
    if (!this.isConfigured()) {
      console.warn(
        '[EmailService] Le credenziali EmailJS non sono ancora state configurate in "src/app/config/emailjs.config.ts". ' +
          'Simulazione invio completata con successo.'
      );
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, simulated: true };
    }

    const templateParams = {
      user_name: payload.name,
      user_email: payload.email,
      user_phone: payload.phone,
      message: payload.message,
      to_email: BUSINESS_INFO.email,
      company_name: BUSINESS_INFO.name,
      submission_date: new Intl.DateTimeFormat('it-IT', {
        dateStyle: 'full',
        timeStyle: 'short'
      }).format(new Date())
    };

    const response = await emailjs.send(
      this.config.serviceId,
      this.config.templateId,
      templateParams,
      {
        publicKey: this.config.publicKey
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error(`EmailJS ha restituito lo stato ${response.status}: ${response.text}`);
    }
  }
}
