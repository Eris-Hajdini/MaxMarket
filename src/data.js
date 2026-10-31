export const CATEGORIES = [
  { id: 'all', name: 'Gjithë Produktet', icon: 'Sparkles', count: 24 },
  { id: 'kitchen', name: 'Kuzhinë & Enë', icon: 'UtensilsCrossed', count: 8 },
  { id: 'bedding', name: 'Tekstil & Fjetje', icon: 'BedDouble', count: 6 },
  { id: 'decor', name: 'Dekor & Living', icon: 'Lamp', count: 5 },
  { id: 'bath', name: 'Banjë & Spa', icon: 'Bath', count: 3 },
  { id: 'offers', name: 'Ofertat Max', icon: 'Flame', count: 4, badge: 'Deri -50%' }
];

export const PRODUCTS = [
  {
    id: 1,
    name: 'Set Pjatash Porcelani Royal Imperial (24 copë)',
    category: 'kitchen',
    price: 89.90,
    oldPrice: 129.90,
    rating: 4.9,
    reviews: 42,
    badge: 'Më e Shitura',
    image: 'https://images.unsplash.com/photo-1614088445129-843c085e6834?auto=format&fit=crop&w=800&q=80',
    description: 'Porcelan me cilësi të lartë rezistent ndaj gërvishtjeve, me detaje të arta të punuara me dorë. Perfekt për raste festive dhe përdorim të përditshëm.'
  },
  {
    id: 2,
    name: 'Set Mbulesa Shtrati Pambuku Satina Luxury',
    category: 'bedding',
    price: 49.50,
    oldPrice: 65.00,
    rating: 4.8,
    reviews: 38,
    badge: 'Zbritje',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    description: '100% Pambuk i pastër satina me prekje mëndafshi. Ofron frymëmarrje optimale dhe komoditet maksimal gjatë fjetjes.'
  },
  {
    id: 3,
    name: 'Vazo Dekorative Qeramike Skandinave',
    category: 'decor',
    price: 24.90,
    oldPrice: null,
    rating: 5.0,
    reviews: 19,
    badge: 'Koleksion i Ri',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Dizajn modern minimalist që përshtatet në çdo ambient të sallonit apo zyrës suaj. E punuar me finish mat premium.'
  },
  {
    id: 4,
    name: 'Set Peshqirësh Pambuku Egjiptian Extra Soft (4 copë)',
    category: 'bath',
    price: 32.00,
    oldPrice: 45.00,
    rating: 4.7,
    reviews: 53,
    badge: 'Super Ofertë',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    description: 'Peshqirë me thithshmëri maksimale 600 GSM, jashtëzakonisht të butë dhe rezistent ndaj larjeve të shpeshta.'
  },
  {
    id: 5,
    name: 'Tigan Graniti Non-Stick Kasanova Pro 28cm',
    category: 'kitchen',
    price: 29.99,
    oldPrice: 39.99,
    rating: 4.9,
    reviews: 84,
    badge: 'Top Brend',
    image: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80',
    description: 'Shtresë graniti pa PFOA me ngrohje të njëtrajtshme. Ideale për gatim të shëndetshëm me minimum yndyre.'
  },
  {
    id: 6,
    name: 'Qirinj Aromatik me Dyll Soje & Dru Kedri',
    category: 'decor',
    price: 14.50,
    oldPrice: 18.00,
    rating: 4.9,
    reviews: 27,
    badge: 'Organike',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    description: 'Aromë qetësuese me kohëzgjatje deri në 45 orë djegieje të pastër me fitil druri.'
  },
  {
    id: 7,
    name: 'Set Filxhana Kafeje / Çaji prej Kristali me Buzë Ari',
    category: 'kitchen',
    price: 36.00,
    oldPrice: 48.00,
    rating: 5.0,
    reviews: 61,
    badge: 'Ekskluzive',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    description: 'Elegancë e pashembullt për çdo pasdite me miqtë. Punuar me kristal të temperuar dhe linja moderne.'
  },
  {
    id: 8,
    name: 'Jorgan Dimëror Mikrofibër Ultra-Warm 200x220cm',
    category: 'bedding',
    price: 58.00,
    oldPrice: 79.00,
    rating: 4.8,
    reviews: 35,
    badge: 'Sezonale',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&w=800&q=80',
    description: 'I lehtë, hipoalergjik dhe me izolim termik të jashtëzakonshëm për netët e ftohta.'
  }
];

export const HERO_SLIDES = [
  {
    title: 'Transformoni Shtëpinë Tuaj me MaxMarket',
    subtitle: 'Koleksioni i ri pranverë-verë i tekstilit dhe pajisjeve të kuzhinës nga brendet më prestigjioze.',
    tag: 'KOLEKSIONI 2026',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85',
    cta: 'Zbulo Koleksionin',
    accent: '#E65100'
  },
  {
    title: 'Kuzhina e Ëndrrave me Brendet Italiane',
    subtitle: 'Enë graniti, sete pjatash porcelani dhe aksesorë me zbritje deri në 40%.',
    tag: 'OFERTA SPECIALE',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    cta: 'Bli Tani',
    accent: '#0D47A1'
  },
  {
    title: 'Komoditet dhe Rehati Supreme në Dhomën e Fjetjes',
    subtitle: 'Mbulesa 100% pambuk satina, jastëkë anatomikë dhe mbulesa luksoze.',
    tag: 'EKSKLUZIVE',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1600&q=85',
    cta: 'Shiko Produktet',
    accent: '#2E7D32'
  }
];
