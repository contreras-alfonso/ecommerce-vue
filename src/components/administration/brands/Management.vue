<template>
  <q-dialog persistent :model-value="isOpen">
    <q-card class="my-card bg-white" style="width: 100%">
      <q-card-section>
        <div class="row">
          <div class="text-h6">
            {{ `${typeManagement === 'CREATE' ? 'Agregar' : 'Editar'} ${localTitle}` }}
          </div>
          <q-space />
          <q-btn icon="close" color="grey-6" size="md" round flat @click="onClose" />
        </div>

        <q-separator spaced color="grey-3" />
      </q-card-section>

      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-pt-none q-gutter-y-md">
          <InputElement
            label="Nombre"
            :model-value="localBrand.name"
            @update:model-value="(val: string) => (localBrand.name = val)"
            icon-color="grey"
            :outlined="true"
            bg-color="white"
            border-black
            is-square
            :rules-config="['isRequired']"
          />

          <InputElement
            v-if="typeManagement === 'EDIT'"
            label="Slug"
            :model-value="localBrand.slug"
            @update:model-value="(val: string) => (localBrand.slug = val)"
            icon-color="grey"
            :outlined="true"
            bg-color="grey-3"
            is-square
            is-read-only
          />
        </q-card-section>

        <q-card-section>
          <q-btn
            type="submit"
            class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
            :label="
              typeManagement === 'CREATE'
                ? 'Agregar'
                : typeManagement === 'EDIT'
                  ? 'Guardar cambios'
                  : ''
            "
            flat
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import type { Brand } from 'src/types/brand';
import type { TypeManagement } from 'src/types/type-management';
import { useHelpers } from 'src/composables/helpers';
import { useBrandStore } from 'src/stores/brand-store';
import { useNotify } from 'src/composables/notify';

const { notifySuccess } = useNotify();
const brandStore = useBrandStore();

const emit = defineEmits(['onSubmit', 'onClose']);

const props = defineProps<{
  title: string;
  typeManagement: TypeManagement;
  brand?: Brand | null;
}>();

const { onSpinner, handleApiError } = useHelpers();

const localTitle = props.title;

const isOpen = ref(true);

const localBrand = ref<Brand>({
  id: props.brand?.id || null,
  name: props.brand?.name || '',
  slug: props.brand?.slug || '',
});

onMounted(() => {
  if (props.typeManagement === 'CREATE') {
    localBrand.value.id = null;
    localBrand.value.name = '';
    localBrand.value.slug = '';
  }
});

const onSubmit = async () => {
  onSpinner(true);
  const { id, name, slug } = localBrand.value;
  const payload: Brand = {
    id,
    name,
    slug,
  };
  onSpinner(true);
  if (props.typeManagement === 'EDIT') {
    await onUpdate(payload);
  } else if (props.typeManagement === 'CREATE') {
    await onCreate(payload);
  }
};

const onUpdate = async (payload: Brand) => {
  try {
    const data = await brandStore.update(payload.id!, payload);
    notifySuccess('Marca actualizada correctamente');
    emit('onSubmit', data);
    onClose();
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};

const onCreate = async (payload: Brand) => {
  try {
    const data = await brandStore.create(payload);
    notifySuccess('Marca creada correctamente');
    emit('onSubmit', data);
    onClose();
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};

const onClose = () => {
  emit('onClose', false);
};
</script>
