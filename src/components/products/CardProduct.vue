<template>
  <div class="full-width full-height">
    <q-card
      @click="router.push(`/product/${product.slug}`)"
      flat
      class="column product-card cursor-pointer full-height"
    >
      <div class="col">
        <q-card-section class="relative-position section-image">
          <q-img
            class="relative-position"
            style="height: 280px"
            fit="contain"
            spinner-color="grey"
            :src="currentImage"
          />

          <template v-if="product.variants.length > 1">
            <div class="nav-btn-product btn-left">
              <q-btn
                :disable="disablePreviusVariant"
                @click.stop="onReduceActiveIndex()"
                flat
                round
                class="btn-prev-product bg-light-blue-6 text-white"
                icon="keyboard_arrow_left"
              />
            </div>
            <div class="nav-btn-product btn-right">
              <q-btn
                :disable="disableNextVariant"
                @click.stop="onIncrementActiveIndex()"
                flat
                round
                class="btn-next-product bg-light-blue-6 text-white"
                icon="keyboard_arrow_right"
              />
            </div>
          </template>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-badge class="q-px-md q-py-xs" rounded color="primary" :label="product.brand.name" />

          <div class="text-subtitle1 q-my-sm text-grey-10" style="line-height: 20px">
            {{ product.name }}
          </div>
          <div class="row items-center q-col-gutter-x-sm text-secondary">
            <div>
              <q-avatar
                size="xs"
                :style="{ backgroundColor: currentColor?.hex }"
                style="border: 1px solid #696969"
              />
            </div>
            <div>{{ currentColor?.name }}</div>
            <div v-if="product.usesTechnicalVariants">
              {{ '- ' + currentStorage?.ram + ' + ' + currentStorage?.storage }}
            </div>
          </div>
          <div class="text-h6 fw-500 fs-18 text-secondary">
            S/ {{ toCurrency(product.variants[activeIndex]?.price ?? 0) }}
          </div>
        </q-card-section>
      </div>

      <div>
        <q-card-section class="q-pb-md">
          <q-btn
            @click.stop="onAddProductToCart"
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
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useHelpers } from 'src/composables/helpers';
import { useStorage } from 'src/composables/storage';
import { useNotify } from 'src/composables/notify';
import { useCartStore } from 'src/stores/cart-store';
import { useMainStore } from 'src/stores/main-store';
import type { Product } from 'src/types/product';
import type { VerifyStockAndUpdateRequest } from 'src/types/verify-stock-update-request';
import { StockUpdateMode } from 'src/types/stock-update-mode';

const props = defineProps<{ product: Product }>();

const mainStore = useMainStore();
const cartStore = useCartStore();
const { toCurrency, onSpinner, handleApiError } = useHelpers();
const { getStorage } = useStorage();
const { notifySuccess } = useNotify();

const router = useRouter();
const activeIndex = ref(0);
const variantsLength = ref(props.product.variants.length);

const currentImage = computed(() => {
  const variantByActiveIndex = props.product.variants[activeIndex.value];
  console.log(variantByActiveIndex);
  const findImage = props.product.colorImages.find(
    (colorImage) => colorImage.color.id === variantByActiveIndex?.color?.id,
  )?.url;
  return findImage;
});

const currentColor = computed(() => {
  return props.product.variants[activeIndex.value]?.color;
});

const currentStorage = computed(() => {
  const variantByActiveIndex = props.product.variants[activeIndex.value];
  return variantByActiveIndex;
});

const disablePreviusVariant = computed(() => {
  return activeIndex.value === 0;
});

const disableNextVariant = computed(() => {
  return activeIndex.value === variantsLength.value - 1;
});

const onAddProductToCart = async () => {
  const payload: VerifyStockAndUpdateRequest = {
    mode: StockUpdateMode.ADD,
    cartId: '',
    variantId: props.product.variants[activeIndex.value]!.id,
    quantity: 1,
  };

  const cartId = getStorage('cartId');

  if (typeof cartId === 'string') {
    payload.cartId = cartId;
  }

  onSpinner(true);
  try {
    await cartStore.verifyStockAndUpdateCart(payload);
    notifySuccess('El producto fue agregado al carrito');
    mainStore.cartDrawer = true;
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};

const onReduceActiveIndex = () => {
  if (activeIndex.value > 0) {
    activeIndex.value--;
  }
};

const onIncrementActiveIndex = () => {
  if (activeIndex.value < variantsLength.value - 1) {
    activeIndex.value++;
  }
};
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

.nav-btn-product {
  position: absolute;
  top: 50%;
  transform: translateY(-50%) scale(0.85);
  z-index: 100;

  opacity: 0;
  pointer-events: none;

  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.section-image:hover .nav-btn-product {
  opacity: 1;
  transform: translateY(-50%) scale(1);
  pointer-events: auto;
}

.nav-btn-product.btn-left {
  left: 8px;
}

.nav-btn-product.btn-right {
  right: 8px;
}
</style>
