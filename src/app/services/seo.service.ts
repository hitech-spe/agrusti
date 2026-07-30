import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { BUSINESS_INFO } from '../config/business-info';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  updateMeta(title: string, description: string, urlPath: string = ''): void {
    const fullTitle = `${title} | ${BUSINESS_INFO.name}`;
    this.titleService.setTitle(fullTitle);

    // Update Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'robots', content: 'index, follow' });

    // OpenGraph
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:url', content: `https://www.antonioagrustisrls.it${urlPath}` });
    this.metaService.updateTag({ property: 'og:site_name', content: BUSINESS_INFO.name });

    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    // Update Canonical URL
    this.updateCanonicalUrl(urlPath);
  }

  private updateCanonicalUrl(urlPath: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', `https://www.antonioagrustisrls.it${urlPath}`);
  }

  injectLocalBusinessSchema(): void {
    // Prevent duplicates
    const existingScript = this.document.getElementById('local-business-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': BUSINESS_INFO.name,
      'description': 'Posa di pavimenti di ogni genere pietra, legno, autobloccanti e ristrutturazioni edili chiavi in mano dal 2014.',
      'url': 'https://www.antonioagrustisrls.it',
      'telephone': BUSINESS_INFO.phoneFormatted,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': BUSINESS_INFO.address.street,
        'addressLocality': BUSINESS_INFO.address.city,
        'postalCode': BUSINESS_INFO.address.postalCode,
        'addressRegion': BUSINESS_INFO.address.province,
        'addressCountry': BUSINESS_INFO.address.country
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': BUSINESS_INFO.geo.latitude,
        'longitude': BUSINESS_INFO.geo.longitude
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          'opens': '08:00',
          'closes': '18:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Saturday'],
          'opens': '08:00',
          'closes': '13:00'
        }
      ],
      'foundingDate': BUSINESS_INFO.foundingYear.toString(),
      'founder': {
        '@type': 'Person',
        'name': 'Antonio Agrusti'
      },
      'priceRange': '$$',
      'areaServed': [
        {
          '@type': 'AdministrativeArea',
          'name': BUSINESS_INFO.address.region
        }
      ],
      'knowsAbout': [
        'Posa pavimenti in pietra',
        'Posa parquet',
        'Posa pavimentazioni autobloccanti',
        'Ristrutturazioni edili chiavi in mano',
        'Trattamento lastrico solare',
        'Impermeabilizzazioni coperture'
      ]
    };

    const script = this.document.createElement('script');
    script.id = 'local-business-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
