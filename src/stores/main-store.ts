import { defineStore, acceptHMRUpdate } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    cartDrawer: false,
  }),

  getters: {
    doubleCount: (state) => state.cartDrawer,
  },

  actions: {
    increment() {
      //this.cartDrawer++;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
