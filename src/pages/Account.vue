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
                  <Addresses @on-navigate-section="onNavigateSection" />
                </q-tab-panel>

                <q-tab-panel name="profile-edit">
                  <ProfileEdit :profile="profile" :loading="loading.profile" />
                </q-tab-panel>

                <q-tab-panel name="addresses-add">
                  <NewAddress />
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
import 'leaflet/dist/leaflet.css';
import { useRouter, useRoute } from 'vue-router';
import { nextTick, onMounted, ref, watch } from 'vue';
import ProfileEdit from 'src/components/account/ProfileEdit.vue';
import { TabAccount } from 'src/types/tab-account';
import { useProfileStore } from 'src/stores/profile-store';
import type { Profile } from 'src/types/profile';
import ProfileTab from 'src/components/account/Profile.vue';
import NewAddress from 'src/components/account/NewAddress.vue';
import Addresses from 'src/components/account/Addresses.vue';

const profileStore = useProfileStore();
const router = useRouter();
const route = useRoute();
const profile = ref<Profile | null>(null);

const tab = ref('profile');
const splitterModel = ref(20);
const loading = ref({
  profile: false,
});

onMounted(async () => {
  await nextTick();
  if (route.params.section === 'addresses-add') {
    // onLoadMap();
    // onSetMarker();
  }
});

const onNavigateSection = async (path: string) => {
  await onChangeTab(path);
  await onSetTab();
  if (path === 'addresses-add') {
    await nextTick();
    // onLoadMap();
    // onSetMarker();
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
  async () => {
    await onSetTab();
  },
  { immediate: true },
);

watch(
  () => tab.value,
  async (val) => {
    if (val === 'profile-edit' || val === 'profile') {
      await findProfile();
    }
  },
  { immediate: true },
);

watch(
  () => profileStore.profile,
  (val: Profile | null) => {
    profile.value = val;
  },
);
</script>
<style lang="scss" scoped></style>
