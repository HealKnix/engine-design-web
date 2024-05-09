<template>
  <button
    :style="`--color: ${color}; width: ${width}; padding: ${padding}; border-radius: ${borderRadius}`"
  >
    <span class="btn_text" :style="`color: ${textColor}`">
      {{ text }}
    </span>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps({
    width: {
      require: true,
      default: '100%',
      type: String,
    },
    padding: {
      require: true,
      default: '15px 30px',
      type: String,
    },
    text: {
      require: true,
      default: '',
      type: String,
    },
    borderRadius: {
      require: false,
      default: 'var(--br-small)',
      type: String,
    },
    color: {
      require: false,
      default: 'var(--color-primary)',
      type: String,
    },
    textColor: {
      require: false,
      default: 'var(--color-white)',
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
    border-radius: var(--br-small);
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
