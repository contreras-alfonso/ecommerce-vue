import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { AddressState } from 'src/types/store/address-state';
import type { Address } from 'src/types/address';

export const useAddressStore = defineStore('address', {
  state: (): AddressState => ({
    addresses: [],
    address: null,
    addressToUpdate: null,
  }),

  getters: {
    getAdresses: (state) => state.addresses,
    getAddressToUpdate: (state) => state.addressToUpdate,
  },

  actions: {
    async fetchAll() {
      const { data } = await api.get<Address[]>(`/api/addresses`);
      this.addresses = data;
      return data;
    },

    async fetchById(id: string) {
      const { data } = await api.get<Address>(`/api/addresses/${id}`);
      this.address = data;
    },

    async create(address: Address) {
      const { data } = await api.post<Address>(`/api/addresses`, address);
      this.addresses.push(data);
      return data;
    },

    async update(id: string, payload: Address) {
      const { data } = await api.put<Address>(`/api/addresses/${id}`, payload);
      const findIndex = this.addresses.findIndex((address) => address.id === id);
      if (findIndex !== -1) this.addresses[findIndex] = data;
    },

    async delete(id: string) {
      await api.delete<Address>(`/api/addresses/${id}`);
      this.addresses = this.addresses.filter((address) => address.id !== id);
    },

    setAddressToUpdate(address: Address | null) {
      this.addressToUpdate = address;
    },

    clear() {
      this.addresses = [];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddressStore, import.meta.hot));
}
