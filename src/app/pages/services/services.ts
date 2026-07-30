import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class ServicesComponent implements OnInit {
  private translationService = inject(TranslationService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    const isIt = this.translationService.currentLang() === 'it';
    const title = isIt ? 'I Nostri Servizi' : 'Our Services';
    const description = isIt
      ? 'Dalla posa di pavimenti in pietra, legno e autobloccanti, alle ristrutturazioni chiavi in mano e trattamenti specifici del lastrico solare. Scopri i nostri servizi.'
      : 'From premium flooring (stone, wood, interlocking pavers) to turnkey renovations and flat roof treatments. Discover our specialized services.';
    
    this.seoService.updateMeta(title, description, '/servizi');
  }
}
