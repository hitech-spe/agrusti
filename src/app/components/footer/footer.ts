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
}
