<template>
  <q-page padding>
    <div class="row items-center justify-center">
      <div class="col-md-11 col-12 q-gutter-y-md">
        <Table
          :title-singular="titleSingular"
          :title="title"
          :visible="visible"
          :columns="columns"
          :rows="brandStore.getAll"
          @on-handle-add="onHandleAdd"
          @on-handle-update="onHandleUpdate"
        />
      </div>
    </div>

    <Management
      v-if="dialogs.management.isOpen"
      :title="titleSingular"
      :type-management="dialogs.management.type"
      :brand="dialogs.management.entity"
      @on-close="onClose"
    />
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Table from 'src/components/administration/Table.vue';
import Management from 'src/components/administration/brands/Management.vue';
import type { Brand } from 'src/types/brand';
import type { ColumnTable } from 'src/types/column-table';
import type { ManagementDialog } from 'src/types/management-dialog';
import { useBrandStore } from 'src/stores/brand-store';
import { useHelpers } from 'src/composables/helpers';

const { handleApiError, onSpinner } = useHelpers();
const brandStore = useBrandStore();

const { t } = useI18n();
const title = t('page.administration.brands.title', 2);
const titleSingular = t('page.administration.brands.title', 1);

const dialogs = ref<{ management: ManagementDialog<Brand> }>({
  management: {
    isOpen: false,
    type: 'CREATE',
    entity: null,
  },
});

const visible: string[] = ['name', 'slug', 'createdAt', 'updatedAt'];

const columns: ColumnTable[] = [
  {
    name: 'name',
    label: 'Nombre',
    field: 'name',
    align: 'center',
    sortable: true,
  },

  {
    name: 'slug',
    label: 'Slug',
    field: 'slug',
    align: 'center',
    sortable: true,
  },

  {
    name: 'createdAt',
    label: 'Fecha de creación',
    field: 'createdAt',
    align: 'center',
    sortable: true,
  },

  {
    name: 'updatedAt',
    label: 'Fecha de actualización',
    field: 'updatedAt',
    align: 'center',
    sortable: true,
  },
];

onMounted(async () => {
  await onLoad();
});

const onLoad = async () => {
  onSpinner(true);
  await Promise.all([fetchAll()])
    .then(() => {})
    .finally(() => {
      onSpinner(false);
    });
};

const fetchAll = async () => {
  try {
    await brandStore.fetchAll();
  } catch (error) {
    handleApiError(error);
  }
};

const onHandleUpdate = (brand: Brand): void => {
  dialogs.value.management.isOpen = true;
  dialogs.value.management.type = 'EDIT';
  dialogs.value.management.entity = brand;
};

const onHandleAdd = () => {
  dialogs.value.management.isOpen = true;
  dialogs.value.management.type = 'CREATE';
  dialogs.value.management.entity = null;
};

const onClose = () => {
  dialogs.value.management.isOpen = false;
};
</script>
<style lang=""></style>
