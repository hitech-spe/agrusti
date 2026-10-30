import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TermsComponent } from './terms';
import { SeoService } from '../../services/seo.service';

describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: any;
  let seoService: SeoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermsComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SeoService);
  });

  it('dovrebbe istanziare correttamente TermsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe configurare i meta SEO e breadcrumbs all\'avvio', () => {
    const seoSpy = vi.spyOn(seoService, 'updateMeta');
    const breadcrumbSpy = vi.spyOn(seoService, 'injectBreadcrumbSchema');

    fixture.detectChanges();

    expect(seoSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Termini|Terms/),
      expect.any(String),
      '/termini-e-condizioni'
    );
    expect(breadcrumbSpy).toHaveBeenCalled();
  });
});
