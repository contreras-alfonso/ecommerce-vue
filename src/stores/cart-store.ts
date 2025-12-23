import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { CartState } from 'src/types/store/cart-state';
import type { CartResponse } from 'src/types/cart-response';
import type { RemoveItemFromCartRequest } from 'src/types/remove-item-cart-request';
import type { VerifyStockAndUpdateRequest } from 'src/types/verify-stock-update-request';
import { CartStatus } from 'src/types/cart-status';

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cart: null,
  }),

  getters: {
    getCart: (state) => state.cart,
  },

  actions: {
    async fetchActiveCart() {
      const { data } = await api.get<CartResponse>(`/api/cart/active`);
      this.cart = data;
    },

    async removeItemFromCart(payload: RemoveItemFromCartRequest) {
      const { data } = await api.post<CartResponse>(`/api/cart/remove`, payload);
      if (data.status === CartStatus.ABANDONED) {
        return (this.cart = null);
      }
      this.cart = data;
    },

    async verifyStockAndUpdateCart(payload: VerifyStockAndUpdateRequest) {
      const { data } = await api.post<CartResponse>(`/api/cart/verify`, payload);
      this.cart = data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
