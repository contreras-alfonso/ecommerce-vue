<template>
  <div class="full-width full-height">
    <q-card
      @click="router.push('/product/123')"
      flat
      class="column product-card non-selectable cursor-pointer full-height"
    >
      <div class="col">
        <q-card-section>
          <q-img
            style="height: 280px"
            fit="contain"
            spinner-color="grey"
            :src="product.colorImages[0]?.url"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-badge class="q-px-md q-py-xs" rounded color="primary" :label="product.brand.name" />

          <div class="text-subtitle1 q-my-sm text-grey-10" style="line-height: 20px">
            {{ product.name }}
          </div>
          <div class="text-h6 fw-500 fs-18 text-secondary">
            S/ {{ toCurrency(product.variants[0]?.price ?? 0) }}
          </div>
        </q-card-section>
      </div>

      <div>
        <q-card-section class="q-pb-md">
          <q-btn
            @click.stop="console.log('agregado')"
            flat
            class="text-weight-regular q-py-md btn-product full-width"
            label="Agregar al carrito"
          />
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useHelpers } from 'src/composables/helpers';
import type { Product } from 'src/types/product';

defineProps<{ product: Product }>();

const { toCurrency } = useHelpers();
const router = useRouter();
</script>
<style lang="scss" scoped>
.product-card {
  min-height: 500px;
  border: 1px solid #f3f3f0;
}

.btn-product {
  background-color: #f8f6e3;
  padding: 8px 0 !important;
}

.btn-product:hover {
  background-color: #f5eda7;
}
</style>
