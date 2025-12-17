<template>
  <q-page padding>
    <div class="row items-center justify-center">
      <div class="col-md-11 col-12 q-gutter-y-md">
        <Title :title="title" />
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import Title from 'src/components/administration/Title.vue';

const { t } = useI18n();
const title = t('page.administration.products.title', 2);
</script>
<style lang=""></style>
