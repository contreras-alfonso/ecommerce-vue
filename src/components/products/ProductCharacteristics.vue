<template lang="">
  <q-expansion-item
    class="overflow-hidden"
    expand-icon-class="text-black"
    style="border-radius: 20px"
    header-class="bg-grey-3 text-subtitle1 text-weight-medium q-py-md"
    icon="view_in_ar"
    label="Características del producto"
    default-opened
  >
    <div class="q-pa-md" v-html="characteristics"></div>
  </q-expansion-item>
</template>
<script setup lang="ts">

defineProps<{ characteristics: string }>();
</script>
<style lang=""></style>
