import type { BrandElement, ProductSearchResponse } from '../product-search-response';

export interface CatalogState {
  productSearch: ProductSearchResponse | null;
  baseBrands: BrandElement[];
}
