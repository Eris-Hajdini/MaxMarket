export const CATEGORIES = [
  { id: 'all', name: 'Të gjitha', icon: 'Sparkles', count: 24 },
  { id: 'kuhinja', name: 'Kuhinja', icon: 'UtensilsCrossed', count: 8 },
  { id: 'organizim', name: 'Organizim & Ruajtje', icon: 'Package', count: 7 },
  { id: 'shtepia', name: 'Shtëpia', icon: 'Lamp', count: 5 },
  { id: 'pastrimi', name: 'Pastrimi', icon: 'Sparkles', count: 4 },
  { id: 'offers', name: 'Në ofertë', icon: 'Flame', count: 6, badge: 'Deri -40%' }
];

export const PRODUCTS = [
  {
    id: 1,
    sku: 'KU-0142',
    name: 'Set enësh qelqi (5 copë)',
    category: 'kuhinja',
    price: 19.99,
    oldPrice: 24.99,
    discountBadge: '-20%',
    rating: 4.9,
    reviews: 48,
    badge: 'Më e Shitura',
    image: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80',
    description: 'Set enësh qelqi me kapak hermetik, rezistente ndaj nxehtësisë dhe të përshtatshme për furrë, mikrovalë dhe frigorifer.'
  },
  {
    id: 2,
    sku: 'OR-0317',
    name: 'Shportë për roba',
    category: 'organizim',
    price: 14.99,
    oldPrice: null,
    discountBadge: null,
    rating: 4.8,
    reviews: 32,
    badge: 'Trend',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    description: 'Shportë e punuar me thurje natyrale dhe rrobë të brendshme pambuku. Ideale për banjo apo dhomën e fjetjes.'
  },
  {
    id: 3,
    sku: 'OR-0208',
    name: 'Organizues kuzhine',
    category: 'organizim',
    price: 22.99,
    oldPrice: null,
    discountBadge: null,
    rating: 4.9,
    reviews: 65,
    badge: 'Praktike',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    description: 'Organizues metali me dy nivele për erëza, vajra dhe aksesorë gatimi në banak apo raft kuzhine.'
  },
  {
    id: 4,
    sku: 'SH-0091',
    name: 'Vazë dekorative',
    category: 'shtepia',
    price: 16.99,
    oldPrice: null,
    discountBadge: null,
    rating: 5.0,
    reviews: 29,
    badge: 'Koleksion i Ri',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Vazë qeramike me linja minimaliste moderne dhe sipërfaqe të teksturuar për lule natyrale apo degëza dekorative.'
  },
  {
    id: 5,
    sku: 'PA-0105',
    name: 'Set shishesh qelqi spërkatëse (3 copë)',
    category: 'pastrimi',
    price: 12.99,
    oldPrice: 16.99,
    discountBadge: '-24%',
    rating: 4.8,
    reviews: 37,
    badge: 'Eko Zgjedhje',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
    description: 'Shishe spërkatëse qelqi të ripërdorshme me mekanizëm premium për solucione pastrimi ekologjike të shtëpisë.'
  },
  {
    id: 6,
    sku: 'KU-0312',
    name: 'Set tiganësh dhe tenxheresh inoksi (4 copë)',
    category: 'kuhinja',
    price: 54.99,
    oldPrice: 79.99,
    discountBadge: '-31%',
    rating: 5.0,
    reviews: 83,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    description: 'Inoks cilësor 18/10 me fund 3-shtresor me shpërndarje uniforme të nxehtësisë për të gjitha llojet e pllakave elektrike dhe induksionit.'
  },
  {
    id: 7,
    sku: 'SH-0155',
    name: 'Pllakë druri për prerje dhe servirje',
    category: 'shtepia',
    price: 18.50,
    oldPrice: 22.00,
    discountBadge: '-16%',
    rating: 4.9,
    reviews: 44,
    badge: 'Dru Natyral',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Drur lisi i trajtuar me vaj mineral të sigurt për ushqim, e përshtatshme për prerje dhe servirje mezeve.'
  },
  {
    id: 8,
    sku: 'PA-0219',
    name: 'Set leckash mikrofibër organike & furçë druri',
    category: 'pastrimi',
    price: 9.99,
    oldPrice: null,
    discountBadge: null,
    rating: 4.7,
    reviews: 19,
    badge: 'Praktike',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=800&q=80',
    description: 'Lecka mikrofibër super-absorbuese për pastrim pa gërvishtje së bashku me furçë druri bambu me fibra natyrale.'
  }
];

export const CATEGORY_CARDS = [
  {
    id: 'kuhinja',
    title: 'Kuhinja',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'organizim',
    title: 'Organizim & Ruajtje',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'shtepia',
    title: 'Shtëpia',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pastrimi',
    title: 'Pastrimi',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80'
  }
];
