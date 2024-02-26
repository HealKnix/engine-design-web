<template>
  <BentoBlock>
    <h1>Выбор двигателя</h1>
    <hr />
    <div class="engines__wrapper">
      <div
        v-for="engine in engines"
        :key="engine.id"
        class="engine_card"
        :class="[{ 'not-active': engine.status === 'Выдан этой группе' }]">
        <h2>{{ engine.name }}</h2>
        <span class="engine_status">
          {{ engine.status }}
        </span>
      </div>
    </div>
  </BentoBlock>

  <BentoBlock>
    <h1>Номинальный вариант</h1>
    <hr />
    {{ studentId }}
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import router from '../router/index';

const studentId = router.currentRoute.value.params.id;

const engines = [
  {
    id: 0,
    name: 'Асинхронный с кз',
    status: 'Ещё не выдавали',
  },
  {
    id: 1,
    name: 'Асинхронный с кз',
    status: 'Выдан этой группе',
  },
  {
    id: 2,
    name: 'Асинхронный с кз',
    status: 'Активный',
  },
];
</script>

<style scoped>
.engines__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.engine_card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 30px 23px;
  background-color: var(--accent-color-1);
  border-radius: var(--br-big);
}
.engine_card.not-active {
  cursor: default;
  background-color: var(--not-active);
}

.engine_card:not(.not-active):hover {
  filter: brightness(1.1);
}
</style>
