<template>
  <label :for="`input_${title}`" class="input__wrapper">
    <span v-if="title" class="input_title">
      {{ title }}
    </span>
    <div class="wrapper">
      <div class="input__before">
        <span v-if="checkRequired" class="required">{{ requiredText }}</span>
      </div>
      <input
        :type="type"
        :id="`input_${title}`"
        :step="step"
        :min="min"
        :max="max"
        :placeholder="
          type === 'password'
            ? '********'
            : text
              ? text.toString()
              : placeholder
        "
        v-model="inputValue"
        :readonly="readonly"
        :class="[
          { required: checkRequired },
          { readonly: readonly },
          { is_not_empty: text },
        ]"
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
    </div>
  </label>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const props = defineProps({
    title: {
      required: false,
      default: '',
      type: String,
    },
    type: {
      required: false,
      default: 'text',
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
    placeholder: {
      required: false,
      default: '',
      type: String,
    },
  });

  const inputValue = ref<string | number>('');
  const checkRequired = computed(() => {
    return props.req;
  });
  const requiredText = ref('Обязательный ввод');
  const readonly = ref(!props.autocomplete || props.readonly);
</script>

<style scoped lang="scss">
  .input__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .input_title {
    font-size: 16px;
    font-weight: 500;
    transition: 0.15s ease-in-out;
  }

  .input__wrapper > .wrapper {
    position: relative;
    width: 100%;
    height: 48px;
    transition: 0.15s ease-in-out;
  }

  .input__wrapper > .wrapper:active {
    scale: 0.99;
  }

  .input__wrapper > .wrapper:has(input.required) {
    margin-bottom: 13px;
  }

  .input__wrapper > .wrapper > input {
    width: 100%;
    border: none;
    position: absolute;
    outline: none;
    box-shadow:
      0 7px 32px rgba(99, 99, 99, 0.07),
      inset 0 0 0 1px #ecebed;
    border-radius: var(--br-small);
    height: 100%;
    padding: 16px 14px;
    font-size: 20px;
    transition: 0.15s ease-in-out;
    -webkit-transition: 0.15s ease-in-out;
    -moz-transition: 0.15s ease-in-out;
    -ms-transition: 0.15s ease-in-out;
    -o-transition: 0.15s ease-in-out;
    z-index: 2;
  }

  .input__wrapper > .wrapper > input:active {
    color: var(--color-primary);
  }

  .input__wrapper > .wrapper > input.required {
    box-shadow:
      0 7px 64px rgba(255, 100, 124, 0.07),
      inset 0 0 0 2px var(--color-red);
  }

  .input__wrapper > .wrapper > .input__before {
    display: flex;
    align-items: end;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-color: var(--color-primary);
    border-radius: var(--br-small);
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: 0.15s ease-in-out;
  }

  .input__before:has(+ input:focus) {
    top: 3px !important;
    box-shadow: 0 7px 64px 0 rgba(105, 121, 248, 0.07);
  }

  .input__before:has(+ input.required) {
    top: 3px !important;
    box-shadow: 0 7px 64px rgba(255, 100, 124, 0.07);
  }

  .input__wrapper > .wrapper > input.readonly {
    cursor: default;
  }

  .input_title:has(+ .wrapper > input:focus) {
    color: var(--color-primary);
  }

  .input_title:has(+ .wrapper > input.required) {
    color: var(--color-red);
  }

  .input__wrapper > .wrapper > input::placeholder {
    color: #6161615f;
  }

  .input__wrapper > .wrapper > input.is_not_empty::placeholder {
    color: var(--text-primary);
  }

  .input__before:has(+ input.required) {
    top: 15px !important;
    box-shadow: 0 7px 64px 0 rgba(255, 100, 124, 0.07);
    background-color: var(--color-red) !important;
  }

  span.required {
    padding-left: 10px;
    padding-bottom: 1px;
    font-size: 12px;
    font-weight: 550;
    color: white;
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
