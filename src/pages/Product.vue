<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-10 col-12 q-gutter-y-md">
        <div>
          <BreadCrum title="Dúo Espumoso 473ml Cerave" />
        </div>

        <div class="row q-col-gutter-x-xl">
          <div class="col-6">
            <product-images-slider :images="images" />
          </div>

          <div class="col-6">
            <div class="row items-center justify-center">
              <div class="col-md-10 col-lg-9 col-12 q-col-gutter-y-md">
                <ProductDetail />
              </div>
            </div>
          </div>
        </div>

        <div class="q-mt-xl">
          <ProductCharacteristics />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ProductCharacteristics from 'src/components/products/ProductCharacteristics.vue';
import ProductDetail from 'src/components/products/ProductDetail.vue';
import ProductImagesSlider from 'src/components/products/ProductImagesSlider.vue';
import BreadCrum from 'src/components/shared/BreadCrum.vue';

const images = ref<string[]>([
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/1/-/1-anthelios-uvmune-dp-facial-800x800.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/3/-/3-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/4/-/4-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/5/-/5-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/6/-/6-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/7/-/7-anthelios-uvmune-dp-facial_1.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/8/-/8-anthelios-uvmune-dp-facial.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/9/-/9-anthelios-uvmune-dp-facial-800x800.jpg',
  'https://dermotiendashopping.com/media/catalog/product/cache/ff278125aefc2253a344625f59d7baee/1/0/10-anthelios-uvmune-dp-posterior-facial-800x800.jpg',
]);
</script>
<style lang="scss"></style>
