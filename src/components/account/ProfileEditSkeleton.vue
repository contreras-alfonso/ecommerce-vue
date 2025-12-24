<template>
  <div class="text-h6 q-mb-md">
    <q-skeleton type="text" width="200px" class="bg-grey-3" animation="fade" />
  </div>

  <div class="row q-col-gutter-md">
    <div class="col-md-6 col-12" v-for="i in 6" :key="i">
      <q-skeleton type="QInput" class="bg-grey-3" animation="fade" />
    </div>
  </div>

  <div class="q-mt-lg">
    <q-skeleton type="QInput" class="bg-grey-3" animation="fade" />
  </div>
</template>
<script setup lang="ts"></script>
<style lang=""></style>
