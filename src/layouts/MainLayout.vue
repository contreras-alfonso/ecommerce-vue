<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white" bordered>
      <div class="column">
        <div class="row items-center full-width q-px-md">
          <div class="col">
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
            <div class="row justify-center">
              <div v-for="(page, index) in list.nav" :key="index">
                <q-btn
                  flat
                  :label="page.title"
                  class="text-capitalize fw-400 q-py-md"
                  :class="{
                    'text-primary': currentCategoryActive === page.id,
                    'text-black': currentCategoryActive !== page.id,
                  }"
                  @mouseover="((currentCategoryActive = page.id), (activeMenu = true))"
                />
              </div>
            </div>
          </div>

          <div class="col">
            <div class="row items-end justify-end">
              <div class="row items-center text-grey-9 q-gutter-md">
                <q-img
                  @click="router.push('/login')"
                  class="cursor-pointer"
                  style="width: 25px"
                  src="/svg/account.svg"
                />
                <q-img
                  @click="mainStore.cartDrawer = true"
                  class="cursor-pointer"
                  style="width: 25px"
                  src="/svg/cart.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-header>

    <ProductCategoryMenu
      :current-category="currentCategoryActive"
      :is-active="activeMenu"
      @onMouseLeaveFromMenu="onMouseLeaveFromMenu"
    />

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
      <q-card-section class="q-pa-lg bg-grey-3">
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
        <q-tooltip class="bg-positive" :offset="[10, 10]"> Contáctanos</q-tooltip>
        <q-img spinner-color="grey" spinner-size="xs" width="60px" src="/png/whatsapp.png"></q-img>
      </q-btn>
    </q-page-sticky>

    <CartDrawer />
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { uid } from 'quasar';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useMainStore } from 'src/stores/main-store';
import CartDrawer from 'src/components/cart/CartDrawer.vue';
import ProductCategoryMenu from 'src/components/products/ProductCategoryMenu.vue';

const currentCategoryActive = ref<string | null>(null);
const activeMenu = ref<boolean>(false);
const router = useRouter();
const mainStore = useMainStore();

const list = ref({
  nav: [
    { id: uid(), title: 'Resúmen', url: 'resumen', isMovil: false, isAuth: false },
    {
      id: uid(),
      title: 'Celulares',
      url: '/reembolsos',
      isMovil: false,
      isAuth: false,
    },
    {
      id: uid(),
      title: 'Tablets',
      url: '/comprobantes',
      isMovil: false,
      isAuth: false,
    },
    {
      id: uid(),
      title: 'Relojes',
      url: '/gastos-de-movilidad',
      isMovil: false,
      isAuth: false,
    },
    {
      id: uid(),
      title: 'Audio',
      url: '/reembolsos-y-pagos',
      isMovil: false,
      isAuth: false,
    },
  ],
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

const leftDrawerOpen = ref(false);

const onMouseLeaveFromMenu = () => {
  currentCategoryActive.value = null;
  activeMenu.value = false;
};

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>

<style scoped></style>
