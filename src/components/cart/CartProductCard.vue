<template>
  <div class="row justify-between q-col-gutter-x-md q-mb-md">
    <div class="col">
      <div class="row items-center q-col-gutter-x-md">
        <div class="col-grow">
          <q-img
            loading="lazy"
            spinner-color="grey"
            spinner-size="sm"
            :src="productCart.img"
            width="80px"
          />
        </div>
        <div class="col">
          <div class="text-subtitle1 q-mb-md">{{ productCart.name }}</div>
          <div class="row items-center q-col-gutter-x-sm">
            <div class="w-fit">
              <div class="row items-center quantity-control">
                <q-btn size="sm" class="no-border-radius" flat icon="remove" />
                <InputElement
                  style="width: 60px"
                  dense
                  :model-value="productCart.quantity"
                  @update:model-value="(val: number) => (productCart.quantity = val)"
                  icon-color="grey"
                  :outlined="true"
                  :length-required="11"
                  time="1500"
                  bg-color="grey-2"
                  no-border
                  text-center
                  is-square
                  input-height="30px"
                />
                <q-btn size="sm" class="no-border-radius" flat icon="add" />
              </div>
            </div>

            <div>
              <q-btn
                flat
                no-caps
                color="primary"
                label="Actualizar"
                class="btn-update-quantity text-black"
                size="sm"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-grow">
      <div class="row items-start q-col-gutter-x-sm">
        <div class="text-subtitle1 text-secondary">S/ {{ toCurrency(productCart.price) }}</div>
        <div><q-btn round size="sm" icon="close" color="grey-6" flat></q-btn></div>
      </div>
    </div>
  </div>

  <q-separator color="grey-2" spaced class="q-my-lg"></q-separator>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import type { ProductCart } from 'src/types/product-cart';
import { useHelpers } from 'src/composables/helpers';

const props = defineProps<{
  product: ProductCart;
}>();

const { toCurrency } = useHelpers();
const productCart = ref<ProductCart>(props.product);

watch(
  () => props.product,
  (newValue) => {
    productCart.value = newValue;
  },
);
</script>
<style lang=""></style>
