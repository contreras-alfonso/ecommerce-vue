<template>
  <q-select
    :outlined="outlined"
    option-label="name"
    option-value="id"
    :use-input="useInput"
    v-model="inputVal"
    :class="{ 'hide-arrow': localReadOnly }"
    class="text-weight-medium"
    color="grey-10"
    selected-item-class="text-white"
    label-color="grey-7"
    :input-class="[
      'text-grey-10 text-subtitle1',
      {
        'no-border': noBorder,
        'border-black': borderBlack,
      },
    ]"
    map-options
    emit-value
    hide-bottom-space
    :dense="dense"
    :label="label"
    :options="list.items"
    :readonly="localReadOnly"
    :clearable="isClearable"
    :multiple="isMultiple"
    :square="isSquare ? true : false"
    :use-chips="isMultiple ? true : false"
    :rules="computedRules"
    @filter="filterFn"
    @update:model-value="onChange"
    no-error-icon
    :loading="localIsLoading"
    dropdown-icon="expand_more"
  >
    <template v-slot:loading>
      <q-spinner color="grey" />
    </template>
    <template v-slot:label>
      <div>
        {{ label }} <span class="text-red" v-if="props.rulesConfig?.includes('isRequired')">*</span>
      </div>
    </template>
    <template v-if="removeChip" v-slot:selected-item="scope">
      <q-chip dense class="q-ma-xs">
        {{ scope.opt.name }}
      </q-chip>
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey-7"> No se encontraron resultados </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import type { SelectOption } from 'src/types/select-option';
import { ref, computed, watch } from 'vue';


const props = withDefaults(
  defineProps<{
    label?: string;
    isRequired?: boolean;
    outlined?: boolean;
    isClearable?: boolean;
    isMultiple?: boolean;
    removeChip?: boolean;
    options: SelectOption[];
    dense?: boolean;
    isReadOnly?: boolean;
    isRounded?: boolean;
    modelValue?: string | number | null | SelectOption;
    rulesConfig?: string[];
    isLoading?: boolean;
    isSquare?: boolean;
    borderBlack?: boolean;
    noBorder?: boolean;
    useInput?: boolean;
  }>(),
  {
    isClearable: true,
    useInput: true,
  },
);
const emit = defineEmits(['update:modelValue', 'changeName:name']);

const localReadOnly = ref(props.isReadOnly);
const list = ref<{ items: SelectOption[] }>({
  items: props.options,
});

const localIsLoading = ref(props.isLoading);

const inputVal = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const computedRules = computed(() => {
  const rules = [];

  if (props?.rulesConfig?.includes('isRequired') || props.isRequired) {
    rules.push((val: string) => !!val || 'Completa este campo');
  }
  return rules;
});

const filterFn = (val: string, update: (callback: () => void) => void) => {
  if (val === '') {
    update(() => {
      list.value.items = props.options;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    list.value.items = props.options.filter((v: SelectOption) => {
      const name = v.name.toLowerCase();
      return name.includes(needle);
    });
  });
};

const onChange = (val: string) => {
  emit('update:modelValue', val);
};

watch(
  () => props.isReadOnly,
  (newValue) => {
    localReadOnly.value = newValue;
  },
);

watch(
  () => props.options,
  (newOptions) => {
    list.value.items = newOptions;
  },
);
watch(
  () => props.isLoading,
  (newValue) => {
    localIsLoading.value = newValue;
  },
);
</script>

<style lang="scss">
.q-field--outlined:has(.no-border) .q-field__control::before {
  border: none;
}

.q-field--outlined:has(.no-border) .q-field__control::after {
  border: none;
}

.q-field--outlined:has(.border-black) .q-field__control::before {
  border: 1px solid black;
}
</style>
