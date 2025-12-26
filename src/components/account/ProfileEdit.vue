<template>
  <template v-if="loading">
    <ProfileEditSkeleton />
  </template>
  <q-form v-else @submit="onUpdateProfile">
    <div class="text-h6 q-mb-md">Modificar perfil</div>

    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-12">
        <InputElement
          label="Nombres"
          :model-value="localProfile!.name"
          @update:model-value="(val: string) => (localProfile!.name = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
          :rules-config="['isRequired']"
        />
      </div>

      <div class="col-md-6 col-12">
        <InputElement
          label="Apellidos"
          :model-value="localProfile!.lastname"
          @update:model-value="(val: string) => (localProfile!.lastname = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
          :rules-config="['isRequired']"
        />
      </div>

      <div class="col-md-6 col-12">
        <SelectElement
          :model-value="localProfile!.documentType"
          @update:model-value="(val: string) => (localProfile!.documentType = val)"
          label="Tipo de documento"
          :options="options.documentType"
          :rules-config="['isRequired']"
          :outlined="true"
          border-black
          :is-clearable="false"
          :use-input="false"
          is-square
        />
      </div>

      <div class="col-md-6 col-12">
        <InputElement
          label="Número de documento"
          :model-value="localProfile!.documentNumber"
          @update:model-value="(val: string) => (localProfile!.documentNumber = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
          :rules-config="['isRequired']"
        />
      </div>

      <div class="col-md-6 col-12">
        <InputElement
          label="Correo"
          :model-value="localProfile!.email"
          @update:model-value="(val: string) => (localProfile!.email = val)"
          :outlined="true"
          bg-color="grey-2"
          is-square
          :rules-config="['isRequired']"
          is-read-only
        />
      </div>

      <div class="col-md-6 col-12">
        <InputElement
          label="Celular"
          :model-value="localProfile!.phone"
          @update:model-value="(val: string) => (localProfile!.phone = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
          :rules-config="['isRequired']"
        />
      </div>
    </div>

    <div class="q-mt-lg">
      <q-btn
        type="submit"
        class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
        label="Modificar perfil"
        flat
      />
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import SelectElement from 'src/components/elements/Select.vue';
import type { Profile } from 'src/types/profile';
import type { SelectOption } from 'src/types/select-option';
import { useProfileStore } from 'src/stores/profile-store';
import ProfileEditSkeleton from './ProfileEditSkeleton.vue';
import { useHelpers } from 'src/composables/helpers';
import { useNotify } from 'src/composables/notify';

const emit = defineEmits(['onNavigateSection']);
const props = defineProps<{ profile: Profile | null; loading: boolean }>();

const { notifySuccess } = useNotify();
const options = ref<{ documentType: SelectOption[] }>({
  documentType: [
    {
      name: 'DNI',
      id: 'DNI',
    },
    {
      name: 'CÉDULA',
      id: 'CED',
    },
  ],
});

const profileStore = useProfileStore();
const { onSpinner, handleApiError } = useHelpers();
const localProfile = ref<Profile | null>(props.profile);

const onUpdateProfile = async () => {
  if (localProfile.value) {
    const payload: Profile = {
      ...localProfile.value,
    };
    onSpinner(true);
    try {
      await profileStore.update(payload);
      notifySuccess('Perfil modificado correctamente');
      emit('onNavigateSection', 'profile');
    } catch (error) {
      handleApiError(error);
    } finally {
      onSpinner(false);
    }
  }
};
</script>
<style lang=""></style>
