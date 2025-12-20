import type { ProductSearchResponse } from '../product-search-response';

export interface CatalogState {
  productSearch: ProductSearchResponse | null;
}
