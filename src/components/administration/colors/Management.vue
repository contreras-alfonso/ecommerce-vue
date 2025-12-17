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
// import { useServices } from 'src/stores/services'
import InputElement from 'src/components/elements/Input.vue';
// import { useNotify } from 'src/composables/notify';
import type { Color } from 'src/types/color';
import type { TypeManagement } from 'src/types/type-management';
import { useHelpers } from 'src/composables/helpers';

// const { notifySuccess, notifyError } = useNotify();
// const serviceStore = useServices()

const emit = defineEmits(['onSubmit', 'onClose']);

const props = defineProps<{
  title: string;
  typeManagement: TypeManagement;
  color?: Color | null;
}>();

const { onSpinner } = useHelpers();

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

const onSubmit = () => {
  onSpinner(true);
  const { id, name, hex } = localColor.value;
  const payload = {
    id,
    name,
    hex,
  };
  console.log(payload);
  if (props.typeManagement === 'EDIT') {
    onEdit();
  } else if (props.typeManagement === 'CREATE') {
    onCreate();
  }
};

const onEdit = () => {
  const result = {
    status: false,
  };
  // const messages = {
  //   ok: t('msg.success.update', 1),
  //   error: t('msg.error.update', 1),
  // };

  // const result = await serviceStore.update(payload, notifySuccess, notifyError, messages)
  if (result.status) {
    onClose();
    emit('onSubmit', result);
  }
};

const onCreate = () => {
  const result = {
    status: false,
  };
  // const messages = {
  //   ok: t('msg.success.create', 1),
  //   error: t('msg.error.create', 1),
  // };

  // const result = await serviceStore.create(payload, notifySuccess, notifyError, messages)

  if (result.status) {
    onClose();
    emit('onSubmit', result);
  }
};

const onClose = () => {
  emit('onClose', false);
};
</script>
