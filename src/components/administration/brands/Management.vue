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
// import { useServices } from 'src/stores/services'
import InputElement from 'src/components/elements/Input.vue';
// import { useNotify } from 'src/composables/notify';
import type { Brand } from 'src/types/brand';
import type { TypeManagement } from 'src/types/type-management';
import { useHelpers } from 'src/composables/helpers';

// const { notifySuccess, notifyError } = useNotify();
// const serviceStore = useServices()

const emit = defineEmits(['onSubmit', 'onClose']);

const props = defineProps<{
  title: string;
  typeManagement: TypeManagement;
  brand?: Brand | null;
}>();

const { onSpinner } = useHelpers();

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

const onSubmit = () => {
  onSpinner(true);
  const { id, name, slug } = localBrand.value;
  const payload = {
    id,
    name,
    slug,
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
