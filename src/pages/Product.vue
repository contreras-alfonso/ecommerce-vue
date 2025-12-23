<template>
  <q-page class="q-py-xl q-px-md" v-if="loading.product">
    <ProductDetailSkeleton />
  </q-page>
  <q-page v-else class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-10 col-12 q-gutter-y-md">
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
                <ProductDetail :product="product" @on-select-variant="onSelectVariant" />
              </div>
            </div>
          </div>
        </div>

        <div class="q-mt-xl">
          <ProductCharacteristics :characteristics="product?.description ?? ''" />
        </div>
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
import type { Product, Variant } from 'src/types/product';

const route = useRoute();
const selectedVariant = ref<Variant | null>(null);

const getImagesBySelectedVariant = computed(() => {
  const findImages = product.value?.colorImages
    .filter((colorImage) => colorImage.color.id === selectedVariant.value?.color.id)
    .map((colorImage) => colorImage.url);
  return findImages;
});

const productSlug = ref<string | null>(null);
const product = ref<Product | null>(null);
const productStore = useProductStore();
const loading = ref({
  product: false,
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

watch(
  () => productStore.product,
  (val: Product | null) => {
    if (val) {
      product.value = val;
    }
  },
);
</script>
<style lang="scss"></style>
