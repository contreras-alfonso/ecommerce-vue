<template>
  <div>
    <div class="text-h4 text-weight-bold">Serum La Roche-Posay Hyalu B5</div>
    <div class="row items-center q-col-gutter-x-sm">
      <div class="text-grey-8 text-subtitle1">16 GB RAM + 512 GB ROM</div>
      <div><q-separator style="height: 13px" vertical></q-separator></div>
      <div class="text-grey-8 text-subtitle1">Infinite Black</div>
    </div>
  </div>

  <div class="row items-center justify-between">
    <div class="text-h5 text-weight-bold text-secondary">S/ 999.99</div>
    <div class="row items-center q-col-gutter-x-sm">
      <div><q-avatar size="10px" class="bg-green-8"></q-avatar></div>
      <div class="text-secondary text-caption">Stock disponible.</div>
    </div>
  </div>

  <div>
    <div class="text-h6 q-mb-sm">Almacenamiento</div>
    <div class="row q-col-gutter-y-sm">
      <div class="col-12">
        <div class="container-attribute rounded-borders">
          <div class="row q-pa-md">
            <div class="col">16GB RAM + 512 GB ROM</div>
            <div class="text-secondary text-weight-bold">S/ 999.99</div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="container-attribute-selected rounded-borders">
          <div class="row q-pa-md">
            <div class="col">16GB RAM + 512 GB ROM</div>
            <div class="text-secondary text-weight-bold">S/ 1059.99</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div class="text-h6 q-mb-sm">Color</div>
    <div class="row q-col-gutter-sm">
      <div class="col-3" v-for="color in colors" :key="color.name">
        <div
          :class="{ 'container-attribute-selected': color.selected }"
          class="container-attribute rounded-borders"
        >
          <div class="row items-center q-pa-md q-col-gutter-y-sm">
            <div class="col-12 text-center">
              <q-avatar size="md" :style="{ backgroundColor: color.hex }"></q-avatar>
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
        <q-btn class="no-border-radius q-pa-md" flat icon="remove" />
        <InputElement
          style="width: 60px"
          :model-value="product.quantity"
          @update:model-value="(val: number) => (product.quantity = val)"
          icon-color="grey"
          :outlined="true"
          :length-required="11"
          time="1500"
          bg-color="grey-2"
          no-border
          text-center
          is-square
        />
        <q-btn class="no-border-radius q-pa-md" flat icon="add" />
      </div>
    </div>
    <div class="col">
      <q-btn
        class="full-width bg-primary text-white text-weight-regular q-py-md"
        type="submit"
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
    <div class="col-12" v-for="benefit in benefits" :key="benefit.description">
      <div class="row items-center q-col-gutter-x-xs">
        <div class="col-grow">
          <q-icon size="20px" :name="`img:${benefit.img}`" />
        </div>
        <div class="col">{{ benefit.description }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import type { Benefit } from 'src/types/benefit';
const product = ref({
  quantity: 1,
});
const colors = ref([
  {
    hex: '#F5B027',
    name: 'Naranja',
  },

  {
    hex: '#000000',
    name: 'Negro',
  },

  {
    hex: '#4961EB',
    name: 'Indigo',
    selected: true,
  },
]);
const benefits = ref<Benefit[]>([
  {
    img: '/svg/gift.svg',
    description: 'Disfruta de un regalo GRATIS con tu compra. Cantidad limitada.',
  },
  {
    img: '/svg/verify.svg',
    description: 'Política de devolución de 15 días.',
  },
  {
    img: '/svg/security.svg',
    description: 'Compra 100% segura.',
  },
  {
    img: '/svg/shipment.svg',
    description: 'Envíos rápidos y seguros.',
  },
]);
</script>
<style lang="scss" scoped>
.container-attribute {
  border: 1px solid #cacaca;
}

.container-attribute-selected {
  border: 2px solid black;
}
</style>
