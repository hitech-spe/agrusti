import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';
import { BUSINESS_INFO } from '../../config/business-info';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './terms.html',
  styleUrl: './terms.scss'
})
export class TermsComponent implements OnInit {
  private translationService = inject(TranslationService);
  private seoService = inject(SeoService);

  protected businessInfo = BUSINESS_INFO;

  protected isIt(): boolean {
    return this.translationService.currentLang() === 'it';
  }

  ngOnInit(): void {
    const isIt = this.isIt();
    const title = isIt ? 'Termini e Condizioni d’Uso' : 'Terms and Conditions';
    const description = isIt
      ? `Termini e condizioni di navigazione ed utilizzo del sito ufficiale di ${BUSINESS_INFO.name}.`
      : `Terms and conditions for browsing and using the official website of ${BUSINESS_INFO.name}.`;

    this.seoService.updateMeta(title, description, '/termini-e-condizioni');
    this.seoService.injectBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: isIt ? 'Termini e Condizioni' : 'Terms & Conditions', url: '/termini-e-condizioni' }
    ]);
  }
}
