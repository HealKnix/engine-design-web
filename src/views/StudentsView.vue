<template>
  <BentoBlock>
    <h1>Группы студентов</h1>
    <hr />
    <div class="groups__wrapper">
      <div
        v-for="group in studentGroups"
        :key="group.id"
        class="group_card"
        :class="[{ selected: isCurrentGroupSelected(group) }]"
        v-on:click="setCurrentStudentGroup(group)"
      >
        <h2>{{ group.groupName }}</h2>
        <span>
          Выполнили
          <span
            ><b>{{ numberComplete(group) }}</b></span
          >
          из
          <span
            ><b>{{ group.students.length }}</b></span
          >
        </span>
      </div>
    </div>
  </BentoBlock>

  <BentoBlock
    v-if="currentStudentGroup"
    :is-animated="true"
    style="width: fit-content"
  >
    <div class="group_info">
      <h1>
        Группа
        <span class="group_name">
          {{ currentStudentGroup.groupName }}
        </span>
      </h1>
    </div>

    <hr />

    <div class="students__wrapper">
      <div
        v-for="(student, index) in currentStudentGroup.students"
        :key="index"
        class="student_card"
        :class="[{ selected: isCurrentStudentSelected(student) }]"
        v-on:click="setCurrentStudent(student)"
      >
        <h3>
          <span>{{ index + 1 }}.</span> {{ student.name }}
        </h3>
        <div
          v-if="isCurrentStudentSelected(student)"
          class="calculated_engines__wrapper"
        >
          <div
            class="calculated_engine"
            v-for="(engine, index) in student.engines"
            :key="index"
          >
            <span class="engine_name">{{ engine.name }}</span>
            <span class="calculated_tables"
              >Кол-во решённых таблиц: <b>{{ engine.completeTables }}</b></span
            >
          </div>
        </div>
        <BaseButton
          v-if="isCurrentStudentSelected(student)"
          text="Выдать двигатель"
          @click="toNextPage(student.id)"
        />
      </div>
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
  import BentoBlock from '@/components/BentoBlock.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import { ref } from 'vue';
  import router from '../router/index';

  const toNextPage = (studentId: number) => {
    router.push({
      path: `/students/${studentId}/engine-choice`,
    });
  };

  const currentStudentGroup = ref<any>(null);
  const currentStudent = ref<any>(null);

  const studentGroups = [
    {
      id: 0,
      groupName: 'ИСТб-20-1',
      students: [
        {
          id: 0,
          name: 'Тестов Тест Тестович 1',
          isComplete: true,
        },
        {
          id: 1,
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
          id: 2,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 3,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 2,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 4,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 5,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
        {
          id: 6,
          name: 'Тестов Тест Тестович 3',
          isComplete: false,
          engines: [
            {
              id: 0,
              name: 'Асинхронный с кз',
              completeTables: 3,
            },
            {
              id: 1,
              name: 'Асинхронный',
              completeTables: 1,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 7,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 8,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 4,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 9,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 10,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 5,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 6,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 7,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 8,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 9,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 10,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 11,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 12,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 13,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
    {
      id: 14,
      groupName: 'ИСТб-21-2',
      students: [
        {
          id: 11,
          name: 'Тестов Тест Тестович 1',
          isComplete: false,
        },
        {
          id: 12,
          name: 'Тестов Тест Тестович 2',
          isComplete: true,
        },
      ],
    },
  ];

  const numberComplete = (group: any) => {
    return group.students.filter((stud: any) => stud.isComplete).length;
  };

  const setCurrentStudentGroup = (group: any) => {
    currentStudentGroup.value = group;
    currentStudent.value = null;
  };

  const setCurrentStudent = (student: any) => {
    currentStudent.value = student;
  };

  const isCurrentGroupSelected = (group: any) => {
    return group.id === currentStudentGroup?.value?.id;
  };

  const isCurrentStudentSelected = (student: any) => {
    return student.id === currentStudent?.value?.id;
  };
</script>

<style scoped>
  .groups__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .group_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .group_info > h4 {
    font-weight: 600;
  }

  .group_card {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 30px 20px;
    box-shadow: 0 0 0 3px var(--color-yellow);
    border-radius: var(--br-big);
  }

  .group_card:active {
    scale: 0.98;
  }

  .group_card.selected:active {
    scale: 1;
  }

  .group_card.selected {
    background-color: var(--color-yellow);
  }

  .group_card:not(.selected):hover {
    background-color: #ffa60066;
  }

  .students__wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .student_card {
    cursor: default;
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 15px;
    padding: 10px;
    border: 3px solid var(--color-yellow);
    border-radius: var(--br-big);
  }

  .student_card.selected {
    background-color: var(--color-yellow);
  }

  .student_card:not(.selected):hover {
    background-color: #ffa60066;
  }

  h4:has(.issue_new_engine) {
    cursor: pointer;
  }

  .issue_new_engine:hover {
    color: var(--color-primary);
  }

  .calculated_engines__wrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .calculated_engine {
    display: flex;
    flex-direction: column;
    gap: 15px;
    text-wrap: wrap;
    width: min-content;
    background-color: var(--color-white);
    border-radius: var(--br-big);
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }

  .calculated_engine > .engine_name {
    font-weight: 600;
  }
</style>
