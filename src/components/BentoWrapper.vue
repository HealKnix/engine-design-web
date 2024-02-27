<template>
  <div class="bento__wrapper" :class="direction">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  direction: {
    default: 'column',
    required: false,
    type: String,
  },
});
</script>

<style scoped>
.bento__wrapper {
  display: flex;
  gap: 15px;
  width: 100%;
  height: 100%;
  border-radius: var(--br-big);
  overflow: hidden;
}

.bento__wrapper.column {
  flex-direction: column;
  height: fit-content;
}

.bento__wrapper.row {
  flex-direction: row;
}
</style>
