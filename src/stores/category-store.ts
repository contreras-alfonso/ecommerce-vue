import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { Category } from 'src/types/category';
import type { CategoryState } from 'src/types/store/category-state';

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
  }),

  getters: {
    getAll: (state) => state.categories,
    getById: (state) => (id: string) => state.categories.find((category) => category.id === id),
  },

  actions: {
    async fetchAll() {
      const { data } = await api.get<Category[]>(`/api/categories`);
      this.categories = data;
      return data;
    },

    async fetchById(id: string) {
      const { data } = await api.get<Category>(`/api/categories/${id}`);
      return data;
    },

    async create(category: Category) {
      const { data } = await api.post<Category>(`/api/categories`, category);
      this.categories.push(data);
      return data;
    },

    async update(id: string, category: Category) {
      const { data } = await api.put<Category>(`/api/categories/${id}`, category);
      const findIndex = this.categories.findIndex((category) => category.id === id);
      if (findIndex !== -1) this.categories[findIndex] = data;
      return data;
    },

    setAll(categories: Category[]) {
      this.categories = categories;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStore, import.meta.hot));
}
