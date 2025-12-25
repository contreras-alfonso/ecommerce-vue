<template>
  <div class="row items-center justify-between">
    <div class="text-h6 q-mb-md">Direcciones</div>
    <div>
      <q-btn
        class="bg-secondary text-white q-py-sm text-weight-regular"
        icon="add"
        label="Agregar nueva dirección"
        flat
      />
    </div>
  </div>
  <div class="column items-center justify-center">
    <empty-state
      v-if="false"
      icon="add_location_alt"
      description="Aún no cuentas con direcciones, empieza agregando una nueva."
      label="Agregar nueva dirección"
      @on-action-button="onNavigateSection('addresses-add')"
    />
  </div>

  <address-item :address="null" />
</template>
<script setup lang="ts">
import EmptyState from '../shared/EmptyState.vue';
import AddressItem from './AddressItem.vue';

const emit = defineEmits(['onNavigateSection']);
const onNavigateSection = (path: string) => {
  emit('onNavigateSection', path);
};
</script>
<style lang=""></style>
