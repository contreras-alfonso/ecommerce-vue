<template>
  <div class="row items-center justify-between">
    <div class="text-h6 q-mb-md">Direcciones</div>
    <div v-if="addressStore.getAdresses.length > 0">
      <q-btn
        @click="onNavigateSection('addresses-add')"
        class="bg-secondary text-white q-py-sm text-weight-regular"
        icon="add"
        label="Agregar nueva dirección"
        flat
      />
    </div>
  </div>

  <template v-if="addressStore.getAdresses.length > 0">
    <div class="q-mt-sm">
      <div class="row q-col-gutter-md">
        <div class="col-6" v-for="address in addressStore.getAdresses" :key="address.id">
          <address-item :address="address" />
        </div>
      </div>
    </div>
  </template>

  <empty-state
    v-else
    icon="add_location_alt"
    description="Aún no cuentas con direcciones, empieza agregando una nueva."
    label="Agregar nueva dirección"
    @on-action-button="onNavigateSection('addresses-add')"
  />
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import EmptyState from '../shared/EmptyState.vue';
import AddressItem from './AddressItem.vue';
import { useAddressStore } from 'src/stores/address-store';

const emit = defineEmits(['onNavigateSection']);

const addressStore = useAddressStore();

onMounted(async () => {
  await onLoad();
});

const onLoad = async () => {
  await Promise.all([fetchAddresses()])
    .then(() => {})
    .finally(() => {});
};

const fetchAddresses = async () => {
  await addressStore.fetchAll();
};

const onNavigateSection = (path: string) => {
  emit('onNavigateSection', path);
};
</script>
<style lang=""></style>
