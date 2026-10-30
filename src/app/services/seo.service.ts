import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { BUSINESS_INFO } from '../config/business-info';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoOptions {
  image?: string;
  imageAlt?: string;
  type?: string;
  locale?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  readonly baseUrl = BUSINESS_INFO.websiteUrl;
  readonly defaultImage = `${this.baseUrl}/assets/images/newLogo.webp`;

  updateMeta(title: string, description: string, urlPath: string = '', options?: SeoOptions): void {
    const fullTitle = `${title} | ${BUSINESS_INFO.name}`;
    this.titleService.setTitle(fullTitle);

    const canonicalUrl = this.buildCanonicalUrl(urlPath);
    const imageUrl = options?.image
      ? options.image.startsWith('http')
        ? options.image
        : `${this.baseUrl}/${options.image.replace(/^\//, '')}`
      : this.defaultImage;
    const imageAlt = options?.imageAlt || `${BUSINESS_INFO.name} - Posa Pavimenti e Ristrutturazioni`;
    const locale = options?.locale || 'it_IT';
    const type = options?.type || 'website';

    // Core Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    });
    this.metaService.updateTag({ name: 'author', content: BUSINESS_INFO.name });

    // OpenGraph
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: type });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });
    this.metaService.updateTag({ property: 'og:site_name', content: BUSINESS_INFO.name });
    this.metaService.updateTag({ property: 'og:image', content: imageUrl });
    this.metaService.updateTag({ property: 'og:image:alt', content: imageAlt });
    this.metaService.updateTag({ property: 'og:locale', content: locale });

    // Twitter Cards
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
    this.metaService.updateTag({ name: 'twitter:image:alt', content: imageAlt });

    // Canonical link tag
    this.updateCanonicalUrl(canonicalUrl);
  }

  buildCanonicalUrl(urlPath: string): string {
    if (!urlPath || urlPath === '/' || urlPath === '') {
      return `${this.baseUrl}/`;
    }
    const cleanPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
    return `${this.baseUrl}${cleanPath}`;
  }

  private updateCanonicalUrl(fullUrl: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector("link[rel='canonical']");
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', fullUrl);
  }

  injectLocalBusinessSchema(): void {
    const scriptId = 'local-business-schema';
    const existingScript = this.document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'GeneralContractor', 'HomeAndConstructionBusiness'],
          '@id': `${this.baseUrl}/#business`,
          'name': BUSINESS_INFO.name,
          'legalName': BUSINESS_INFO.legalName,
          'url': this.baseUrl,
          'logo': `${this.baseUrl}/assets/images/newLogo.webp`,
          'image': `${this.baseUrl}/assets/images/newLogo.webp`,
          'telephone': BUSINESS_INFO.phoneFormatted,
          'email': BUSINESS_INFO.email,
          'vatID': `IT${BUSINESS_INFO.vatNumber}`,
          'taxID': BUSINESS_INFO.taxCode,
          'description':
            'Posa di pavimenti di ogni genere (pietra, legno, autobloccanti) e ristrutturazioni edili chiavi in mano dal 2014.',
          'priceRange': '€€',
          'currenciesAccepted': 'EUR',
          'paymentAccepted': ['Contanti', 'Bonifico Bancario', 'Assegno'],
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
          'hasMap': `https://maps.google.com/maps?q=${encodeURIComponent(`${BUSINESS_INFO.address.street}, ${BUSINESS_INFO.address.postalCode} ${BUSINESS_INFO.address.city} ${BUSINESS_INFO.address.province}`)}`,
          'openingHoursSpecification': [
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              'opens': '17:00',
              'closes': '19:00'
            }
          ],
          'foundingDate': BUSINESS_INFO.foundingYear.toString(),
          'founder': {
            '@type': 'Person',
            'name': 'Antonio Agrusti'
          },
          'areaServed': [
            {
              '@type': 'City',
              'name': BUSINESS_INFO.address.city
            },
            {
              '@type': 'AdministrativeArea',
              'name': `Provincia di ${BUSINESS_INFO.address.province === 'TA' ? 'Taranto' : BUSINESS_INFO.address.province}`
            },
            {
              '@type': 'AdministrativeArea',
              'name': 'Provincia di Bari'
            },
            {
              '@type': 'AdministrativeArea',
              'name': BUSINESS_INFO.address.region
            }
          ],
          'knowsAbout': [
            'Posa pavimenti in pietra naturale',
            'Posa parquet e spina italiana',
            'Posa pavimentazioni autobloccanti e masselli',
            'Posa pavimenti SPC e LVT',
            'Ristrutturazioni edili chiavi in mano',
            'Trattamento e impermeabilizzazione lastrico solare',
            'Ristrutturazione bagno con doccia a filo pavimento',
            'Mobili su misura e coordinamento squadre artigiane'
          ]
        },
        {
          '@type': 'WebSite',
          '@id': `${this.baseUrl}/#website`,
          'url': this.baseUrl,
          'name': BUSINESS_INFO.name,
          'publisher': {
            '@id': `${this.baseUrl}/#business`
          },
          'inLanguage': ['it-IT', 'en-US']
        }
      ]
    };

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  injectFaqSchema(faqs: FaqItem[]): void {
    const scriptId = 'faq-schema';
    const existingScript = this.document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (!faqs || faqs.length === 0) {
      return;
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  injectBreadcrumbSchema(items: BreadcrumbItem[]): void {
    const scriptId = 'breadcrumb-schema';
    const existingScript = this.document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (!items || items.length === 0) {
      return;
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url.startsWith('http') ? item.url : this.buildCanonicalUrl(item.url)
      }))
    };

    const script = this.document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
