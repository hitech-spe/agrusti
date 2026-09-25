import { TestBed } from '@angular/core/testing';
import { TranslationService, TRANSLATIONS } from './translation.service';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('TranslationService', () => {
  let storageMap: Map<string, string>;

  beforeEach(() => {
    TestBed.resetTestingModule();
    storageMap = new Map<string, string>();

    const mockStorage = {
      getItem: (key: string) => storageMap.get(key) ?? null,
      setItem: (key: string, value: string) => storageMap.set(key, String(value)),
      removeItem: (key: string) => storageMap.delete(key),
      clear: () => storageMap.clear(),
      get length() {
        return storageMap.size;
      },
      key: (index: number) => Array.from(storageMap.keys())[index] ?? null
    };

    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'localStorage', {
        value: mockStorage,
        writable: true,
        configurable: true
      });
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service).toBeTruthy();
  });

  it('should read from localStorage if language is saved', () => {
    window.localStorage.setItem('lang', 'it');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.currentLang()).toBe('it');
  });

  it('should default to English when browser language is English and no storage is saved', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-US');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.currentLang()).toBe('en');
  });

  it('should default to Italian when browser language is Italian and no storage is saved', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('it-IT');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.currentLang()).toBe('it');
  });

  it('should translate keys correctly in Italian', () => {
    window.localStorage.setItem('lang', 'it');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.translate('hero.title')).toBe('Antonio Agrusti SRLS');
    expect(service.translate('hero.title.line1')).toBe("L'ARTE DEL RESTAURO,");
    expect(service.translate('footer.description')).toBe(
      'Dal 2014, esistiamo sul territorio con l’intento di portare avanti un concetto di lavoro fatto di qualità, serietà e soddisfazione per la nostra clientela.'
    );
  });

  it('should toggle language correctly', () => {
    window.localStorage.setItem('lang', 'it');
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.currentLang()).toBe('it');
    service.toggleLanguage();
    expect(service.currentLang()).toBe('en');
    expect(service.translate('nav.about')).toBe('About Us');
    expect(service.translate('hero.title.line1')).toBe('THE ART OF RESTORATION,');
    expect(service.translate('footer.description')).toBe(
      'Since 2014, we have been established in our region with the goal of upholding a philosophy of work built on quality, integrity, and client satisfaction.'
    );
  });

  it('should fallback to the key if translation is missing', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(TranslationService);
    expect(service.translate('missing.key.test')).toBe('missing.key.test');
  });

  it('should have exact key parity between Italian and English dictionaries', () => {
    const itKeys = Object.keys(TRANSLATIONS.it).sort();
    const enKeys = Object.keys(TRANSLATIONS.en).sort();
    expect(itKeys).toEqual(enKeys);
  });
});
