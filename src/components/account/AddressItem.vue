<template>
  <q-card class="shadow-1 full-height">
    <q-card-section class="bg-secondary text-white">
      <div class="row items-center">
        <div class="col">
          <div class="text-subtitle">
            <q-icon size="xs" name="fmd_good" /> {{ address?.address }}
          </div>
        </div>

        <div class="col-grow">
          <div class="row items-center q-col-gutter-x-sm">
            <div class="">
              <q-btn size="sm" round class="bg-white text-secondary q-pa-sm" icon="create" flat />
            </div>

            <div class="">
              <q-btn
                @click="onHandleDelete(address?.id ?? '')"
                size="sm"
                round
                class="bg-red text-white q-pa-sm"
                icon="delete_forever"
                flat
              />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator color="grey-3" />

    <q-card-section>
      <div class="text-subtitle2">
        Referencia:
        <span class="text-secondary text-weight-regular">{{ address?.reference || '-' }}</span>
      </div>
      <div class="text-subtitle2">
        Celular: <span class="text-secondary text-weight-regular">{{ address?.phone }}</span>
      </div>
      <div class="text-subtitle2">
        Ubigeo: <span class="text-secondary text-weight-regular">{{ address?.ubigeo }}</span>
      </div>

      <q-badge
        v-if="address?.default"
        class="q-px-md q-py-xs text-caption q-mt-sm"
        rounded
        color="primary"
      >
        Dirección principal <q-icon name="star" color="white" class="q-ml-xs" />
      </q-badge>
    </q-card-section>
  </q-card>

  <confirm-delete
    v-if="dialogs.delete.isOpen"
    msg="la dirección"
    @on-delete="onDeleteAddress"
    @on-close="onCloseDeleteDialog"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Address } from 'src/types/address';
import ConfirmDelete from '../shared/ConfirmDelete.vue';
import type { DeleteDialog } from 'src/types/delete-dialog';
import { useHelpers } from 'src/composables/helpers';
import { useAddressStore } from 'src/stores/address-store';
import { useNotify } from 'src/composables/notify';

defineProps<{ address: Address | null }>();

const addressStore = useAddressStore();
const { notifySuccess } = useNotify();
const { onSpinner, handleApiError } = useHelpers();
const dialogs = ref<{ delete: DeleteDialog }>({
  delete: {
    isOpen: false,
    entityId: null,
  },
});

const onCloseDeleteDialog = () => {
  dialogs.value.delete.isOpen = false;
};

const onHandleDelete = (id: string) => {
  if (id) {
    dialogs.value.delete.isOpen = true;
    dialogs.value.delete.entityId = id;
  }
};

const onDeleteAddress = async () => {
  if (dialogs.value.delete.entityId) {
    onSpinner(true);
    try {
      await addressStore.delete(dialogs.value.delete.entityId);
      notifySuccess('Dirección eliminada correctamente');
    } catch (error) {
      handleApiError(error);
    } finally {
      onSpinner(false);
    }
  }
};
</script>
<style lang=""></style>
