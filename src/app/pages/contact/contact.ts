import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';
import { EmailService } from '../../services/email.service';
import { BUSINESS_INFO } from '../../config/business-info';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslatePipe],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent implements OnInit {
  private translationService = inject(TranslationService);
  private seoService = inject(SeoService);
  private sanitizer = inject(DomSanitizer);
  private emailService = inject(EmailService);

  // Centralized Business Config
  protected businessInfo = BUSINESS_INFO;

  // Safe Google Maps Embed URL & Direct Directions link
  protected mapEmbedUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://maps.google.com/maps?q=' +
      encodeURIComponent(`${this.businessInfo.address.street}, ${this.businessInfo.address.postalCode} ${this.businessInfo.address.city} ${this.businessInfo.address.province}`) +
      '&t=&z=16&ie=UTF8&iwloc=&output=embed'
  );

  protected googleMapsLink =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(`${this.businessInfo.address.street}, ${this.businessInfo.address.postalCode} ${this.businessInfo.address.city} ${this.businessInfo.address.province}`);

  // Form State Signals
  protected isSubmitting = signal(false);
  protected isSubmitted = signal(false);
  protected submitError = signal(false);

  // Honeypot spam trap
  protected botField = '';

  protected contactData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  ngOnInit(): void {
    const isIt = this.translationService.currentLang() === 'it';
    const title = isIt ? 'Contattaci' : 'Contact Us';
    const description = isIt
      ? `Richiedi un preventivo o un sopralluogo gratuito ad ${BUSINESS_INFO.name}. Siamo a disposizione per informazioni e progetti in tutta la Puglia.`
      : `Request a free quote or on-site survey from ${BUSINESS_INFO.name}. We are available for projects and consultations throughout Apulia.`;

    this.seoService.updateMeta(title, description, '/contatti');
    this.seoService.injectBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: isIt ? 'Contattaci' : 'Contact Us', url: '/contatti' }
    ]);
  }

  protected isIt(): boolean {
    return this.translationService.currentLang() === 'it';
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting()) {
      return;
    }

    // Trappola Anti-Spam Honeypot (se un bot automatico compila il campo nascosto)
    if (this.botField && this.botField.trim().length > 0) {
      console.warn('Richiesta automatica bloccata dal filtro antispam honeypot.');
      this.handleSuccess();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(false);

    try {
      await this.emailService.sendContactMessage({
        name: this.contactData.name,
        email: this.contactData.email,
        phone: this.contactData.phone,
        message: this.contactData.message
      });

      this.handleSuccess();
    } catch (error) {
      console.error('Invio messaggio tramite EmailJS fallito:', error);
      this.submitError.set(true);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private handleSuccess(): void {
    this.isSubmitted.set(true);
    this.submitError.set(false);

    // Reset form fields
    this.contactData = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    this.botField = '';

    // Auto dismiss success notification after 7 seconds
    setTimeout(() => {
      this.isSubmitted.set(false);
    }, 7000);
  }
}
