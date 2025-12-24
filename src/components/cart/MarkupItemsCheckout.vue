<template>
  <q-markup-table flat>
    <thead>
      <tr>
        <th class="text-left text-secondary">
          <div class="text-subtitle2">Producto</div>
        </th>
        <th class="text-center text-secondary">
          <div class="text-subtitle2">Precio</div>
        </th>
        <th class="text-center text-secondary">
          <div class="text-subtitle2">Cantidad</div>
        </th>
        <th class="text-center text-secondary">
          <div class="text-subtitle2">Subtotal</div>
        </th>
        <th class="text-right text-secondary"></th>
      </tr>
    </thead>
    <tbody>
      <tr class="col-12" v-for="item in items" :key="item.variantId">
        <cart-item-card :item="item" :is-to-markup-table="true" />
      </tr>
    </tbody>
  </q-markup-table>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

import { useCartStore } from 'src/stores/cart-store';
import type { CartResponse, Item } from 'src/types/cart-response';
import CartItemCard from './CartItemCard.vue';
const cartStore = useCartStore();

const items = ref<Item[]>([]);

watch(
  () => cartStore.getCart,
  (newValue: CartResponse | null) => {
    if (newValue) {
      items.value = [...newValue.items];
    }
  },
  { immediate: true },
);
</script>
<style lang=""></style>
