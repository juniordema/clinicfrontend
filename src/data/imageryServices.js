/**
 * Données des services d'imagerie médicale
 */

export const imageryServices = [
  {
    id: 1,
    name: 'Radiologie Générale',
    nameEn: 'General Radiology',
    icon: 'fas fa-x-ray',
    description: 'Radiographies ossieuses, pulmonaires et abdominales',
    descriptionEn: 'Bone, chest and abdominal X-rays',
    equipment: 'Système radiographique numérique haute résolution',
    equipmentEn: 'High-resolution digital radiography system',
    benefits: [
      'Diagnostic rapide',
      'Faible radiation',
      'Résultats immédiats',
      'Technologie moderne'
    ],
    benefitsEn: ['Fast diagnosis', 'Low radiation', 'Immediate results', 'Modern technology']
  },
  {
    id: 2,
    name: 'Échographie',
    nameEn: 'Ultrasound',
    icon: 'fas fa-heart',
    description: 'Échographie cardiaque, abdominale, pelvienne et mammaire',
    descriptionEn: 'Cardiac, abdominal, pelvic and breast ultrasound',
    equipment: 'Échographe Doppler couleur haute performance',
    equipmentEn: 'High-performance color Doppler ultrasound unit',
    benefits: [
      'Pas de radiation',
      'Temps réel',
      'Non invasive',
      'Très précise'
    ],
    benefitsEn: ['No radiation', 'Real-time', 'Non-invasive', 'Highly accurate']
  },
  {
    id: 3,
    name: 'Scanner (CT)',
    nameEn: 'CT Scan',
    icon: 'fas fa-cube',
    description: 'Tomodensitométrie pour diagnostics complexes',
    descriptionEn: 'Computed tomography for complex diagnoses',
    equipment: 'Scanner 16 coupes dernière génération',
    equipmentEn: 'Latest-generation 16-slice CT scanner',
    benefits: [
      'Très haute résolution',
      'Reconstruction 3D',
      'Diagnostic précis',
      'Rapide et confortable'
    ],
    benefitsEn: ['Very high resolution', '3D reconstruction', 'Accurate diagnosis', 'Fast and comfortable']
  },
  {
    id: 4,
    name: 'IRM',
    icon: 'fas fa-brain',
    description: 'Imagerie par résonance magnétique - Cerveau, colonne, articulations',
    descriptionEn: 'Magnetic resonance imaging for brain, spine and joints',
    equipment: 'IRM 1.5 Tesla avec technologie avancée',
    equipmentEn: '1.5 Tesla MRI with advanced technology',
    benefits: [
      'Sans radiation',
      'Très détaillée',
      'Contraste excellent',
      'Contraste injecté optionnel'
    ],
    benefitsEn: ['No radiation', 'Highly detailed', 'Excellent contrast', 'Optional contrast injection']
  },
  {
    id: 5,
    name: 'Mammographie',
    nameEn: 'Mammography',
    icon: 'fas fa-ribbon',
    description: 'Dépistage et diagnostic du cancer du sein',
    descriptionEn: 'Breast cancer screening and diagnosis',
    equipment: 'Mammographe numérique 3D (Tomosynthèse)',
    equipmentEn: '3D digital mammography system (tomosynthesis)',
    benefits: [
      'Détection précoce',
      'Faible dose',
      'Précision accrue',
      'Pour tous les âges'
    ],
    benefitsEn: ['Early detection', 'Low dose', 'Greater precision', 'For all ages']
  },
  {
    id: 6,
    name: 'Radiologie Dentaire',
    nameEn: 'Dental Radiology',
    icon: 'fas fa-tooth',
    description: 'Radiographies dentaires panoramiques et intra-orales',
    descriptionEn: 'Panoramic and intraoral dental X-rays',
    equipment: 'Radiographe dentaire numérique panoramique',
    equipmentEn: 'Digital panoramic dental X-ray system',
    benefits: [
      'Haute résolution',
      'Très peu de radiation',
      'Images immédiatement',
      'Vision 3D optionnelle'
    ],
    benefitsEn: ['High resolution', 'Very low radiation', 'Immediate images', 'Optional 3D view']
  },
  {
    id: 7,
    name: 'Ostéodensitométrie',
    nameEn: 'Bone Densitometry',
    icon: 'fas fa-bone',
    description: 'Mesure de la densité osseuse (dépistage ostéoporose)',
    descriptionEn: 'Bone density measurement for osteoporosis screening',
    equipment: 'Densitomètre osseux DEXA',
    equipmentEn: 'DEXA bone densitometer',
    benefits: [
      'Dépistage précoce',
      'Très faible radiation',
      'Résultat immédiat',
      'Suivi facile'
    ],
    benefitsEn: ['Early screening', 'Very low radiation', 'Immediate results', 'Easy follow-up']
  },
  {
    id: 8,
    name: 'Fluoroscopie',
    nameEn: 'Fluoroscopy',
    icon: 'fas fa-circle-radiation',
    description: 'Imagerie en temps réel pour interventions guidées',
    descriptionEn: 'Real-time imaging for guided procedures',
    equipment: 'Système de fluoroscopie numériqueavancé',
    equipmentEn: 'Advanced digital fluoroscopy system',
    benefits: [
      'Guidage précis',
      'Temps réel',
      'Pour les gestes',
      'Technologie moderne'
    ],
    benefitsEn: ['Precise guidance', 'Real-time', 'Procedure support', 'Modern technology']
  }
]
