<template>
  <q-page class="q-py-xl q-px-md">
    <div class="row items-center justify-center">
      <div class="col-md-8 col-12 q-gutter-y-md">
        <div>
          <q-splitter v-model="splitterModel">
            <template v-slot:before>
              <q-tabs
                @update:model-value="onChangeTab"
                v-model="tab"
                vertical
                class="text-grey-7"
                active-class="text-primary"
              >
                <q-tab name="profile" icon="person" label="Mi perfil" />
                <q-tab name="orders" icon="local_mall" label="Pedidos (0)" />
                <q-tab name="addresses" icon="fmd_good" label="Direcciones (2)" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="profile">
                  <ProfileTab
                    :profile="profile"
                    :loading="loading.profile"
                    @on-navigate-section="onNavigateSection"
                  />
                </q-tab-panel>

                <q-tab-panel name="orders">
                  <div class="text-h6 q-mb-md">Pedidos</div>
                  <div class="column items-center justify-center">
                    <div class="">
                      <q-icon name="receipt" color="grey-5" size="xl" />
                    </div>
                    <div class="q-mt-md">Aún no haz realizado pedidos.</div>
                    <div class="q-mt-md">
                      <q-btn
                        @click="router.push('/')"
                        class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
                        label="Comprar productos"
                        flat
                      />
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="addresses">
                  <div class="text-h6 q-mb-md">Direcciones</div>
                  <div class="column items-center justify-center">
                    <div class="">
                      <q-icon name="add_location_alt" color="grey-5" size="xl" />
                    </div>
                    <div class="q-mt-md">
                      Aún no cuentas con direcciones, empieza agregando una nueva.
                    </div>
                    <div class="q-mt-md">
                      <q-btn
                        @click="onNavigateSection('addresses-add')"
                        class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
                        label="Agregar nueva dirección"
                        flat
                      />
                    </div>
                  </div>
                </q-tab-panel>

                <q-tab-panel name="profile-edit">
                  <ProfileEdit :profile="profile" :loading="loading.profile" />
                </q-tab-panel>

                <q-tab-panel name="addresses-add">
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
                    </div>

                    <div class="col-12 q-mt-lg">
                      <div class="text-subtitle1 text-weight-medium">
                        Indica tu dirección en el mapa
                      </div>
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
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import L from 'leaflet';
import type { Marker } from 'leaflet';

import 'leaflet/dist/leaflet.css';
import _ from 'lodash';
import { useRouter, useRoute } from 'vue-router';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import InputElement from 'src/components/elements/Input.vue';
import SelectElement from 'src/components/elements/Select.vue';
import ProfileEdit from 'src/components/account/ProfileEdit.vue';
import type { SelectOption } from 'src/types/select-option';
import type { Address } from 'src/types/address';
import { departments } from 'boot/ubigeo';
import { ubigeoFilterDistrict, ubigeoFilterProvince } from 'boot/filters';
import { TabAccount } from 'src/types/tab-account';
import { useProfileStore } from 'src/stores/profile-store';
import type { Profile } from 'src/types/profile';
import ProfileTab from 'src/components/account/Profile.vue';

const profileStore = useProfileStore();
const router = useRouter();
const route = useRoute();
const map = ref<L.Map | null>(null);
const marker = ref<Marker | null>(null);
const profile = ref<Profile | null>(null);

const tab = ref('profile');
const splitterModel = ref(20);
const loading = ref({
  profile: false,
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

onMounted(async () => {
  await nextTick();
  if (route.params.section === 'addresses-add') {
    onLoadMap();
    onSetMarker();
  }
});

const onNavigateSection = async (path: string) => {
  await onChangeTab(path);
  await onSetTab();
  if (path === 'addresses-add') {
    await nextTick();
    onLoadMap();
    onSetMarker();
  }
};

const onChangeTab = async (value: string) => {
  await router.push(`/account/${value}`);
};

const onSetTab = async () => {
  if (route.params.section) {
    if (typeof route.params.section === 'string') {
      if (Object.values(TabAccount).includes(route.params.section as TabAccount)) {
        tab.value = route.params.section as TabAccount;
      } else {
        tab.value = TabAccount.Profile;
        await onChangeTab('profile');
      }
    }
  }
};

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

const newAddress = ref<Address>({
  address: 'Av. Caminos del Inca 22, Santiago de Surco 15039',
  reference: 'A 2 cuadras de la municipalidad',
  phone: '984852214',
  department: null,
  province: null,
  district: null,
});

const onAddAddress = (): void => {};

const findProfile = async () => {
  loading.value.profile = true;
  try {
    await profileStore.findProfile();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value.profile = false;
  }
};

watch(
  () => route.params.section,
  async (val) => {
    console.log(val);
    if (val === 'profile-edit' || val === 'profile') {
      loading.value.profile = true;
      await findProfile();
    }
    await onSetTab();
  },
  { immediate: true },
);

watch(
  () => tab.value,
  () => {
    if (tab.value === 'profile-edit' || tab.value === 'profile') {
      loading.value.profile = true;
    }
  },
);

watch(
  () => profileStore.profile,
  (val: Profile | null) => {
    profile.value = val;
  },
);
</script>
<style lang="scss" scoped></style>
