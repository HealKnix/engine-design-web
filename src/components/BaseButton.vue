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
    --color: var(--accent-color-2);

    cursor: pointer;
    width: 100%;
    border: none;
    border-radius: 7px;
    padding: 15px 30px;
    font-size: 20px;
    font-weight: 500;
    background-color: var(--color);
    scale: 1;
    transition: 0.05s ease-in-out;
  }

  button > span {
    color: #fff;
  }

  button:hover {
    background-color: color-mix(in srgb, var(--color), black 10%);
  }

  button:active {
    scale: 0.98;
  }

  button:focus {
    outline: 2px solid #333;
  }
</style>
