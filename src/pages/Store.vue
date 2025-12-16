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
            <div class="q-mt-md">
              <div class="text-uppercase text-weight-regular">
                Filtrar <q-icon name="tune"></q-icon>
              </div>
              <q-separator spaced></q-separator>
              <div class="text-uppercase">Precio</div>
              <q-range
                v-model="filters.rangePrice"
                :min="0"
                :max="50"
                color="brown-4
"
              />
              <div class="row items-center justify-between">
                <div class="text-caption">Aplicar filtro</div>
                <div>
                  <q-btn flat class="bg-brown-5 text-white" size="sm" label="Aplicar" />
                </div>
              </div>
              <q-separator spaced></q-separator>

              <div class="text-uppercase">Marcas</div>
              <div class="column">
                <q-checkbox
                  v-for="brand in options.brand"
                  v-model="filters.brand"
                  :val="brand.id"
                  :label="brand.name"
                  size="sm"
                  color="brown-4"
                />
              </div>

              <!-- <div class="row items-center justify-between">
                <div class="text-caption">Aplicar filtro</div>
                <div>
                  <q-btn flat class="bg-black text-white" size="sm" label="Aplicar" />
                </div>
              </div> -->
            </div>
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
                    @update:model-value="(val: string) => (filters.orderBy = val)"
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
                <div class="col-3" v-for="product in products" :key="product.id">
                  <card-product :product="product" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { uid } from 'quasar';
import BreadCrum from 'src/components/shared/BreadCrum.vue';
import SelectElement from 'src/components/elements/Select.vue';
import CardProduct from 'src/components/products/CardProduct.vue';
import type { SelectOption } from 'src/types/select.option';
import type { Product } from 'src/types/product';

const filters = ref({
  orderBy: 'MAYOR_MENOR',
  rangePrice: {
    min: 0,
    max: 35,
  },
  brand: [],
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
</script>
<style lang="scss" scoped></style>
