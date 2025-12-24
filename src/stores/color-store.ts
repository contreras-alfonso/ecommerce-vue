import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { ColorState } from 'src/types/store/color-state';
import type { Color } from 'src/types/color';

export const useColorStore = defineStore('color', {
  state: (): ColorState => ({
    colors: [],
  }),

  getters: {
    getAll: (state) => state.colors,
    getById: (state) => (id: string) => state.colors.find((brand) => brand.id === id),
  },

  actions: {
    async fetchAll() {
      const { data } = await api.get<Color[]>(`/api/colors`);
      this.colors = data;
      return data;
    },

    async fetchById(id: string) {
      const { data } = await api.get<Color>(`/api/colors/${id}`);
      return data;
    },

    async create(brand: Color) {
      const { data } = await api.post<Color>(`/api/colors`, brand);
      this.colors.push(data);
      return data;
    },

    async update(id: string, brand: Color) {
      const { data } = await api.put<Color>(`/api/colors/${id}`, brand);
      const findIndex = this.colors.findIndex((brand) => brand.id === id);
      if (findIndex !== -1) this.colors[findIndex] = data;
      return data;
    },

    setAll(colors: Color[]) {
      this.colors = colors;
    },

    clear() {
      this.colors = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useColorStore, import.meta.hot));
}
