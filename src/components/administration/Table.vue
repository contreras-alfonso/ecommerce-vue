<template>
  <div class="row justify-between">
    <Title :title="localTitle" />

    <div class="row items-center q-col-gutter-x-md">
      <div>
        <InputElement
          dense
          placeholder="Buscar"
          :model-value="localFilter"
          @update:model-value="(val: string) => (localFilter = val)"
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
          :label="`Agregar ${localTitleSingular}`"
          flat
        />
      </div>
    </div>
  </div>

  <q-table
    class="q-mb-xl"
    :rows="localRows"
    :columns="localColumns"
    :visible-columns="localVisible"
    row-key="id"
    virtual-scroll
    :grid="$q.screen.xs || $q.screen.sm"
    :dense="$q.screen.lt.md"
    :pagination="localPagination"
    :filter="localFilter"
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
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <template v-if="!Object.prototype.hasOwnProperty.call(col, 'tooltip')">
            {{ col.value }}
          </template>
          <template v-else>
            {{ col.value }}
            <q-tooltip
              v-if="!($q.screen.xs || $q.screen.sm)"
              class="bg-white"
              style="color: #000000"
            >
              {{ col.tooltip() }}
            </q-tooltip>
          </template>
        </q-td>

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
</template>
<script setup lang="ts" generic="T">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import Title from './Title.vue';
import InputElement from 'src/components/elements/Input.vue';
import type { ColumnTable } from 'src/types/column-table';

const emit = defineEmits(['onHandleUpdate', 'onHandleAdd']);

const props = defineProps<{
  titleSingular: string;
  title: string;
  visible: string[];
  rows: T[];
  columns: ColumnTable[];
}>();

const $q = useQuasar();

const localPagination = ref({
  page: 1,
  rowsPerPage: $q.screen.lt.sm ? 5 : 20,
});

const localFilter = ref('');
const localTitleSingular = ref(props.titleSingular);
const localTitle = ref(props.title);
const localVisible = ref([...props.visible]);
const localRows = ref([...props.rows]);
const localColumns = ref([...props.columns]);

const onHandleUpdate = (entity: string) => {
  emit('onHandleUpdate', entity);
};

const onHandleAdd = () => {
  emit('onHandleAdd');
};
</script>
<style lang="scss" scoped></style>
