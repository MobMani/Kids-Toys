export type ProductCategory = 'Building' | 'Plush' | 'Outdoor' | 'Puzzles' | 'Pretend Play' | 'Vehicles';

export interface ProductReview {
  author: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  ageRange: string;
  rating: number;
  description: string;
  colorway: string;
  accent: string;
  badge?: string;
  stock: number;
  imageUrl?: string;
  galleryImages?: string[];
  reviews?: ProductReview[];
  features?: string[];
}
