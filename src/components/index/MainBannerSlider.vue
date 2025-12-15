<template>
  <div class="q-my-md relative-position">
    <swiper
      class="main-slider"
      :modules="modules"
      :slides-per-view="$q.screen.lt.sm ? 1 : 3"
      :space-between="10"
      :navigation="{ nextEl: '.btn-next-main', prevEl: '.btn-prev-main' }"
      loop
      :autoplay="{
        delay: 6000,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide v-for="slide in slides" :key="slide.id">
        <q-card flat class="relative-position full-height">
          <q-img loading="lazy" class="absolute-full" :src="slide.path" />
        </q-card>
      </swiper-slide>
    </swiper>

    <div class="nav-btn-wrapper btn-left">
      <q-btn
        round
        class="btn-prev-main custom-nav-btn"
        color="white"
        outline
        icon="keyboard_arrow_left"
      />
    </div>
    <div class="nav-btn-wrapper btn-right">
      <q-btn
        round
        class="btn-next-main custom-nav-btn"
        color="white"
        outline
        icon="keyboard_arrow_right"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { uid } from 'quasar';

const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay];

const slides = [
  {
    id: uid(),
    title: 'OnePlus Watch 3',
    caption: 'Save $100 instantly',
    path: 'https://dermotiendashopping.com/media/.renditions/wysiwyg/LG_banner-home_5.png',
  },

  {
    id: uid(),
    title: 'OnePlus Nord Buds 3 Pro',
    caption: 'Save $40 instantly',
    path: 'https://dermotiendashopping.com/media/.renditions/wysiwyg/LG_banner-home_4.png',
  },

  {
    id: uid(),
    title: 'OnePlus Pad 2',
    caption: 'Enjoy $200 off on OnePlus Pad 2',
    path: 'https://dermotiendashopping.com/media/.renditions/wysiwyg/LG_banner-home_6.png',
  },

  {
    id: uid(),
    title: 'OnePlus Watch 3',
    caption: 'Save $100 instantly',
    path: 'https://dermotiendashopping.com/media/.renditions/wysiwyg/LG_banner-home_7.png',
  },

  {
    id: uid(),
    title: 'OnePlus Watch 3',
    caption: 'Save $100 instantly',
    path: 'https://dermotiendashopping.com/media/.renditions/wysiwyg/LG_banner-home_9.png',
  },
];
</script>
<style lang="scss">
.main-slider {
  width: 100%;
  height: 700px;
}

.nav-btn-wrapper {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}

.nav-btn-wrapper.btn-left {
  left: 8px;
}

.nav-btn-wrapper.btn-right {
  right: 8px;
}
</style>
