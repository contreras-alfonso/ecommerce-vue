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
  </q-page>
</template>
<script setup lang="ts">
import { uid } from 'quasar';
import { useI18n } from 'vue-i18n';
import Table from 'src/components/administration/Table.vue';
import type { Category } from 'src/types/category';
import type { ColumnTable } from 'src/types/column-table';

const { t } = useI18n();
const title = t('page.administration.categories.title', 2);
const titleSingular = t('page.administration.categories.title', 1);

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

const rows: Category[] = [
  {
    id: uid(),
    created_at: '2025-12-11 10:00:00',
    updated_at: null,
    name: 'Celulares',
    slug: 'celulares',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:05:00',
    updated_at: null,
    name: 'Audífonos',
    slug: 'audifonos',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:10:00',
    updated_at: null,
    name: 'Laptops',
    slug: 'laptops',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:15:00',
    updated_at: null,
    name: 'Tablets',
    slug: 'tablets',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:20:00',
    updated_at: null,
    name: 'Smartwatch',
    slug: 'smartwatch',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:25:00',
    updated_at: null,
    name: 'Televisores',
    slug: 'televisores',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:30:00',
    updated_at: null,
    name: 'Parlantes',
    slug: 'parlantes',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:35:00',
    updated_at: null,
    name: 'Cámaras',
    slug: 'camaras',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:40:00',
    updated_at: null,
    name: 'Accesorios',
    slug: 'accesorios',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:45:00',
    updated_at: null,
    name: 'Gaming',
    slug: 'gaming',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:50:00',
    updated_at: null,
    name: 'Monitores',
    slug: 'monitores',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:55:00',
    updated_at: null,
    name: 'Teclados',
    slug: 'teclados',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:00:00',
    updated_at: null,
    name: 'Mouse',
    slug: 'mouse',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:05:00',
    updated_at: null,
    name: 'Impresoras',
    slug: 'impresoras',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:10:00',
    updated_at: null,
    name: 'Redes y WiFi',
    slug: 'redes-wifi',
  },
];

const onHandleUpdate = (category: Category): void => {
  console.log(category.id);
};

const onHandleAdd = () => {};
</script>
<style lang=""></style>
