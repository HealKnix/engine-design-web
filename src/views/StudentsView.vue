<template>
  <BentoBlock>
    <h1>Группы студентов</h1>
    <hr />
    <div class="groups__wrapper">
      <div v-for="group in studentGroups" :key="group.id" class="group_card">
        <h2>{{ group.groupName }}</h2>
      </div>
    </div>
  </BentoBlock>

  <BentoBlock>
    <h1>
      Группа
      <span class="group_name"></span>
    </h1>
    <hr />
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';

const studentGroups = [
  {
    id: 0,
    groupName: 'ИСТб-20-1',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: true,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
  {
    id: 1,
    groupName: 'ИСТб-21-2',
    students: [
      {
        name: 'Тестов Тест Тестович 1',
        isComplete: false,
      },
      {
        name: 'Тестов Тест Тестович 2',
        isComplete: true,
      },
    ],
  },
];
</script>

<style scoped>
.groups__wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.group_card {
  text-align: center;
  padding: 30px 23px;
  background-color: var(--accent-color-1);
  border-radius: var(--br-big);
}
</style>
