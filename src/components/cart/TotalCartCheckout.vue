<template>
  <q-card flat class="bg-grey-3 q-pa-md">
    <q-card-section>
      <Title title="Total del carrito" />
    </q-card-section>

    <q-card-section>
      <div class="row items-center justify-between">
        <div>Subtotal</div>
        <div class="text-subtitle2">S/ {{ toCurrency(subtotal) }}</div>
      </div>

      <q-separator spaced color="grey-4"></q-separator>
      <div class="row items-center justify-between">
        <div class="text-weight-bold text-subtitle1">Total</div>
        <div class="text-primary text-weight-bold text-h6">S/ {{ toCurrency(total) }}</div>
      </div>

      <q-separator spaced color="grey-4"></q-separator>

      <q-expansion-item
        header-class="q-px-sm non-selectable"
        icon="discount"
        label="Aplicar código de descuento"
      >
        <div class="q-py-sm">
          <div class="row items-center q-col-gutter-sm">
            <InputElement
              class="col"
              label="Código de descuento"
              dense
              :model-value="discountCode"
              @update:model-value="(val: string) => (discountCode = val)"
              icon-color="grey"
              :outlined="true"
              bg-color="white"
              is-square
            />
            <div>
              <q-btn outline color="primary" class="text-weight-regular q-py-sm" label="Aplicar" />
            </div>
          </div>
        </div>
      </q-expansion-item>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-btn
        class="bg-primary text-white q-px-xl q-py-md full-width text-weight-regular"
        label="Finalizar compra"
        flat
      />
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import Title from 'src/components/administration/Title.vue';
import { useCartStore } from 'src/stores/cart-store';
import { CartResponse } from 'src/types/cart-response';
import { useHelpers } from 'src/composables/helpers';

const cartStore = useCartStore();
const { toCurrency } = useHelpers();

const subtotal = ref(0);
const total = ref(0);
const discountCode = ref('');

watch(
  () => cartStore.getCart,
  (newValue: CartResponse | null) => {
    if (newValue) {
      subtotal.value = newValue.subtotal;
      total.value = newValue.subtotal;
    }
  },
);
</script>
<style lang=""></style>
