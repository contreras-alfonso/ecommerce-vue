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

const products = ref<Product[]>([
  {
    id: uid(),
    brand: 'La Roche Posay',
    name: 'Trio La Roche Posay Pack Antiedad',
    price: 575.7,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/l/a/la_roche_posay_vitamina_c_y_hyalu.png',
  },
  {
    id: uid(),
    brand: 'Vichy',
    name: 'Pack Vichy Liftactiv Supreme Día + Noche',
    price: 489.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/a/n/anthelios_d_o_pack_la_roche_posay.png',
  },
  {
    id: uid(),
    brand: 'Eucerin',
    name: 'Eucerin Hyaluron-Filler Sérum Concentrado',
    price: 259.5,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/c/i/cicaplast.png',
  },
  {
    id: uid(),
    brand: 'Bioderma',
    name: 'Bioderma Sensibio Pack Piel Sensible',
    price: 199.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/p/a/pack_hydroboost_refill_x2.png',
  },
  {
    id: uid(),
    brand: 'ISDIN',
    name: 'ISDIN Fotoprotector Fusion Water SPF 50+',
    price: 129.0,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/8/4/8429420279209_3.png',
  },
  {
    id: uid(),
    brand: 'Avene',
    name: 'Avène Cleanance Pack Piel Grasa',
    price: 215.4,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/p/a/pack_neutrogena_hydro_boost_x2.png',
  },
  {
    id: uid(),
    brand: 'Neutrogena',
    name: 'Neutrogena Hydro Boost Water Gel',
    price: 98.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/c/_/c_vit_5_serum_x2.png',
  },
  {
    id: uid(),
    brand: 'Cetaphil',
    name: 'Cetaphil Loción Hidratante Piel Sensible',
    price: 87.5,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/6/9/69767_-_sun_oil_control_0.jpg',
  },
  {
    id: uid(),
    brand: 'CeraVe',
    name: 'CeraVe Crema Hidratante Rostro y Cuerpo',
    price: 112.3,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/f/r/frezyderm_fotoprotector_velvet_sin_color_2.png',
  },
  {
    id: uid(),
    brand: 'Uriage',
    name: 'Uriage Eau Thermale Crema Hidratante',
    price: 165.0,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/f/u/fusin_water_magic_pack.png',
  },
]);
</script>
<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: fit-content;
}

.product-slider .swiper-slide {
  width: 280px;
}
</style>
