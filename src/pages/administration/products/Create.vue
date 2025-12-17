<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-7 col-12 q-gutter-y-md">
        <Title :title="title" />

        <q-card class="shadow-1 bg-white">
          <q-card-section>
            <div class="text-h6">Información general</div>

            <q-separator spaced="sm" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="column q-col-gutter-y-md">
              <InputElement
                label="Nombre"
                :model-value="product.name"
                @update:model-value="(val: string) => (product.name = val)"
                icon-color="grey"
                :outlined="true"
                bg-color="white"
                border-black
                placeholder="Ejm: Xiaomi Redmi Note 13 Pro+ 5G"
                is-square
                :rules-config="['isRequired']"
              />

              <SelectElement
                :model-value="product.category"
                @update:model-value="(val: string) => (product.category = val)"
                label="Categoría"
                :options="options.category"
                :rules-config="['isRequired']"
                :outlined="true"
                border-black
                is-square
              />

              <SelectElement
                :model-value="product.brand"
                @update:model-value="(val: string) => (product.brand = val)"
                label="Marca"
                :options="options.brand"
                :rules-config="['isRequired']"
                :outlined="true"
                border-black
                is-square
              />

              <div>
                <div class="q-mb-sm">Características del producto:</div>
                <q-editor v-model="product.description" square min-height="5rem" />
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="shadow-1 bg-white">
          <q-card-section class="">
            <div class="row items-center justify-between">
              <div class="text-h6">Colores del producto</div>
              <div>
                <q-btn
                  class="bg-primary text-white q-px-lg q-py-sm full-width text-weight-regular"
                  label="Seleccionar color"
                  flat
                />
              </div>
            </div>

            <q-separator spaced="sm" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="column items-center justify-center">
              <div class="">
                <q-icon name="color_lens" color="grey-5" size="xl" />
              </div>
              <div class="q-mt-md">Aún no haz seleccionado ningún color.</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <SelectColor
      v-if="dialogs.selectColor.isOpen"
      :colors="options.color"
      @on-submit="onSelectColor"
    />
  </q-page>
</template>
<script setup lang="ts">
import { uid } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Title from 'src/components/administration/Title.vue';
import InputElement from 'src/components/elements/Input.vue';
import SelectElement from 'src/components/elements/Select.vue';
import type { SelectOption } from 'src/types/select-option';
import type { Color } from 'src/types/color';
import { ManagementDialog } from 'src/types/management-dialog';
import SelectColor from 'src/components/administration/products/SelectColor.vue';

const { t } = useI18n();

const title = t('page.administration.products.new');
const product = ref({
  name: '',
  category: '',
  brand: '',
  description: '',
});

const dialogs = ref<{ selectColor: ManagementDialog<Color> }>({
  selectColor: {
    isOpen: true,
    type: 'CREATE',
    entity: null,
  },
});

const options = ref<{ category: SelectOption[]; brand: SelectOption[]; color: Color[] }>({
  category: [
    {
      name: 'Celulares',
      id: uid(),
    },
    {
      name: 'Audifonos',
      id: uid(),
    },
  ],
  brand: [
    {
      name: 'Xiaomi',
      id: uid(),
    },
    {
      name: 'Samsung',
      id: uid(),
    },
  ],
  color: [
    {
      id: uid(),
      created_at: '2025-12-11 10:00:00',
      updated_at: null,
      name: 'Negro',
      hex: '#000000',
    },
    {
      id: uid(),
      created_at: '2025-12-11 10:05:00',
      updated_at: null,
      name: 'Blanco',
      hex: '#FFFFFF',
    },
    {
      id: uid(),
      created_at: '2025-12-11 10:10:00',
      updated_at: null,
      name: 'Gris',
      hex: '#9E9E9E',
    },
    {
      id: uid(),
      created_at: '2025-12-11 10:15:00',
      updated_at: null,
      name: 'Plateado',
      hex: '#C0C0C0',
    },
    {
      id: uid(),
      created_at: '2025-12-11 10:20:00',
      updated_at: null,
      name: 'Dorado',
      hex: '#FFD700',
    },
  ],
});

const onSelectColor = (colorId: string) => {
  console.log(colorId);
};
</script>
<style lang="scss" scoped>
.q-editor {
  border: 1px solid black !important;
}
</style>
