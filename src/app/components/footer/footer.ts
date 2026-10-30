import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../services/translate.pipe';
import { BUSINESS_INFO } from '../../config/business-info';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  protected currentYear = new Date().getFullYear();
  protected businessInfo = BUSINESS_INFO;

  protected openCookieSettings(): void {
    if (typeof window !== 'undefined' && (window as any).Cookiebot) {
      (window as any).Cookiebot.renew();
    }
  }

  protected scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
}
