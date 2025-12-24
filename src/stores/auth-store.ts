import { defineStore, acceptHMRUpdate } from 'pinia';
import { LocalStorage, SessionStorage } from 'quasar';
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { useStorage } from 'src/composables/storage';
import { useCartStore } from './cart-store';
import type { LoginRequest } from 'src/types/login-request';
import type { AuthResponse } from 'src/types/auth-response';
import type { AuthState } from 'src/types/store/auth-state';
import type { RegisterRequest } from 'src/types/register-request';
import type { RegisterResponse } from 'src/types/register-response';

const USER_TYPE = ['ADMIN', 'USER'];
const AUTH_TYPE = 'Bearer';

const cartStore = useCartStore();
const { setStorage, getStorage } = useStorage();

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    role: null,
    authenticated: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getRole: (state) => state.role,
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    async login(payload: LoginRequest) {
      const response = await api.post<AuthResponse>(`/api/auth/login`, payload);
      const data = response.data;
      this.initUser(data);
      return data;
    },

    async register(payload: RegisterRequest) {
      await api.post<RegisterResponse>(`/api/auth/register`, payload);
    },

    initUser(payload: AuthResponse) {
      const profile = {
        token: payload.token.accessToken,
        user: { ...payload },
      };

      if (USER_TYPE.some((role) => profile.user.roles.includes(role))) {
        api.defaults.headers.common.Authorization = `${AUTH_TYPE} ${profile.token}`;

        this.role = profile.user.roles[0]!;
        this.authenticated = true;
        setStorage('token', profile.token);
        setStorage('user', profile.user);
        this.setUser(payload);
      } else {
        this.clear();
        Notify.create({
          message: 'Hola, no cuentas con privilegios para acceder a la aplicación.',
          color: 'negative',
          icon: 'error',
          position: 'top',
        });
      }
    },

    async verify() {
      const token = getStorage('token');

      if (token && typeof token === 'string') {
        setStorage('token', token);
        api.defaults.headers.common.Authorization = `${AUTH_TYPE} ${token}`;

        try {
          const payload = {
            token,
          };
          const response = await api.post<AuthResponse>('/api/auth/refresh-token', payload);

          const data = response.data;

          this.initUser(data);
        } catch (error) {
          this.clear();
          throw error;
        }
      }
    },

    logout() {
      delete api.defaults.headers.common['Authorization'];
      this.clear();
    },

    setUser(data: AuthResponse) {
      this.user = { ...data };
    },

    clear() {
      this.token = null;
      this.user = null;
      this.authenticated = false;
      this.role = null;
      LocalStorage.clear();
      SessionStorage.clear();
      cartStore.clear();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
