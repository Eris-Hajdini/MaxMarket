export const CATEGORIES = [
  { id: 'all', name: 'Kreu', icon: 'Sparkles', count: 24 },
  { id: 'kitchen', name: 'Kuzhina', icon: 'UtensilsCrossed', count: 8 },
  { id: 'storage', name: 'Organizim & Ruajtje', icon: 'Package', count: 7 },
  { id: 'cleaning', name: 'Pastrimi', icon: 'Sparkles', count: 4 },
  { id: 'dining', name: 'Tavolina & Servirje', icon: 'Utensils', count: 5 },
  { id: 'decor', name: 'Dekori', icon: 'Sparkles', count: 5 },
  { id: 'home', name: 'Shtëpia', icon: 'Lamp', count: 6 },
  { id: 'offers', name: 'Ofertat', icon: 'Flame', count: 6, badge: 'Deri -40%' }
];

export const PRODUCTS = [
  {
    id: 1,
    sku: 'KU-0142',
    name: 'Set enësh qelqi me kapak druri (5 copë)',
    category: 'kitchen',
    price: 19.90,
    oldPrice: 24.90,
    discountBadge: '-20%',
    rating: 4.8,
    reviews: 124,
    badge: 'Më e Shitura',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80',
    description: 'Set enësh qelqi me kapak hermetik druri bambu, rezistente ndaj nxehtësisë dhe të përshtatshme për furrë, mikrovalë dhe frigorifer.'
  },
  {
    id: 2,
    sku: 'OR-0208',
    name: 'Organizues metali për banak me 2 nivele',
    category: 'storage',
    price: 24.50,
    oldPrice: null,
    discountBadge: null,
    rating: 4.8,
    reviews: 86,
    badge: 'Praktike',
    stock: 64,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    description: 'Organizues metali i zi me dy nivele për erëza, kavanoza dhe aksesorë gatimi në banak apo raft kuzhine.'
  },
  {
    id: 3,
    sku: 'OR-0317',
    name: 'Shportë e thurur për ruajtje',
    category: 'storage',
    price: 14.90,
    oldPrice: null,
    discountBadge: null,
    rating: 4.7,
    reviews: 72,
    badge: 'Trend',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    description: 'Shportë e punuar me thurje natyrale dhe doreza anësore. Ideale për ruajtje, banjo apo dhomën e ndenjes.'
  },
  {
    id: 4,
    sku: 'KU-0512',
    name: 'Set pjatash qeramike elegante (16 copë)',
    category: 'dining',
    price: 32.00,
    oldPrice: null,
    discountBadge: null,
    rating: 4.9,
    reviews: 62,
    badge: 'Koleksion i Ri',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    description: 'Set modern qeramike me pjata, tasa dhe filxhanë me ngjyrë neutrale elegante për çdo tryezë.'
  },
  {
    id: 5,
    sku: 'PA-0105',
    name: 'Set shishesh qelqi spërkatëse (3 copë)',
    category: 'cleaning',
    price: 12.99,
    oldPrice: 16.99,
    discountBadge: '-24%',
    rating: 4.8,
    reviews: 37,
    badge: 'Eko Zgjedhje',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
    description: 'Shishe spërkatëse qelqi të ripërdorshme me mekanizëm cilësor për pastrim ekologjik të shtëpisë.'
  },
  {
    id: 6,
    sku: 'KU-0312',
    name: 'Set tenxheresh inoksi cilësor (4 copë)',
    category: 'kitchen',
    price: 54.99,
    oldPrice: 79.99,
    discountBadge: '-31%',
    rating: 5.0,
    reviews: 83,
    badge: 'Premium',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    description: 'Inoks cilësor 18/10 me shpërndarje uniforme të nxehtësisë për të gjitha llojet e pllakave elektrike dhe induksionit.'
  },
  {
    id: 7,
    sku: 'SH-0091',
    name: 'Vazë qeramike dekorative minimaliste',
    category: 'decor',
    price: 16.99,
    oldPrice: null,
    discountBadge: null,
    rating: 5.0,
    reviews: 29,
    badge: 'Dekor',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Vazë qeramike me linja minimaliste moderne dhe sipërfaqe të teksturuar për lule natyrale apo degëza dekorative.'
  },
  {
    id: 8,
    sku: 'SH-0155',
    name: 'Pllakë druri për prerje dhe servirje',
    category: 'home',
    price: 18.50,
    oldPrice: 22.00,
    discountBadge: '-16%',
    rating: 4.9,
    reviews: 44,
    badge: 'Dru Natyral',
    stock: 38,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Drur i trajtuar me vaj mineral të sigurt për ushqim, e përshtatshme për prerje dhe servirje mezeve.'
  }
];

export const CATEGORY_CARDS = [
  {
    id: 'kitchen',
    title: 'Kuzhina',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'storage',
    title: 'Organizim & Ruajtje',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cleaning',
    title: 'Pastrimi',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dining',
    title: 'Tavolina & Servirje',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'decor',
    title: 'Dekori i Shtëpisë',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
  }
];
