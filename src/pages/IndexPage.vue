<template>
  <q-page class="q-gutter-y-lg" padding>

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
import MainBannerSlider from 'src/components/index/MainBannerSlider.vue';
import ProductCatalogSlider from 'src/components/products/ProductCatalogSlider.vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

</script>

<style></style>
