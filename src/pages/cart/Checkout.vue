<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-10 col-12 q-gutter-y-md">
        <div>
          <BreadCrum title="Mi carrito" />
        </div>

        <Title title="Mi carrito" />
        <div class="row q-col-gutter-x-xl">
          <div class="col-8">
            <MarkupItemsCheckout />
          </div>
          <div class="col-4">
            <TotalCartCheckout />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Title from 'src/components/administration/Title.vue';
import MarkupItemsCheckout from 'src/components/cart/MarkupItemsCheckout.vue';
import TotalCartCheckout from 'src/components/cart/TotalCartCheckout.vue';
import BreadCrum from 'src/components/shared/BreadCrum.vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useCartStore } from 'src/stores/cart-store';
import { useStorage } from 'src/composables/storage';
import { FindActiveCartGuest } from 'src/types/find-active-cart-guest';

const authStore = useAuthStore();
const cartStore = useCartStore();
const { getStorage } = useStorage();

const loading = ref({
  cart: false,
});

onMounted(async () => {
  await onLoad();
});

const onLoad = async () => {
  await Promise.all([fetchActiveCart()])
    .then(() => {})
    .finally(() => {});
};

const fetchActiveCart = async () => {
  if (authStore.isAuthenticated) {
    loading.value.cart = true;
    try {
      await cartStore.fetchActiveCart();
    } catch (error) {
      console.error(error);
    } finally {
      loading.value.cart = false;
    }
  } else {
    const payload: FindActiveCartGuest = {
      cartId: '',
    };

    const cartId = getStorage('cartId');

    if (typeof cartId === 'string') {
      payload.cartId = cartId;
      loading.value.cart = true;
      try {
        await cartStore.fetchActiveCartGuest(payload);
      } catch (error) {
        console.error(error);
      } finally {
        loading.value.cart = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
