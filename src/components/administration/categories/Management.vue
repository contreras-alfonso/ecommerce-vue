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
            :model-value="localCategory.name"
            @update:model-value="(val: string) => (localCategory.name = val)"
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
            :model-value="localCategory.slug"
            @update:model-value="(val: string) => (localCategory.slug = val)"
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
import { useNotify } from 'src/composables/notify';
import { useCategoryStore } from 'src/stores/category-store';
import type { Category } from 'src/types/category';
import type { TypeManagement } from 'src/types/type-management';
import { useHelpers } from 'src/composables/helpers';

const { notifySuccess } = useNotify();
const categoryStore = useCategoryStore();

const emit = defineEmits(['onSubmit', 'onClose']);

const props = defineProps<{
  title: string;
  typeManagement: TypeManagement;
  category?: Category | null;
}>();

const { onSpinner, handleApiError } = useHelpers();

const localTitle = props.title;

const isOpen = ref(true);

const localCategory = ref<Category>({
  id: props.category?.id || null,
  name: props.category?.name || '',
  slug: props.category?.slug || '',
});

onMounted(() => {
  if (props.typeManagement === 'CREATE') {
    localCategory.value.id = null;
    localCategory.value.name = '';
    localCategory.value.slug = '';
  }
});

const onSubmit = async () => {
  const { id, name, slug } = localCategory.value;
  const payload: Category = {
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

const onUpdate = async (payload: Category) => {
  try {
    const data = await categoryStore.update(payload.id!, payload);
    notifySuccess('Categoría actualizada correctamente');
    emit('onSubmit', data);
    onClose();
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};

const onCreate = async (payload: Category) => {
  try {
    const data = await categoryStore.create(payload);
    notifySuccess('Categoría creada correctamente');
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
