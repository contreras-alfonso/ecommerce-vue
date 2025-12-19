<template>
  <q-page>
    <div class="q-py-xl text-grey-10 text-center q-pa-md flex flex-center">
      <div>
        <div class="text-h1 text-primary text-weight-bold">404</div>

        <div
          :class="{ 'text-h5': $q.screen.lt.sm, 'text-h4': !$q.screen.lt.sm }"
          class="text-weight-bolder"
        >
          ¡Oops! Página no encontrada
        </div>

        <div
          :class="{
            'text-subtitle1': $q.screen.lt.sm,
            'text-h6': !$q.screen.lt.sm,
          }"
          class="text-weight-regular q-mt-sm text-grey-8"
        >
          Parece que la página que buscas se fue de vacaciones.
        </div>

        <q-btn
          flat
          class="q-mt-xl q-px-xl q-py-md bg-secondary text-white"
          to="/"
          label="Ir al inicio"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
//
</script>
