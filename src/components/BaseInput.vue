<template>
  <label :for="`input_${title}`" class="input__wrapper">
    <span v-if="title" class="input_title">
      {{ title }}
    </span>
    <input
      :type="type"
      :id="`input_${title}`"
      :step="step"
      :min="min"
      :max="max"
      :placeholder="
        type === 'password' ? '********' : text ? text.toString() : ''
      "
      v-model="inputValue"
      :readonly="readonly"
      :class="[{ required: req }, { readonly: readonly }]"
      @input="$emit('update:modelValue', inputValue)"
      @focus="
        () => {
          inputValue = text;
          if (autocomplete) return;
          readonly = false;
        }
      "
      @focusout="
        () => {
          inputValue = '';
          if (autocomplete) return;
          readonly = true;
        }
      "
    />
    <span v-if="req" class="required">{{ requiredText }}</span>
  </label>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps({
    title: {
      required: false,
      default: '',
      type: String,
    },
    type: {
      required: false,
      default: '',
      type: String,
    },
    req: {
      required: false,
      default: false,
      type: Boolean,
    },
    text: {
      required: false,
      default: '',
      type: [String, Number],
    },
    autocomplete: {
      required: false,
      default: true,
      type: Boolean,
    },
    readonly: {
      required: false,
      default: false,
      type: Boolean,
    },
    step: {
      required: false,
      default: 1,
      type: Number,
    },
    min: {
      required: false,
      default: 0,
      type: Number,
    },
    max: {
      required: false,
      default: Infinity,
      type: Number,
    },
  });

  const inputValue = ref<string | number>('');
  const requiredText = ref('Обязательный ввод');
  const readonly = ref(!props.autocomplete || props.readonly);
</script>

<style scoped>
  .input__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input_title {
    font-size: 16px;
    font-weight: 500;
    transition: 0.15s ease-in-out;
  }

  .input__wrapper > input {
    border: none;
    outline: none;
    box-shadow: 0 0 0 1px #616161;
    border-radius: 7px;
    height: 44px;
    padding: 13px 10px;
    font-size: 20px;
    transition: box-shadow 0.15s ease-in-out;
  }

  .input__wrapper > input.readonly {
    cursor: default;
  }

  .input__wrapper > input:active {
    box-shadow: 0 0 0 2px var(--accent-color-2);
  }

  .input_title:has(+ input:active) {
    color: var(--accent-color-2);
  }

  .input__wrapper > input:focus {
    box-shadow: 0 0 0 2px var(--accent-color-2);
  }

  .input_title:has(+ input:focus) {
    color: var(--accent-color-2);
  }

  .input__wrapper > input::placeholder {
    color: #6161615f;
  }

  .input__wrapper > input.required {
    box-shadow: 0 0 0 2px #ff647c;
  }

  span.required {
    line-height: 15px;
    color: #ff647c;
    animation: opac 0.5s ease-in-out;
  }

  @keyframes opac {
    from {
      margin-top: -5px;
      opacity: 0;
    }
    to {
      margin-top: 0;
      opacity: 1;
    }
  }
</style>
