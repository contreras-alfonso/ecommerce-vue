<template>
  <div class="q-mt-md">
    <div class="text-uppercase text-weight-regular">Filtrar <q-icon name="tune"></q-icon></div>
    <q-separator spaced></q-separator>
    <div class="text-uppercase">
      Precio:
      <span class="text-secondary">S/ {{ appliedFilters.rangePrice.min }}</span>
      <span class="text-secondary" v-if="totalElements > 1">
        - S/ {{ appliedFilters.rangePrice.max }}</span
      >
    </div>
    <template v-if="totalElements > 1">
      <q-range
        label
        v-model="appliedFilters.rangePrice"
        :min="baseMinPrice"
        :max="baseMaxPrice"
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
      <q-checkbox
        @update:model-value="onChangeBrands"
        v-for="brand in availableBrands"
        :key="brand.id"
        v-model="appliedFilters.brands"
        :val="brand.id"
        :label="`${brand.name}  (${brand.count})`"
        size="sm"
        color="light-blue-6"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PriceRange } from 'src/types/price-range';
import type { BrandElement } from 'src/types/product-search-response';
import { ref, watch } from 'vue';

const emit = defineEmits(['onChangeRangePrice', 'onChangeBrands']);

const props = defineProps<{
  rangePrice: PriceRange;
  availableBrands: BrandElement[];
  selectedBrands: string[];
  baseMaxPrice: number;
  baseMinPrice: number;
  totalElements: number;
}>();

const appliedFilters = ref({
  brands: props.selectedBrands,
  rangePrice: props.rangePrice,
});

const onChangeRangePrice = (): void => {
  emit('onChangeRangePrice', appliedFilters.value.rangePrice);
};

const onChangeBrands = (brands: string[]): void => {
  emit('onChangeBrands', brands);
};

watch(
  () => props.selectedBrands,
  (val: string[]) => {
    appliedFilters.value.brands = val;
  },
);

watch(
  () => props.selectedBrands,
  (val: string[]) => {
    appliedFilters.value.brands = val;
  },
);

watch(
  () => props.rangePrice,
  (val: PriceRange) => {
    appliedFilters.value.rangePrice = val;
  },
);
</script>
<style lang="scss" scoped></style>
