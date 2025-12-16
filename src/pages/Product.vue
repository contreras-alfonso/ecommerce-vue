<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-10 col-12 q-gutter-y-md">
        <div>
          <BreadCrum title="Dúo Espumoso 473ml Cerave" />
        </div>

        <div class="row q-col-gutter-x-xl">
          <div class="col-6">
            <product-detail-slider />
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
import ProductCharacteristics from 'src/components/products/ProductCharacteristics.vue';
import ProductDetail from 'src/components/products/ProductDetail.vue';
import ProductDetailSlider from 'src/components/products/ProductDetailSlider.vue';
import BreadCrum from 'src/components/shared/BreadCrum.vue';
</script>
<style lang="scss"></style>
