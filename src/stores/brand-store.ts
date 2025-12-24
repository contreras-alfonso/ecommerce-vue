import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { BrandState } from 'src/types/store/brand-state';
import type { Brand } from 'src/types/brand';

export const useBrandStore = defineStore('brand', {
  state: (): BrandState => ({
    brands: [],
  }),

  getters: {
    getAll: (state) => state.brands,
    getById: (state) => (id: string) => state.brands.find((brand) => brand.id === id),
  },

  actions: {
    async fetchAll() {
      const { data } = await api.get<Brand[]>(`/api/brands`);
      this.brands = data;
      return data;
    },

    async fetchById(id: string) {
      const { data } = await api.get<Brand>(`/api/brands/${id}`);
      return data;
    },

    async create(brand: Brand) {
      const { data } = await api.post<Brand>(`/api/brands`, brand);
      this.brands.push(data);
      return data;
    },

    async update(id: string, brand: Brand) {
      const { data } = await api.put<Brand>(`/api/brands/${id}`, brand);
      const findIndex = this.brands.findIndex((brand) => brand.id === id);
      if (findIndex !== -1) this.brands[findIndex] = data;
      return data;
    },

    setAll(brands: Brand[]) {
      this.brands = brands;
    },

    clear() {
      this.brands = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBrandStore, import.meta.hot));
}
