<template>
  <div
    class="form__wrapper"
    @click="
      () => {
        show = true;
      }
    "
    @focusin="
      () => {
        show = true;
      }
    "
    @mouseleave="
      () => {
        show = false;
      }
    ">
    <BaseInput
      :title="title"
      :text="inputValue"
      :readonly="true"
      style="margin-bottom: 5px" />
    <div v-if="show" class="radio_form">
      <div style="display: flex; flex-direction: column; overflow: auto">
        <label
          v-for="(item, index) in items"
          :key="item.id"
          :for="`radio_input_${name}_${index}`"
          class="input_radio__wrapper">
          <span class="radio_btn_text">
            {{ item.name }}
          </span>
          <input
            type="radio"
            :name="name"
            :id="`radio_input_${name}_${index}`"
            :checked="item.id === currentItemId"
            :value="item.value"
            @input="$emit('update:modelValue', item.value)"
            v-model="inputValue" />
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import { ref } from 'vue';

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

const inputValue = ref(props.items[props.currentItemId].value);
const show = ref(false);
</script>

<style scoped>
.form__wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.radio_form {
  display: flex;
  flex-direction: column;
  text-align: center;
  max-height: 380px;
  overflow: auto;
  border-radius: 7px;
  font-size: 20px;
  color: #333;
  outline: 1px solid #616161;
}

input {
  width: 0;
  opacity: 0;
}

.radio_form:has(label > input[type='radio']:focus) {
  outline: none;
  box-shadow: 0 0 0 2px var(--accent-color-2);
}

.input_radio__wrapper {
  cursor: pointer;
  font-weight: 500;
  padding: 15px 25px;
  background-color: white;
}

.input_radio__wrapper:hover {
  background-color: #3d69ed10;
}

.input_radio__wrapper:first-child {
  border-radius: 6px 6px 0 0;
}

.input_radio__wrapper:last-child {
  border-radius: 0 0 6px 6px;
}

.input_radio__wrapper:has(input[type='radio']:checked) {
  background-color: var(--accent-color-2);
}
.input_radio__wrapper:has(input[type='radio']:checked) > span {
  color: white;
}
</style>
