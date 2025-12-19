<template>
  <q-page padding>
    <div class="row items-center justify-center">
      <div class="col-md-11 col-12 q-gutter-y-md">
        <Table
          :title-singular="titleSingular"
          :title="title"
          :visible="visible"
          :columns="columns"
          :rows="categoryStore.getAll"
          @on-handle-add="onHandleAdd"
          @on-handle-update="onHandleUpdate"
        />
      </div>
    </div>

    <Management
      v-if="dialogs.management.isOpen"
      :title="titleSingular"
      :type-management="dialogs.management.type"
      :category="dialogs.management.entity"
      @on-close="onClose"
    />
  </q-page>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Table from 'src/components/administration/Table.vue';
import Management from 'src/components/administration/categories/Management.vue';
import type { Category } from 'src/types/category';
import type { ColumnTable } from 'src/types/column-table';
import type { ManagementDialog } from 'src/types/management-dialog';
import { useCategoryStore } from 'src/stores/category-store';
import { useHelpers } from 'src/composables/helpers';

const { handleApiError, onSpinner } = useHelpers();
const categoryStore = useCategoryStore();

const { t } = useI18n();
const title = t('page.administration.categories.title', 2);
const titleSingular = t('page.administration.categories.title', 1);

const dialogs = ref<{ management: ManagementDialog<Category> }>({
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
    await categoryStore.fetchAll();
  } catch (error) {
    handleApiError(error);
  }
};

const onHandleUpdate = (category: Category): void => {
  dialogs.value.management.isOpen = true;
  dialogs.value.management.type = 'EDIT';
  dialogs.value.management.entity = category;
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
