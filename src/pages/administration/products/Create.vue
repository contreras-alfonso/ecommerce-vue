<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <q-form @submit="onSaveProduct" class="col-md-7 col-12 q-gutter-y-md">
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
                <div class="q-mb-sm">Características del producto (Opcional):</div>
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
                v-model="fileImages"
                @update:model-value="onUploadImagesToSlider"
                ref="refFileImages"
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
                        Galería de imagenes ({{ colorExpansion.tempImagesPreview.length }})
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
                      v-if="colorExpansion.tempImagesPreview.length <= 0"
                      class="column items-center justify-center q-pt-md"
                    >
                      <div class="">
                        <q-icon name="image" color="grey-5" size="xl" />
                      </div>
                      <div class="q-mt-md">Aún no haz seleccionado ninguna imágen.</div>
                    </div>

                    <ProductImagesSlider v-else :images="colorExpansion.tempImagesPreview" />
                  </div>
                </q-expansion-item>
              </div>
            </div>
          </q-card-section>
        </q-card>

        <q-card class="shadow-1 bg-white">
          <q-card-section>
            <div class="text-h6">Variantes</div>
            <q-separator spaced="sm" />
          </q-card-section>

          <div class="q-px-md q-pb-md">
            <q-toggle
              @click="onShowMessageToggle"
              :disable="disableToggle"
              v-model="usesTechnicalVariants"
              label="¿Este producto utiliza RAM y almacenamiento?"
              color="primary"
            />
          </div>

          <q-card-section class="q-pt-none">
            <q-form @submit="onAddVariant" ref="formVariant" class="column q-col-gutter-y-md">
              <SelectElement
                label="Color"
                :model-value="variant.colorId"
                @update:model-value="(val: string) => (variant.colorId = val)"
                :options="options.colorSelected"
                :rules-config="['isRequired']"
                :outlined="true"
                border-black
                is-square
              />

              <SelectElement
                v-if="usesTechnicalVariants"
                label="RAM"
                :model-value="variant.ram"
                @update:model-value="(val: string) => (variant.ram = val)"
                :options="options.ram"
                :rules-config="['isRequired']"
                :outlined="true"
                border-black
                is-square
              />

              <SelectElement
                v-if="usesTechnicalVariants"
                label="Almacenamiento (ROM)"
                :model-value="variant.storage"
                @update:model-value="(val: string) => (variant.storage = val)"
                :options="options.storage"
                :rules-config="['isRequired']"
                :outlined="true"
                border-black
                is-square
              />

              <InputElement
                label="Precio"
                :model-value="variant.price"
                @update:model-value="(val: string) => (variant.price = val)"
                icon-color="grey"
                :outlined="true"
                bg-color="white"
                border-black
                is-square
                :rules-config="['isRequired']"
              />

              <InputElement
                label="Stock"
                :model-value="variant.stock"
                @update:model-value="(val: string) => (variant.stock = val)"
                icon-color="grey"
                :outlined="true"
                bg-color="white"
                border-black
                is-square
                :rules-config="['isRequired']"
              />

              <q-btn
                type="submit"
                class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular q-mt-md"
                label="Agregar variante"
                icon="add"
                flat
              />
            </q-form>
          </q-card-section>

          <q-card-section>
            <q-markup-table flat separator="cell">
              <thead class="bg-grey-3 text-black">
                <tr>
                  <th class="text-left">Color</th>
                  <th v-if="usesTechnicalVariants" class="text-right">RAM</th>
                  <th v-if="usesTechnicalVariants" class="text-right">Almacenamiento (ROM)</th>
                  <th class="text-right">Precio</th>
                  <th class="text-right">Stock</th>
                  <th class="text-right">Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="variant in variantsAdded" :key="variant.id">
                  <td class="text-left">
                    <div class="row items-center q-col-gutter-x-sm">
                      <div>
                        <q-avatar
                          size="md"
                          :style="{ backgroundColor: variant.color?.hex }"
                          style="border: 1px solid #696969"
                        />
                      </div>
                      <div>{{ variant.color?.name }}</div>
                    </div>
                  </td>
                  <td v-if="usesTechnicalVariants" class="text-right">{{ variant.ram }}</td>
                  <td v-if="usesTechnicalVariants" class="text-right">{{ variant.storage }}</td>
                  <td class="text-right">{{ variant.price }}</td>
                  <td class="text-right">{{ variant.stock }}</td>
                  <td class="text-right">
                    <q-btn
                      @click="onDeleteVariant(variant.id!)"
                      size="sm"
                      round
                      flat
                      class="bg-red text-white"
                      icon="close"
                    >
                      <q-tooltip v-if="!$q.screen.lt.sm" class="bg-red text-center">
                        Eliminar variante
                      </q-tooltip>
                    </q-btn>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>

            <template v-if="variantsAdded.length <= 0">
              <div class="column items-center justify-center q-mt-md">
                <div class="">
                  <q-icon name="add_to_photos" color="grey-5" size="xl" />
                </div>
                <div class="q-mt-md">Aún no haz agregado ninguna variante.</div>
              </div>
            </template>
          </q-card-section>
        </q-card>

        <div>
          <q-btn
            class="full-width bg-primary text-white q-py-md"
            type="submit"
            flat
            color="primary"
            label="Crear producto"
          />
        </div>
      </q-form>
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
import { QFile, QForm, uid } from 'quasar';
import { computed, ref } from 'vue';
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
import type { Variant } from 'src/types/variant-add';

const disableToggle = computed(() => {
  const filter = variantsAdded.value.filter((variant) => variant.ram || variant.storage);
  return filter.length > 0;
});

const { t } = useI18n();

const { notifySuccess, notifyError } = useNotify();

const title = t('page.administration.products.new');

const formVariant = ref<QForm | null>(null);
const fileImages = ref(null);
const refFileImages = ref<QFile | null>(null);
const expansionActiveId = ref<string | null>(null);

const usesTechnicalVariants = ref(false);

const variant = ref<Variant>({
  colorId: '',
  ram: '',
  storage: '',
  price: '',
  stock: '',
});

const variantsAdded = ref<Variant[]>([]);

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

const options = ref<{
  category: SelectOption[];
  brand: SelectOption[];
  color: Color[];
  ram: SelectOption[];
  storage: SelectOption[];
  colorSelected: Color[];
}>({
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
  ram: [
    { id: '2GB', name: '2GB' },
    { id: '4GB', name: '4GB' },
    { id: '8GB', name: '8GB' },
    { id: '12GB', name: '12GB' },
    { id: '16GB', name: '16GB' },
    { id: '24GB', name: '24GB' },
    { id: '32GB', name: '32GB' },
    { id: '64GB', name: '64GB' },
  ],

  storage: [
    { id: '32GB', name: '32GB' },
    { id: '64GB', name: '64GB' },
    { id: '128GB', name: '128GB' },
    { id: '256GB', name: '256GB' },
    { id: '512GB', name: '512GB' },
    { id: '1TB', name: '1TB' },
  ],
  colorSelected: [],
});

const onSaveProduct = () => {
  console.log(usesTechnicalVariants.value);
  console.log(variantsAdded.value);
  console.log(product.value);
  console.log(colorExpansionItems.value);

  const payload = {
    name: product.value.name,
    description: product.value.description,
    brandId: product.value.brand,
    categoryId: product.value.category,
    usesTechnicalVariants: usesTechnicalVariants.value,
    variants: [] as Variant[],
  };

  variantsAdded.value.forEach((variant) => {
    const { colorId, ram, storage, price, stock } = variant;
    const newVariant = {
      colorId,
      ram,
      storage,
      price,
      stock,
    };
    payload.variants.push(newVariant);
  });

  const formData = new FormData();

  // Agregar el payload del producto al formData
  formData.append('product', JSON.stringify(payload));

  // Agregar las imagenes al formData
  colorExpansionItems.value.forEach((expansion) => {
    expansion.images.forEach((image) => {
      formData.append(`${uid()}__${expansion.colorId}`, image);
    });
  });

  console.log([...formData]);
};

const onDeleteVariant = (variantId: string) => {
  variantsAdded.value = variantsAdded.value.filter((variant) => variant.id !== variantId);
  notifySuccess('La variante ha sido eliminada del listado');
};

const onShowMessageToggle = () => {
  if (disableToggle.value) {
    notifyError('Elimina las variantes con RAM y ROM, para desactivar esta opción');
  }
};

const onAddVariant = () => {
  const { colorId, ram, storage, price, stock } = variant.value;

  // Validar si la variante no fue agregada previamente
  const findExistsVariant = variantsAdded.value.find(
    (variant) => variant.colorId === colorId && variant.ram === ram && variant.storage === storage,
  );
  if (findExistsVariant) {
    return notifyError('La variante ya fue agregada previamente a la lista');
  }
  // Buscar color en store
  const findColor = options.value.color.find((color) => color.id === colorId);

  if (findColor) {
    const newVariant = {
      id: uid(),
      colorId,
      color: findColor,
      ram,
      storage,
      price,
      stock,
    };
    variantsAdded.value.push(newVariant);
    notifySuccess('Variante agregada correctamente');
    onClearFormVariant();
  } else {
    return notifyError('El color no fue encontrado');
  }
};

const onClearFormVariant = () => {
  variant.value = {
    colorId: '',
    ram: '',
    storage: '',
    price: '',
    stock: '',
  };
  setTimeout(() => {
    formVariant.value?.resetValidation();
  }, 100);
};

const onClickBtnUploadImages = (expansionId: string) => {
  expansionActiveId.value = expansionId;
  refFileImages.value!.pickFiles();
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
    findExpansionItems.tempImagesPreview = [...findExpansionItems.tempImagesPreview, ...previews];
    findExpansionItems.images = [...findExpansionItems.images, ...validFiles];
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
      id: uid(),
      colorId: findColor.id!,
      colorName: findColor.name,
      colorHex: findColor.hex,
      images: [],
      tempImagesPreview: [],
    };
    colorExpansionItems.value.push(newColorExpansion);
    options.value.colorSelected.push(findColor);
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
