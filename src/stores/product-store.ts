import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { Product } from 'src/types/product';
import type { ProductState } from 'src/types/store/product-state';

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
  }),

  getters: {
    getAll: (state) => state.products,
    getById: (state) => (id: string) => state.products.find((product) => product.id === id),
  },

  actions: {
    async fetchAll() {
      const { data } = await api.get<Product[]>(`/api/products/all`);
      this.products = data;
      return data;
    },

    async fetchById(id: string) {
      const { data } = await api.get<Product>(`/api/products/${id}`);
      return data;
    },

    async create(formData: FormData) {
      const { data } = await api.post<Product>(`/api/products`, formData);
      this.products.push(data);
      return data;
    },

    async update(id: string, product: Product) {
      const { data } = await api.put<Product>(`/api/products/${id}`, product);
      const findIndex = this.products.findIndex((product) => product.id === id);
      if (findIndex !== -1) this.products[findIndex] = data;
      return data;
    },

    setAll(products: Product[]) {
      this.products = products;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
