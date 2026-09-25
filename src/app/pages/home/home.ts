import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../services/translate.pipe';
import { SeoService } from '../../services/seo.service';
import { BUSINESS_INFO } from '../../config/business-info';

export interface ProjectItem {
  id: number;
  categoryIt: string;
  categoryEn: string;
  categoryType: 'flooring' | 'renovations' | 'roof';
  titleIt: string;
  titleEn: string;
  location: string;
  iconType: 'flooring' | 'renovations' | 'roof';
  placeholderClass: string;
}

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

  // List of Projects (Configured dynamically as a Signal)
  private projectsSignal = signal<ProjectItem[]>([
    {
      id: 1,
      categoryIt: 'Ristrutturazioni',
      categoryEn: 'Turnkey Renovations',
      categoryType: 'renovations',
      titleIt: "Ristrutturazione d'Interni Villa",
      titleEn: "Villa Interior Renovation",
      location: 'Noci (BA)',
      iconType: 'renovations',
      placeholderClass: 'renovations-item'
    },
    {
      id: 2,
      categoryIt: 'Posa Pavimenti',
      categoryEn: 'Flooring Installation',
      categoryType: 'flooring',
      titleIt: 'Cortile in Pietra Naturale',
      titleEn: 'Natural Stone Courtyard',
      location: 'Alberobello (BA)',
      iconType: 'flooring',
      placeholderClass: 'flooring-item'
    },
    {
      id: 3,
      categoryIt: 'Trattamenti Lastrico Solare',
      categoryEn: 'Flat Roof Treatments',
      categoryType: 'roof',
      titleIt: 'Impermeabilizzazione & Isolamento',
      titleEn: 'Waterproofing & Insulation',
      location: 'Putignano (BA)',
      iconType: 'roof',
      placeholderClass: 'roof-item'
    },
    {
      id: 4,
      categoryIt: 'Ristrutturazioni',
      categoryEn: 'Turnkey Renovations',
      categoryType: 'renovations',
      titleIt: 'Ristrutturazione Interna Chiavi in Mano',
      titleEn: 'Turnkey Interior Renovation',
      location: 'Bari (BA)',
      iconType: 'renovations',
      placeholderClass: 'renovations-item'
    },
    {
      id: 5,
      categoryIt: 'Posa Pavimenti',
      categoryEn: 'Flooring Installation',
      categoryType: 'flooring',
      titleIt: 'Parquet Rovere Massello',
      titleEn: 'Solid Oak Parquet',
      location: 'Locorotondo (BA)',
      iconType: 'flooring',
      placeholderClass: 'parquet-item'
    },
    {
      id: 6,
      categoryIt: 'Posa Pavimenti',
      categoryEn: 'Flooring Installation',
      categoryType: 'flooring',
      titleIt: 'Rifacimento Cortile in Autobloccanti',
      titleEn: 'Interlocking Pavers Courtyard',
      location: 'Noci (BA)',
      iconType: 'flooring',
      placeholderClass: 'flooring-item'
    }
  ]);

  // Reactive Computed Filter Signal (Recalculates instantly upon category change!)
  protected filteredProjects = computed(() => {
    const category = this.selectedCategory();
    if (category === 'all') {
      return this.projectsSignal();
    }
    return this.projectsSignal().filter(p => p.categoryType === category);
  });

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

  protected toggleFaq(index: number): void {
    this.openFaqIndex.update(current => current === index ? null : index);
  }

  protected isIt(): boolean {
    return this.translationService.currentLang() === 'it';
  }
}
