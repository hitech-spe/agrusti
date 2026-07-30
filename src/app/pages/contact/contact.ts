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

  // Form State
  protected isSubmitted = signal(false);
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

  onSubmit(): void {
    console.log('Contact form submitted:', this.contactData);
    this.isSubmitted.set(true);

    // Reset form fields
    this.contactData = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };

    // Auto dismiss success message after 5 seconds
    setTimeout(() => {
      this.isSubmitted.set(false);
    }, 6000);
  }
}
