import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../models/product.model';

const PRODUCTS_KEY = 'ttb_products';

const defaultCatalog: Product[] = [
  {
    id: 'p-01',
    name: 'Wobble Peak Block Set',
    category: 'Building',
    price: 34.99,
    ageRange: '3–6 yrs',
    rating: 4.8,
    description: '120 chunky, rounded blocks in five colorways, built to survive being a tower one minute and a spaceship the next.',
    colorway: '#FFC53D',
    accent: '#8A6300',
    badge: 'Bestseller',
    stock: 24,
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['120 chunky blocks', 'Easy-grip rounded edges', 'Builds towers, bridges, and castles'],
    reviews: [
      { author: 'Priya', rating: 5, comment: 'My son loves stacking and rebuilding it every evening.' },
      { author: 'Amit', rating: 4, comment: 'Good quality and sturdy enough for rough play.' }
    ]
  },
  {
    id: 'p-02',
    name: 'Marshpaw the Bear',
    category: 'Plush',
    price: 22.5,
    ageRange: '0–3 yrs',
    rating: 4.9,
    description: 'A weighted, machine-washable plush bear with a heartbeat stitched into the seams — literally, it is embroidered.',
    colorway: '#FF6FA0',
    accent: '#E84E82',
    badge: 'New',
    stock: 41,
    imageUrl: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1200&q=80'
    ],
    features: ['Machine washable', 'Weighted for cuddly comfort', 'Soft plush with stitched details'],
    reviews: [
      { author: 'Neha', rating: 5, comment: 'Perfect bedtime buddy for my toddler.' },
      { author: 'Rohan', rating: 5, comment: 'Super soft and adorable. Great gift.' }
    ]
  },
  {
    id: 'p-03',
    name: 'Backyard Comet Kite',
    category: 'Outdoor',
    price: 18.0,
    ageRange: '5–10 yrs',
    rating: 4.6,
    description: 'A ripstop nylon kite that catches wind at a whisper, with a tail long enough to feel genuinely dramatic.',
    colorway: '#4FAFE0',
    accent: '#1D6E96',
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'p-04',
    name: 'Tangle Trail 60pc Puzzle',
    category: 'Puzzles',
    price: 14.75,
    ageRange: '4–8 yrs',
    rating: 4.5,
    description: 'An oversized floor puzzle of a jungle river bend — pieces are thick enough to survive a toddler stomp.',
    colorway: '#2FBF9F',
    accent: '#16826A',
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'p-05',
    name: 'Little Chef Market Cart',
    category: 'Pretend Play',
    price: 41.0,
    ageRange: '3–7 yrs',
    rating: 4.7,
    description: 'A felt-and-wood grocery cart with 18 stitched "produce" pieces and a chalkboard price sign.',
    colorway: '#FF7A5A',
    accent: '#C24B2F',
    badge: 'Bestseller',
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'p-06',
    name: 'Rally Dash Trackster',
    category: 'Vehicles',
    price: 27.99,
    ageRange: '4–9 yrs',
    rating: 4.4,
    description: 'A pull-back rally car with real suspension travel — it actually bounces over the door threshold.',
    colorway: '#FFC53D',
    accent: '#8A6300',
    stock: 19,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'p-07',
    name: 'Snuggle Fort Cloud Tent',
    category: 'Pretend Play',
    price: 55.0,
    ageRange: '2–8 yrs',
    rating: 4.9,
    description: 'A pop-up cotton canvas fort shaped like a cloud, with a window flap for supervising the living room.',
    colorway: '#FF6FA0',
    accent: '#E84E82',
    stock: 9,
    imageUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'p-08',
    name: 'Glowpath Night Blocks',
    category: 'Building',
    price: 29.99,
    ageRange: '3–8 yrs',
    rating: 4.6,
    description: 'Glow-in-the-dark building bricks that charge under any lamp and hold their glow past bedtime stories.',
    colorway: '#4FAFE0',
    accent: '#1D6E96',
    badge: 'New',
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'p-09',
    name: 'Otter Family Bath Squirts',
    category: 'Plush',
    price: 12.25,
    ageRange: '1–4 yrs',
    rating: 4.3,
    description: 'Mold-resistant bath toys shaped like a nesting otter family — no trapped water, no mystery mildew.',
    colorway: '#2FBF9F',
    accent: '#16826A',
    stock: 33,
    imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
  },
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private catalog: Product[];

  constructor() {
    this.catalog = this.loadCatalog();
  }

  getAll(): Product[] {
    return [...this.catalog];
  }

  getById(id: string): Product | undefined {
    return this.catalog.find((p) => p.id === id);
  }

  getCategories(): ProductCategory[] {
    return Array.from(new Set(this.catalog.map((p) => p.category))) as ProductCategory[];
  }

  saveProduct(product: Product): Product {
    const existingIndex = this.catalog.findIndex((p) => p.id === product.id);
    if (existingIndex === -1) {
      this.catalog.unshift(product);
    } else {
      this.catalog[existingIndex] = product;
    }
    this.persistCatalog();
    return product;
  }

  addProduct(input: Partial<Product> & Pick<Product, 'name' | 'category' | 'price' | 'description'>): Product {
    const product: Product = {
      id: input.id ?? `p-${Date.now()}`,
      name: input.name,
      category: input.category,
      price: input.price,
      ageRange: input.ageRange ?? '3–6 yrs',
      rating: input.rating ?? 4.7,
      description: input.description,
      colorway: input.colorway ?? this.defaultPalette(input.category).colorway,
      accent: input.accent ?? this.defaultPalette(input.category).accent,
      badge: input.badge ?? 'New',
      stock: input.stock ?? 10,
      imageUrl: input.imageUrl,
    };

    return this.saveProduct(product);
  }

  deleteProduct(id: string): boolean {
    const index = this.catalog.findIndex((product) => product.id === id);
    if (index === -1) {
      return false;
    }

    this.catalog.splice(index, 1);
    this.persistCatalog();
    return true;
  }

  private loadCatalog(): Product[] {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Product[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((product) => this.normalizeProduct(product));
          const needsRefresh = normalized.some((product) => !product.imageUrl || !product.colorway || !product.accent);
          if (needsRefresh) {
            localStorage.setItem(PRODUCTS_KEY, JSON.stringify(normalized));
          }
          return normalized;
        }
      } catch {
        // Ignore invalid saved catalog and fall back to defaults.
      }
    }

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(defaultCatalog));
    return defaultCatalog;
  }

  private persistCatalog(): void {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(this.catalog));
  }

  private normalizeProduct(product: Product): Product {
    const palette = this.defaultPalette(product.category);
    const fallbackImage = this.defaultImage(product.category);
    const gallery = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.imageUrl ?? fallbackImage];

    return {
      ...product,
      id: product.id ?? `p-${Date.now()}`,
      name: product.name ?? 'Toy',
      category: product.category ?? 'Building',
      price: Number(product.price ?? 0),
      ageRange: product.ageRange ?? '3–6 yrs',
      rating: Number(product.rating ?? 4.5),
      description: product.description ?? 'A fun new toy for your collection.',
      colorway: product.colorway ?? palette.colorway,
      accent: product.accent ?? palette.accent,
      stock: Number(product.stock ?? 1),
      badge: product.badge,
      imageUrl: product.imageUrl ?? fallbackImage,
      galleryImages: gallery,
      reviews: product.reviews ?? this.defaultReviews(product.category),
      features: product.features ?? this.defaultFeatures(product.category),
    };
  }

  private defaultPalette(category: ProductCategory): { colorway: string; accent: string } {
    const palette: Record<ProductCategory, { colorway: string; accent: string }> = {
      Building: { colorway: '#FFC53D', accent: '#8A6300' },
      Plush: { colorway: '#FF6FA0', accent: '#E84E82' },
      Outdoor: { colorway: '#4FAFE0', accent: '#1D6E96' },
      Puzzles: { colorway: '#2FBF9F', accent: '#16826A' },
      'Pretend Play': { colorway: '#FF7A5A', accent: '#C24B2F' },
      Vehicles: { colorway: '#FFC53D', accent: '#8A6300' },
    };

    return palette[category];
  }

  private defaultImage(category: ProductCategory): string {
    const images: Record<ProductCategory, string> = {
      Building: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80',
      Plush: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=1200&q=80',
      Outdoor: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80',
      Puzzles: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
      'Pretend Play': 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      Vehicles: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80',
    };

    return images[category];
  }

  private defaultReviews(category: ProductCategory): Array<{ author: string; rating: number; comment: string }> {
    const base = [
      { author: 'Ava', rating: 5, comment: 'My child asks for this every weekend.' },
      { author: 'Sam', rating: 4, comment: 'High quality and a favorite with friends.' },
    ];

    if (category === 'Plush') {
      return [
        { author: 'Nina', rating: 5, comment: 'Soft, comforting, and great for bedtime.' },
        { author: 'Leo', rating: 4, comment: 'Very cuddly and durable.' },
      ];
    }

    return base;
  }

  private defaultFeatures(category: ProductCategory): string[] {
    const map: Record<ProductCategory, string[]> = {
      Building: ['Choking-safe materials', 'Stackable and replayable', 'Great for motor skill practice'],
      Plush: ['Ultra-soft fabric', 'Easy to clean', 'Perfect for bedtime cuddles'],
      Outdoor: ['Made for active play', 'Lightweight, durable design', 'Great for parks and backyards'],
      Puzzles: ['Large piece count', 'Sturdy board construction', 'Simple family challenge'],
      'Pretend Play': ['Realistic accessories', 'Encourages creative roleplay', 'Built for repeated use'],
      Vehicles: ['Smooth spinning wheels', 'Easy-to-grip handles', 'Well-balanced for younger kids'],
    };

    return map[category];
  }
}
