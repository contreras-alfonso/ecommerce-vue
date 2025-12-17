<template>
  <q-dialog persistent :model-value="isOpen">
    <q-card class="my-card bg-white" style="width: 100%">
      <q-card-section>
        <div class="row">
          <div class="text-h6">Seleccionar color</div>
          <q-space />
          <q-btn icon="close" color="grey-6" size="md" round flat @click="onClose" />
        </div>

        <q-separator spaced color="grey-3" />
      </q-card-section>

      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-pt-none q-gutter-y-md">
          <q-toggle v-model="newColor" label="Crear nuevo color" color="primary" />
          <SelectElement
            :model-value="selectedColor"
            @update:model-value="(val: string) => (selectedColor = val)"
            label="Color"
            :options="localColors"
            :rules-config="['isRequired']"
            :outlined="true"
            border-black
            is-square
          />
        </q-card-section>
        <q-card-section>
          <q-btn
            type="submit"
            class="bg-secondary text-white q-px-xl q-py-md full-width text-weight-regular"
            label="Seleccionar"
            flat
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import SelectElement from 'src/components/elements/Select.vue';
import type { Color } from 'src/types/color';

const emit = defineEmits(['onSubmit', 'onClose']);

const props = defineProps<{
  colors: Color[];
}>();

const newColor = ref(false);
const selectedColor = ref('');

const localColors = ref<Color[]>(props.colors);

const isOpen = ref(true);
const onSubmit = () => {
  emit('onSubmit', selectedColor.value);
};

const onClose = () => {
  emit('onClose', false);
};
</script>
<style lang=""></style>
