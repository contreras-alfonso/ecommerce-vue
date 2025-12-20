import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { ProductSearchResponse } from 'src/types/product-search-response';
import type { CatalogState } from 'src/types/store/catalog-state';

export const useCatalogStore = defineStore('color', {
  state: (): CatalogState => ({
    productSearch: null,
  }),

  getters: {
    getAll: (state) => state.productSearch,
  },

  actions: {
    async fetchByFilters(term: string) {
      const { data } = await api.get<ProductSearchResponse>(`/api/products/by/${term}`);
      this.productSearch = data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCatalogStore, import.meta.hot));
}
