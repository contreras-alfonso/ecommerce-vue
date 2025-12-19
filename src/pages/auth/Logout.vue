<template>
  <div></div>
</template>

<script setup lang="ts">
import { useAuth } from 'src/stores/auth-store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuth();
const router = useRouter();

onMounted(() => {
  authStore.logout();
  router.push('/');
});
</script>

<style scoped></style>
