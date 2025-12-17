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
          :rows="rows"
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
                  <q-avatar
                    size="md"
                    :style="{ backgroundColor: col.value }"
                    style="border: 1px solid #696969"
                  />
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
import { ref } from 'vue';
import { uid } from 'quasar';
import { useI18n } from 'vue-i18n';
import InputElement from 'src/components/elements/Input.vue';
import Management from 'src/components/administration/colors/Management.vue';
import Title from 'src/components/administration/Title.vue';
import type { Color } from 'src/types/color';
import type { ColumnTable } from 'src/types/column-table';
import type { ManagementDialog } from 'src/types/management-dialog';

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

const visible: string[] = ['name', 'hex', 'created_at', 'updated_at'];

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

const rows: Color[] = [
  {
    id: uid(),
    created_at: '2025-12-11 10:00:00',
    updated_at: null,
    name: 'Negro',
    hex: '#000000',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:05:00',
    updated_at: null,
    name: 'Blanco',
    hex: '#FFFFFF',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:10:00',
    updated_at: null,
    name: 'Gris',
    hex: '#9E9E9E',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:15:00',
    updated_at: null,
    name: 'Plateado',
    hex: '#C0C0C0',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:20:00',
    updated_at: null,
    name: 'Dorado',
    hex: '#FFD700',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:25:00',
    updated_at: null,
    name: 'Azul',
    hex: '#2196F3',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:30:00',
    updated_at: null,
    name: 'Azul Oscuro',
    hex: '#0D47A1',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:35:00',
    updated_at: null,
    name: 'Rojo',
    hex: '#F44336',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:40:00',
    updated_at: null,
    name: 'Verde',
    hex: '#4CAF50',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:45:00',
    updated_at: null,
    name: 'Verde Oscuro',
    hex: '#1B5E20',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:50:00',
    updated_at: null,
    name: 'Amarillo',
    hex: '#FFEB3B',
  },
  {
    id: uid(),
    created_at: '2025-12-11 10:55:00',
    updated_at: null,
    name: 'Naranja',
    hex: '#FF9800',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:00:00',
    updated_at: null,
    name: 'Morado',
    hex: '#9C27B0',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:05:00',
    updated_at: null,
    name: 'Rosado',
    hex: '#E91E63',
  },
  {
    id: uid(),
    created_at: '2025-12-11 11:10:00',
    updated_at: null,
    name: 'Marrón',
    hex: '#795548',
  },
];

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
