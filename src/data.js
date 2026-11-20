export const CATEGORIES = [
  { id: 'all', name: 'Home', icon: 'Sparkles', count: 24 },
  { id: 'kitchen', name: 'Kitchen', icon: 'UtensilsCrossed', count: 8 },
  { id: 'home', name: 'Home & Living', icon: 'Lamp', count: 6 },
  { id: 'storage', name: 'Storage', icon: 'Package', count: 7 },
  { id: 'cleaning', name: 'Cleaning', icon: 'Sparkles', count: 4 },
  { id: 'decor', name: 'Decor', icon: 'Sparkles', count: 5 },
  { id: 'offers', name: 'Offers', icon: 'Flame', count: 6, badge: 'Up to -40%' }
];

export const PRODUCTS = [
  {
    id: 1,
    sku: 'KU-0142',
    name: 'Glass Food Storage Set (5 pcs)',
    category: 'kitchen',
    price: 19.90,
    oldPrice: 24.90,
    discountBadge: '-20%',
    rating: 4.7,
    reviews: 124,
    badge: 'Best Seller',
    stock: 85,
    image: 'https://images.unsplash.com/photo-1584990347449-3995f32a7629?auto=format&fit=crop&w=800&q=80',
    description: 'Set enësh qelqi me kapak hermetik druri, rezistente ndaj nxehtësisë dhe të përshtatshme për furrë, mikrovalë dhe frigorifer.'
  },
  {
    id: 2,
    sku: 'OR-0208',
    name: 'Countertop Organizer Rack',
    category: 'storage',
    price: 24.50,
    oldPrice: null,
    discountBadge: null,
    rating: 4.8,
    reviews: 86,
    badge: 'Popular',
    stock: 64,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    description: 'Organizues metali i zi me dy nivele për erëza, kavanoza dhe aksesorë gatimi në banak apo raft kuzhine.'
  },
  {
    id: 3,
    sku: 'OR-0317',
    name: 'Woven Storage Basket',
    category: 'storage',
    price: 14.90,
    oldPrice: null,
    discountBadge: null,
    rating: 4.6,
    reviews: 72,
    badge: 'Trend',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    description: 'Shportë e punuar me thurje natyrale dhe doreza anësore. Ideale për ruajtje, banjo apo dhomën e ndenjes.'
  },
  {
    id: 4,
    sku: 'KU-0512',
    name: 'Ceramic Dinnerware Set (16 pcs)',
    category: 'dining',
    price: 32.00,
    oldPrice: null,
    discountBadge: null,
    rating: 4.7,
    reviews: 62,
    badge: 'New',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    description: 'Set modern qeramike me pjata, tasa dhe filxhanë me ngjyrë neutrale elegante.'
  },
  {
    id: 5,
    sku: 'PA-0105',
    name: 'Amber Glass Spray Bottles Set (3 pcs)',
    category: 'cleaning',
    price: 12.99,
    oldPrice: 16.99,
    discountBadge: '-24%',
    rating: 4.8,
    reviews: 37,
    badge: 'Eco Friendly',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
    description: 'Shishe spërkatëse qelqi të ripërdorshme me mekanizëm cilësor për pastrim ekologjik të shtëpisë.'
  },
  {
    id: 6,
    sku: 'KU-0312',
    name: 'Stainless Steel Cookware Set (4 pcs)',
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
    name: 'Minimalist Ceramic Vase',
    category: 'decor',
    price: 16.99,
    oldPrice: null,
    discountBadge: null,
    rating: 5.0,
    reviews: 29,
    badge: 'New Collection',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Vazë qeramike me linja minimaliste moderne dhe sipërfaqe të teksturuar për lule natyrale apo degëza dekorative.'
  },
  {
    id: 8,
    sku: 'SH-0155',
    name: 'Acacia Wood Cutting & Serving Board',
    category: 'home',
    price: 18.50,
    oldPrice: 22.00,
    discountBadge: '-16%',
    rating: 4.9,
    reviews: 44,
    badge: 'Natural Wood',
    stock: 38,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Drur i trajtuar me vaj mineral të sigurt për ushqim, e përshtatshme për prerje dhe servirje.'
  }
];

export const CATEGORY_CARDS = [
  {
    id: 'kitchen',
    title: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'storage',
    title: 'Storage',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cleaning',
    title: 'Cleaning',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'dining',
    title: 'Dining',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'decor',
    title: 'Decor',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80'
  }
];
