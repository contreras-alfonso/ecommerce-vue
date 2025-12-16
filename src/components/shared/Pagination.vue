<template>
  <q-pagination
    @update:model-value="onChangePage"
    class="pagination"
    gutter="sm"
    size="md"
    outline
    v-model="current"
    :max="5"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['onChangePage']);

const props = defineProps<{ currentPage: number }>();

const onChangePage = (page: number) => {
  emit('onChangePage', page);
};

const current = ref(props.currentPage);
</script>
<style lang="scss">
.pagination .q-btn:before {
  box-shadow: none;
}

.pagination .q-btn--rectangle {
  border-radius: 0;
}
</style>
