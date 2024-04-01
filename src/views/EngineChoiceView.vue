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

  <BentoBlock v-if="currentEngine" :is-animated="true" style="max-width: 350px">
    <h1>Номинальный вариант</h1>
    {{ currentEngine.name }}
    <br />
    {{ studentList.find((stud) => stud.id.toString() === studentId)?.name }}
    <hr />

    <div style="display: flex; flex-direction: column; gap: 15px">
      <BaseSelect
        title="Мощность двигателя"
        name="engine_power"
        :items="[
          {
            id: 0,
            name: '0.06',
            value: 0.06,
          },
          {
            id: 1,
            name: '0.09',
            value: 0.09,
          },
          {
            id: 2,
            name: '0.12',
            value: 0.12,
          },
          {
            id: 3,
            name: '0.18',
            value: 0.18,
          },
          {
            id: 4,
            name: '0.25',
            value: 0.25,
          },
          {
            id: 5,
            name: '0.37',
            value: 0.37,
          },
          {
            id: 6,
            name: '0.56',
            value: 0.56,
          },
          {
            id: 7,
            name: '0.75',
            value: 0.75,
          },
          {
            id: 8,
            name: '1.1',
            value: 1.1,
          },
          {
            id: 9,
            name: '1.5',
            value: 1.5,
          },
          {
            id: 10,
            name: '2.2',
            value: 2.2,
          },
          {
            id: 11,
            name: '3',
            value: 3,
          },
          {
            id: 12,
            name: '4',
            value: 4,
          },
          {
            id: 13,
            name: '5.5',
            value: 5.5,
          },
          {
            id: 14,
            name: '7.5',
            value: 7.5,
          },
          {
            id: 15,
            name: '11',
            value: 11,
          },
          {
            id: 16,
            name: '15',
            value: 15,
          },
          {
            id: 17,
            name: '18.5',
            value: 18.5,
          },
          {
            id: 18,
            name: '22',
            value: 22,
          },
          {
            id: 19,
            name: '30',
            value: 30,
          },
          {
            id: 20,
            name: '37',
            value: 37,
          },
          {
            id: 21,
            name: '45',
            value: 45,
          },
          {
            id: 22,
            name: '55',
            value: 55,
          },
          {
            id: 23,
            name: '75',
            value: 75,
          },
          {
            id: 24,
            name: '90',
            value: 90,
          },
          {
            id: 25,
            name: '110',
            value: 110,
          },
          {
            id: 26,
            name: '132',
            value: 132,
          },
          {
            id: 27,
            name: '160',
            value: 160,
          },
          {
            id: 28,
            name: '200',
            value: 200,
          },
          {
            id: 29,
            name: '250',
            value: 250,
          },
          {
            id: 30,
            name: '315',
            value: 315,
          },
        ]"
        v-model="currentEnginePower" />
      <BaseSelect
        title="Номинальное напряжение"
        name="nom_voltage"
        :items="[
          {
            id: 0,
            name: '220',
            value: 220,
          },
          {
            id: 1,
            name: '380',
            value: 380,
          },
          {
            id: 2,
            name: '660',
            value: 660,
          },
        ]"
        v-model="currentNomVoltage" />
      <BaseSelect
        title="Число полюсов"
        name="poles_count"
        :items="[
          {
            id: 0,
            name: '2',
            value: 2,
          },
          {
            id: 1,
            name: '4',
            value: 4,
          },
          {
            id: 2,
            name: '8',
            value: 8,
          },
          {
            id: 3,
            name: '10',
            value: 10,
          },
          {
            id: 4,
            name: '12',
            value: 12,
          },
        ]"
        v-model="currentPolesCount" />
      <BaseSelect
        title="Класс нагревостойкости"
        name="heat_class"
        :items="[
          {
            id: 0,
            name: 'F',
            value: 'F',
          },
          {
            id: 1,
            name: 'B',
            value: 'B',
          },
          {
            id: 2,
            name: 'H',
            value: 'H',
          },
        ]"
        v-model="currentHeatClass" />
      <BaseInput
        title="S_ном"
        type="number"
        :step="0.01"
        :min="0"
        :max="1"
        :text="currentSnom.toString()"
        v-model="currentSnom" />
      <BaseButton
        @click="
          () => {
            modalStore.openToastModal('success', 'Вариант назначен');
          }
        "
        text="Назначить"
        style="margin-top: 20px" />
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import router from '../router/index';
import { ref } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import { studentList } from '@/models/mock/students';
import { useModalsStore } from '@/stores/useModalsStore';

const currentEnginePower = ref();
const currentNomVoltage = ref();
const currentPolesCount = ref();
const currentHeatClass = ref();
const currentSnom = ref(0);

const studentId = router.currentRoute.value.params.id;

const modalStore = useModalsStore();

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
