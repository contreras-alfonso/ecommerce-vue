import type { Product } from 'src/types/product';

export interface ProductState {
  products: Product[];
  product: Product | null;
}
