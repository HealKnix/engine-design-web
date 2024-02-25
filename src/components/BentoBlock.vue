<template>
  <div class="bento_block">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bento_block {
  overflow-y: auto;
  width: 100%;
  height: 100%;
  padding: 25px;
  background-color: var(--bento-block);
  border-radius: var(--br-big);
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
