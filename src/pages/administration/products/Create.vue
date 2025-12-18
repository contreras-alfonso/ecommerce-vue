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
                  @click="onOpenDialog"
                  class="bg-primary text-white q-px-lg q-py-sm full-width text-weight-regular"
                  label="Seleccionar color"
                  flat
                />
              </div>
            </div>

            <q-separator spaced="sm" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="hidden">
              <q-file
                v-model="qFileProduct"
                @update:model-value="onUploadImagesToSlider"
                ref="inputFileImages"
                label="Standard"
                multiple
              />
            </div>

            <div v-if="colorExpansionItems.length <= 0" class="column items-center justify-center">
              <div class="">
                <q-icon name="color_lens" color="grey-5" size="xl" />
              </div>
              <div class="q-mt-md">Aún no haz seleccionado ningún color.</div>
            </div>

            <div v-else class="row q-col-gutter-y-md">
              <div
                class="col-12"
                v-for="(colorExpansion, index) in colorExpansionItems"
                :key="colorExpansion.id"
              >
                <q-expansion-item
                  class="overflow-hidden"
                  expand-icon-class="text-grey-8"
                  style="border-radius: 20px"
                  header-class="bg-grey-3 text-subtitle1 text-weight-medium"
                  :default-opened="index === 0"
                >
                  <template v-slot:header>
                    <q-item-section avatar>
                      <q-avatar
                        size="md"
                        :style="{ backgroundColor: colorExpansion.colorHex }"
                        style="border: 1px solid #696969"
                      />
                    </q-item-section>

                    <q-item-section>
                      <div class="column">
                        <div>{{ colorExpansion.colorName }}</div>
                        <div class="text-grey-8 text-caption">{{ colorExpansion.colorHex }}</div>
                      </div>
                    </q-item-section>

                    <!-- <q-item-section side>
                      <q-btn @click.stop="" icon="delete_outline" flat round color="red" />
                    </q-item-section> -->
                  </template>

                  <div class="q-pa-md">
                    <div class="row items-center justify-between">
                      <div class="text-subtitle1 text-weight-medium">
                        Galería de imagenes ({{ colorExpansion.imagesString.length }})
                      </div>

                      <div>
                        <q-btn
                          @click="onClickBtnUploadImages(colorExpansion.id)"
                          class="bg-secondary text-white q-px-md q-py-sm full-width text-weight-regular"
                          label="Seleccionar imagenes"
                          flat
                        />
                      </div>
                    </div>

                    <q-separator spaced />

                    <div
                      v-if="colorExpansion.imagesString.length <= 0"
                      class="column items-center justify-center q-pt-md"
                    >
                      <div class="">
                        <q-icon name="image" color="grey-5" size="xl" />
                      </div>
                      <div class="q-mt-md">Aún no haz seleccionado ninguna imágen.</div>
                    </div>

                    <ProductImagesSlider v-else :images="colorExpansion.imagesString" />
                  </div>
                </q-expansion-item>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <SelectColor
      v-if="dialogs.selectColor.isOpen"
      :colors="options.color"
      @on-submit="onSelectColor"
      @on-close="onCloseDialog"
    />
  </q-page>
</template>
<script setup lang="ts">
import { QFile, uid } from 'quasar';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Title from 'src/components/administration/Title.vue';
import InputElement from 'src/components/elements/Input.vue';
import SelectElement from 'src/components/elements/Select.vue';
import SelectColor from 'src/components/administration/products/SelectColor.vue';
import ProductImagesSlider from 'src/components/products/ProductImagesSlider.vue';
import { useNotify } from 'src/composables/notify';
import type { SelectOption } from 'src/types/select-option';
import type { Color } from 'src/types/color';
import type { ColorExpansion } from 'src/types/color-expansion';
import type { ManagementDialog } from 'src/types/management-dialog';

const { t } = useI18n();

const { notifySuccess, notifyError } = useNotify();

const title = t('page.administration.products.new');

const qFileProduct = ref(null);
const inputFileImages = ref<QFile | null>(null);
const expansionActiveId = ref<string | null>(null);

const product = ref({
  name: '',
  category: '',
  brand: '',
  description: '',
});

const dialogs = ref<{ selectColor: ManagementDialog<Color> }>({
  selectColor: {
    isOpen: false,
    type: 'CREATE',
    entity: null,
  },
});

const colorExpansionItems = ref<ColorExpansion[]>([]);

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

const onClickBtnUploadImages = (expansionId: string) => {
  expansionActiveId.value = expansionId;
  inputFileImages.value!.pickFiles();
};

const onUploadImagesToSlider = (val: FileList) => {
  if (!val || val.length === 0) return;

  const { validFiles, previews } = validateAndPreviewFiles(val);
  console.log(validFiles);
  console.log(previews);
  const findExpansionItems = colorExpansionItems.value.find(
    (expansion) => expansion.id === expansionActiveId.value,
  );
  if (findExpansionItems) {
    findExpansionItems.imagesString = [...findExpansionItems.imagesString, ...previews];
  }
};

const validateAndPreviewFiles = (filesArray: FileList) => {
  // Validar imagenes
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  const maxSize = 2 * 1024 * 1024;

  const validFiles = [];
  const previews = [];

  for (const file of filesArray) {
    if (!allowedTypes.includes(file.type)) {
      notifyError(`El archivo ${file.name} no es válido (solo PNG, JPG, WEBP)`);
      continue;
    }

    if (file.size > maxSize) {
      notifyError(`El archivo ${file.name} supera los 2 MB`);
      continue;
    }

    validFiles.push(file);

    if (file.type.startsWith('image/')) {
      previews.push(URL.createObjectURL(file));
    }
  }

  return { validFiles, previews };
};

const onOpenDialog = () => {
  dialogs.value.selectColor.isOpen = true;
};
const onCloseDialog = () => {
  dialogs.value.selectColor.isOpen = false;
};

const onSelectColor = (colorId: string) => {
  // Validar que no existe en la lista seleccionada
  const findColorExists = colorExpansionItems.value.find((color) => color.id === colorId);
  if (findColorExists) {
    return notifyError('El color ya fue seleccionado previamente');
  }
  // Buscar color en store
  const findColor = options.value.color.find((color) => color.id === colorId);

  if (findColor) {
    const newColorExpansion: ColorExpansion = {
      id: findColor.id!,
      colorName: findColor.name,
      colorHex: findColor.hex,
      images: [],
      imagesString: [],
    };
    colorExpansionItems.value.push(newColorExpansion);
  } else {
    return notifyError('El color no fue encontrado');
  }

  notifySuccess('El color ha sido agregado');
  onCloseDialog();
};
</script>
<style lang="scss" scoped>
.q-editor {
  border: 1px solid black !important;
}
</style>
