import { Injectable, signal, computed } from '@angular/core';

export type Language = 'it' | 'en';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  it: {
    'nav.home': 'Home',
    'nav.about': 'Chi Siamo',
    'nav.services': 'Servizi',
    'nav.contact': 'Contatti',

    'hero.badge': 'Qualità e Precisione dal 2014',
    'hero.title': 'Antonio Agrusti SRLS',
    'hero.subtitle': 'Posa di pavimenti di ogni genere & Ristrutturazioni chiavi in mano',
    'hero.title.line1': "L'ARTE DEL RESTAURO,",
    'hero.title.line2': 'DELLA POSA E DELLA FINITURA EDILE.',
    'hero.lead': 'Dal 2014, esistiamo sul territorio con l’intento di portare avanti un concetto di lavoro fatto di qualità, serietà e soddisfazione per la nostra clientela.',
    'hero.cta': 'Richiedi un Preventivo',
    'hero.slab.stone': 'PIETRA LOCALE',
    'hero.slab.wood': 'PARQUET',
    'hero.slab.design': 'PROGETTAZIONE',
    'hero.badge.turnkey': '100% Chiavi in Mano',
    'hero.badge.interlocutor': 'Unico Interlocutore',
    'hero.stats.experience': 'Anni di Esperienza',
    'hero.stats.precision': 'Dettaglio e Precisione',
    'hero.stats.synergy': 'Sinergia di Squadre',

    'watermark.excellence': 'ECCELLENZA',
    'watermark.method': 'METODO',
    'watermark.story': 'STORIA',
    'watermark.portfolio': 'PORTFOLIO',
    'watermark.faq': 'DOMANDE',

    'process.title': 'Il Nostro Processo',
    'process.subtitle': 'Come operiamo in cantiere per darti tranquillità, armonia ed eccellenza strutturale.',
    'process.step1.title': 'Demolizione & Controllo',
    'process.step1.desc': 'Rimuoviamo il vecchio in totale sicurezza, preparando fondamenta solide e verificando pendenze strutturali e dettagli logistici di partenza.',
    'process.step2.title': 'Sinergia & Struttura',
    'process.step2.desc': 'Coordiniamo i migliori artigiani locali per impianti, carpenteria e arredi integrati. Antonio Agrusti è costantemente in cantiere a creare armonia e coesione.',
    'process.step3.title': 'Posa & Rifinitura',
    'process.step3.desc': 'Eseguiamo la posa d’eccellenza di pavimenti (pietra, legno, autobloccanti) o guaine per lastrici solari, rifinendo ogni dettaglio fino alla perfetta consegna.',

    'about.title': 'La Nostra Storia',
    'about.subtitle': 'Costruiamo fiducia, rifiniamo sogni',
    'about.text1': 'L’azienda nasce nel 2014 con l’intento di improntare la ristrutturazione edilizia chiavi in mano, assistendo la clientela dalle demolizioni, sino alle rifiniture e consegna dei lavori, rispettando ogni minimo dettaglio.',
    'about.text2': 'L’azienda, gestita direttamente da ANTONIO AGRUSTI, è dotata di personale qualificato e si serve di squadre locali per effettuare ogni tipo di opera (carpenteria, impiantistica, mobili su misura). Il tutto creando armonia, coesione e collaborazione tra le diverse presenze in cantiere, con un unico grande obiettivo: l\'eccellenza.',
    'about.text3': 'La cura di ogni fase della lavorazione è garantita dalla presenza costante di Antonio Agrusti, che supervisiona il cantiere e assicura il rispetto dei tempi e della qualità concordati. Collaboriamo attivamente con i migliori fornitori di materiali della nostra regione, offrendo soluzioni all\'avanguardia per ogni esigenza.',
    'about.badge.synergy': 'SINERGIA E PROFESSIONALITÀ',
    'about.stats.title': 'La Forza dell\'Esperienza',
    'about.stats.subtitle': 'Garantiamo un servizio d\'eccellenza fondato su competenza e coordinazione.',
    'about.stats.foundation.label': 'Anno di Fondazione',
    'about.stats.foundation.desc': 'Oltre un decennio di crescita continua e successi sul territorio.',
    'about.stats.turnkey.label': 'Chiavi in Mano',
    'about.stats.turnkey.desc': 'Un unico referente dalle demolizioni iniziali fino alle rifiniture di pregio.',
    'about.stats.crews.label': 'Squadre Locali',
    'about.stats.crews.desc': 'Collaborazione con i migliori artigiani del territorio per carpenteria, impianti e arredi.',
    'about.quote.text': 'Creiamo armonia, coesione e collaborazione tra le diverse presenze in cantiere, con un unico grande obiettivo: consegnare un\'opera a regola d\'arte.',
    'about.quote.author': '— Antonio Agrusti, Fondatore & Amministratore',
    'about.experience.years': 'Anni di Esperienza',
    'about.experience.projects': 'Progetti Completati',
    'about.experience.crews': 'Sinergia in Cantiere',

    'services.title': 'I Nostri Servizi',
    'services.subtitle': 'Soluzioni edilizie su misura ed eccellenza artigianale',
    'services.learnMore': 'Scopri di più →',

    'services.tile.stone': 'Pietra',
    'services.tile.wood': 'Legno',
    'services.tile.pavers': 'Autobloccanti',
    'services.tile.prestige': 'Pavimenti di Pregio',

    'services.flooring.title': 'Posa di Pavimenti',
    'services.flooring.desc': 'Installazione professionale di pavimentazioni di ogni genere: pietra naturale e materiali lapidei; legno massello, multistrato, laminati e SPC; pavimentazioni autobloccanti in cemento, pietra e WPC (legno per esterno).',
    'services.flooring.b1.title': 'Posa in Pietra Naturale',
    'services.flooring.b1.desc': 'Ideale per cortili esterni, viali e interni rustici di pregio.',
    'services.flooring.b2.title': 'Legno & Parquet',
    'services.flooring.b2.desc': 'Installazione impeccabile per calore e raffinatezza degli spazi interni.',
    'services.flooring.b3.title': 'Masselli Autobloccanti',
    'services.flooring.b3.desc': 'Soluzione carrabile drenante, durevole e dal forte impatto geometrico.',

    'services.renovations.title': 'Ristrutturazioni Chiavi in Mano',
    'services.renovations.desc': 'Gestione completa del cantiere con figure tecniche (architetti, geometri, ingegneri). Lavorazioni di demolizione e ricostruzione; impianti tecnologici con certificazioni di conformità; finiture d’interni.',
    'services.renovations.badge': 'CHIAVI IN MANO',
    'services.renovations.b1.title': 'Pianificazione Unica',
    'services.renovations.b1.desc': 'Gestiamo l\'intero progetto sollevando il cliente da ogni stress burocratico o logistico.',
    'services.renovations.b2.title': 'Dalla Demolizione alla Consegna',
    'services.renovations.b2.desc': 'Seguiamo scrupolosamente scavi, demolizioni, opere strutturali, impianti e finiture.',
    'services.renovations.b3.title': 'Coordinamento Certificato',
    'services.renovations.b3.desc': 'Tutte le maestranze in cantiere lavorano in stretta sinergia sotto la nostra attenta guida.',

    'services.roof.title': 'Lastrico Solare & Coperture',
    'services.roof.desc': 'Trattamenti specifici, impermeabilizzazioni all\'avanguardia e isolamento termico per lastrici solari e terrazze di copertura, per una massima protezione dagli agenti atmosferici.',
    'services.roof.layer.top': 'Impermeabilizzazione Specifica',
    'services.roof.layer.mid': 'Isolamento Termico',
    'services.roof.layer.base': 'Lastrico Solare Portante',
    'services.roof.b1.title': 'Impermeabilizzazione',
    'services.roof.b1.desc': 'Applicazione di guaine certificate e resine idonee a prevenire ogni infiltrazione.',
    'services.roof.b2.title': 'Trattamenti Specifici',
    'services.roof.b2.desc': 'Ripristino delle pendenze, giunti di dilatazione e protezioni anti-radice.',
    'services.roof.b3.title': 'Efficienza Energetica',
    'services.roof.b3.desc': 'Coibentazione termica all\'avanguardia per massimizzare il risparmio energetico dell\'edificio.',

    'services.custom.title': 'Mobili su Misura & Finiture',
    'services.custom.desc': 'Collaborazione con falegnami e artigiani locali per arredi integrati personalizzati, garantendo coesione estetica ed efficienza degli spazi.',
    'services.custom.badge': 'ARTIGIANATO SU MISURA',
    'services.custom.b1.title': 'Arredi Integrati',
    'services.custom.b1.desc': 'Sinergia totale con falegnami per mobili coordinati ed incassati a regola d\'arte.',
    'services.custom.b2.title': 'Impiantistica d\'Avanguardia',
    'services.custom.b2.desc': 'Collaborazione con elettricisti ed idraulici per l\'installazione di sistemi domotici ed efficienti.',
    'services.custom.b3.title': 'Dettaglio Unico',
    'services.custom.b3.desc': 'Ogni finitura è studiata per sposare perfettamente l\'architettura della casa.',

    'services.cta.title': 'Hai bisogno di una consulenza tecnica?',
    'services.cta.desc': 'Siamo pronti ad analizzare le tue esigenze ed offrirti un preventivo dettagliato e trasparente.',

    'contact.title': 'Contattaci',
    'contact.subtitle': 'Richiedi un sopralluogo gratuito o un preventivo personalizzato',
    'contact.form.title': 'Invia un Messaggio',
    'contact.form.desc': 'Completa il modulo sottostante, il nostro team ti risponderà entro 24 ore lavorative.',
    'contact.form.successTitle': 'Invio Completato!',
    'contact.form.errTitle': 'Errore durante l\'invio',
    'contact.form.errName': 'Il nome è obbligatorio.',
    'contact.form.errEmail': 'Inserisci un indirizzo email valido.',
    'contact.form.errPhone': 'Il numero di telefono è obbligatorio.',
    'contact.form.errMessage': 'Il messaggio non può essere vuoto.',
    'contact.form.placeholderName': 'es. Antonio Rossi',
    'contact.form.placeholderEmail': 'es. nome@dominio.it',
    'contact.form.placeholderPhone': 'es. 333 1234567',
    'contact.form.placeholderMessage': 'Scrivi qui i dettagli del tuo cantiere o le tue richieste di preventivo...',
    'contact.name': 'Nome e Cognome',
    'contact.email': 'Indirizzo Email',
    'contact.phone': 'Numero di Telefono',
    'contact.message': 'Come possiamo aiutarti? descrivi il tuo progetto...',
    'contact.submit': 'Invia Richiesta',
    'contact.submitting': 'Invio in corso...',
    'contact.success': 'Grazie! Il tuo messaggio è stato inviato con successo. Ti ricontatteremo al più presto.',
    'contact.error': 'Si è verificato un errore durante l’invio del messaggio. Riprova tra poco oppure contattaci direttamente al telefono o via email.',
    'contact.info.title': 'Informazioni di Contatto',
    'contact.info.phone': 'Telefono',
    'contact.info.email': 'Email',
    'contact.info.address': 'Sede Legale',
    'contact.info.hours': 'Orari di Apertura',
    'contact.info.hours.val': 'Lun - Ven: 08:00 - 18:00 | Sab: 08:00 - 13:00',
    'contact.map.country': 'Italia',

    'footer.description': 'Dal 2014, esistiamo sul territorio con l’intento di portare avanti un concetto di lavoro fatto di qualità, serietà e soddisfazione per la nostra clientela.',
    'footer.sitemap': 'Sitemap',
    'footer.rights': 'Tutti i diritti riservati.',
    'footer.piva': 'P.IVA / C.F.: 08343750722',

    'portfolio.title': 'I Nostri Ultimi Lavori',
    'portfolio.subtitle': 'Sfoglia alcuni dei nostri cantieri completati con dedizione e maestria artigianale',
    'portfolio.viewProject': 'Vedi Progetto',
    'portfolio.filter.all': 'Tutti',
    'portfolio.filter.flooring': 'Pavimenti',
    'portfolio.filter.renovations': 'Ristrutturazioni',
    'portfolio.filter.roof': 'Lastrici Solari',
    'portfolio.empty': 'Nessun lavoro trovato in questa categoria.',
    'portfolio.placeholderTip': 'Sostituisci in assets/images/',

    'faq.title': 'Domande Frequenti',
    'faq.subtitle': 'Tutto quello che c’è da sapere sui nostri interventi e sulla gestione del cantiere',

    'home.cta.title': 'Vuoi iniziare la tua ristrutturazione?',
    'home.cta.desc': 'Assistiamo i nostri clienti passo dopo passo, garantendo serietà, professionalità e un unico interlocutore in cantiere.'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.contact': 'Contact',

    'hero.badge': 'Quality and Precision since 2014',
    'hero.title': 'Antonio Agrusti SRLS',
    'hero.subtitle': 'Professional Flooring & Turnkey Renovations',
    'hero.title.line1': 'THE ART OF RESTORATION,',
    'hero.title.line2': 'FLOOR LAYING AND BUILDING FINISHES.',
    'hero.lead': 'Since 2014, we have been established in our region with the goal of upholding a philosophy of work built on quality, integrity, and client satisfaction.',
    'hero.cta': 'Get a Free Quote',
    'hero.slab.stone': 'LOCAL STONE',
    'hero.slab.wood': 'PARQUET & WOOD',
    'hero.slab.design': 'DESIGN & PLANNING',
    'hero.badge.turnkey': '100% Turnkey',
    'hero.badge.interlocutor': 'Single Point of Contact',
    'hero.stats.experience': 'Years of Experience',
    'hero.stats.precision': 'Detail & Precision',
    'hero.stats.synergy': 'Team Synergy',

    'watermark.excellence': 'EXCELLENCE',
    'watermark.method': 'METHOD',
    'watermark.story': 'STORY',
    'watermark.portfolio': 'PORTFOLIO',
    'watermark.faq': 'FAQ',

    'process.title': 'Our Process',
    'process.subtitle': 'How we operate on site to ensure peace of mind, harmony, and structural excellence.',
    'process.step1.title': 'Demolition & Assessment',
    'process.step1.desc': 'We safely remove existing structures, preparing solid foundations and verifying slopes and initial logistical details.',
    'process.step2.title': 'Synergy & Structure',
    'process.step2.desc': 'We coordinate the finest local specialists for installations, carpentry, and custom furnishings. Antonio Agrusti is on-site constantly to ensure seamless harmony.',
    'process.step3.title': 'Laying & Finishing',
    'process.step3.desc': 'We deliver master-level installation of flooring (stone, wood, interlocking pavers) and roof membranes, refining every detail until final delivery.',

    'about.title': 'Our Story',
    'about.subtitle': 'Building trust, refining dreams',
    'about.text1': 'Founded in 2014, our company was born with the clear mission to deliver complete, hassle-free turnkey building renovations. We guide our clients through every step—from initial demolition to the final premium finishes and handover—respecting every single detail.',
    'about.text2': 'Directly managed by ANTONIO AGRUSTI, the company operates with highly qualified professionals and coordinates local specialist crews for all kinds of installations (carpentry, electrical/mechanical systems, custom furniture). We focus on creating harmony, cohesion, and seamless collaboration on-site to achieve a single ultimate goal: perfection.',
    'about.text3': 'Care in every phase of the project is guaranteed by the constant on-site presence of Antonio Agrusti, who supervises the works and ensures adherence to agreed timelines and quality standards. We actively collaborate with our region\'s leading material suppliers, offering cutting-edge solutions for every requirement.',
    'about.badge.synergy': 'SYNERGY & PROFESSIONALISM',
    'about.stats.title': 'The Strength of Experience',
    'about.stats.subtitle': 'We guarantee top-tier service founded on competence and seamless coordination.',
    'about.stats.foundation.label': 'Year of Foundation',
    'about.stats.foundation.desc': 'Over a decade of continuous growth and proven success across the territory.',
    'about.stats.turnkey.label': 'Turnkey Service',
    'about.stats.turnkey.desc': 'A single point of contact from initial demolition to fine architectural finishes.',
    'about.stats.crews.label': 'Local Specialist Teams',
    'about.stats.crews.desc': 'Partnership with the finest local craftsmen for carpentry, technical systems, and bespoke furniture.',
    'about.quote.text': 'We create harmony, cohesion, and collaboration among all on-site trades, with one grand objective: delivering master craftsmanship.',
    'about.quote.author': '— Antonio Agrusti, Founder & Managing Director',
    'about.experience.years': 'Years of Experience',
    'about.experience.projects': 'Projects Completed',
    'about.experience.crews': 'Synergy on Site',

    'services.title': 'Our Services',
    'services.subtitle': 'Tailored construction solutions and artisanal craftsmanship',
    'services.learnMore': 'Learn more →',

    'services.tile.stone': 'Natural Stone',
    'services.tile.wood': 'Wood',
    'services.tile.pavers': 'Interlocking Pavers',
    'services.tile.prestige': 'Prestige Flooring',

    'services.flooring.title': 'Flooring Installation',
    'services.flooring.desc': 'Professional laying of all types of flooring: natural stone and stone materials; solid hardwood, multi-layer engineered wood, laminate, and SPC; interlocking pavers in concrete, stone, and WPC (composite outdoor decking).',
    'services.flooring.b1.title': 'Natural Stone Laying',
    'services.flooring.b1.desc': 'Ideal for outdoor courtyards, walkways, and prestigious rustic interiors.',
    'services.flooring.b2.title': 'Wood & Parquet',
    'services.flooring.b2.desc': 'Impeccable installation delivering warmth and refinement to interior spaces.',
    'services.flooring.b3.title': 'Interlocking Pavers',
    'services.flooring.b3.desc': 'Driveway-grade, permeable, durable solution with striking geometric visual impact.',

    'services.renovations.title': 'Turnkey Renovations',
    'services.renovations.desc': 'Comprehensive construction site management with qualified technical professionals (architects, surveyors, engineers). Demolition and reconstruction works; certified compliant building systems and MEP; bespoke interior finishes.',
    'services.renovations.badge': 'TURNKEY EXCELLENCE',
    'services.renovations.b1.title': 'Unified Planning',
    'services.renovations.b1.desc': 'We handle the entire project, relieving the client of all bureaucratic and logistical stress.',
    'services.renovations.b2.title': 'From Demolition to Handover',
    'services.renovations.b2.desc': 'We meticulously execute excavations, demolition, structural works, building systems, and finishes.',
    'services.renovations.b3.title': 'Certified Coordination',
    'services.renovations.b3.desc': 'All trades on site work in tight synergy under our careful supervision.',

    'services.roof.title': 'Roof Terraces & Treatments',
    'services.roof.desc': 'Specialized treatments, state-of-the-art waterproofing membranes, and thermal insulation solutions for flat roofs and balconies, ensuring total weather protection.',
    'services.roof.layer.top': 'Specialized Waterproofing',
    'services.roof.layer.mid': 'Thermal Insulation',
    'services.roof.layer.base': 'Load-Bearing Roof Deck',
    'services.roof.b1.title': 'Waterproofing Systems',
    'services.roof.b1.desc': 'Application of certified elastomeric membranes and specialized resins to prevent water infiltration.',
    'services.roof.b2.title': 'Specialized Treatments',
    'services.roof.b2.desc': 'Restoration of gradients, expansion joints, and root barrier protection.',
    'services.roof.b3.title': 'Energy Efficiency',
    'services.roof.b3.desc': 'State-of-the-art thermal insulation maximizing building energy efficiency.',

    'services.custom.title': 'Custom Furniture & Finishes',
    'services.custom.desc': 'Collaboration with local carpenters and artisans to provide bespoke, tailored furniture integration, ensuring functional and aesthetic harmony.',
    'services.custom.badge': 'BESPOKE CRAFTSMANSHIP',
    'services.custom.b1.title': 'Integrated Furnishings',
    'services.custom.b1.desc': 'Total synergy with carpenters for seamlessly coordinated, custom built-in furniture.',
    'services.custom.b2.title': 'State-of-the-Art Systems',
    'services.custom.b2.desc': 'Collaboration with electricians and plumbers for home automation and high-efficiency systems.',
    'services.custom.b3.title': 'Bespoke Detail',
    'services.custom.b3.desc': 'Every finish is tailored to harmonize perfectly with the home\'s architecture.',

    'services.cta.title': 'Need a Technical Consultation?',
    'services.cta.desc': 'We are ready to assess your requirements and provide a clear, detailed estimate.',

    'contact.title': 'Contact Us',
    'contact.subtitle': 'Request a free on-site survey or a customized quotation',
    'contact.form.title': 'Send Us a Message',
    'contact.form.desc': 'Complete the form below; our team will reply within 24 business hours.',
    'contact.form.successTitle': 'Submission Complete!',
    'contact.form.errTitle': 'Submission Error',
    'contact.form.errName': 'Full name is required.',
    'contact.form.errEmail': 'Please enter a valid email address.',
    'contact.form.errPhone': 'Phone number is required.',
    'contact.form.errMessage': 'Message cannot be empty.',
    'contact.form.placeholderName': 'e.g. John Smith',
    'contact.form.placeholderEmail': 'e.g. name@domain.com',
    'contact.form.placeholderPhone': 'e.g. +39 333 1234567',
    'contact.form.placeholderMessage': 'Describe the details of your project or your quotation requests here...',
    'contact.name': 'Full Name',
    'contact.email': 'Email Address',
    'contact.phone': 'Phone Number',
    'contact.message': 'How can we help you? Describe your project...',
    'contact.submit': 'Send Message',
    'contact.submitting': 'Sending...',
    'contact.success': 'Thank you! Your message has been sent successfully. We will get back to you shortly.',
    'contact.error': 'An error occurred while sending your message. Please try again shortly or contact us directly by phone or email.',
    'contact.info.title': 'Contact Information',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',
    'contact.info.address': 'Registered Office',
    'contact.info.hours': 'Business Hours',
    'contact.info.hours.val': 'Mon - Fri: 08:00 AM - 06:00 PM | Sat: 08:00 AM - 01:00 PM',
    'contact.map.country': 'Italy',

    'footer.description': 'Since 2014, we have been established in our region with the goal of upholding a philosophy of work built on quality, integrity, and client satisfaction.',
    'footer.sitemap': 'Sitemap',
    'footer.rights': 'All rights reserved.',
    'footer.piva': 'Vat No / Tax Code: 08343750722',

    'portfolio.title': 'Our Recent Projects',
    'portfolio.subtitle': 'Browse some of our completed construction sites handled with dedication and master craftsmanship',
    'portfolio.viewProject': 'View Project',
    'portfolio.filter.all': 'All',
    'portfolio.filter.flooring': 'Flooring',
    'portfolio.filter.renovations': 'Renovations',
    'portfolio.filter.roof': 'Flat Roofs',
    'portfolio.empty': 'No projects found in this category.',
    'portfolio.placeholderTip': 'Replace in assets/images/',

    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about our work and on-site management',

    'home.cta.title': 'Ready to start your renovation?',
    'home.cta.desc': 'We guide our clients step by step, guaranteeing reliability, professionalism, and a single point of contact on site.'
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
      try {
        window.localStorage.setItem('lang', lang);
      } catch {
        // Ignore storage write issues
      }
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  toggleLanguage(): void {
    this.setLanguage(this.langSignal() === 'it' ? 'en' : 'it');
  }

  translate(key: string): string {
    return this.activeDictionary()[key] || key;
  }

  constructor() {
    let loadedFromStorage = false;

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedLang = window.localStorage.getItem('lang') as Language;
        if (savedLang === 'it' || savedLang === 'en') {
          this.langSignal.set(savedLang);
          loadedFromStorage = true;
        }
      } catch {
        // Ignore storage read issues
      }
    }

    if (!loadedFromStorage && typeof navigator !== 'undefined' && navigator.language) {
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === 'en') {
        this.langSignal.set('en');
      }
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = this.langSignal();
    }
  }
}
