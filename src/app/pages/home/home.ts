import { Component, inject, OnInit, signal, computed, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';
import { BUSINESS_INFO } from '../../config/business-info';
import { PROJECTS_DATA, ProjectItem, ProjectCategory } from '../../config/projects-data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {
  private translationService = inject(TranslationService);
  private seoService = inject(SeoService);

  // Expose Business Config
  protected businessInfo = BUSINESS_INFO;

  // Selected Filter Category Signal ('all', 'flooring', 'renovations', 'roof')
  protected selectedCategory = signal<string>('all');

  // List of Projects from Centralized Config
  protected projects = signal<ProjectItem[]>(PROJECTS_DATA);

  // Dynamic Category Counts for Filter Tabs
  protected categoryCounts = computed(() => {
    const list = this.projects();
    return {
      all: list.length,
      flooring: list.filter(p => p.category === 'flooring').length,
      renovations: list.filter(p => p.category === 'renovations').length,
      roof: list.filter(p => p.category === 'roof').length
    };
  });

  // Reactive Computed Filter Signal
  protected filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.projects();
    }
    return this.projects().filter(p => p.category === category);
  });

  // Lightbox Modal State Signals
  protected activeProject = signal<ProjectItem | null>(null);
  protected activeImageIndex = signal<number>(0);

  // FAQ Accordion State (Signals based)
  protected openFaqIndex = signal<number | null>(null);

  protected faqs = [
    {
      questionIt: 'Quali tipologie di pavimenti posate?',
      questionEn: 'What types of flooring do you install?',
      answerIt: 'Posiamo pavimenti in pietra naturale e materiali lapidei; legno massello, multistrato, laminati e SPC; pavimentazioni autobloccanti in cemento, pietra e WPC (legno per esterno).',
      answerEn: 'We install natural stone and masonry flooring; solid wood, engineered multi-layer wood, laminate, and SPC; interlocking pavers in concrete, stone, and WPC (outdoor composite wood).'
    },
    {
      questionIt: 'Cosa si intende per ristrutturazione "chiavi in mano"?',
      questionEn: 'What does "turnkey renovation" mean?',
      answerIt: 'Significa che gestiamo noi l’intero cantiere dalle demolizioni iniziali fino alle finiture di pregio e alla consegna finale. Avrai un unico interlocutore (Antonio Agrusti) senza doverti preoccupare di coordinare le parti edili ed impiantistiche.',
      answerEn: 'It means we manage the entire site from initial demolition to premium finishes and final handover. You will have a single point of contact (Antonio Agrusti) without having to worry about coordinating building works and technical installations.'
    },
    {
      questionIt: 'Effettuate sopralluoghi e preventivi gratuiti?',
      questionEn: 'Do you offer free quotes and site surveys?',
      answerIt: 'Assolutamente sì. Effettuiamo un sopralluogo tecnico dettagliato per analizzare lo stato dell’opera e ti forniamo un preventivo chiaro, trasparente e senza alcun impegno.',
      answerEn: 'Absolutely. We perform a thorough technical site survey to analyze the current state of the property and provide a clear, transparent, no-obligation estimate.'
    },
    {
      questionIt: 'Quali trattamenti eseguite sul lastrico solare?',
      questionEn: 'What treatments do you perform on flat roofs?',
      answerIt: 'Eseguiamo impermeabilizzazioni professionali con guaine certificate, ripristino delle pendenze per lo scorrimento dell’acqua e isolamento termico avanzato per migliorare l’efficienza energetica dell’edificio.',
      answerEn: 'We perform professional waterproofing with certified membranes, restore roof slopes for water drainage, and install state-of-the-art thermal insulation to boost energy efficiency.'
    }
  ];

  ngOnInit(): void {
    const isIt = this.translationService.currentLang() === 'it';
    const title = isIt
      ? 'Posa Pavimenti e Ristrutturazioni Chiavi in Mano'
      : 'Floor Laying and Turnkey Renovations';
    const description = isIt
      ? `${BUSINESS_INFO.name} dal 2014 realizza posa pavimenti in pietra, legno e autobloccanti, e ristrutturazioni edili complete chiavi in mano in Puglia.`
      : `${BUSINESS_INFO.name} since 2014 specializes in professional flooring (stone, wood, interlocking pavers) and complete turnkey building renovations.`;

    this.seoService.updateMeta(title, description, '/');
    this.seoService.injectLocalBusinessSchema();
  }

  protected filterCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  // Lightbox Controls
  protected openLightbox(project: ProjectItem, index = 0): void {
    this.activeProject.set(project);
    this.activeImageIndex.set(index);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  protected closeLightbox(): void {
    this.activeProject.set(null);
    this.activeImageIndex.set(0);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  protected nextImage(): void {
    const proj = this.activeProject();
    if (!proj) return;
    const nextIdx = (this.activeImageIndex() + 1) % proj.images.length;
    this.activeImageIndex.set(nextIdx);
  }

  protected prevImage(): void {
    const proj = this.activeProject();
    if (!proj) return;
    const prevIdx = (this.activeImageIndex() - 1 + proj.images.length) % proj.images.length;
    this.activeImageIndex.set(prevIdx);
  }

  protected setImageIndex(index: number): void {
    const proj = this.activeProject();
    if (!proj || index < 0 || index >= proj.images.length) return;
    this.activeImageIndex.set(index);
  }

  @HostListener('window:keydown', ['$event'])
  protected handleKeyDown(event: KeyboardEvent): void {
    if (!this.activeProject()) return;

    if (event.key === 'Escape') {
      this.closeLightbox();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }

  protected toggleFaq(index: number): void {
    this.openFaqIndex.update(current => current === index ? null : index);
  }

  protected isIt(): boolean {
    return this.translationService.currentLang() === 'it';
  }
}
