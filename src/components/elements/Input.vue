<template>
  <q-input
    ref="inputRef"
    :label="label"
    :outlined="outlined"
    v-model="inputVal"
    color="grey-10"
    :label-color="labelColor ? labelColor : 'grey-7'"
    :bg-color="bgColor ? bgColor : 'white'"
    :input-class="[
      'text-grey-10 text-subtitle1',
      {
        'no-border': noBorder,
        'height-xl': inputXl,
        'text-center': textCenter,
        'border-black': borderBlack,
      },
    ]"
    :readonly="localReadOnly"
    :maxlength="maxLength && maxLength"
    :counter="maxLength ? true : false"
    :rounded="isRounded ? true : false"
    :square="isSquare ? true : false"
    :type="
      localIsPwd
        ? 'password'
        : isMail
          ? 'email'
          : isTextArea
            ? 'textarea'
            : props?.rulesConfig?.includes('isNumber') && $q.screen.lt.sm
              ? 'number'
              : 'text'
    "
    :rules="computedRules"
    :debounce="time"
    hide-bottom-space
    :prefix="prefix"
    no-error-icon
    :loading="localIsLoading"
    :style="props.inputHeight ? { '--input-height': props.inputHeight } : {}"
  >
    <template v-slot:label>
      <div>
        {{ label }} <span class="text-red" v-if="props.rulesConfig?.includes('isRequired')">*</span>
      </div>
    </template>
    <template v-slot:loading>
      <q-spinner color="primary" />
    </template>

    <template v-slot:append>
      <q-icon
        v-if="isPwd"
        :name="localIsPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        :color="iconColor ? iconColor : 'grey'"
        @click="localIsPwd = !localIsPwd"
      />
    </template>

    <template v-if="icon" v-slot:prepend>
      <q-icon :color="iconColor ? iconColor : 'grey-5'" :name="icon" />
    </template>
    <slot />
  </q-input>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const props = defineProps({
  label: String,
  isReadOnly: Boolean,
  rulesConfig: Array,
  isPwd: { type: Boolean, default: false, required: false },
  outlined: { type: Boolean, default: true },
  isColor: { type: Boolean, default: false },
  bgColor: { type: String, required: false },
  maxLength: { type: String, required: false },
  icon: { type: String, required: false },
  isRequired: Boolean,
  isNumber: Boolean,
  isText: Boolean,
  isMail: Boolean,
  isTextArea: Boolean,
  modelValue: [String, Number],
  time: { type: String, default: '0' },
  lengthRequired: { type: Number, default: 0 },
  minLengthRequired: { type: Number, required: false },
  mask: { type: String, default: '', required: false },
  prefix: { type: String, default: '', required: false },
  color: { type: String, default: 'grey-9', required: false },
  isPositive: { type: Boolean, default: false, required: false },
  isInteger: { type: Boolean, default: false, required: false },
  maxValue: { type: Number, required: false },
  minValue: { type: [Number, String], required: false },
  iconColor: { type: String, required: false },
  labelColor: { type: String, required: false },
  isLoading: { type: Boolean, default: false, required: false },
  isRounded: { type: Boolean, default: false, required: false },
  noBorder: { type: Boolean, default: false, required: false },
  inputXl: { type: Boolean, default: false, required: false },
  textCenter: { type: Boolean, default: false, required: false },
  isSquare: { type: Boolean, default: false, required: false },
  borderBlack: { type: Boolean, default: false, required: false },
  inputHeight: { type: String, required: false },
});

const emit = defineEmits(['update:modelValue']);

const localReadOnly = ref(props.isReadOnly);
const localIsPwd = ref(props.isPwd);
const localIsLoading = ref(props.isLoading);

const inputVal = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const computedRules = computed(() => {
  const rules = [];

  const isRequired = props?.rulesConfig?.includes('isRequired');
  const isEmpty = (val: string) => val === null || val === undefined || val === '';

  if (isRequired) {
    rules.push((val: string) => !isEmpty(val) || 'Completa este campo');
  }

  return rules;
});

watch(
  () => props.isReadOnly,
  (newValue) => {
    localReadOnly.value = newValue;
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

.q-field--outlined:has(.border-black) .q-field__control::before,
.q-field--outlined .q-field__control::before {
  border: 1px solid black;
}

.q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
  height: var(--input-height);
}
</style>
