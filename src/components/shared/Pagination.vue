<template>
  <q-pagination
    @update:model-value="onChangePage"
    class="pagination"
    gutter="sm"
    size="md"
    outline
    v-model="localCurrentPage"
    :max="localMaxPages"
  />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['onChangePage']);

const props = defineProps<{ currentPage: number; maxPages: number }>();

const localCurrentPage = ref<number>(props.currentPage);
const localMaxPages = ref<number>(props.maxPages);

const onChangePage = (page: number) => {
  emit('onChangePage', page);
};

watch(
  () => props.currentPage,
  (val: number) => {
    localCurrentPage.value = val;
  },
);

watch(
  () => props.maxPages,
  (val: number) => {
    localMaxPages.value = val;
  },
);
</script>
<style lang="scss">
.pagination .q-btn:before {
  box-shadow: none;
}

.pagination .q-btn--rectangle {
  border-radius: 0;
}
</style>
