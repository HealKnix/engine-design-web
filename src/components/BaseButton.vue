<template>
  <button :style="`--color: ${color}`">
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
    color: {
      require: false,
      default: 'var(--color-primary)',
      type: String,
    },
  });
</script>

<style scoped lang="scss">
  button {
    --color: var(--color-primary);

    cursor: pointer;
    width: 100%;
    border: none;
    border-radius: 7px;
    padding: 15px 30px;
    font-size: 20px;
    font-weight: 500;
    background-color: var(--color);
    transition: 0.15s ease-in-out;
    will-change: auto;
  }

  button > span {
    color: #fff;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: 0 3px 12px color-mix(in srgb, var(--color) 60%, transparent 0%);
  }

  button:focus {
    outline: 2px solid var(--color);
    outline-offset: 2px;
    outline-width: 2.5px;
  }

  button:active {
    scale: 0.98;
  }
</style>
