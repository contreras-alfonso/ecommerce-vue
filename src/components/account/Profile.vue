<template>
  <template v-if="loading">
    <ProfileSkeleton />
  </template>
  <template v-else>
    <div class="row items-center">
      <div class="col text-h6">Información de perfil</div>
      <div class="col-grow">
        <q-btn
          @click="onNavigateSection('profile-edit')"
          class="bg-secondary text-white q-py-sm  text-weight-regular"
          icon="cached"
          label="Modificar perfil"
          flat
        />
      </div>
    </div>

    <q-separator spaced></q-separator>

    <div class="row q-col-gutter-sm q-py-md">
      <div class="col-6">
        <div class="column text-subtitle1">
          <div class="text-grey-7">Nombres</div>
          <div>{{ profile?.name }}</div>
        </div>
      </div>

      <div class="col-6">
        <div class="column text-subtitle1">
          <div class="text-grey-7">Apellidos</div>
          <div>{{ profile?.lastname }}</div>
        </div>
      </div>

      <div class="col-6">
        <div class="column text-subtitle1">
          <div class="text-grey-7">Tipo de documento</div>
          <div>{{ getNameDocumentType }}</div>
        </div>
      </div>

      <div class="col-6">
        <div class="column text-subtitle1">
          <div class="text-grey-7">Número de documento</div>
          <div>{{ profile?.documentNumber }}</div>
        </div>
      </div>
    </div>

    <div class="row items-center">
      <div class="col text-h6">Métodos de contacto</div>
    </div>

    <q-separator spaced></q-separator>
    <div class="row q-col-gutter-sm q-py-md">
      <div class="col-6">
        <div class="column text-subtitle1">
          <div class="text-grey-7">Correo</div>
          <div>{{ profile?.email }}</div>
        </div>
      </div>

      <div class="col-6">
        <div class="column text-subtitle1">
          <div class="text-grey-7">Celular</div>
          <div>{{ profile?.phone ?? '-' }}</div>
        </div>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { Profile } from 'src/types/profile';
import ProfileSkeleton from './ProfileSkeleton.vue';
import type { SelectOption } from 'src/types/select-option';
const emit = defineEmits(['onNavigateSection']);
const props = defineProps<{ profile: Profile | null; loading: boolean }>();

const getNameDocumentType = computed(() => {
  const findIndex = options.value.documentType.findIndex(
    (type) => type.id === localProfile.value?.documentType,
  );
  if (findIndex !== -1) {
    return options.value.documentType[findIndex]?.name;
  }
  return '';
});

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

const localProfile = ref<Profile | null>(props.profile);

const onNavigateSection = (section: string) => {
  emit('onNavigateSection', section);
};

watch(
  () => props.profile,
  (val: Profile | null) => {
    localProfile.value = val;
  },
);
</script>
<style lang=""></style>
