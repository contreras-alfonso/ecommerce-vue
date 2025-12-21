<template>
  <q-page class="q-py-lg q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-10 col-12 q-gutter-y-md">
        <div>
          <BreadCrum :title="categoryStore.getNameBySlug(categorySlug ?? '') ?? 'No disponible'" />
        </div>

        <div class="row q-col-gutter-x-xl">
          <div class="col-2">
            <div class="text-h5 text-weight-bold text-capitalize">
              {{ categoryStore.getNameBySlug(categorySlug ?? '') ?? 'No disponible' }}
            </div>
            <ProductFilter
              v-if="products.length > 0"
              :available-brands="availableFilters?.brands ?? []"
              :selected-brand="appliedFilters.brand"
              :range-price="appliedFilters.rangePrice"
              :base-min-price="appliedFilters.rangePrice.min ?? 0"
              :base-max-price="appliedFilters.rangePrice.max ?? 0"
              :total-elements="totalElements"
              @onChangeRangePrice="onChangeRangePrice"
              @onChangeBrand="onChangeBrand"
            />
          </div>

          <div v-if="products.length <= 0" class="col-10">
            <div
              style="border-left: 3px solid #03a9f4"
              class="bg-light-blue-2 q-py-sm q-px-sm text-caption"
            >
              <q-icon name="dangerous" size="sm" color="light-blue-6"></q-icon>
              <span class="q-ml-sm">No hay productos disponibles según tu selección actual.</span>
            </div>
          </div>

          <div v-else class="col-10">
            <div
              v-if="(hasChangedRangePrice && hasTouchedFilters.rangePrice) || appliedFilters.brand"
              class="row items-center q-col-gutter-x-sm"
            >
              <div class="bg-grey-3 q-py-sm q-px-md">Filtrando por:</div>
              <div>
                <q-chip
                  v-if="hasChangedRangePrice && hasTouchedFilters.rangePrice"
                  removable
                  @remove="onRemoveFilterRangePrice"
                  color="light-blue-6"
                  text-color="white"
                  icon="search"
                >
                  Precio: S/ {{ appliedFilters.rangePrice.min }} - S/
                  {{ appliedFilters.rangePrice.max }}
                </q-chip>
              </div>

              <div>
                <q-chip
                  v-if="appliedFilters.brand"
                  removable
                  @remove="onChangeBrand('', false)"
                  color="light-blue-6"
                  text-color="white"
                  icon="search"
                >
                  Marca: {{ catalogStore.getBrandNameById(appliedFilters.brand) }}
                </q-chip>
              </div>
            </div>

            <div class="row items-center justify-between">
              <div class="text-secondary">
                {{ totalElements }}
                {{ totalElements === 1 ? 'producto econtrado' : 'productos econtrados' }}
              </div>
              <div class="row items-center q-col-gutter-x-sm">
                <div class="text-secondary">Ordenar por:</div>
                <div>
                  <SelectElement
                    dense
                    style="width: 200px"
                    :model-value="appliedFilters.orderBy"
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
                <div
                  class="col-lg-3 col-md-4 col-sm-6 col-12"
                  v-for="product in products"
                  :key="product.id"
                >
                  <card-product :product="product" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="products.length > 0" class="flex flex-center q-py-md">
          <Pagination
            :current-page="appliedFilters.page"
            :max-pages="totalPages"
            @onChangePage="onChangePage"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';
import { uid } from 'quasar';
import BreadCrum from 'src/components/shared/BreadCrum.vue';
import SelectElement from 'src/components/elements/Select.vue';
import CardProduct from 'src/components/products/CardProduct.vue';
import ProductFilter from 'src/components/products/ProductFilter.vue';
import type { SelectOption } from 'src/types/select-option';
import type { Product } from 'src/types/product';
import type { PriceRange } from 'src/types/price-range';
// import { useNotify } from 'src/composables/notify';
import { useHelpers } from 'src/composables/helpers';
import Pagination from 'src/components/shared/Pagination.vue';
import type { Filters } from 'src/types/filters';
import type { ProductQuery } from 'src/types/product-query';
import type {
  AvailableFilters,
  Pageable,
  ProductSearchResponse,
} from 'src/types/product-search-response';
import { useCatalogStore } from 'src/stores/catalog-store';
import { useCategoryStore } from 'src/stores/category-store';
const categoryStore = useCategoryStore();
const catalogStore = useCatalogStore();
const router = useRouter();
const route = useRoute();
// const { notifySuccess, notifyError } = useNotify();
const { onSpinner } = useHelpers();

const categorySlug = ref<string | null>(null);

const filtersHasRangePrice = ref(false);

const hasTouchedFilters = ref({
  orderBy: false,
  rangePrice: false,
  brand: false,
});

const appliedFilters = ref<Filters>({
  orderBy: 'created_asc',
  rangePrice: {
    min: 0,
    max: 0,
  },
  brand: '',
  page: 1,
});

const defaultFilters = ref<Filters>({
  orderBy: 'created_asc',
  rangePrice: {
    min: 0,
    max: 0,
  },
  brand: '',
  page: 1,
});

const totalElements = ref(0);
const totalPages = ref(0);
const products = ref<Product[]>([]);
const pageable = ref<Pageable | null>(null);
const availableFilters = ref<AvailableFilters | null>(null);

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
      id: 'price_desc',
    },
    {
      name: 'De menor a mayor precio',
      id: 'price_asc',
    },
    {
      name: 'Nuevos ingresos',
      id: 'created_asc',
    },
  ],
});

const hasChangedRangePrice = computed(() => {
  return (
    appliedFilters.value.rangePrice.min !== defaultFilters.value.rangePrice.min ||
    appliedFilters.value.rangePrice.max !== defaultFilters.value.rangePrice.max
  );
});

const queryToSend = computed((): string => {
  let query = '';

  const { page, brand, orderBy, rangePrice } = appliedFilters.value;

  if (appliedFilters.value.page !== defaultFilters.value.page) {
    query += `page=${page - 1}`;
  }
  if (appliedFilters.value.orderBy !== defaultFilters.value.orderBy) {
    query += `&sort=${orderBy}`;
  }
  if (
    (appliedFilters.value.rangePrice.min !== defaultFilters.value.rangePrice.min ||
      appliedFilters.value.rangePrice.max !== defaultFilters.value.rangePrice.max) &&
    hasTouchedFilters.value.rangePrice
  ) {
    query += `&minPrice=${rangePrice.min}&maxPrice=${rangePrice.max}`;
  }

  if (appliedFilters.value.brand.length > 0) {
    query += `&brandId=${brand}`;
  }

  return query;
});

onMounted(async () => {
  onSetCategorySlug();
  onSetFiltersFromQuery();
  await onLoad();
});

const onRemoveFilterRangePrice = async () => {
  //new
  hasTouchedFilters.value.rangePrice = false;
  const rangePrice: PriceRange = {
    min: defaultFilters.value.rangePrice.min,
    max: defaultFilters.value.rangePrice.max,
  };
  await onChangeRangePrice(rangePrice, false);
};

const onSetCategorySlug = () => {
  if (route.params.categorySlug) {
    if (typeof route.params.categorySlug === 'string') {
      categorySlug.value = route.params.categorySlug;
    }
  }
};

const onLoad = async () => {
  onSpinner(true);
  await Promise.all([fetchCatalogByFilters()])
    .then(() => {})
    .finally(() => {
      onSpinner(false);
    });
};

const fetchCatalogByFilters = async () => {
  await catalogStore.fetchByFilters(categorySlug.value!, queryToSend.value);
};

const onChangeOrderBy = async (orderBy: string): Promise<void> => {
  appliedFilters.value.orderBy = orderBy;
  await refreshCatalog();
};

const onChangePage = async (page: number): Promise<void> => {
  appliedFilters.value.page = page;
  await refreshCatalog();
};

const onChangeRangePrice = async (range: PriceRange, touched: boolean = true): Promise<void> => {
  // new
  hasTouchedFilters.value.rangePrice = touched;
  appliedFilters.value.rangePrice = range;
  await refreshCatalog();
};

const onChangeBrand = async (brand: string, touched: boolean = true): Promise<void> => {
  // new
  hasTouchedFilters.value.brand = touched;
  appliedFilters.value.brand = brand;
  await refreshCatalog();
};

const refreshCatalog = async () => {
  await onUpdateQuery();
  onSpinner(true);
  await fetchCatalogByFilters();
  onSpinner(false);
};

const onUpdateQuery = async () => {
  const query: ProductQuery = {};
  if (
    (appliedFilters.value.rangePrice.min !== defaultFilters.value.rangePrice.min ||
      appliedFilters.value.rangePrice.max !== defaultFilters.value.rangePrice.max) &&
    hasTouchedFilters.value.rangePrice
  ) {
    console.log(appliedFilters.value.rangePrice);
    query.min_price = appliedFilters.value.rangePrice.min;
    query.max_price = appliedFilters.value.rangePrice.max;
  }

  if (appliedFilters.value.brand.length > 0) {
    query.brand = appliedFilters.value.brand;
  }

  if (appliedFilters.value.page !== defaultFilters.value.page) {
    query.page = appliedFilters.value.page;
  }

  if (appliedFilters.value.orderBy !== defaultFilters.value.orderBy) {
    query.order_by = appliedFilters.value.orderBy;
  }

  await router.replace({ query });
};

const onSetFiltersFromQuery = (): void => {
  const { min_price, max_price, brand, page, orderBy } = route.query;

  if (min_price && max_price) {
    appliedFilters.value.rangePrice = {
      min: Number(min_price),
      max: Number(max_price),
    };
    filtersHasRangePrice.value = true;
    hasTouchedFilters.value.rangePrice = true;
    console.log(appliedFilters.value.rangePrice);
  }

  if (brand) {
    appliedFilters.value.brand = String(brand);
  }

  if (page) {
    appliedFilters.value.page = Number(page);
  }

  if (orderBy) {
    appliedFilters.value.orderBy = String(orderBy);
  }
};

const onClearFilters = () => {
  appliedFilters.value = {
    orderBy: 'created_asc',
    rangePrice: {
      min: 0,
      max: 0,
    },
    brand: '',
    page: 1,
  };

  defaultFilters.value = {
    orderBy: 'created_asc',
    rangePrice: {
      min: 0,
      max: 0,
    },
    brand: '',
    page: 1,
  };
};

watch(
  () => catalogStore.productSearch,
  (newValue: ProductSearchResponse | null) => {
    if (newValue) {
      products.value = newValue.products.content;
      pageable.value = newValue.products.pageable;
      totalElements.value = newValue.products.totalElements;
      totalPages.value = newValue.products.totalPages;
      availableFilters.value = newValue.filters;
      // Asignar valores de filtros

      if (!filtersHasRangePrice.value) {
        appliedFilters.value.rangePrice.max = newValue.filters.maxPrice;
        appliedFilters.value.rangePrice.min = newValue.filters.minPrice;
        defaultFilters.value.rangePrice.max = newValue.filters.maxPrice;
        defaultFilters.value.rangePrice.min = newValue.filters.minPrice;
        filtersHasRangePrice.value = true;
      } else {
        console.log(hasTouchedFilters.value.rangePrice);
        if (!hasTouchedFilters.value.rangePrice) {
          appliedFilters.value.rangePrice.max = newValue.filters.maxPrice;
          appliedFilters.value.rangePrice.min = newValue.filters.minPrice;
        }
      }
    }
  },
);

watch(
  () => route.params.categorySlug,
  async () => {
    filtersHasRangePrice.value = false;
    onClearFilters();
    onSetCategorySlug();
    onSetFiltersFromQuery();
    await onLoad();
  },
);
</script>
<style lang="scss" scoped></style>
