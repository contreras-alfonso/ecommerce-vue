<template>
  <q-breadcrumbs separator="/" class="text-secondary text-caption" active-color="grey-6">
    <q-breadcrumbs-el
      @click="router.push('/')"
      class="cursor-pointer hover-primary"
      label="Inicio"
    />
    <q-breadcrumbs-el :label="title" />
  </q-breadcrumbs>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
defineProps<{ title: string }>();
</script>
<style lang=""></style>
