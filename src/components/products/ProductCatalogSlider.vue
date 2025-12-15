<template>
  <div class="row items-center justify-between q-mb-md">
    <div class="text-weight-bold text-h5">¡Los productos más buscados!</div>

    <div class="flex justify-end q-mx-md q-col-gutter-x-sm">
      <div>
        <q-btn
          outline
          round
          class="btn-prev-product custom-nav-btn"
          color="black"
          icon="keyboard_arrow_left"
        />
      </div>

      <div>
        <q-btn
          outline
          round
          class="btn-next-product custom-nav-btn"
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
    :navigation="{ nextEl: '.btn-next-product', prevEl: '.btn-prev-product' }"
    :free-mode="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide v-for="slide in slides" :key="slide.id">
      <card-product :product="slide" />
    </swiper-slide>
  </swiper>
</template>
<script setup lang="ts">
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { uid } from 'quasar';
import CardProduct from './CardProduct.vue';

const modules = [Navigation, Pagination, Scrollbar, A11y, FreeMode, Autoplay];

const slides = [
  {
    id: uid(),
    brand: 'La Roche Posay',
    title: 'Trio La Roche Posay Pack Antiedad',
    price: 575.7,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/l/a/la_roche_posay_vitamina_c_y_hyalu.png',
  },
  {
    id: uid(),
    brand: 'Vichy',
    title: 'Pack Vichy Liftactiv Supreme Día + Noche',
    price: 489.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/a/n/anthelios_d_o_pack_la_roche_posay.png',
  },
  {
    id: uid(),
    brand: 'Eucerin',
    title: 'Eucerin Hyaluron-Filler Sérum Concentrado',
    price: 259.5,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/c/i/cicaplast.png',
  },
  {
    id: uid(),
    brand: 'Bioderma',
    title: 'Bioderma Sensibio Pack Piel Sensible',
    price: 199.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/p/a/pack_hydroboost_refill_x2.png',
  },
  {
    id: uid(),
    brand: 'ISDIN',
    title: 'ISDIN Fotoprotector Fusion Water SPF 50+',
    price: 129.0,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/8/4/8429420279209_3.png',
  },
  {
    id: uid(),
    brand: 'Avene',
    title: 'Avène Cleanance Pack Piel Grasa',
    price: 215.4,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/p/a/pack_neutrogena_hydro_boost_x2.png',
  },
  {
    id: uid(),
    brand: 'Neutrogena',
    title: 'Neutrogena Hydro Boost Water Gel',
    price: 98.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/c/_/c_vit_5_serum_x2.png',
  },
  {
    id: uid(),
    brand: 'Cetaphil',
    title: 'Cetaphil Loción Hidratante Piel Sensible',
    price: 87.5,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/6/9/69767_-_sun_oil_control_0.jpg',
  },
  {
    id: uid(),
    brand: 'CeraVe',
    title: 'CeraVe Crema Hidratante Rostro y Cuerpo',
    price: 112.3,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/f/r/frezyderm_fotoprotector_velvet_sin_color_2.png',
  },
  {
    id: uid(),
    brand: 'Uriage',
    title: 'Uriage Eau Thermale Crema Hidratante',
    price: 165.0,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/f/u/fusin_water_magic_pack.png',
  },
];
</script>
<style lang="scss">
.product-slider {
  width: 100%;
  height: 500px;
  padding-right: 40px;
}

.product-slider .swiper-slide {
  width: 280px;
}
</style>
