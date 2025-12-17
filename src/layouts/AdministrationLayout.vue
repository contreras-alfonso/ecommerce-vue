<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white" bordered>
      <div class="column">
        <div class="row items-center full-width q-px-md q-py-sm">
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
            <div class="row justify-center q-col-gutter-x-sm">
              <div v-for="(page, index) in list.nav" :key="index">
                <q-btn
                  @click="
                    (router.push(`/administration/${page.url}`), (currentSectionActive = page.id))
                  "
                  rounded
                  flat
                  :label="page.title"
                  class="text-capitalize fw-400"
                  :class="{
                    'bg-primary': currentSectionActive === page.id,
                    'text-black': currentSectionActive !== page.id,
                  }"
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
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const router = useRouter();
const currentSectionActive = ref<string | null>(null);

const list = ref({
  nav: [
    {
      id: uid(),
      title: 'Productos',
      url: 'products',
    },
    {
      id: uid(),
      title: 'Categorías',
      url: 'categories',
    },
    {
      id: uid(),
      title: 'Marcas',
      url: 'brands',
    },
    {
      id: uid(),
      title: 'Colores',
      url: 'colors',
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
