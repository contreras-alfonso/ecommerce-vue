import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { ProfileState } from 'src/types/store/profile-state';
import type { Profile } from 'src/types/profile';

export const useProfileStore = defineStore('profile', {
  state: (): ProfileState => ({
    profile: null,
  }),

  getters: {
    getProfile: (state) => state.profile,
  },

  actions: {
    async findProfile() {
      const { data } = await api.get<Profile>(`/api/profile`);
      this.profile = data;
      return data;
    },

    async update(payload: Profile) {
      const { data } = await api.put<Profile>(`/api/profile`, payload);
      this.profile = data;
      return data;
    },

    clear() {
      this.profile = null;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
