import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';
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

  // Centralized Business Config
  protected businessInfo = BUSINESS_INFO;

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
  }

  protected isIt(): boolean {
    return this.translationService.currentLang() === 'it';
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(false);

    try {
      // Local dev simulation for seamless testing without Netlify runtime
      if (
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ) {
        await new Promise(resolve => setTimeout(resolve, 600));
        this.handleSuccess();
        return;
      }

      // Production Netlify Forms submission
      const body = new URLSearchParams({
        'form-name': 'contact',
        'bot-field': this.botField,
        name: this.contactData.name,
        email: this.contactData.email,
        phone: this.contactData.phone,
        message: this.contactData.message
      }).toString();

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      });

      if (response.ok) {
        this.handleSuccess();
      } else {
        throw new Error(`Netlify form submission returned status ${response.status}`);
      }
    } catch (error) {
      console.error('Netlify form submission failed:', error);
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
