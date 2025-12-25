<template>
  <div class="">
    <q-icon :name="icon" color="grey-5" size="xl" />
  </div>
  <div class="q-mt-md">{{ description }}</div>
  <div class="q-mt-md">
    <q-btn
      @click="onActionButton"
      class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
      :label="label"
      flat
    />
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['onActionButton']);
const props = defineProps<{ icon: string; description: string; label: string }>();

const onActionButton = () => {
  emit('onActionButton');
};
</script>
<style lang=""></style>
