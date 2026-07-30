import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/about/about').then(m => m.AboutComponent)
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/services/services').then(m => m.ServicesComponent)
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contact/contact').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
