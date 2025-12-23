import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import { useStorage } from 'src/composables/storage';
import type { CartState } from 'src/types/store/cart-state';
import type { CartResponse } from 'src/types/cart-response';
import type { RemoveItemFromCartRequest } from 'src/types/remove-item-cart-request';
import type { VerifyStockAndUpdateRequest } from 'src/types/verify-stock-update-request';
import type { FindActiveCartGuest } from 'src/types/find-active-cart-guest';
import { CartStatus } from 'src/types/cart-status';

const { setStorage } = useStorage();

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
      setStorage('cartId', this.cart?.cartId);
    },

    async fetchActiveCartGuest(payload: FindActiveCartGuest) {
      const { data } = await api.post<CartResponse>(`/api/cart/active-guest`, payload);
      this.cart = data;
      setStorage('cartId', this.cart?.cartId);
    },

    async removeItemFromCart(payload: RemoveItemFromCartRequest) {
      const { data } = await api.post<CartResponse>(`/api/cart/remove`, payload);
      if (data.status === CartStatus.ABANDONED) {
        setStorage('cartId', null);
        return (this.cart = null);
      }
      this.cart = data;
      setStorage('cartId', this.cart?.cartId);
    },

    async verifyStockAndUpdateCart(payload: VerifyStockAndUpdateRequest) {
      const { data } = await api.post<CartResponse>(`/api/cart/verify`, payload);
      this.cart = data;
      setStorage('cartId', this.cart?.cartId);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
