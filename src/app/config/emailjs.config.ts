/**
 * Configurazione per l'invio email tramite EmailJS (https://www.emailjs.com/)
 *
 * Per attivare l'invio reale delle email sulla casella antagrust@yahoo.it:
 * 1. Accedi o crea un account su https://www.emailjs.com/
 * 2. In "Email Services" collega la casella email (es. Yahoo Mail o Gmail) e copia il SERVICE ID.
 * 3. In "Email Templates" crea il template (usando il layout fornito) e copia il TEMPLATE ID.
 * 4. In "Account" -> "API Keys" copia la tua PUBLIC KEY.
 * 5. Incolla i 3 valori qui sotto:
 */
export interface EmailJsConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export const EMAILJS_CONFIG: EmailJsConfig = {
  // Inserisci qui i dati del tuo account EmailJS:
  serviceId: 'service_47a351r',
  templateId: 'template_pudfdme',
  publicKey: 'HXvRsHUsbIdEBzwoy'
};

/**
 * Verifica se EmailJS è configurato con valori reali
 */
export function isEmailJsConfigured(config: EmailJsConfig = EMAILJS_CONFIG): boolean {
  return (
    config.serviceId !== 'YOUR_SERVICE_ID' &&
    config.templateId !== 'YOUR_TEMPLATE_ID' &&
    config.publicKey !== 'YOUR_PUBLIC_KEY' &&
    Boolean(
      config.serviceId?.trim() &&
      config.templateId?.trim() &&
      config.publicKey?.trim()
    )
  );
}
