import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';
import { BUSINESS_INFO } from '../../config/business-info';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  private translationService = inject(TranslationService);
  private seoService = inject(SeoService);

  protected businessInfo = BUSINESS_INFO;

  protected isIt(): boolean {
    return this.translationService.currentLang() === 'it';
  }

  ngOnInit(): void {
    const isIt = this.isIt();
    const title = isIt ? 'Informativa sulla Privacy & Cookie Policy' : 'Privacy & Cookie Policy';
    const description = isIt
      ? `Informativa sul trattamento dei dati personali e sull'uso dei cookie ai sensi del Regolamento UE 2016/679 (GDPR) di ${BUSINESS_INFO.name}.`
      : `Privacy policy and cookie notice pursuant to EU Regulation 2016/679 (GDPR) of ${BUSINESS_INFO.name}.`;

    this.seoService.updateMeta(title, description, '/privacy-policy');
    this.seoService.injectBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: isIt ? 'Privacy Policy' : 'Privacy Policy', url: '/privacy-policy' }
    ]);
  }

  protected openCookieSettings(): void {
    if (typeof window !== 'undefined' && (window as any).Cookiebot) {
      (window as any).Cookiebot.renew();
    }
  }
}
