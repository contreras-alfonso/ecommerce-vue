<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white" bordered>
      <div class="column">
        <div class="row items-center full-width q-px-md q-py-sm">
          <div class="col-grow">
            <q-img
              @click="router.push('/')"
              class="cursor-pointer"
              spinner-color="grey"
              spinner-size="sm"
              style="width: 100px"
              src="/svg/logo.svg"
            />
          </div>

          <div class="col" v-if="$q.screen.gt.sm">
            <div class="row justify-center q-col-gutter-x-sm">
              <template v-if="loading.categories">
                <div v-for="i in 4" :key="i">
                  <q-skeleton
                    class="bg-grey-3 custom-skeleton-border"
                    width="100px"
                    height="35px"
                    type="QBtn"
                  />
                </div>
              </template>

              <template v-else>
                <div v-for="(page, index) in list.nav" :key="index">
                  <router-link :to="page.url" v-slot="{ isActive }">
                    <q-btn
                      flat
                      rounded
                      class="text-capitalize fw-400"
                      :label="page.title"
                      :class="{
                        'bg-primary text-white': isActive,
                        'text-black': !isActive,
                      }"
                    />
                  </router-link>
                </div>
              </template>
            </div>
          </div>

          <div class="col-grow">
            <div class="row items-end justify-end">
              <div
                v-if="authStore.isAuthenticated"
                class="row items-center text-grey-9 q-gutter-md"
              >
                <div
                  class="row items-center q-col-gutter-x-sm hover-primary cursor-pointer non-selectable"
                >
                  <div>
                    <q-icon size="25px" name="img:/svg/account.svg" />
                  </div>
                  <div>{{ authStore.getUser?.name }}</div>
                  <q-menu>
                    <div style="min-width: 250px" class="column q-col-gutter-sm q-pa-sm">
                      <div v-if="authStore.getRole === 'ADMIN'" class="">
                        <q-btn
                          @click="router.push('/administration/products')"
                          class="full-width bg-secondary text-white"
                          icon="manage_accounts"
                          flat
                          label="Panel administrativo"
                          rounded
                        ></q-btn>
                      </div>

                      <div class="">
                        <q-btn
                          @click="router.push('/account/profile')"
                          class="full-width"
                          color="grey-10"
                          icon="person"
                          flat
                          label="Mi perfil"
                          rounded
                        ></q-btn>
                      </div>

                      <div class="">
                        <q-btn
                          @click="router.push('/logout')"
                          class="full-width"
                          color="red"
                          icon="exit_to_app"
                          flat
                          label="Cerrar sesión"
                          rounded
                        ></q-btn>
                      </div>
                    </div>
                  </q-menu>
                </div>
                <q-icon
                  @click="mainStore.cartDrawer = true"
                  class="cursor-pointer"
                  size="25px"
                  name="img:/svg/cart.svg"
                />
              </div>

              <div v-else class="row items-center text-grey-9 q-gutter-md">
                <q-icon
                  @click="router.push('/login')"
                  class="cursor-pointer"
                  size="25px"
                  name="img:/svg/account.svg"
                />

                <q-icon
                  @click="mainStore.cartDrawer = true"
                  class="cursor-pointer"
                  size="25px"
                  name="img:/svg/cart.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <q-drawer behavior="mobile" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essentil Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-card flat class="bg-black no-border-radius">
      <q-card-section class="q-pa-lg" style="background-color: #f9f5ec">
        <div class="row items-center">
          <div class="col" v-for="benefit in list.benefits" :key="benefit.title">
            <div class="row items-center justify-center">
              <div class="col-12 flex flex-center"><q-img width="30px" :src="benefit.img" /></div>
              <div class="col-12 flex flex-center text-weight-bold text-subtitle1">
                {{ benefit.title }}
              </div>
              <div class="col-12 flex flex-center">{{ benefit.subtitle }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="column items-center justify-center">
          <div class="">
            <q-img
              spinner-color="red"
              spinner-size="sm"
              style="width: 100px"
              src="/svg/logo-white.svg"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator color="grey-10" />
      <q-card-section>
        <div class="column items-center justify-center">
          <div class=""><q-img width="250px" src="/png/payment-methods.png" /></div>
          <div class="text-white q-mt-sm">©2025 Todos los derechos reservados. OneTek</div>
        </div>
      </q-card-section>
    </q-card>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round flat>
        <q-img spinner-color="grey" spinner-size="xs" width="60px" src="/png/whatsapp.png"></q-img>
      </q-btn>
    </q-page-sticky>

    <CartDrawer />
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useMainStore } from 'src/stores/main-store';
import { useAuth } from 'src/stores/auth-store';
import { useCategoryStore } from 'src/stores/category-store';
import CartDrawer from 'src/components/cart/CartDrawer.vue';
import type { Category } from 'src/types/category';
import type { Navigation } from 'src/types/navigation';
import type { Benefit } from 'src/types/benefit';

const categoryStore = useCategoryStore();
const authStore = useAuth();
const router = useRouter();
const mainStore = useMainStore();

const loading = ref({
  categories: false,
});

const list = ref<{ nav: Navigation[]; benefits: Benefit[] }>({
  nav: [],
  benefits: [
    {
      img: '/svg/envios.svg',
      title: 'Envíos a todo el Perú',
      subtitle: 'Llevamos tus productos a tu casa',
    },

    {
      img: '/svg/benefit_security.svg',
      title: 'Compras Seguras',
      subtitle: 'Tus compras son 100% protegidas',
    },

    {
      img: '/svg/star.svg',
      title: 'Alta Calidad',
      subtitle: 'Trabajamos con las mejores marcas',
    },

    {
      img: '/svg/exchange.svg',
      title: 'Cambios y devoluciones',
      subtitle: 'Te ayudamos en lo que necesites',
    },
  ],
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

onMounted(async () => {
  await onLoad();
});

const onLoad = async () => {
  loading.value.categories = true;
  await Promise.all([fetchCategories()])
    .then(() => {})
    .finally(() => {
      loading.value.categories = false;
    });
};

const fetchCategories = async () => {
  await categoryStore.fetchAll();
};

const leftDrawerOpen = ref(false);

watch(
  () => categoryStore.getAll,
  (newValue: Category[]) => {
    list.value.nav = newValue.map((category) => ({
      id: category.id!,
      title: category.name,
      url: `/${category.slug}`,
    }));
  },
);
</script>

<style lang="scss" scoped>
.custom-skeleton-border {
  border-radius: 80px;
}
</style>
