<template>
  <div class="q-mt-md">
    <div class="text-uppercase text-weight-regular">Filtrar <q-icon name="tune"></q-icon></div>
    <q-separator spaced></q-separator>
    <div class="text-uppercase">
      Precio:
      <span class="text-secondary">S/ {{ localBaseMinPrice }}</span>
      <span class="text-secondary"> - S/ {{ localBaseMaxPrice }}</span>
    </div>
    <template v-if="totalElements > 1">
      <q-range
        label
        v-model="appliedFilters.rangePrice"
        :min="localBaseMinPrice"
        :max="localBaseMaxPrice"
        color="light-blue-6

"
      />
      <div class="row items-center justify-between">
        <div class="text-caption">Aplicar filtro</div>
        <div>
          <q-btn
            @click="onChangeRangePrice"
            flat
            class="bg-light-blue-6 text-white"
            size="sm"
            label="Aplicar"
          />
        </div>
      </div>
    </template>

    <q-separator spaced></q-separator>

    <div class="text-uppercase">Marcas</div>
    <div class="column">
      <q-radio
        v-for="brand in availableBrands"
        :key="brand.id"
        @update:model-value="onChangeBrand"
        v-model="appliedFilters.brand"
        :val="brand.id"
        :label="`${brand.name}  (${brand.count})`"
        color="light-blue-6"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PriceRange } from 'src/types/price-range';
import type { BrandElement } from 'src/types/product-search-response';
import { ref, watch } from 'vue';

const emit = defineEmits(['onChangeRangePrice', 'onChangeBrand']);

const props = defineProps<{
  rangePrice: PriceRange;
  availableBrands: BrandElement[];
  selectedBrand: string;
  baseMaxPrice: number;
  baseMinPrice: number;
  totalElements: number;
}>();

const localBaseMinPrice = ref(props.baseMinPrice);
const localBaseMaxPrice = ref(props.baseMaxPrice);

const appliedFilters = ref({
  brand: props.selectedBrand,
  rangePrice: props.rangePrice,
});

const onChangeRangePrice = (): void => {
  emit('onChangeRangePrice', appliedFilters.value.rangePrice);
};

const onChangeBrand = (brands: string[]): void => {
  emit('onChangeBrand', brands);
};

watch(
  () => props.selectedBrand,
  (val: string) => {
    appliedFilters.value.brand = val;
  },
);

watch(
  () => props.rangePrice,
  (val: PriceRange) => {
    appliedFilters.value.rangePrice = val;
  },
);

watch(
  () => props.baseMinPrice,
  (val: number) => {
    localBaseMinPrice.value = val;
  },
);

watch(
  () => props.baseMaxPrice,
  (val: number) => {
    localBaseMaxPrice.value = val;
  },
);
</script>
<style lang="scss" scoped></style>
