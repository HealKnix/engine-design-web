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
        v-on:click="setCurrentStudentGroup(group)">
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
    style="width: fit-content">
    <div class="group_info">
      <h1>
        Группа
        <span class="group_name">
          {{ currentStudentGroup.groupName }}
        </span>
      </h1>

      <h4 v-if="currentStudent">
        <a class="issue_new_engine" v-on:click="toNextPage">
          Выдать новый двигатель
        </a>
      </h4>
    </div>

    <hr />

    <div class="students__wrapper">
      <div
        v-for="(student, index) in currentStudentGroup.students"
        :key="index"
        class="student_card"
        :class="[{ selected: isCurrentStudentSelected(student) }]"
        v-on:click="setCurrentStudent(student)">
        <h3>
          <span>{{ index + 1 }}.</span> {{ student.name }}
        </h3>
      </div>
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import { ref } from 'vue';
import router from '../router/index';

const toNextPage = () => {
  router.push({
    path: `/students/${currentStudent.value.id}/engine-choice`,
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
        isComplete: true,
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
  box-shadow: 0 0 0 3px var(--accent-color-1);
  border-radius: var(--br-big);
}

.group_card.selected {
  background-color: var(--accent-color-1);
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
  gap: 10px;
  padding: 10px;
  border: 3px solid var(--accent-color-1);
  border-radius: var(--br-big);
}

.student_card.selected {
  background-color: var(--accent-color-1);
}

.student_card:not(.selected):hover {
  background-color: #ffa60066;
}

h4:has(.issue_new_engine) {
  cursor: pointer;
}

.issue_new_engine:hover {
  color: var(--accent-color-2);
}
</style>
