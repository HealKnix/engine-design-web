<template>
  <BentoBlock>
    <h1>Выбор двигателя</h1>
    <hr />
    <div class="engines__wrapper">
      <div
        v-for="engine in engines"
        :key="engine.id"
        class="engine_card"
        :class="[
          { 'not-active': engine.status === 'Выдан этой группе' },
          { selected: isCurrentStudentSelected(engine) },
        ]"
        v-on:click="setCurrentEngine(engine)">
        <h2>{{ engine.name }}</h2>
        <span class="engine_status">
          {{ engine.status }}
        </span>
      </div>
    </div>
  </BentoBlock>

  <BentoBlock v-if="currentEngine" :is-animated="true">
    <h1>Номинальный вариант</h1>
    <hr />
    {{ studentId }}
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import router from '../router/index';
import { ref } from 'vue';

const studentId = router.currentRoute.value.params.id;

const currentEngine = ref<any>(null);

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

const setCurrentEngine = (engine: any) => {
  if (engine.status === 'Выдан этой группе') return;
  currentEngine.value = engine;
};

const isCurrentStudentSelected = (engine: any) => {
  return engine.id === currentEngine?.value?.id;
};
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
  box-shadow: 0 0 0 3px var(--accent-color-1);
  border-radius: var(--br-big);
}
.engine_card.not-active {
  cursor: default;
  box-shadow: 0 0 0 3px var(--not-active);
}

.engine_card.selected {
  background-color: var(--accent-color-1);
}

.engine_card:not(.not-active):not(.selected):hover {
  background-color: #ffa60066;
}
</style>
