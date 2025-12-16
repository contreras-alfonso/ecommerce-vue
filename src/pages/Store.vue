<template>
  <q-page class="q-py-lg q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-10 col-12 q-gutter-y-md">
        <div>
          <BreadCrum title="Celulares" />
        </div>

        <div class="row q-col-gutter-x-xl">
          <div class="col-2">
            <div class="text-h5 text-weight-bold">Celulares</div>
            <ProductFilter
              :range-price="filters.rangePrice"
              :brands="options.brand"
              @onChangeRangePrice="onChangeRangePrice"
              @onChangeBrands="onChangeBrands"
            />
          </div>

          <div class="col-10">
            <div class="row items-center justify-between">
              <div class="text-secondary">120 productos encontrados</div>
              <div class="row items-center q-col-gutter-x-sm">
                <div class="text-secondary">Ordenar por:</div>
                <div>
                  <SelectElement
                    dense
                    style="width: 200px"
                    :model-value="filters.orderBy"
                    @update:model-value="(val: string) => onChangeOrderBy(val)"
                    :options="options.orderBy"
                    :outlined="true"
                    is-square
                    :is-clearable="false"
                    border-black
                    :use-input="false"
                  />
                </div>
              </div>
            </div>

            <div class="q-mt-lg">
              <div class="row q-col-gutter-lg">
                <div class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="product in products" :key="product.id">
                  <card-product :product="product" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-center q-py-md">
          <Pagination :current-page="filters.page" @onChangePage="onChangePage" />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { uid } from 'quasar';
import BreadCrum from 'src/components/shared/BreadCrum.vue';
import SelectElement from 'src/components/elements/Select.vue';
import CardProduct from 'src/components/products/CardProduct.vue';
import ProductFilter from 'src/components/products/ProductFilter.vue';
import type { SelectOption } from 'src/types/select.option';
import type { Product } from 'src/types/product';
import type { PriceRange } from 'src/types/price-range';
import { useNotify } from 'src/composables/notify';
import { useHelpers } from 'src/composables/helpers';
import Pagination from 'src/components/shared/Pagination.vue';
import type { Filters } from 'src/types/filters';
import type { ProductQuery } from 'src/types/product-query';

const router = useRouter();
const route = useRoute();
const { notifySuccess, notifyError } = useNotify();
const { onSpinner } = useHelpers();

const filters = ref<Filters>({
  orderBy: 'MAYOR_MENOR',
  rangePrice: {
    min: 0,
    max: 35,
  },
  brand: [],
  page: 1,
});

const defaultFilters = ref<Filters>({
  orderBy: 'MAYOR_MENOR',
  rangePrice: {
    min: 0,
    max: 35,
  },
  brand: [],
  page: 1,
});

const products = ref<Product[]>([
  {
    id: uid(),
    brand: 'La Roche Posay',
    name: 'Trio La Roche Posay Pack Antiedad',
    price: 575.7,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/l/a/la_roche_posay_vitamina_c_y_hyalu.png',
  },
  {
    id: uid(),
    brand: 'Vichy',
    name: 'Pack Vichy Liftactiv Supreme Día + Noche',
    price: 489.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/a/n/anthelios_d_o_pack_la_roche_posay.png',
  },
  {
    id: uid(),
    brand: 'Eucerin',
    name: 'Eucerin Hyaluron-Filler Sérum Concentrado',
    price: 259.5,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/c/i/cicaplast.png',
  },
  {
    id: uid(),
    brand: 'Bioderma',
    name: 'Bioderma Sensibio Pack Piel Sensible',
    price: 199.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/p/a/pack_hydroboost_refill_x2.png',
  },
  {
    id: uid(),
    brand: 'ISDIN',
    name: 'ISDIN Fotoprotector Fusion Water SPF 50+',
    price: 129.0,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/8/4/8429420279209_3.png',
  },
  {
    id: uid(),
    brand: 'Avene',
    name: 'Avène Cleanance Pack Piel Grasa',
    price: 215.4,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/p/a/pack_neutrogena_hydro_boost_x2.png',
  },
  {
    id: uid(),
    brand: 'Neutrogena',
    name: 'Neutrogena Hydro Boost Water Gel',
    price: 98.9,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/c/_/c_vit_5_serum_x2.png',
  },
  {
    id: uid(),
    brand: 'Cetaphil',
    name: 'Cetaphil Loción Hidratante Piel Sensible',
    price: 87.5,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/6/9/69767_-_sun_oil_control_0.jpg',
  },
  {
    id: uid(),
    brand: 'CeraVe',
    name: 'CeraVe Crema Hidratante Rostro y Cuerpo',
    price: 112.3,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/f/r/frezyderm_fotoprotector_velvet_sin_color_2.png',
  },
  {
    id: uid(),
    brand: 'Uriage',
    name: 'Uriage Eau Thermale Crema Hidratante',
    price: 165.0,
    img: 'https://dermotiendashopping.com/media/catalog/product/cache/005b1827ffff347d76a14824892d2303/f/u/fusin_water_magic_pack.png',
  },
]);

const options = ref<{ orderBy: SelectOption[]; brand: SelectOption[] }>({
  brand: [
    { id: uid(), name: 'Samsung' },
    { id: uid(), name: 'Apple' },
    { id: uid(), name: 'Xiaomi' },
    { id: uid(), name: 'Huawei' },
    { id: uid(), name: 'OnePlus' },
    { id: uid(), name: 'Motorola' },
    { id: uid(), name: 'Oppo' },
    { id: uid(), name: 'Realme' },
    { id: uid(), name: 'Vivo' },
    { id: uid(), name: 'Honor' },
  ],
  orderBy: [
    {
      name: 'De mayor a menor precio',
      id: 'MAYOR_MENOR',
    },
    {
      name: 'De menor a mayor precio',
      id: 'MENOR_PRECIO',
    },
    {
      name: 'Nuevos ingresos',
      id: 'NUEVOS_INGRESOS',
    },
  ],
});

onMounted(() => {
  onSetFiltersFromQuery();
});

const onChangeOrderBy = (orderBy: string): void => {
  filters.value.orderBy = orderBy;
  onUpdateQuery();
  setTimeout(() => {
    onSpinner(false);
  }, 2000);
};

const onChangePage = (page: number): void => {
  filters.value.page = page;
  onUpdateQuery();
  onSpinner(true);
  setTimeout(() => {
    onSpinner(false);
  }, 2000);
};

const onChangeRangePrice = (range: PriceRange): void => {
  filters.value.rangePrice = range;
  onUpdateQuery();
  onSpinner(true);
  setTimeout(() => {
    onSpinner(false);
  }, 2000);
};

const onChangeBrands = (brands: string[]): void => {
  filters.value.brand = brands;
  onUpdateQuery();
  onSpinner(true);
  setTimeout(() => {
    onSpinner(false);
  }, 2000);
  // notifyError('Oops no se pudo aplicar los filtros');
  // notifySuccess('Oops no se pudo aplicar los filtros');
};

const onUpdateQuery = () => {
  const query: ProductQuery = {};

  if (
    filters.value.rangePrice.min !== defaultFilters.value.rangePrice.min ||
    filters.value.rangePrice.max !== defaultFilters.value.rangePrice.max
  ) {
    query.min_price = filters.value.rangePrice.min;
    query.max_price = filters.value.rangePrice.max;
  }

  if (filters.value.brand.length > 0) {
    query.brand = filters.value.brand.join(',');
  }

  if (filters.value.page !== defaultFilters.value.page) {
    query.page = filters.value.page;
  }

  if (filters.value.orderBy !== defaultFilters.value.orderBy) {
    query.order_by = filters.value.orderBy;
  }

  void router.replace({ query });
};

/*const scrollToTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, 500);
};*/

const onSetFiltersFromQuery = (): void => {
  const { min_price, max_price, brand, page, orderBy } = route.query;

  if (min_price && max_price) {
    filters.value.rangePrice = {
      min: Number(min_price),
      max: Number(max_price),
    };
  }

  if (brand) {
    filters.value.brand = String(brand).split(',');
  }

  if (page) {
    filters.value.page = Number(page);
  }

  if (orderBy) {
    filters.value.orderBy = String(orderBy);
  }
};
</script>
<style lang="scss" scoped></style>
