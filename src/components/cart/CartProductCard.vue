<template>
  <div class="row justify-between q-col-gutter-x-md q-mb-md">
    <div class="col">
      <div class="row items-center q-col-gutter-x-md">
        <div class="col-grow">
          <q-img
            loading="lazy"
            spinner-color="grey"
            spinner-size="sm"
            :src="productCard.img"
            width="80px"
          />
        </div>
        <div class="col">
          <div class="text-subtitle1 q-mb-md">{{ productCard.name }}</div>
          <div class="row items-center q-col-gutter-x-sm">
            <div class="w-fit">
              <div class="row items-center quantity-control">
                <q-btn size="sm" class="no-border-radius" flat icon="remove" />
                <InputElement
                  style="width: 60px"
                  dense
                  :model-value="productCard.quantity"
                  @update:model-value="(val: number) => (productCard.quantity = val)"
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
        <div class="text-subtitle1 text-secondary">S/ {{ productCard.price }}</div>
        <div><q-btn round size="sm" icon="close" color="grey-6" flat></q-btn></div>
      </div>
    </div>
  </div>

  <q-separator color="grey-2" spaced class="q-my-lg"></q-separator>
</template>
<script setup lang="ts">
import InputElement from 'src/components/elements/Input.vue';
import type { ProductCard } from 'src/types/product-card';
import { ref, watch } from 'vue';

const props = defineProps<{
  product: ProductCard;
}>();

const productCard = ref<ProductCard>(props.product);

watch(
  () => props.product,
  (newValue) => {
    productCard.value = newValue;
  },
);
</script>
<style lang=""></style>
