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
              <q-btn size="sm" round class="bg-red text-white q-pa-sm" icon="delete_forever" flat />
            </div>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-separator color="grey-3" />

    <q-card-section>
      <div class="text-subtitle2">
        Referencia:
        <span class="text-secondary text-weight-regular">{{ address?.reference }}</span>
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
</template>
<script setup lang="ts">
import type { Address } from 'src/types/address';

const props = defineProps<{ address: Address | null }>();
</script>
<style lang=""></style>
