<template>
  <div class="full-width">
    <div class="row items-center q-col-gutter-x-md">
      <div class="">
        <swiper
          @swiper="setThumbsSwiper"
          :spaceBetween="10"
          slidesPerView="auto"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper"
          direction="vertical"
        >
          <swiper-slide v-for="image in images" :key="image"
            ><q-img
              class="img-preview-product non-selectable"
              spinner-size="xs"
              spinner-color="grey"
              :src="image"
          /></swiper-slide>
        </swiper>
      </div>
      <div class="col">
        <swiper
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          :spaceBetween="10"
          :navigation="false"
          :thumbs="{ swiper: thumbsSwiper }"
          :modules="modules"
          class="mySwiper2"
        >
          <swiper-slide v-for="image in images" :key="image"
            ><q-img
              fit="cover"
              class="block full-height full-width non-selectable"
              spinner-color="grey"
              :src="image"
          /></swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const modules = ref([FreeMode, Navigation, Thumbs]);
const thumbsSwiper = ref<SwiperType | null>(null);
const images = ref<string[]>([
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/1/-/1-anthelios-uvmune-dp-facial-800x800.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/3/-/3-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/4/-/4-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/5/-/5-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/6/-/6-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/7/-/7-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/8/-/8-anthelios-uvmune-dp-facial.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/9/-/9-anthelios-uvmune-dp-facial-800x800.jpg',
  'https://underwaterco.com/cdn/shop/files/Polo_Shirt_w_embroidery_SMOKE_GREEN_540x.jpg?v=1744318173',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/1/0/10-anthelios-uvmune-dp-posterior-facial-800x800.jpg',
]);

const setThumbsSwiper = (swiper: SwiperType) => {
  thumbsSwiper.value = swiper;
};
</script>
<style lang="scss">
.swiper {
  width: 100%;
  height: 700px;
}

.img-preview-product {
  height: 80px;
  width: 80px;
}

.mySwiper .swiper-slide {
  height: 80px;
}

.mySwiper .swiper-slide {
  position: relative;
}

.mySwiper .swiper-slide-thumb-active::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--q-primary);
}
</style>
