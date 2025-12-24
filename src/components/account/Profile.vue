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
          flat
          size="sm"
          label="Editar"
          class="bg-secondary text-white"
          icon="mode"
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
          <div class="text-grey-7">Número de documento</div>
          <div>{{ profile?.documentType }}</div>
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
import type { Profile } from 'src/types/profile';
import ProfileSkeleton from './ProfileSkeleton.vue';
const emit = defineEmits(['onNavigateSection']);
const props = defineProps<{ profile: Profile | null; loading: boolean }>();

const onNavigateSection = (section: string) => {
  emit('onNavigateSection', section);
};
</script>
<style lang=""></style>
