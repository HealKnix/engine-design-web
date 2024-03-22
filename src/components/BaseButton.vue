<template>
  <button>
    <span class="btn_text">
      {{ text }}
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: {
    require: true,
    default: '',
    type: String,
  },
});
</script>

<style scoped>
button {
  cursor: pointer;
  width: 100%;
  border: none;
  border-radius: 7px;
  padding: 15px 30px;
  font-size: 20px;
  font-weight: 500;
  background-color: var(--accent-color-2);
}

button > span {
  color: #fff;
}

button:hover {
  background-color: color-mix(in srgb, var(--accent-color-2), black 10%);
}

button:focus {
  outline: 2px solid #333;
}
</style>
