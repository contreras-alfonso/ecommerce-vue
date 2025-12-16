import type { PriceRange } from './price-range';

export interface Filters {
  orderBy: string;
  rangePrice: PriceRange;
  brand: string[];
  page: number;
}
