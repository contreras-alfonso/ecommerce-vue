<template>
  <div>
    <div class="text-h4 text-weight-bold">{{ localProduct?.name }}</div>
    <div class="row items-center q-col-gutter-x-sm">
      <div v-if="localProduct?.usesTechnicalVariants" class="text-grey-8 text-subtitle1">
        {{ selectedVariant?.ram }} + {{ selectedVariant?.storage }}
      </div>
      <div v-if="localProduct?.usesTechnicalVariants">
        <q-separator style="height: 13px" vertical></q-separator>
      </div>
      <div class="text-grey-8 text-subtitle1">{{ selectedVariant?.color.name ?? '' }}</div>
    </div>
  </div>

  <div class="row items-center justify-between">
    <div class="text-h5 text-weight-bold text-secondary">
      S/ {{ toCurrency(selectedVariant?.price ?? 0) }}
    </div>
    <div class="row items-center q-col-gutter-x-sm">
      <div><q-avatar size="10px" class="bg-green-8"></q-avatar></div>
      <div class="text-secondary text-caption">Stock disponible.</div>
    </div>
  </div>

  <div v-if="localProduct?.usesTechnicalVariants">
    <div class="text-h6 q-mb-sm">Almacenamiento</div>
    <div class="row q-col-gutter-y-sm">
      <div
        @click="selectedVariantKey = `${variant.ram}-${variant.storage}`"
        class="col-12"
        v-for="variant in uniqueVariants"
        :key="`${variant.ram}-${variant.storage}`"
      >
        <div
          :class="{
            'container-attribute-selected':
              selectedVariantKey === `${variant.ram}-${variant.storage}`,
          }"
          class="container-attribute rounded-borders cursor-pointer"
        >
          <div class="row q-pa-md">
            <div class="col">{{ variant.ram }} + {{ variant.storage }}</div>
            <div class="text-secondary text-weight-bold">S/ {{ toCurrency(variant.price) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="text-h6 q-mb-sm">Color</div>
    <div class="row q-col-gutter-sm">
      <div
        @click="selectedColorId = color.id"
        class="col-4"
        v-for="color in availableColors"
        :key="color.id!"
      >
        <div
          :class="{
            'container-attribute-selected': selectedColorId === color.id,
          }"
          class="container-attribute rounded-borders cursor-pointer"
        >
          <div class="row items-center q-pa-md q-col-gutter-y-sm">
            <div class="col-12 text-center">
              <q-avatar
                size="md"
                :style="{ backgroundColor: color.hex }"
                style="border: 1px solid #696969"
              ></q-avatar>
            </div>
            <div class="col-12 text-center">{{ color.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row items-center q-col-gutter-x-sm">
    <div class="col-grow">
      <div class="row items-center quantity-control w-fit">
        <q-btn @click="onDecreaseQuantity" class="no-border-radius q-pa-md" flat icon="remove" />
        <InputElement
          style="width: 60px"
          :model-value="quantity"
          @update:model-value="(val: number) => (quantity = val)"
          icon-color="grey"
          :outlined="true"
          :length-required="11"
          time="1500"
          bg-color="grey-2"
          no-border
          text-center
          is-square
        />
        <q-btn @click="onIncreaseQuantity" class="no-border-radius q-pa-md" flat icon="add" />
      </div>
    </div>
    <div class="col">
      <q-btn
        @click="console.log(selectedVariant)"
        class="full-width bg-primary text-white text-weight-regular q-py-md"
        flat
        color="primary"
        label="Agregar al carrito"
      />
    </div>

    <div class="col-grow">
      <q-btn flat class="bg-grey-3 text-primary q-pa-md" icon="favorite_border"></q-btn>
    </div>
  </div>

  <div>
    <q-separator spaced></q-separator>
  </div>

  <div class="row q-col-gutter-y-sm">
    <div class="col-12" v-for="benefit in benefits" :key="benefit.title">
      <div class="row items-center q-col-gutter-x-xs">
        <div class="col-grow">
          <q-icon size="20px" :name="`img:${benefit.img}`" />
        </div>
        <div class="col">{{ benefit.title }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import type { Benefit } from 'src/types/benefit';
import type { Product, Variant } from 'src/types/product';
import { useHelpers } from 'src/composables/helpers';
import type { Color } from 'src/types/color';

const emit = defineEmits(['onSelectVariant']);
const props = defineProps<{ product: Product | null }>();

const { toCurrency } = useHelpers();
const localProduct = ref<Product | null>(props.product);

const onDecreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const onIncreaseQuantity = () => {
  quantity.value++;
};

const uniqueVariants = computed(() => {
  const map = new Map<string, Variant>();

  localProduct.value?.variants.forEach((variant) => {
    const key = `${variant.ram}-${variant.storage}`;

    if (!map.has(key)) {
      map.set(key, variant);
    }
  });

  return Array.from(map.values());
});

const variantsBySelection = computed(() => {
  if (!selectedVariantKey.value || !localProduct.value) return [];

  const [ram, storage] = selectedVariantKey.value.split('-');

  return localProduct.value.variants.filter((v) => v.ram === ram && v.storage === storage);
});

const availableColors = computed(() => {
  const map = new Map<string, Color>();

  variantsBySelection.value.forEach((v) => {
    if (!map.has(v.color.id!)) {
      map.set(v.color.id!, v.color);
    }
  });

  return Array.from(map.values());
});

const selectedVariant = computed<Variant | null>(() => {
  if (!selectedVariantKey.value || !selectedColorId.value || !localProduct.value) return null;

  const [ram, storage] = selectedVariantKey.value.split('-');

  return (
    localProduct.value.variants.find(
      (v) => v.ram === ram && v.storage === storage && v.color.id === selectedColorId.value,
    ) ?? null
  );
});

const selectedVariantKey = ref<string | null>(null);
const selectedColorId = ref<string | null>(null);

const quantity = ref(1);

const benefits = ref<Benefit[]>([
  {
    img: '/svg/gift.svg',
    title: 'Disfruta de un regalo GRATIS con tu compra. Cantidad limitada.',
  },
  {
    img: '/svg/verify.svg',
    title: 'Política de devolución de 15 días.',
  },
  {
    img: '/svg/security.svg',
    title: 'Compra 100% segura.',
  },
  {
    img: '/svg/shipment.svg',
    title: 'Envíos rápidos y seguros.',
  },
]);

watch(
  () => props.product!,
  (val: Product) => {
    if (val) {
      localProduct.value = val;
    }
  },
);

watch(
  () => localProduct.value,
  (product) => {
    if (!product || !product.variants.length) return;

    const first = product.variants[0];
    selectedVariantKey.value = `${first?.ram}-${first?.storage}`;
  },
);

watch(
  () => variantsBySelection.value,
  (variants) => {
    if (!variants.length) {
      selectedColorId.value = null;
      return;
    }
    selectedColorId.value = variants[0]?.color?.id ?? '';
  },
);

watch(
  () => selectedVariant.value,
  (val) => {
    emit('onSelectVariant', val);
  },
);
</script>

<style lang="scss" scoped>
.container-attribute {
  border: 1px solid #cacaca;
}

.container-attribute-selected {
  border: 2px solid black;
}
</style>
