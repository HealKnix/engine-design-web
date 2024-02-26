<template>
  <div class="bento_block" :class="[{ animation: isAnimated }]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isAnimated: {
    default: false,
    required: false,
    type: Boolean,
  },
});
</script>

<style scoped>
.bento_block {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: var(--bento-block);
  border-radius: var(--br-big);
}

.bento_block.animation {
  width: 0;
  animation: bentoShow 0.25s ease-in-out both;
}

@keyframes bentoShow {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.bento_block::-webkit-scrollbar {
  appearance: none;
  width: 3px;
}

.bento_block::-webkit-scrollbar-thumb {
  background-color: var(--accent-color-1);
  border-radius: 100px;
}
</style>
