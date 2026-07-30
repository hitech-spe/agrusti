import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private router = inject(Router);
  protected readonly title = signal('agrusti');

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Initialize AOS scrolling animations with premium durations
      AOS.init({
        duration: 1000,
        once: true,
        offset: 120,
        easing: 'ease-out-cubic'
      });

      // Automatically refresh AOS animations upon successful route change!
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        setTimeout(() => {
          AOS.refresh();
        }, 100);
      });
    }
  }
}
