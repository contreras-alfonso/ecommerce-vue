<template>
  <div class="full-width">
    <q-card flat class="product-card non-selectable cursor-pointer">
      <q-card-section>
        <q-img :src="product?.img" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- <div class="text-caption fs-14">{{ product?.brand }}</div> -->
        <q-badge class="q-px-md q-py-xs" rounded color="primary" :label="product?.brand" />

        <div class="text-subtitle1 q-my-sm text-grey-10" style="line-height: 20px">
          {{ product?.title }}
        </div>
        <div class="text-h6 fw-500 fs-18 text-secondary">S/ {{ product?.price }}</div>
      </q-card-section>

      <q-card-actions align="center" class="q-pb-md">
        <q-btn
          flat
          class="text-weight-regular q-py-md btn-product full-width"
          label="Agregar al carrito"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup lang="ts">
defineProps({
  product: { type: Object, required: false },
});
</script>
<style lang="scss">
.product-card {
  border: 1px solid #f3f3f0;
}
</style>
