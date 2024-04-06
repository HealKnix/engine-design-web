<template>
  <div
    class="bento_block"
    :class="[
      { animation: isAnimated },
      type,
      { overflowed: overflow === 'auto' },
    ]"
  >
    <div class="bento__wrapper">
      <slot></slot>
    </div>
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
  .bento__wrapper {
    width: auto;
    height: 100%;
    padding: 25px;
    overflow: auto;
  }

  .bento_block {
    width: 100%;
    height: 100%;
    background-color: var(--bento-block);
    border-radius: var(--br-big);
    overflow: hidden;
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
</style>
