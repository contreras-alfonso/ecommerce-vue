<template>
  <q-skeleton type="text" width="100px" class="bg-grey-3 text-caption" animation="fade" />

  <q-skeleton type="text" width="150px" class="bg-grey-3 text-subtitle1" animation="fade" />
  <div class="row q-col-gutter-x-xl">
    <div class="col-8">
      <TableSkeleton :rows="6" :columns="4" />
    </div>
    <div class="col-4">
      <TotalCartCheckoutSkeleton />
    </div>
  </div>
</template>
<script setup lang="ts">
import TableSkeleton from 'src/components/shared/TableSkeleton.vue';
import TotalCartCheckoutSkeleton from 'src/components/cart/TotalCartCheckoutSkeleton.vue';
</script>
<style lang=""></style>
