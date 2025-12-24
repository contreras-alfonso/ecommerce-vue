<template>
  <div class="row items-center">
    <q-skeleton type="text" width="150px" class="bg-grey-3" animation="fade" />
  </div>

  <div class="row q-col-gutter-sm q-py-md">
    <div class="col-6" v-for="i in 4" :key="i">
      <div class="column text-subtitle1">
        <div class="text-grey-7">
          <q-skeleton type="text" width="100px" class="bg-grey-3" animation="fade" />
        </div>
        <div><q-skeleton type="text" width="200px" class="bg-grey-3" animation="fade" /></div>
      </div>
    </div>
  </div>

  <div class="row items-center">
    <q-skeleton type="text" width="150px" class="bg-grey-3" animation="fade" />
  </div>

  <div class="row q-col-gutter-sm q-py-md">
    <div class="col-6" v-for="i in 3" :key="i">
      <div class="column text-subtitle1">
        <div class="text-grey-7">
          <q-skeleton type="text" width="100px" class="bg-grey-3" animation="fade" />
        </div>
        <div><q-skeleton type="text" width="200px" class="bg-grey-3" animation="fade" /></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang=""></style>
