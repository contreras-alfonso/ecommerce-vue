<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white" bordered>
      <!-- <q-toolbar> -->
      <!-- <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" /> -->

      <!-- <q-toolbar-title> Quasar App </q-toolbar-title> -->

      <!-- <div>Quasar v{{ $q.version }}</div> -->
      <!-- </q-toolbar> -->
      <div class="column">
        <div class="row items-center full-width q-py-sm q-px-md">
          <div class="col">
            <q-img
              spinner-color="grey"
              spinner-size="sm"
              style="width: 100px"
              src="/svg/logo.svg"
            />
          </div>

          <div class="col" v-if="!$q.screen.lt.md">
            <div class="row q-col-gutter-xs justify-center">
              <div v-for="(page, index) in list.nav" :key="index">
                <router-link :to="page.url" custom v-slot="{ isActive }">
                  <q-btn
                    flat
                    rounded
                    :label="page.title"
                    class="text-capitalize"
                    :class="{ 'text-primary': isActive, 'text-black': !isActive }"
                  />
                </router-link>
              </div>
            </div>
          </div>

          <!-- <div class="col">
            <div class="flex flex-center">
              <InputElement
                style="width: 400px"
                dense
                :model-value="search"
                @update:model-value="(val) => (search = val)"
                placeholder="Buscar"
                icon="search"
                icon-color="grey"
                :outlined="true"
                :length-required="11"
                time="1500"
                bg-color="grey-2"
                is-rounded
                no-border
                input-xl
                :is-loading="loading.search"
              />
            </div>
          </div> -->

          <div class="col">
            <div class="row items-end justify-end">
              <div class="row items-center text-grey-9 q-gutter-md">
                <!-- <div class="row items-center">
                  <q-img style="width: 20px" src="/svg/store.svg" />
                  <div class="q-ml-sm hover-primary cursor-pointer">Tiendas</div>
                </div> -->

                <!-- <div class="row items-center">
                  <q-img style="width: 20px" src="/svg/delivery.svg" />
                  <div class="q-ml-sm hover-primary cursor-pointer">Sigue tu pedido</div>
                </div> -->

                <div class="row items-center">
                  <q-img class="cursor-pointer" style="width: 25px" src="/svg/account.svg" />
                  <!-- <div class="q-ml-sm hover-primary cursor-pointer">Mi cuenta</div> -->
                </div>

                <div class="row items-center">
                  <q-img class="cursor-pointer" style="width: 25px" src="/svg/cart.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div style="padding: 12px 0" class="bg-primary">
          <div class="row items-center justify-center q-col-gutter-x-md ">
            <div>Marcas</div>
            <div>Calendario adviento</div>
            <div>Bloqueadores</div>
            <div>Limpieza</div>
            <div>Serums</div>
          </div>
        </div> -->
      </div>
    </q-header>

    <!-- <q-footer bordered class="bg-black q-pa-md"> </q-footer> -->

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
      <q-card-section style="background: #f2ede5" class="q-pa-lg">
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
        <q-img
          spinner-color="grey"
          spinner-size="xs"
          width="60px"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/662px-WhatsApp_icon.png"
        ></q-img>
      </q-btn>
    </q-page-sticky>

    <CartDrawer />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import CartDrawer from 'src/components/cart/CartDrawer.vue';

const list = ref({
  nav: [
    { title: 'Resúmen', url: 'resumen', isMovil: false, isAuth: false },
    {
      title: 'Celulares',
      url: '/reembolsos',
      isMovil: false,
      isAuth: false,
    },
    {
      title: 'Tablets',
      url: '/comprobantes',
      isMovil: false,
      isAuth: false,
    },
    {
      title: 'Relojes',
      url: '/gastos-de-movilidad',
      isMovil: false,
      isAuth: false,
    },
    {
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
// import InputElement from 'src/components/elements/Input.vue';

// const loading = ref({
//   search: false,
// });

// const search = ref('');

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

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>
