<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import HeaderView from './views/HeaderView.vue';
  import BaseToastModal from './components/BaseToastModal.vue';
</script>

<template>
  <BaseToastModal />
  <div class="app__wrapper">
    <HeaderView />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
  .app__wrapper {
    display: grid;
    grid-template-rows: 0fr 1fr;
    gap: 15px;
    height: 100%;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    overflow: hidden;
  }
</style>
