<template>
  <div class="form__wrapper">
    <span class="form_title"> {{ title }} </span>
    <div class="radio_form">
      <label
        v-for="(item, index) in items"
        :key="item.id"
        :for="`radio_input_${name}_${index}`"
        class="input__wrapper"
      >
        <span class="radio_btn_text">
          {{ item.name }}
        </span>
        <input
          type="radio"
          :name="name"
          :id="`radio_input_${name}_${index}`"
          :checked="item.id === currentItemId"
          :value="item.id"
          @input="$emit('update:modelValue', item.id)"
        />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: {
      require: false,
      default: '',
      type: String,
    },
    name: {
      require: true,
      default: '',
      type: String,
    },
    items: {
      require: true,
      default: new Object(),
      type: Object,
    },
    currentItemId: {
      require: false,
      default: 0,
      type: Number,
    },
  });
</script>

<style scoped lang="scss">
  .form__wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .form_title {
    font-size: 16px;
    font-weight: 500;
  }

  .radio_form {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  input {
    width: 0;
    opacity: 0;
  }

  .radio_form {
    border-radius: 7px;
    font-size: 20px;
    color: #333;
    box-shadow: 0 7px 32px rgba(66, 66, 66, 0.03);
    outline: 1px solid var(--color-border-1);
    overflow: hidden;
  }

  .radio_form:has(label > input[type='radio']:active) {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary);
  }

  .radio_form:has(label > input[type='radio']:focus) {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary);
  }

  .form_title:has(+ .radio_form > label > input[type='radio']:active) {
    color: var(--color-primary);
  }

  .form_title:has(+ .radio_form > label > input[type='radio']:focus) {
    color: var(--color-primary);
  }

  .input__wrapper {
    cursor: pointer;
    font-weight: 500;
    padding: 15px 25px;
    background-color: white;
  }

  .input__wrapper:not(:last-child) {
    border-bottom: 1px solid
      color-mix(in srgb, var(--color-border-1) 50%, transparent 0%);
  }

  .input__wrapper:hover {
    background-color: color-mix(
      in srgb,
      var(--color-primary) 10%,
      transparent 0%
    );
  }

  .input__wrapper:first-child {
    border-radius: 6px 6px 0 0;
  }

  .input__wrapper:last-child {
    border-radius: 0 0 6px 6px;
  }

  .input__wrapper:has(input[type='radio']:checked) {
    background-color: var(--color-primary);
  }
  .input__wrapper:has(input[type='radio']:checked) > span {
    color: white;
  }
</style>
