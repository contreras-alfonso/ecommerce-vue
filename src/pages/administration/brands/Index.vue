<template>
  <q-page padding>
    <div class="row items-center justify-center">
      <div class="col-md-11 col-12 q-gutter-y-md">
        <Table
          :title-singular="titleSingular"
          :title="title"
          :visible="visible"
          :columns="columns"
          :rows="rows"
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
import { ref } from 'vue';
import { uid } from 'quasar';
import { useI18n } from 'vue-i18n';
import Table from 'src/components/administration/Table.vue';
import type { Brand } from 'src/types/brand';
import type { ColumnTable } from 'src/types/column-table';
import Management from 'src/components/administration/brands/Management.vue';
import type { ManagementDialog } from 'src/types/management-dialog';

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

const visible: string[] = ['name', 'slug', 'created_at', 'updated_at'];

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
    name: 'created_at',
    label: 'Fecha de creación',
    field: 'created_at',
    align: 'center',
    sortable: true,
  },

  {
    name: 'updated_at',
    label: 'Fecha de actualización',
    field: 'updated_at',
    align: 'center',
    sortable: true,
  },
];

const rows: Brand[] = [
  {
    id: uid(),
    created_at: '2025-12-11 10:00:00',
    updated_at: null,
    name: 'Apple',
    slug: 'apple',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:05:00',
    updated_at: null,
    name: 'Samsung',
    slug: 'samsung',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:10:00',
    updated_at: null,
    name: 'Xiaomi',
    slug: 'xiaomi',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:15:00',
    updated_at: null,
    name: 'Huawei',
    slug: 'huawei',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:20:00',
    updated_at: null,
    name: 'Motorola',
    slug: 'motorola',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:25:00',
    updated_at: null,
    name: 'Sony',
    slug: 'sony',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:30:00',
    updated_at: null,
    name: 'LG',
    slug: 'lg',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:35:00',
    updated_at: null,
    name: 'Nokia',
    slug: 'nokia',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:40:00',
    updated_at: null,
    name: 'Realme',
    slug: 'realme',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:45:00',
    updated_at: null,
    name: 'OnePlus',
    slug: 'oneplus',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:50:00',
    updated_at: null,
    name: 'Oppo',
    slug: 'oppo',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:55:00',
    updated_at: null,
    name: 'Asus',
    slug: 'asus',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:00:00',
    updated_at: null,
    name: 'Lenovo',
    slug: 'lenovo',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:05:00',
    updated_at: null,
    name: 'HP',
    slug: 'hp',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:10:00',
    updated_at: null,
    name: 'Dell',
    slug: 'dell',
  },
];

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
