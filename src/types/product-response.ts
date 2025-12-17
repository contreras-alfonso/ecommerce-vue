import type { Brand } from './brand';
import type { Category } from './category';
import type { Color } from './color';

export interface ProductResponse {
  brand: Brand;
  category: Category;
  colorImages: ColorImage[];
  createdAt: string;
  description: string;
  id: string;
  name: string;
  slug: string;
  updatedAt: string;
  usesTechnicalVariants: boolean;
  variants: Variant[];
}

export interface ColorImage {
  id: string;
  url: string;
  color: Color;
}

export interface Variant {
  id: string;
  ram: string;
  storage: string;
  price: number;
  stock: number;
  color: Color;
}
