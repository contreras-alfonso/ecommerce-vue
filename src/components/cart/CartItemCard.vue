<template>
  <template v-if="isToMarkupTable">
    <td class="text-left">
      <div class="row items-center">
        <div>
          <q-img
            @click="
              (router.push(`/product/${localItem.productSlug}`), (cartStore.cartDrawer = false))
            "
            loading="lazy"
            spinner-color="grey"
            spinner-size="sm"
            :src="localItem.imageUrl"
            width="80px"
            class="cursor-pointer"
          />
        </div>
        <div class="text-subtitle1">{{ localItem.productName }}</div>
      </div>
    </td>
    <td class="text-center">
      <div class="text-subtitle2">S/ {{ toCurrency(localItem.price) }}</div>
    </td>
    <td class="text-center">
      <div class="row items-center justify-center q-col-gutter-y-sm">
        <div class="w-fit">
          <div class="row items-center quantity-control">
            <q-btn
              @click="onDecreaseQuantity"
              size="sm"
              class="no-border-radius"
              flat
              icon="remove"
            />
            <InputElement
              style="width: 60px"
              dense
              :model-value="localItem.quantity"
              @update:model-value="(val: number) => (localItem.quantity = val)"
              icon-color="grey"
              :outlined="true"
              :length-required="11"
              bg-color="grey-2"
              no-border
              text-center
              is-square
              input-height="30px"
            />
            <q-btn @click="onIncreaseQuantity" size="sm" class="no-border-radius" flat icon="add" />
          </div>
        </div>

        <div v-if="showUpdateButton" class="col-12">
          <q-btn
            @click="onUpdateStock(false)"
            flat
            no-caps
            color="primary"
            label="Actualizar"
            class="btn-update-quantity text-black"
            size="sm"
          ></q-btn>
        </div>
      </div>
    </td>
    <td class="text-center">
      <div class="text-weight-bold text-subtitle1">S/ {{ toCurrency(localItem.subtotal) }}</div>
    </td>
    <td class="text-right">
      <q-btn
        @click="onRemoveItemFromCart(localItem.variantId)"
        round
        size="sm"
        icon="close"
        class="bg-grey-3 text-grey-6"
        flat
      ></q-btn>
    </td>
  </template>

  <div v-else class="row justify-between q-col-gutter-x-md q-mb-md">
    <div class="col">
      <div class="row items-center q-col-gutter-x-md">
        <div class="col-grow">
          <q-img
            @click="
              (router.push(`/product/${localItem.productSlug}`), (cartStore.cartDrawer = false))
            "
            loading="lazy"
            spinner-color="grey"
            spinner-size="sm"
            :src="localItem.imageUrl"
            width="80px"
            class="cursor-pointer"
          />
        </div>
        <div class="col">
          <div class="text-subtitle1 q-mb-md">{{ localItem.productName }}</div>
          <div class="row items-center q-col-gutter-x-sm">
            <div class="w-fit">
              <div class="row items-center quantity-control">
                <q-btn
                  @click="onDecreaseQuantity"
                  size="sm"
                  class="no-border-radius"
                  flat
                  icon="remove"
                />
                <InputElement
                  style="width: 60px"
                  dense
                  :model-value="localItem.quantity"
                  @update:model-value="(val: number) => (localItem.quantity = val)"
                  icon-color="grey"
                  :outlined="true"
                  :length-required="11"
                  bg-color="grey-2"
                  no-border
                  text-center
                  is-square
                  input-height="30px"
                />
                <q-btn
                  @click="onIncreaseQuantity"
                  size="sm"
                  class="no-border-radius"
                  flat
                  icon="add"
                />
              </div>
            </div>

            <div>
              <q-btn
                v-if="showUpdateButton"
                @click="onUpdateStock()"
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
        <div class="text-subtitle1 text-secondary">S/ {{ toCurrency(localItem.price) }}</div>
        <div>
          <q-btn
            @click="onRemoveItemFromCart(localItem.variantId)"
            round
            size="sm"
            icon="close"
            color="grey-6"
            flat
          ></q-btn>
        </div>
      </div>
    </div>
  </div>

  <q-separator color="grey-2" spaced class="q-my-lg"></q-separator>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, ref, watch } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import { useHelpers } from 'src/composables/helpers';
import { useCartStore } from 'src/stores/cart-store';
import { useNotify } from 'src/composables/notify';
import { useStorage } from 'src/composables/storage';
import type { Item } from 'src/types/cart-response';
import type { RemoveItemFromCartRequest } from 'src/types/remove-item-cart-request';
import type { VerifyStockAndUpdateRequest } from 'src/types/verify-stock-update-request';
import { StockUpdateMode } from 'src/types/stock-update-mode';

const props = defineProps<{
  isToMarkupTable: boolean;
  item: Item;
}>();

const router = useRouter();
const { getStorage } = useStorage();
const cartStore = useCartStore();
const { toCurrency, onSpinner, handleApiError } = useHelpers();
const { notifySuccess } = useNotify();
const localItem = ref<Item>(props.item);

const showUpdateButton = computed(() => {
  return localItem.value.quantity !== localItem.value.baseQuantity;
});

const onUpdateStock = async (showDrawer: boolean = true) => {
  const payload: VerifyStockAndUpdateRequest = {
    mode: StockUpdateMode.REPLACE,
    cartId: '',
    variantId: localItem.value.variantId,
    quantity: localItem.value.quantity,
  };

  const cartId = getStorage('cartId');

  if (typeof cartId === 'string') {
    payload.cartId = cartId;
  }

  onSpinner(true);
  try {
    await cartStore.verifyStockAndUpdateCart(payload);
    notifySuccess('El stock fue acualizado');
    if (showDrawer) cartStore.cartDrawer = true;
  } catch (error) {
    localItem.value.quantity = localItem.value.baseQuantity!;
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};

const onDecreaseQuantity = () => {
  if (localItem.value.quantity > 1) {
    localItem.value.quantity--;
  }
};

const onIncreaseQuantity = () => {
  localItem.value.quantity++;
};

const onRemoveItemFromCart = async (variantId: string) => {
  const payload: RemoveItemFromCartRequest = {
    cartId: '',
    variantId: variantId,
  };

  const cartId = getStorage('cartId');

  if (typeof cartId === 'string') {
    payload.cartId = cartId;
  }

  onSpinner(true);
  try {
    await cartStore.removeItemFromCart(payload);
    notifySuccess('El producto fue eliminado del carrito');
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};

watch(
  () => props.item,
  (newValue) => {
    localItem.value = { ...newValue };
    localItem.value.baseQuantity = newValue.quantity;
  },
  { immediate: true },
);
</script>
<style lang=""></style>
