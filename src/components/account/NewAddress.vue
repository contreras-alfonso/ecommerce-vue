<template>
  <q-form @submit="onAddAddress">
    <div class="text-h6 q-mb-md">Agregar nueva dirección</div>

    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-12">
        <InputElement
          label="Dirección"
          :model-value="localAddress.address"
          @update:model-value="(val: string) => (localAddress.address = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
          :rules-config="['isRequired']"
        />
      </div>

      <div class="col-md-6 col-12">
        <InputElement
          label="Referencia (Opcional)"
          :model-value="localAddress.reference"
          @update:model-value="(val: string) => (localAddress.reference = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
        />
      </div>

      <div class="col-md-6 col-12">
        <InputElement
          label="Celular"
          :model-value="localAddress.phone"
          @update:model-value="(val: string) => (localAddress.phone = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
          :rules-config="['isRequired']"
        />
      </div>

      <div class="col-md-6 col-12">
        <SelectElement
          :model-value="localAddress.department"
          @update:model-value="(val: string) => onUpdateDepartment(val)"
          label="Departamento"
          :options="departmentOptions"
          :rules-config="['isRequired']"
          :outlined="true"
          border-black
          is-square
        />
      </div>

      <div class="col-md-6 col-12">
        <SelectElement
          :model-value="localAddress.province"
          @update:model-value="(val: string) => onUpdateProvince(val)"
          label="Provincia"
          :options="provinceOptionsFilter"
          :rules-config="['isRequired']"
          :outlined="true"
          border-black
          is-square
        />
      </div>

      <div class="col-md-6 col-12">
        <SelectElement
          :model-value="localAddress.district"
          @update:model-value="(val: string) => (localAddress.district = val)"
          label="Distrito"
          :options="districtOptionsFilter"
          :rules-config="['isRequired']"
          :outlined="true"
          border-black
          is-square
        />
      </div>

      <div>
        <q-toggle
          v-model="localAddress.default"
          color="green"
          label="Establecer como dirección principal"
        />
      </div>
    </div>

    <div class="col-12 q-mt-lg">
      <div class="text-subtitle1 text-weight-medium">Indica tu dirección en el mapa</div>
      <div class="text-grey-7 q-mb-md">
        Mueve el marcador hasta el punto exacto donde deseas recibir tu pedido.
      </div>
      <div id="map" style="height: calc(400px - 50px)"></div>
    </div>

    <div class="q-mt-lg">
      <q-btn
        type="submit"
        class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
        label="Crear dirección"
        flat
      />
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import _ from 'lodash';
import L from 'leaflet';
import type { Marker } from 'leaflet';
import InputElement from 'src/components/elements/Input.vue';
import SelectElement from 'src/components/elements/Select.vue';
import type { SelectOption } from 'src/types/select-option';
import { departments } from 'boot/ubigeo';
import { ubigeoFilterDistrict, ubigeoFilterProvince } from 'boot/filters';
import type { AddressForm } from 'src/types/address-form';
import type { Address } from 'src/types/address';
import { useAddressStore } from 'src/stores/address-store';
import { useHelpers } from 'src/composables/helpers';
import { useNotify } from 'src/composables/notify';

const emit = defineEmits(['onNavigateSection']);

const { notifySuccess } = useNotify();
const { onSpinner, handleApiError } = useHelpers();
const addressStore = useAddressStore();
const map = ref<L.Map | null>(null);
const marker = ref<Marker | null>(null);
const localAddress = ref<AddressForm>({
  address: '',
  reference: '',
  phone: '',
  department: null,
  province: null,
  district: null,
  default: false,
});

const departmentOptions = computed(() => {
  const dataFilter: SelectOption[] = [];
  const data = departments;
  Object.keys(data).forEach((key: string) => {
    dataFilter.push({
      name: data[key]!,
      id: String(key),
    });
  });

  const result = _.orderBy(dataFilter, ['value']);
  return result;
});

const provinceOptionsFilter = computed(() => {
  return ubigeoFilterProvince(localAddress.value.department);
});

const districtOptionsFilter = computed(() => {
  return ubigeoFilterDistrict(localAddress.value.province);
});

onMounted(() => {
  onLoadMap();
  onSetMarker();
});

const onLoadMap = () => {
  map.value = L.map('map', { zoomControl: false }).setView(
    [-12.046643864202451, -77.04341310851444],
    12,
  );

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map.value as L.Map);

  L.control.zoom({ position: 'bottomright' }).addTo(map.value as L.Map);
};

const onSetMarker = () => {
  if (!map.value) return;

  marker.value = L.marker([-12.053845, -77.044596], { draggable: true })
    .addTo(map.value as L.Map)
    .bindPopup('🏠 Dirección de envío.');
};

const onUpdateDepartment = (val: string) => {
  localAddress.value.department = val;
  localAddress.value.province = null;
  localAddress.value.district = null;
};

const onUpdateProvince = (val: string) => {
  localAddress.value.province = val;
  localAddress.value.district = null;
};

const onAddAddress = async (): Promise<void> => {
  const payload: Address = {
    address: localAddress.value.address,
    reference: localAddress.value.reference,
    phone: localAddress.value.phone,
    ubigeo: localAddress.value.district!,
    default: localAddress.value.default,
    lat: 0,
    lng: 0,
  };
  if (marker.value?.getLatLng()) {
    payload.lat = marker.value?.getLatLng().lat;
    payload.lng = marker.value?.getLatLng().lng;
  }

  onSpinner(true);
  try {
    await addressStore.create(payload);
    notifySuccess('Dirección agregada correctamente');
    emit('onNavigateSection', 'addresses');
  } catch (error) {
    handleApiError(error);
  } finally {
    onSpinner(false);
  }
};
</script>
<style lang="scss" scoped></style>
