<template>
  <q-page class="q-gutter-y-md" padding>
    <example-component
      v-if="false"
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>

    <div class="">
      <MainBannerSlider />
    </div>

    <div class="row items-center justify-center">
      <div class="col-sm-10 col-12">
        <ProductCatalogSlider />
      </div>
    </div>

    <div class="row items-center justify-center">
      <div class="col-sm-10 col-12">
        <q-img
          fit="cover"
          src="https://dermotiendashopping.com/media/wysiwyg/LG_cintillo-asesora_desktop.png"
          class="full-width"
        />
      </div>
    </div>

    <div class="row items-center justify-center">
      <div class="col-sm-10 col-12">
        <ProductCatalogSlider />
      </div>
    </div>

    <div class="row items-center justify-center">
      <div class="col-sm-10 col-12">
        <q-img
          fit="cover"
          src="https://dermotiendashopping.com/media/wysiwyg/LG_cintillo_desktop_principal_2.png"
          class="full-width"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import MainBannerSlider from 'src/components/index/MainBannerSlider.vue';
import ProductCatalogSlider from 'src/components/products/ProductCatalogSlider.vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1',
  },
  {
    id: 2,
    content: 'ct2',
  },
  {
    id: 3,
    content: 'ct3',
  },
  {
    id: 4,
    content: 'ct4',
  },
  {
    id: 5,
    content: 'ct5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1200,
});
</script>

<style></style>
