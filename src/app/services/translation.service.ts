import { Injectable, signal, computed } from '@angular/core';

export type Language = 'it' | 'en';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  it: {
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.services': 'Servizi',
    'nav.contact': 'Contatti',
    
    'hero.title': 'Antonio Agrusti SRLS',
    'hero.subtitle': 'Posa di pavimenti di ogni genere & Ristrutturazioni chiavi in mano',
    'hero.cta': 'Richiedi un Preventivo',
    'hero.badge': 'Qualità e Precisione dal 2014',

    'about.title': 'La Nostra Storia',
    'about.subtitle': 'Costruiamo fiducia, rifiniamo sogni',
    'about.text1': 'L’azienda nasce nel 2014 con l’intento di improntare la ristrutturazione edilizia chiavi in mano, assistendo la clientela dalle demolizioni, sino alle rifiniture e consegna dei lavori, rispettando ogni minimo dettaglio.',
    'about.text2': 'L’azienda, gestita direttamente da ANTONIO AGRUSTI, è dotata di personale qualificato e si serve di squadre locali per effettuare ogni tipo di opera (carpenteria, impiantistica, mobili su misura). Il tutto creando armonia, coesione e collaborazione tra le diverse presenze in cantiere, con un unico grande obiettivo: l\'eccellenza.',
    'about.experience.years': 'Anni di Esperienza',
    'about.experience.projects': 'Progetti Completati',
    'about.experience.crews': 'Sinergia in Cantiere',

    'services.title': 'I Nostri Servizi',
    'services.subtitle': 'Soluzioni edilizie su misura ed eccellenza artigianale',
    'services.flooring.title': 'Posa di Pavimenti',
    'services.flooring.desc': 'Installazione professionale di pavimentazioni di ogni genere: pietra naturale, legno pregiato (parquet) e masselli autobloccanti per esterni resistenti e funzionali.',
    'services.renovations.title': 'Ristrutturazioni Chiavi in Mano',
    'services.renovations.desc': 'Gestione completa del cantiere dalla demolizione alla consegna finale. Assistenza totale su carpenteria, impianti tecnologici e finiture d\'interni.',
    'services.roof.title': 'Lastrico Solare & Coperture',
    'services.roof.desc': 'Trattamenti specifici, impermeabilizzazioni all\'avanguardia e isolamento termico per lastrici solari e terrazze di copertura, per una massima protezione dagli agenti atmosferici.',
    'services.custom.title': 'Mobili su Misura & Finiture',
    'services.custom.desc': 'Collaborazione con falegnami e artigiani locali per arredi integrati personalizzati, garantendo coesione estetica ed efficienza degli spazi.',

    'contact.title': 'Contattaci',
    'contact.subtitle': 'Richiedi un sopralluogo gratuito o un preventivo personalizzato',
    'contact.name': 'Nome e Cognome',
    'contact.email': 'Indirizzo Email',
    'contact.phone': 'Numero di Telefono',
    'contact.message': 'Come possiamo aiutarti? descrivi il tuo progetto...',
    'contact.submit': 'Invia Richiesta',
    'contact.success': 'Grazie! Il tuo messaggio è stato inviato con successo. Ti ricontatteremo al più presto.',
    'contact.info.title': 'Informazioni di Contatto',
    'contact.info.phone': 'Telefono',
    'contact.info.email': 'Email',
    'contact.info.address': 'Sede Legale',
    'contact.info.hours': 'Orari di Apertura',
    'contact.info.hours.val': 'Lun - Ven: 08:00 - 18:00 | Sab: 08:00 - 13:00',

    'footer.description': 'Dal 2014, realizziamo pavimentazioni di pregio e ristrutturazioni edilizie con un approccio chiavi in mano incentrato sul dettaglio e sulla sinergia in cantiere.',
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.piva': 'P.IVA / C.F.: 08343750722',
    
    'portfolio.title': 'I Nostri Ultimi Lavori',
    'portfolio.subtitle': 'Sfoglia alcuni dei nostri cantieri completati con dedizione e maestria artigianale',
    'portfolio.viewProject': 'Vedi Progetto'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    
    'hero.title': 'Antonio Agrusti SRLS',
    'hero.subtitle': 'Professional Flooring & Turnkey Renovations',
    'hero.cta': 'Get a Free Quote',
    'hero.badge': 'Quality and Precision since 2014',

    'about.title': 'Our Story',
    'about.subtitle': 'Building trust, refining dreams',
    'about.text1': 'Founded in 2014, our company was born with the clear mission to deliver complete, hassle-free turnkey building renovations. We guide our clients through every step—from initial demolition to the final premium finishes and handover—respecting every single detail.',
    'about.text2': 'Directly managed by ANTONIO AGRUSTI, the company operates with highly qualified professionals and coordinates local specialist crews for all kinds of installations (carpentry, electrical/mechanical systems, custom furniture). We focus on creating harmony, cohesion, and seamless collaboration on-site to achieve a single ultimate goal: perfection.',
    'about.experience.years': 'Years of Experience',
    'about.experience.projects': 'Projects Completed',
    'about.experience.crews': 'Synergy on Site',

    'services.title': 'Our Services',
    'services.subtitle': 'Tailored construction solutions and artisanal craftsmanship',
    'services.flooring.title': 'Flooring Installation',
    'services.flooring.desc': 'Professional laying of all types of flooring: premium natural stone, elegant hardwood/parquet, and highly durable interlocking pavers for outdoor spaces.',
    'services.renovations.title': 'Turnkey Renovations',
    'services.renovations.desc': 'Full site management from heavy demolition to the final decorative details. Comprehensive coordination of structural, plumbing, electrical, and finishing work.',
    'services.roof.title': 'Roof Terraces & Treatments',
    'services.roof.desc': 'Specialized treatments, state-of-the-art waterproofing membranes, and thermal insulation solutions for flat roofs and balconies, ensuring total weather protection.',
    'services.custom.title': 'Custom Furniture & Finishes',
    'services.custom.desc': 'Collaboration with local carpenters and artisans to provide bespoke, tailored furniture integration, ensuring functional and aesthetic harmony.',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'Request a free on-site survey or a customized quotation',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'How can we help you? Describe your project...',
    'contact.submit': 'Send Message',
    'contact.success': 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
    'contact.info.title': 'Contact Information',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.address': 'Registered Office',
    'contact.info.hours': 'Business Hours',
    'contact.info.hours.val': 'Mon - Fri: 08:00 AM - 06:00 PM | Sat: 08:00 AM - 01:00 PM',

    'footer.description': 'Since 2014, we have been delivering high-end flooring and residential renovations with a turnkey model focused on detail and on-site synergy.',
    'footer.rights': 'All rights reserved.',
    'footer.piva': 'Vat No / Tax Code: 08343750722',
    
    'portfolio.title': 'Our Recent Projects',
    'portfolio.subtitle': 'Browse some of our completed construction sites handled with dedication and master craftsmanship',
    'portfolio.viewProject': 'View Project'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Current language signal, defaults to Italian
  private langSignal = signal<Language>('it');
  
  // Expose language as a read-only signal
  readonly currentLang = this.langSignal.asReadonly();

  // Active translations dictionary as a computed signal
  readonly activeDictionary = computed(() => TRANSLATIONS[this.langSignal()]);

  setLanguage(lang: Language): void {
    this.langSignal.set(lang);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', lang);
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.langSignal() === 'it' ? 'en' : 'it');
  }

  translate(key: string): string {
    return this.activeDictionary()[key] || key;
  }

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang === 'it' || savedLang === 'en') {
        this.langSignal.set(savedLang);
      } else {
        // Try browser language default
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'en') {
          this.langSignal.set('en');
        }
      }
    }
  }
}
