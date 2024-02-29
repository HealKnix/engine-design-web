<template>
  <BentoBlock>
    <h1>Профиль пользователя</h1>
    <hr />
  </BentoBlock>

  <BentoBlock v-if="isEdit" :is-animated="true">
    <h1>Редактирование пользователя</h1>
    <hr />
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import { ref } from 'vue';

const isEdit = ref(false);
</script>

<style scoped></style>
