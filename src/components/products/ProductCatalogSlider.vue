<template>
  <div class="row items-center justify-between q-mb-md">
    <div class="text-weight-bold text-h5">¡Los productos más buscados!</div>

    <div class="flex justify-end q-mx-md q-col-gutter-x-sm">
      <div>
        <q-btn
          outline
          round
          :class="[`btn-prev-product-${swiperId}`, 'custom-nav-btn']"
          color="black"
          icon="keyboard_arrow_left"
        />
      </div>

      <div>
        <q-btn
          outline
          round
          :class="[`btn-next-product-${swiperId}`, 'custom-nav-btn']"
          color="black"
          icon="keyboard_arrow_right"
        />
      </div>
    </div>
  </div>
  <swiper
    class="product-slider"
    :modules="modules"
    slides-per-view="auto"
    :space-between="30"
    :navigation="{
      nextEl: '.btn-next-product-' + swiperId,
      prevEl: '.btn-prev-product-' + swiperId,
    }"
    :free-mode="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide v-for="product in products" :key="product.id">
      <card-product :product="product" />
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { uid } from 'quasar';
import CardProduct from './CardProduct.vue';
import { ref } from 'vue';
import type { Product } from 'src/types/product';

const swiperId = uid();

const modules = [Navigation, Pagination, Scrollbar, A11y, FreeMode, Autoplay];

const products = ref<Product[]>([]);
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: fit-content;
}

.product-slider .swiper-slide {
  width: 280px;
  height: auto;
  padding: 2px 0;
}
</style>
