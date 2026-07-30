import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
    }
  });

  it('should be created', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service).toBeTruthy();
  });

  it('should read from localStorage if language is saved', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', 'it');
    }
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.currentLang()).toBe('it');
  });

  it('should default to English in jsdom environment when no storage is saved', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    // Since jsdom navigator.language is typically 'en-US', it defaults to 'en'
    expect(service.currentLang()).toBe('en');
  });

  it('should translate keys correctly in Italian', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', 'it');
    }
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.translate('hero.title')).toBe('Antonio Agrusti SRLS');
  });

  it('should toggle language correctly', () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', 'it');
    }
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.currentLang()).toBe('it');
    service.toggleLanguage();
    expect(service.currentLang()).toBe('en');
    expect(service.translate('nav.about')).toBe('About Us');
  });

  it('should fallback to the key if translation is missing', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.translate('missing.key.test')).toBe('missing.key.test');
  });
});
