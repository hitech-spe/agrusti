export type ProjectCategory = 'flooring' | 'renovations' | 'roof';

export interface ProjectItem {
  id: string;
  folder: string;
  category: ProjectCategory;
  categoryLabelIt: string;
  categoryLabelEn: string;
  titleIt: string;
  titleEn: string;
  descriptionIt: string;
  descriptionEn: string;
  coverImage: string;
  images: string[];
  tagsIt: string[];
  tagsEn: string[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'parquet-rovere-naturale',
    folder: 'parquet ROVERE NATURALE spina italiana',
    category: 'flooring',
    categoryLabelIt: 'Posa Parquet',
    categoryLabelEn: 'Parquet Flooring',
    titleIt: 'Parquet Rovere Naturale a Spina Italiana',
    titleEn: 'Natural Oak Parquet Italian Herringbone',
    descriptionIt:
      'Posa artigianale a spina italiana di parquet in rovere naturale con finitura satinata protettiva. Il disegno geometrico classico esalta la luminosità, il pregio materico e l’eleganza sartoriale degli interni.',
    descriptionEn:
      'Masterful Italian herringbone installation of natural oak parquet with a protective satin finish. The classic geometric pattern amplifies natural light, texture, and bespoke interior elegance.',
    coverImage: 'assets/images/parquet%20ROVERE%20NATURALE%20spina%20italiana/img1.jpeg',
    images: [
      'assets/images/parquet%20ROVERE%20NATURALE%20spina%20italiana/img1.jpeg',
      'assets/images/parquet%20ROVERE%20NATURALE%20spina%20italiana/img2.jpeg',
      'assets/images/parquet%20ROVERE%20NATURALE%20spina%20italiana/img3.jpeg',
      'assets/images/parquet%20ROVERE%20NATURALE%20spina%20italiana/img4.jpeg',
      'assets/images/parquet%20ROVERE%20NATURALE%20spina%20italiana/img5.jpeg'
    ],
    tagsIt: ['Spina Italiana', 'Rovere Naturale', 'Finitura Satinata'],
    tagsEn: ['Italian Herringbone', 'Natural Oak', 'Satin Finish']
  },
  {
    id: 'parquet-rovere-cognac',
    folder: 'ROVERE Cognac scelta rustica spina italiana',
    category: 'flooring',
    categoryLabelIt: 'Posa Parquet',
    categoryLabelEn: 'Parquet Flooring',
    titleIt: 'Parquet Rovere Cognac Rustico a Spina Italiana',
    titleEn: 'Rustic Cognac Oak Italian Herringbone',
    descriptionIt:
      'Posa geometrica a spina italiana in rovere tonalità cognac con nodi a vista in scelta rustica. Una combinazione calda e sofisticata che sposa il fascino della tradizione con il design contemporaneo.',
    descriptionEn:
      'Refined Italian herringbone layout in warm cognac oak featuring visible rustic knots, blending traditional warmth with prestigious contemporary aesthetics.',
    coverImage: 'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img1.jpeg',
    images: [
      'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img1.jpeg',
      'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img2.jpeg',
      'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img3.jpeg',
      'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img4.jpeg',
      'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img5.jpeg',
      'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img6.jpeg',
      'assets/images/ROVERE%20Cognac%20scelta%20rustica%20spina%20italiana/img7.jpeg'
    ],
    tagsIt: ['Spina Italiana', 'Rovere Cognac', 'Scelta Rustica'],
    tagsEn: ['Italian Herringbone', 'Cognac Oak', 'Rustic Grade']
  },
  {
    id: 'parquet-rovere-scuro-piallato',
    folder: 'ROVERE Scuro scelta rustica piallato',
    category: 'flooring',
    categoryLabelIt: 'Posa Parquet',
    categoryLabelEn: 'Parquet Flooring',
    titleIt: 'Parquet Rovere Scuro Piallato a Mano',
    titleEn: 'Hand-Planed Dark Rustic Oak Parquet',
    descriptionIt:
      'Posa a correre a corridoio continuo con listoni in rovere scuro finemente piallati a mano. La lavorazione superficiale crea riflessi unici alla luce e una sensazione tattile calda e confortevole.',
    descriptionEn:
      'Continuous running plank installation of dark oak featuring hand-planed surface craftsmanship, accentuating grain depth and an authentic tactile experience.',
    coverImage: 'assets/images/ROVERE%20Scuro%20scelta%20rustica%20piallato/img1.jpeg',
    images: [
      'assets/images/ROVERE%20Scuro%20scelta%20rustica%20piallato/img1.jpeg',
      'assets/images/ROVERE%20Scuro%20scelta%20rustica%20piallato/img2.jpeg',
      'assets/images/ROVERE%20Scuro%20scelta%20rustica%20piallato/img3.jpeg',
      'assets/images/ROVERE%20Scuro%20scelta%20rustica%20piallato/img4.jpeg'
    ],
    tagsIt: ['Piallato a Mano', 'Rovere Scuro', 'Tavola Grande'],
    tagsEn: ['Hand-Planed', 'Dark Oak', 'Wide Planks']
  },
  {
    id: 'posa-spc-scuro-sughero',
    folder: 'Posa SPC Scuro con tappeto di sughero incorporato',
    category: 'flooring',
    categoryLabelIt: 'Pavimenti SPC',
    categoryLabelEn: 'SPC Flooring',
    titleIt: 'Pavimento SPC Scuro con Materassino in Sughero',
    titleEn: 'Dark SPC Flooring with Integrated Cork Underlayment',
    descriptionIt:
      'Posa flottante con giunzione a secco di pavimento vinilico rigido SPC ad alta resistenza con materassino acustico in sughero incorporato. Impermeabile al 100%, fonoassorbente e ideale per qualsiasi ambiente.',
    descriptionEn:
      'Precision click-lock floating installation of high-durability rigid core SPC flooring with built-in natural cork underlayment for superior acoustics and complete water resistance.',
    coverImage: 'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img1.jpeg',
    images: [
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img1.jpeg',
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img2.jpeg',
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img3.jpeg',
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img4.jpeg',
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img5.jpeg',
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img6.jpeg',
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img7.jpeg',
      'assets/images/Posa%20SPC%20Scuro%20con%20tappeto%20di%20sughero%20incorporato/img8.jpeg'
    ],
    tagsIt: ['SPC Rigido', 'Materassino in Sughero', '100% Idrorepellente'],
    tagsEn: ['Rigid SPC', 'Cork Underlayment', '100% Waterproof']
  },
  {
    id: 'posa-gres-scala-esterna',
    folder: 'Posa gres su scala esterna',
    category: 'flooring',
    categoryLabelIt: 'Pavimenti Esterni',
    categoryLabelEn: 'Outdoor Flooring',
    titleIt: 'Rivestimento Scala Esterna in Gres Porcellanato',
    titleEn: 'Outdoor Staircase Porcelain Stoneware Tiling',
    descriptionIt:
      'Rivestimento a regola d’arte di scala esterna e pianerottolo con piastrelle in gres porcellanato ingelivo e antiscivolo. Giunzioni millimetriche, alzata e pedata curate nei minimi dettagli per durare nel tempo.',
    descriptionEn:
      'Complete cladding of outdoor staircase and landings using frost-proof, non-slip porcelain stoneware with precision joint alignments and weather-resistant edge finishing.',
    coverImage: 'assets/images/Posa%20gres%20su%20scala%20esterna/img1.jpeg',
    images: [
      'assets/images/Posa%20gres%20su%20scala%20esterna/img1.jpeg',
      'assets/images/Posa%20gres%20su%20scala%20esterna/img2.jpeg',
      'assets/images/Posa%20gres%20su%20scala%20esterna/img3.jpeg',
      'assets/images/Posa%20gres%20su%20scala%20esterna/img4.jpeg',
      'assets/images/Posa%20gres%20su%20scala%20esterna/img5.jpeg'
    ],
    tagsIt: ['Gres Ingelivo', 'Antiscivolo R11', 'Scala Esterna'],
    tagsEn: ['Frost-Proof Stoneware', 'Non-Slip R11', 'Outdoor Staircase']
  },
  {
    id: 'ristrutturazione-bagno-doccia-filo-pavimento',
    folder: 'Posa gres effetto legno + rivestimento e piatto doccia filo pavimento',
    category: 'renovations',
    categoryLabelIt: 'Ristrutturazioni',
    categoryLabelEn: 'Renovations',
    titleIt: 'Ristrutturazione Bagno con Piatto Doccia a Filo Pavimento',
    titleEn: 'Bathroom Renovation with Flush-Floor Shower Tray',
    descriptionIt:
      'Ristrutturazione completa dell’ambiente bagno con posa di gres porcellanato effetto legno, rivestimenti a parete verticali contemporanei e realizzazione di piatto doccia su misura filo pavimento senza dislivelli.',
    descriptionEn:
      'Complete bathroom remodel featuring natural wood-look porcelain stoneware flooring, modern full-height wall tiling, and an artisan-crafted flush-floor walk-in shower.',
    coverImage: 'assets/images/Posa%20gres%20effetto%20legno%20+%20rivestimento%20e%20piatto%20doccia%20filo%20pavimento/img1.jpeg',
    images: [
      'assets/images/Posa%20gres%20effetto%20legno%20+%20rivestimento%20e%20piatto%20doccia%20filo%20pavimento/img1.jpeg',
      'assets/images/Posa%20gres%20effetto%20legno%20+%20rivestimento%20e%20piatto%20doccia%20filo%20pavimento/img2.jpeg',
      'assets/images/Posa%20gres%20effetto%20legno%20+%20rivestimento%20e%20piatto%20doccia%20filo%20pavimento/img3.jpeg'
    ],
    tagsIt: ['Doccia Filo Pavimento', 'Gres Effetto Legno', 'Ristrutturazione Bagno'],
    tagsEn: ['Flush-Floor Shower', 'Wood-Look Stoneware', 'Bathroom Remodeling']
  },
  {
    id: 'realizzazione-divisori-interni',
    folder: 'Realizzazione divisori App Mottola',
    category: 'renovations',
    categoryLabelIt: 'Ristrutturazioni',
    categoryLabelEn: 'Renovations',
    titleIt: 'Realizzazione Tramezzi e Pareti Divisorie Interne',
    titleEn: 'Interior Partition Walls & Structural Divisions',
    descriptionIt:
      'Intervento edile per la nuova distribuzione degli spazi interni con costruzione di pareti divisorie e tramezzi in blocchi forati, aperture porte e predisposizioni murarie per l’impiantistica chiavi in mano.',
    descriptionEn:
      'Interior architectural restructuring featuring the construction of partition walls, doorway openings, and precise on-site preparation for electrical and plumbing conduits.',
    coverImage: 'assets/images/Realizzazione%20divisori%20App%20Mottola/img1.jpeg',
    images: [
      'assets/images/Realizzazione%20divisori%20App%20Mottola/img1.jpeg',
      'assets/images/Realizzazione%20divisori%20App%20Mottola/img2.jpeg',
      'assets/images/Realizzazione%20divisori%20App%20Mottola/img3.jpeg',
      'assets/images/Realizzazione%20divisori%20App%20Mottola/img4.jpeg',
      'assets/images/Realizzazione%20divisori%20App%20Mottola/img5.jpeg'
    ],
    tagsIt: ['Opere Murarie', 'Tramezzature Interne', 'Riorganizzazione Spazi'],
    tagsEn: ['Masonry Works', 'Interior Partitions', 'Space Reconfiguration']
  },
  {
    id: 'impermeabilizzazione-scala-sikalast',
    folder: 'Impermeabilizzazione scala esterna SIKALAST',
    category: 'roof',
    categoryLabelIt: 'Impermeabilizzazioni',
    categoryLabelEn: 'Waterproofing',
    titleIt: 'Impermeabilizzazione Continua con Sistema Sikalastic',
    titleEn: 'Continuous Waterproofing with Sikalastic System',
    descriptionIt:
      'Applicazione a regola d’arte di membrana liquida elastomerica certificata Sikalastic su scala esterna. Sigillatura totale dei giunti contro infiltrazioni di pioggia, gelo e degrado strutturale.',
    descriptionEn:
      'Application of certified elastomeric liquid membrane (Sikalastic) on outdoor stairs. Complete sealing of joints to prevent moisture infiltration, freeze-thaw damage, and structural degradation.',
    coverImage: 'assets/images/Impermeabilizzazione%20scala%20esterna%20SIKALAST/img1.jpeg',
    images: [
      'assets/images/Impermeabilizzazione%20scala%20esterna%20SIKALAST/img1.jpeg',
      'assets/images/Impermeabilizzazione%20scala%20esterna%20SIKALAST/img2.jpeg'
    ],
    tagsIt: ['Sistema Sikalastic', 'Impermeabilizzazione', 'Protezione Antiriflusso'],
    tagsEn: ['Sikalastic System', 'Waterproofing', 'Moisture Barrier']
  }
];
