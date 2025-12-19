<template>
  <q-page padding>
    <div class="row items-center justify-center">
      <div class="col-md-11 col-12 q-gutter-y-md">
        <div class="row justify-between">
          <Title :title="title" />

          <div class="row items-center q-col-gutter-x-md">
            <div>
              <InputElement
                dense
                placeholder="Buscar"
                :model-value="filter"
                @update:model-value="(val: string) => (filter = val)"
                icon-color="grey"
                :outlined="true"
                bg-color="white"
                border-black
                icon="search"
                is-square
              />
            </div>

            <div>
              <q-btn
                @click="onHandleAdd"
                class="bg-primary text-white text-caption q-py-sm full-width"
                icon="add"
                :label="`Agregar ${titleSingular}`"
                flat
              />
            </div>
          </div>
        </div>

        <q-table
          class="q-mb-xl"
          :rows="colorStore.getAll"
          :columns="columns"
          :visible-columns="visible"
          row-key="id"
          virtual-scroll
          :grid="$q.screen.xs || $q.screen.sm"
          :dense="$q.screen.lt.md"
          :pagination="pagination"
          :filter="filter"
          flat
        >
          <template v-slot:header="props" v-if="!($q.screen.xs || $q.screen.sm)">
            <q-tr class="bg-secondary text-white" :props="props">
              <template v-for="col in props.cols" :key="col.name">
                <q-th :props="props">
                  {{ col.label }}
                </q-th>
              </template>
              <q-th auto-width></q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">
            <q-tr :props="props">
              <template v-for="col in props.cols" :key="col.name">
                <q-td v-if="col.name !== 'hex'" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>

                <q-td v-if="col.name == 'hex'" :key="col.name" :props="props">
                  <div class="row items-center justify-center q-col-gutter-x-md">
                    <div class="col">{{ col.value }}</div>
                    <div>
                      <q-avatar
                        size="md"
                        :style="{ backgroundColor: col.value }"
                        style="border: 1px solid #696969"
                      />
                    </div>
                  </div>
                </q-td>
              </template>

              <q-td auto-width>
                <div class="q-gutter-sm">
                  <slot name="actions-table" :row="props.row"></slot>
                  <q-btn
                    @click="onHandleUpdate(props.row)"
                    icon="edit"
                    class="bg-secondary text-white"
                    size="sm"
                    round
                  >
                    <q-tooltip v-if="!$q.screen.lt.sm" class="bg-grey-8 shadow-1 text-center">
                      Editar
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-td>
            </q-tr>
          </template>

          <template v-slot:item="props">
            <div class="col-xs-12 col-sm-4">
              <div class="q-table__grid-item-card q-table__card q-ma-xs">
                <div class="q-table__grid-item-row" v-for="col in props.cols" :key="col.name">
                  <div class="q-table__grid-item-title">
                    {{ col.label }}
                  </div>
                  <div class="q-table__grid-item-value">
                    {{ col.value }}
                  </div>
                </div>
                <div class="q-table__grid-item-row">
                  <div class="q-table__grid-item-title">Acciones</div>
                  <div class="q-table__grid-item-value">
                    <div class="q-gutter-sm">
                      <slot name="actions-table-movil" :row="props.row"></slot>
                      <q-chip
                        class="q-py-md"
                        round
                        clickable
                        label="Editar"
                        icon="edit"
                        color="secondary"
                        text-color="white"
                        size="sm"
                        @click="onHandleUpdate(props.row)"
                      >
                      </q-chip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </q-table>
      </div>
    </div>

    <Management
      v-if="dialogs.management.isOpen"
      :title="titleSingular"
      :type-management="dialogs.management.type"
      :color="dialogs.management.entity"
      @on-close="onClose"
    />
  </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import InputElement from 'src/components/elements/Input.vue';
import Management from 'src/components/administration/colors/Management.vue';
import Title from 'src/components/administration/Title.vue';
import type { Color } from 'src/types/color';
import type { ColumnTable } from 'src/types/column-table';
import type { ManagementDialog } from 'src/types/management-dialog';
import { useColorStore } from 'src/stores/color-store';
import { useHelpers } from 'src/composables/helpers';

const { handleApiError, onSpinner } = useHelpers();
const colorStore = useColorStore();

const $q = useQuasar();
const { t } = useI18n();
const title = t('page.administration.colors.title', 2);
const titleSingular = t('page.administration.colors.title', 1);

const dialogs = ref<{ management: ManagementDialog<Color> }>({
  management: {
    isOpen: false,
    type: 'CREATE',
    entity: null,
  },
});

const pagination = ref({
  page: 1,
  rowsPerPage: $q.screen.lt.sm ? 5 : 20,
});

const filter = ref<string>('');

const visible: string[] = ['name', 'hex', 'createdAt', 'updatedAt'];

const columns: ColumnTable[] = [
  {
    name: 'name',
    label: 'Nombre',
    field: 'name',
    align: 'center',
    sortable: true,
  },

  {
    name: 'hex',
    label: 'Hexadecimal',
    field: 'hex',
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
    await colorStore.fetchAll();
  } catch (error) {
    handleApiError(error);
  }
};

const onHandleUpdate = (color: Color): void => {
  dialogs.value.management.isOpen = true;
  dialogs.value.management.type = 'EDIT';
  dialogs.value.management.entity = color;
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
