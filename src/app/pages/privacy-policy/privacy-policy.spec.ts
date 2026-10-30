import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy';
import { SeoService } from '../../services/seo.service';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: any;
  let seoService: SeoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    seoService = TestBed.inject(SeoService);
  });

  it('dovrebbe istanziare correttamente PrivacyPolicyComponent', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe configurare i meta SEO e breadcrumbs all\'avvio', () => {
    const seoSpy = vi.spyOn(seoService, 'updateMeta');
    const breadcrumbSpy = vi.spyOn(seoService, 'injectBreadcrumbSchema');

    fixture.detectChanges();

    expect(seoSpy).toHaveBeenCalledWith(
      expect.stringContaining('Privacy'),
      expect.any(String),
      '/privacy-policy'
    );
    expect(breadcrumbSpy).toHaveBeenCalled();
  });
});
