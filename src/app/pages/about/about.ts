import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent implements OnInit {
  private translationService = inject(TranslationService);
  private seoService = inject(SeoService);

  ngOnInit(): void {
    const isIt = this.translationService.currentLang() === 'it';
    const title = isIt ? 'Chi Siamo' : 'About Us';
    const description = isIt
      ? 'La storia di Antonio Agrusti SRLS. Dal 2014, operiamo con serietà nel settore delle ristrutturazioni chiavi in mano e della posa di pavimenti d’eccellenza.'
      : 'The story of Antonio Agrusti SRLS. Since 2014, delivering excellence in turnkey renovations and premium flooring installations.';
    
    this.seoService.updateMeta(title, description, '/chi-siamo');
  }
}
