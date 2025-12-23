<template>
  <q-drawer
    @hide="onClose"
    v-model="cartStore.cartDrawer"
    side="right"
    behavior="mobile"
    elevated
    class="q-px-lg q-pt-lg q-pb-md"
    :width="$q.screen.xs ? 350 : 560"
  >
    <q-form ref="formCreate" class="full-height">
      <div class="column justify-between full-height">
        <q-card-section class="q-px-none q-pt-none">
          <div class="row items-center justify-between">
            <div class="col text-h5 text-weight-bold">
              Mi carrito
              <span v-if="cartStore.getCart" class="text-weight-regular"
                >({{ cartStore.getCart?.itemsCount }})</span
              >
              <!-- <q-spinner class="q-ml-sm" color="primary" /> -->
            </div>
            <q-btn @click="onClose" icon="close" color="grey-6" size="md" round flat />
          </div>
        </q-card-section>

        <q-separator />

        <q-scroll-area class="col">
          <q-card-section class="q-mt-md q-pa-none">
            <template v-if="cartStore.getCart">
              <div class="row q-col-gutter-y-sm">
                <div class="col-12" v-for="item in items" :key="item.variantId">
                  <CartProductCard :item="item" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="column items-center justify-center">
                <q-img spinner-color="grey" src="/svg/empty-cart.svg" width="400px" />
                <div class="q-mt-md">No hay artículos en tu carrito de compras</div>
              </div>
            </template>
          </q-card-section>
        </q-scroll-area>

        <q-card-section v-if="cartStore.getCart" class="q-px-none q-pb-none">
          <q-separator />

          <div class="row items-center justify-between q-py-md">
            <div class="text-weight-bold text-subtitle1">Subtotal</div>
            <div class="text-h6 text-secondary">
              S/ {{ toCurrency(cartStore.getCart?.subtotal ?? 0) }}
            </div>
          </div>

          <q-btn
            class="full-width bg-primary text-white q-py-md"
            type="submit"
            flat
            color="primary"
            label="comprar"
          />
        </q-card-section>
      </div>
    </q-form>
  </q-drawer>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useCartStore } from 'src/stores/cart-store';
import CartProductCard from './CartProductCard.vue';
import { useHelpers } from 'src/composables/helpers';
import type { CartResponse, Item } from 'src/types/cart-response';

const cartStore = useCartStore();
const { toCurrency } = useHelpers();
const items = ref<Item[]>([]);

const onClose = (): void => {
  cartStore.cartDrawer = false;
};

watch(
  () => cartStore.getCart,
  (newValue: CartResponse | null) => {
    if (newValue) {
      items.value = newValue.items;
    }
  },
);
</script>
<style lang="scss">
.quantity-control {
  border: 1px solid black;
}

.btn-update-quantity {
  border: 1px solid var(--q-primary);
}
</style>
