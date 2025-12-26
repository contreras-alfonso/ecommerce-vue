<template>
  <template v-if="loading">
    <profile-skeleton />
  </template>
  <template v-else>
    <div class="row items-center justify-between">
      <div class="text-h6 q-mb-md">Direcciones</div>
      <div v-if="addressStore.getAdresses.length > 0">
        <q-btn
          @click="onHandleNewAddress"
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
          <div class="col-6" v-for="address in addressStore.getAdresses" :key="address.id!">
            <address-item
              :address="address"
              @on-navigate-section="onNavigateSection('address-management')"
            />
          </div>
        </div>
      </div>
    </template>

    <empty-state
      v-else
      icon="add_location_alt"
      description="Aún no cuentas con direcciones, empieza agregando una nueva."
      label="Agregar nueva dirección"
      @on-action-button="onHandleNewAddress"
    />
  </template>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EmptyState from '../shared/EmptyState.vue';
import AddressItem from './AddressItem.vue';
import { useAddressStore } from 'src/stores/address-store';
import ProfileSkeleton from './ProfileSkeleton.vue';

const emit = defineEmits(['onNavigateSection']);

const addressStore = useAddressStore();
const loading = ref(false);

onMounted(async () => {
  await onLoad();
});

const onLoad = async () => {
  loading.value = true;
  await Promise.all([fetchAddresses()])
    .then(() => {})
    .finally(() => {
      loading.value = false;
    });
};

const fetchAddresses = async () => {
  await addressStore.fetchAll();
};

const onHandleNewAddress = () => {
  onNavigateSection('address-management');
  addressStore.setAddressToUpdate(null);
};

const onNavigateSection = (path: string) => {
  emit('onNavigateSection', path);
};
</script>
<style lang=""></style>
