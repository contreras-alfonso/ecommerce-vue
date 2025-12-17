<template>
  <q-drawer
    @hide="onClose"
    v-model="mainStore.cartDrawer"
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
              Mi carrito <span class="text-weight-regular">({{ products.length }})</span>
              <q-spinner class="q-ml-sm" color="primary" />
            </div>
            <q-btn @click="onClose" icon="close" color="grey-6" size="md" round flat />
          </div>
        </q-card-section>

        <q-separator />

        <q-scroll-area class="col">
          <q-card-section class="q-mt-md q-pa-none">
            <template v-if="products.length > 0">
              <div class="row q-col-gutter-y-sm">
                <div class="col-12" v-for="product in products" :key="product.id">
                  <CartProductCard :product="product" />
                </div>
              </div>
            </template>
            <template v-else>
              <div class="column items-center justify-center">
                <q-img src="/svg/empty-cart.svg" width="400px" />
                <div class="q-mt-md">No hay artículos en tu carrito de compras</div>
              </div>
            </template>
          </q-card-section>
        </q-scroll-area>

        <q-card-section class="q-px-none q-pb-none">
          <q-separator />

          <div class="row items-center justify-between q-py-md">
            <div class="text-weight-bold text-subtitle1">Subtotal</div>
            <div class="text-h6 text-secondary">S/ 562.50</div>
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
import { ref } from 'vue';
import { uid } from 'quasar';
import { useMainStore } from 'src/stores/main-store';
import CartProductCard from './CartProductCard.vue';
import type { ProductCart } from 'src/types/product-cart';

const mainStore = useMainStore();
const products = ref<ProductCart[]>([
  {
    id: uid(),
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/c/e/cerave_pack_473ml_2.png',
    name: 'Pack ISDIN Fotoprotector Fusion Water Magic x3',
    price: 189.9,
    quantity: 1,
  },
  {
    id: uid(),
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/p/a/pack_antiedad.png',
    name: 'Serum La Roche-Posay Hyalu B5',
    price: 169.0,
    quantity: 1,
  },
  {
    id: uid(),
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/6/9/69767_-_sun_oil_control_0.jpg',
    name: 'Pack Serum Vichy Minéral 89 x2',
    price: 199.9,
    quantity: 1,
  },
  {
    id: uid(),
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/a/n/anthelios_d_o_pack_la_roche_posay.png',
    name: 'Serum Eucerin Hyaluron-Filler Concentrado',
    price: 154.5,
    quantity: 1,
  },
]);

const onClose = (): void => {
  mainStore.cartDrawer = false;
};
</script>
<style lang="scss">
.quantity-control {
  border: 1px solid black;
}

.btn-update-quantity {
  border: 1px solid var(--q-primary);
}
</style>
