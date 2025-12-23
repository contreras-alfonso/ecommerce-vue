<template>
  <q-page class="q-py-xl q-px-md" v-if="loading.product">
    <ProductDetailSkeleton />
  </q-page>
  <q-page v-else class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-10 col-12 q-gutter-y-md">
        <template v-if="product?.id">
          <div>
            <BreadCrum :title="product?.name ?? ''" />
          </div>

          <div class="row q-col-gutter-x-xl">
            <div class="col-6">
              <product-images-slider :images="getImagesBySelectedVariant ?? []" />
            </div>

            <div class="col-6">
              <div class="row items-center justify-center">
                <div class="col-md-10 col-lg-9 col-12 q-col-gutter-y-md">
                  <ProductDetail
                    :product="product"
                    @on-select-variant="onSelectVariant"
                    @on-add-product-to-cart="onAddProductToCart"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="q-mt-xl">
            <ProductCharacteristics :characteristics="product?.description ?? ''" />
          </div>
        </template>
        <template v-else>
          <div class="col-md-10 col-12 q-gutter-y-md">
            <div
              style="border-left: 3px solid #03a9f4"
              class="bg-light-blue-2 q-py-sm q-px-sm text-caption"
            >
              <q-icon name="dangerous" size="sm" color="light-blue-6"></q-icon>
              <span class="q-ml-sm">No pudimos encontrar el producto que buscas.</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import ProductCharacteristics from 'src/components/products/ProductCharacteristics.vue';
import ProductDetail from 'src/components/products/ProductDetail.vue';
import ProductImagesSlider from 'src/components/products/ProductImagesSlider.vue';
import BreadCrum from 'src/components/shared/BreadCrum.vue';
import ProductDetailSkeleton from 'src/components/products/ProductDetailSkeleton.vue';
import { useProductStore } from 'src/stores/product-store';
import { useCartStore } from 'src/stores/cart-store';
import { useMainStore } from 'src/stores/main-store';
import { useStorage } from 'src/composables/storage';
import type { Product, Variant } from 'src/types/product';
import type { VerifyStockAndUpdateRequest } from 'src/types/verify-stock-update-request';
import { StockUpdateMode } from 'src/types/stock-update-mode';
import { useHelpers } from 'src/composables/helpers';
import { useNotify } from 'src/composables/notify';

const { getStorage } = useStorage();
const { onSpinner, handleApiError } = useHelpers();
const { notifySuccess } = useNotify();
const route = useRoute();
const selectedVariant = ref<Variant | null>(null);

const mainStore = useMainStore();
const cartStore = useCartStore();
const productStore = useProductStore();

const productSlug = ref<string | null>(null);
const product = ref<Product | null>(null);
const loading = ref({
  product: false,
});

const getImagesBySelectedVariant = computed(() => {
  const findImages = product.value?.colorImages
    .filter((colorImage) => colorImage.color.id === selectedVariant.value?.color.id)
    .map((colorImage) => colorImage.url);
  return findImages;
});

onMounted(async () => {
  onSetProductSlug();
  await onLoad();
});

const onLoad = async () => {
  loading.value.product = true;
  await Promise.all([fetchProductById()])
    .then(() => {})
    .finally(() => {
      loading.value.product = false;
    });
};

const onAddProductToCart = async (quantity: number) => {
  const payload: VerifyStockAndUpdateRequest = {
    mode: StockUpdateMode.ADD,
    cartId: '',
    variantId: selectedVariant.value!.id,
    quantity,
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

const onSelectVariant = (value: Variant | null) => {
  selectedVariant.value = value;
};
const onSetProductSlug = () => {
  if (route.params.productSlug) {
    if (typeof route.params.productSlug === 'string') {
      productSlug.value = route.params.productSlug;
    }
  }
};

const fetchProductById = async () => {
  await productStore.fetchById(productSlug.value!);
};

const onClearData = () => {
  product.value = null;
  selectedVariant.value = null;
};

watch(
  () => productStore.product,
  (val: Product | null) => {
    if (val) {
      product.value = val;
    }
  },
);

watch(
  () => route.params.productSlug,
  async () => {
    onClearData();
    onSetProductSlug();
    await onLoad();
  },
);
</script>
<style lang="scss"></style>
