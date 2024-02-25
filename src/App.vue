<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderView from './views/HeaderView.vue';
import AvailableEnginesView from './views/AvailableEnginesView.vue';
</script>

<template>
  <div class="app__wrapper">
    <HeaderView />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app__wrapper {
  display: grid;
  grid-template-rows: 0fr 1fr;
  gap: 15px;
  height: 100%;
}

main {
  display: flex;
  flex-direction: row;
  gap: 15px;
  overflow: hidden;
}
</style>
