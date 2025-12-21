import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { ProductSearchResponse } from 'src/types/product-search-response';
import type { CatalogState } from 'src/types/store/catalog-state';

export const useCatalogStore = defineStore('color', {
  state: (): CatalogState => ({
    productSearch: null,
    baseBrands: [],
  }),

  getters: {
    getAll: (state) => state.productSearch,
    getBrandNameById: (state) => (id: string) => {
      return state.productSearch?.filters.brands.find((brand) => brand.id === id)?.name;
    },
  },

  actions: {
    async fetchByFilters(term: string, query: string) {
      const { data } = await api.get<ProductSearchResponse>(`/api/products/by/${term}?${query}`);
      this.productSearch = data;
      if (this.baseBrands.length <= 0) {
        this.baseBrands = data.filters.brands;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCatalogStore, import.meta.hot));
}
