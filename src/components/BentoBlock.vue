<template>
  <div
    class="bento_block"
    :class="[
      { animation: isAnimated },
      type,
      { overflowed: overflow === 'auto' },
    ]">
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
  type: {
    default: '',
    required: false,
    type: String,
  },
  overflow: {
    default: 'auto',
    required: false,
    type: String,
  },
});
</script>

<style scoped>
.bento_block {
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: var(--bento-block);
  border-radius: var(--br-big);
}

.bento_block.overflowed {
  overflow-y: auto;
}

.bento_block:not(.overflowed) {
  overflow-y: none;
}

.bento_block.width {
  width: 100%;
  height: auto;
}

.bento_block.height {
  width: auto;
  height: 100%;
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
  height: 3px;
}

.bento_block::-webkit-scrollbar-thumb {
  background-color: var(--accent-color-2);
  border-radius: 100px;
}
</style>
