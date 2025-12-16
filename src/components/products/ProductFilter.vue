<template>
  <div class="q-mt-md">
    <div class="text-uppercase text-weight-regular">Filtrar <q-icon name="tune"></q-icon></div>
    <q-separator spaced></q-separator>
    <div class="text-uppercase">Precio</div>
    <q-range
      v-model="filters.rangePrice"
      :min="0"
      :max="50"
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
    <q-separator spaced></q-separator>

    <div class="text-uppercase">Marcas</div>
    <div class="column">
      <q-checkbox
        @update:model-value="onChangeBrands"
        v-for="brand in options.brand"
        :key="brand.id"
        v-model="filters.brand"
        :val="brand.id"
        :label="brand.name"
        size="sm"
        color="light-blue-6
"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PriceRange } from 'src/types/price-range';
import type { SelectOption } from 'src/types/select.option';
import { ref } from 'vue';

const emit = defineEmits(['onChangeRangePrice', 'onChangeBrands']);

const props = defineProps<{
  rangePrice: PriceRange;
  brands: SelectOption[];
}>();

const filters = ref({
  brand: [],
  rangePrice: props.rangePrice,
});

const options = ref({
  brand: props.brands,
});

const onChangeRangePrice = (): void => {
  emit('onChangeRangePrice', filters.value.rangePrice);
};

const onChangeBrands = (brands: string[]): void => {
  emit('onChangeBrands', brands);
};
</script>
<style lang="scss" scoped></style>
