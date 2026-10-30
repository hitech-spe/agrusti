import { TestBed } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './seo.service';
import { BUSINESS_INFO } from '../config/business-info';

describe('SeoService', () => {
  let service: SeoService;
  let titleService: Title;
  let metaService: Meta;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoService, Title, Meta]
    });
    service = TestBed.inject(SeoService);
    titleService = TestBed.inject(Title);
    metaService = TestBed.inject(Meta);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    // Cleanup any injected schema scripts
    ['local-business-schema', 'faq-schema', 'breadcrumb-schema'].forEach(id => {
      const el = doc.getElementById(id);
      if (el) {
        el.remove();
      }
    });
    const canonical = doc.querySelector("link[rel='canonical']");
    if (canonical) {
      canonical.remove();
    }
  });

  it('dovrebbe istanziare correttamente SeoService', () => {
    expect(service).toBeTruthy();
    expect(service.baseUrl).toBe('https://antonioagrustisrls.com');
  });

  it('dovrebbe costruire URL canonici corretti', () => {
    expect(service.buildCanonicalUrl('')).toBe('https://antonioagrustisrls.com/');
    expect(service.buildCanonicalUrl('/')).toBe('https://antonioagrustisrls.com/');
    expect(service.buildCanonicalUrl('/chi-siamo')).toBe('https://antonioagrustisrls.com/chi-siamo');
    expect(service.buildCanonicalUrl('servizi')).toBe('https://antonioagrustisrls.com/servizi');
  });

  it('dovrebbe aggiornare titolo, meta tag e canonical link per la home', () => {
    service.updateMeta('Titolo Home', 'Descrizione Home', '/');

    expect(titleService.getTitle()).toBe(`Titolo Home | ${BUSINESS_INFO.name}`);

    const descTag = metaService.getTag("name='description'");
    expect(descTag?.content).toBe('Descrizione Home');

    const robotsTag = metaService.getTag("name='robots'");
    expect(robotsTag?.content).toContain('index, follow');

    const ogUrlTag = metaService.getTag("property='og:url'");
    expect(ogUrlTag?.content).toBe('https://antonioagrustisrls.com/');

    const canonicalLink = doc.querySelector("link[rel='canonical']") as HTMLLinkElement;
    expect(canonicalLink).toBeTruthy();
    expect(canonicalLink.getAttribute('href')).toBe('https://antonioagrustisrls.com/');
  });

  it('dovrebbe supportare opzioni personalizzate per OpenGraph e Twitter', () => {
    service.updateMeta('Servizi', 'Descrizione Servizi', '/servizi', {
      image: 'assets/images/custom.webp',
      imageAlt: 'Foto Personalizzata',
      locale: 'it_IT'
    });

    const ogImage = metaService.getTag("property='og:image'");
    expect(ogImage?.content).toBe('https://antonioagrustisrls.com/assets/images/custom.webp');

    const ogImageAlt = metaService.getTag("property='og:image:alt'");
    expect(ogImageAlt?.content).toBe('Foto Personalizzata');

    const twitterCard = metaService.getTag("name='twitter:card'");
    expect(twitterCard?.content).toBe('summary_large_image');
  });

  it('dovrebbe iniettare lo schema JSON-LD LocalBusiness e WebSite', () => {
    service.injectLocalBusinessSchema();

    const script = doc.getElementById('local-business-schema') as HTMLScriptElement;
    expect(script).toBeTruthy();
    expect(script.type).toBe('application/ld+json');

    const data = JSON.parse(script.text);
    expect(data['@context']).toBe('https://schema.org');
    expect(Array.isArray(data['@graph'])).toBe(true);

    const business = data['@graph'].find((item: any) => item['@id']?.includes('#business'));
    expect(business).toBeTruthy();
    expect(business.name).toBe(BUSINESS_INFO.name);
    expect(business.url).toBe('https://antonioagrustisrls.com');
    expect(business.vatID).toBe(`IT${BUSINESS_INFO.vatNumber}`);

    const website = data['@graph'].find((item: any) => item['@id']?.includes('#website'));
    expect(website).toBeTruthy();
    expect(website.url).toBe('https://antonioagrustisrls.com');
  });

  it('dovrebbe iniettare lo schema FAQPage', () => {
    service.injectFaqSchema([
      { question: 'Domanda 1?', answer: 'Risposta 1.' },
      { question: 'Domanda 2?', answer: 'Risposta 2.' }
    ]);

    const script = doc.getElementById('faq-schema') as HTMLScriptElement;
    expect(script).toBeTruthy();
    const data = JSON.parse(script.text);
    expect(data['@type']).toBe('FAQPage');
    expect(data.mainEntity.length).toBe(2);
    expect(data.mainEntity[0].name).toBe('Domanda 1?');
    expect(data.mainEntity[0].acceptedAnswer.text).toBe('Risposta 1.');
  });

  it('dovrebbe iniettare lo schema BreadcrumbList', () => {
    service.injectBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Servizi', url: '/servizi' }
    ]);

    const script = doc.getElementById('breadcrumb-schema') as HTMLScriptElement;
    expect(script).toBeTruthy();
    const data = JSON.parse(script.text);
    expect(data['@type']).toBe('BreadcrumbList');
    expect(data.itemListElement.length).toBe(2);
    expect(data.itemListElement[0].position).toBe(1);
    expect(data.itemListElement[0].item).toBe('https://antonioagrustisrls.com/');
    expect(data.itemListElement[1].position).toBe(2);
    expect(data.itemListElement[1].item).toBe('https://antonioagrustisrls.com/servizi');
  });
});
