<template>
  <q-form @submit="onAddAddress">
    <div class="text-h6 q-mb-md">Agregar nueva dirección</div>

    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-12">
        <InputElement
          label="Dirección"
          :model-value="newAddress.address"
          @update:model-value="(val: string) => (newAddress.address = val)"
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
          :model-value="newAddress.reference"
          @update:model-value="(val: string) => (newAddress.reference = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
        />
      </div>

      <div class="col-md-6 col-12">
        <InputElement
          label="Celular"
          :model-value="newAddress.phone"
          @update:model-value="(val: string) => (newAddress.phone = val)"
          :outlined="true"
          bg-color="white"
          border-black
          is-square
          :rules-config="['isRequired']"
        />
      </div>

      <div class="col-md-6 col-12">
        <SelectElement
          :model-value="newAddress.department"
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
          :model-value="newAddress.province"
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
          :model-value="newAddress.district"
          @update:model-value="(val: string) => (newAddress.district = val)"
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
          v-model="newAddress.isDefault"
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
import type { AddressRequest } from 'src/types/address-request';

const map = ref<L.Map | null>(null);
const marker = ref<Marker | null>(null);
const newAddress = ref<AddressForm>({
  address: 'Av. Caminos del Inca 22, Santiago de Surco 15039',
  reference: 'A 2 cuadras de la municipalidad',
  phone: '984852214',
  department: null,
  province: null,
  district: null,
  isDefault: false,
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
  return ubigeoFilterProvince(newAddress.value.department);
});

const districtOptionsFilter = computed(() => {
  return ubigeoFilterDistrict(newAddress.value.province);
});

onMounted(() => {
  onLoadMap();
  onSetMarker();
});

const onLoadMap = () => {
  //if (!map.value) return;

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

  // console.log(marker.value.getLatLng());
};

const onUpdateDepartment = (val: string) => {
  newAddress.value.department = val;
  newAddress.value.province = null;
  newAddress.value.district = null;
};

const onUpdateProvince = (val: string) => {
  newAddress.value.province = val;
  newAddress.value.district = null;
};

const onAddAddress = (): void => {
  const payload: AddressRequest = {
    address: newAddress.value.address,
    reference: newAddress.value.reference,
    phone: newAddress.value.phone,
    ubigeo: newAddress.value.district!,
    isDefault: newAddress.value.isDefault,
    lat: 0,
    lng: 0,
  };
  if (marker.value?.getLatLng()) {
    payload.lat = marker.value?.getLatLng().lat;
    payload.lng = marker.value?.getLatLng().lng;
  }
};
</script>
<style lang="scss" scoped></style>
