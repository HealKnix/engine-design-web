<template>
  <div class="input">
    <label>{{ title }}</label>
    <input type="text" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    default: '',
    required: false,
    type: String,
  },
});
</script>

<style scoped></style>
