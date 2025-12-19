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
            :model-value="localColor.name"
            @update:model-value="(val: string) => (localColor.name = val)"
            icon-color="grey"
            :outlined="true"
            bg-color="white"
            border-black
            is-square
            :rules-config="['isRequired']"
          />

          <InputElement
            label="Color"
            :model-value="localColor.hex"
            @update:model-value="(val: string) => (localColor.hex = val)"
            icon-color="grey"
            :outlined="true"
            bg-color="white"
            border-black
            is-square
            is-color
            :rules-config="['isRequired']"
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
import type { Color } from 'src/types/color';
import type { TypeManagement } from 'src/types/type-management';
import { useHelpers } from 'src/composables/helpers';

import { useColorStore } from 'src/stores/color-store';
import { useNotify } from 'src/composables/notify';

const { notifySuccess } = useNotify();
const colorStore = useColorStore();

const emit = defineEmits(['onSubmit', 'onClose']);

const props = defineProps<{
  title: string;
  typeManagement: TypeManagement;
  color?: Color | null;
}>();

const { onSpinner, handleApiError } = useHelpers();

const localTitle = props.title;

const isOpen = ref(true);

const localColor = ref<Color>({
  id: props.color?.id || null,
  name: props.color?.name || '',
  hex: props.color?.hex || '',
});

onMounted(() => {
  if (props.typeManagement === 'CREATE') {
    localColor.value.id = null;
    localColor.value.name = '';
    localColor.value.hex = '';
  }
});

const onSubmit = async () => {
  onSpinner(true);
  const { id, name, hex } = localColor.value;
  const payload: Color = {
    id,
    name,
    hex,
  };
  onSpinner(true);
  if (props.typeManagement === 'EDIT') {
    await onUpdate(payload);
  } else if (props.typeManagement === 'CREATE') {
    await onCreate(payload);
  }
};

const onUpdate = async (payload: Color) => {
  try {
    const data = await colorStore.update(payload.id!, payload);
    notifySuccess('Color actualizado correctamente');
    emit('onSubmit', data);
    onClose();
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};

const onCreate = async (payload: Color) => {
  try {
    const data = await colorStore.create(payload);
    notifySuccess('Color creado correctamente');
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
