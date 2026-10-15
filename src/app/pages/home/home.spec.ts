import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home';
import { PROJECTS_DATA } from '../../config/projects-data';

describe('HomeComponent - Galleria Cantieri e Lightbox', () => {
  let component: HomeComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('dovrebbe istanziare correttamente HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('dovrebbe caricare tutti gli 8 progetti da PROJECTS_DATA con immagini e senza campo location', () => {
    expect(PROJECTS_DATA.length).toBe(8);
    for (const proj of PROJECTS_DATA) {
      expect(proj.id).toBeTruthy();
      expect(proj.titleIt).toBeTruthy();
      expect(proj.titleEn).toBeTruthy();
      expect(proj.descriptionIt).toBeTruthy();
      expect(proj.descriptionEn).toBeTruthy();
      expect(proj.coverImage).toBeTruthy();
      expect(proj.images.length).toBeGreaterThan(0);
      expect((proj as any).location).toBeUndefined();
    }
  });

  it('dovrebbe calcolare correttamente il conteggio per categoria', () => {
    const counts = (component as any).categoryCounts();
    expect(counts.all).toBe(8);
    expect(counts.flooring).toBe(5);
    expect(counts.renovations).toBe(2);
    expect(counts.roof).toBe(1);
  });

  it('dovrebbe filtrare i progetti in base alla categoria selezionata', () => {
    (component as any).filterCategory('flooring');
    expect((component as any).filteredProjects().length).toBe(5);

    (component as any).filterCategory('renovations');
    expect((component as any).filteredProjects().length).toBe(2);

    (component as any).filterCategory('roof');
    expect((component as any).filteredProjects().length).toBe(1);

    (component as any).filterCategory('all');
    expect((component as any).filteredProjects().length).toBe(8);
  });

  it('dovrebbe aprire e chiudere il Lightbox correttamente', () => {
    const project = PROJECTS_DATA[0];
    (component as any).openLightbox(project, 1);

    expect((component as any).activeProject()).toBe(project);
    expect((component as any).activeImageIndex()).toBe(1);

    (component as any).closeLightbox();
    expect((component as any).activeProject()).toBeNull();
    expect((component as any).activeImageIndex()).toBe(0);
  });

  it('dovrebbe navigare avanti e indietro tra le immagini nel Lightbox con wrap-around', () => {
    const project = PROJECTS_DATA[0]; // ha 5 immagini (indici 0, 1, 2, 3, 4)
    (component as any).openLightbox(project, 0);

    // Next
    (component as any).nextImage();
    expect((component as any).activeImageIndex()).toBe(1);

    // Set index all'ultima immagine (4)
    (component as any).setImageIndex(4);
    expect((component as any).activeImageIndex()).toBe(4);

    // Next dall'ultima immagine -> torna a 0
    (component as any).nextImage();
    expect((component as any).activeImageIndex()).toBe(0);

    // Prev da 0 -> va all'ultima immagine (4)
    (component as any).prevImage();
    expect((component as any).activeImageIndex()).toBe(4);
  });

  it('dovrebbe gestire le scorciatoie da tastiera (Escape, ArrowRight, ArrowLeft) quando il Lightbox è aperto', () => {
    const project = PROJECTS_DATA[0];
    (component as any).openLightbox(project, 0);

    // ArrowRight
    (component as any).handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect((component as any).activeImageIndex()).toBe(1);

    // ArrowLeft
    (component as any).handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect((component as any).activeImageIndex()).toBe(0);

    // Escape
    (component as any).handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect((component as any).activeProject()).toBeNull();
  });
});
