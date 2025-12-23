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
            </div>
          </div>

          <div class="col-grow">
            <div class="row items-end justify-end">
              <div class="row items-center text-grey-9 q-gutter-md">
                <div
                  class="row items-center q-col-gutter-x-sm hover-primary cursor-pointer non-selectable"
                >
                  <div>
                    <q-icon size="25px" name="img:/svg/account.svg" />
                  </div>
                  <div>{{ authStore.getUser?.name }}</div>
                  <q-menu>
                    <div style="min-width: 250px" class="column q-col-gutter-sm q-pa-sm">
                      <div class="">
                        <q-btn
                          @click="router.push('/')"
                          class="full-width bg-secondary text-white"
                          icon="storefront"
                          flat
                          label="Ir a la tienda"
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
                          outline
                          label="Cerrar sesión"
                          rounded
                        ></q-btn>
                      </div>
                    </div>
                  </q-menu>
                </div>
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
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { uid } from 'quasar';
import { useAuthStore } from 'src/stores/auth-store';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const authStore = useAuthStore();
const router = useRouter();

const list = ref({
  nav: [
    {
      id: uid(),
      title: 'Productos',
      url: '/administration/products',
    },
    {
      id: uid(),
      title: 'Categorías',
      url: '/administration/categories',
    },
    {
      id: uid(),
      title: 'Marcas',
      url: '/administration/brands',
    },
    {
      id: uid(),
      title: 'Colores',
      url: '/administration/colors',
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

// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value;
// }
</script>

<style scoped></style>
