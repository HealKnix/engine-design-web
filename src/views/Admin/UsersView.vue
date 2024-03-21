<template>
  <BentoBlock>
    <h1>Пользователи</h1>
    <hr />

    <div class="users__wrapper">
      <div class="head__wrapper">
        <span>id</span>
        <span>ФИО</span>
        <span>Роль</span>
      </div>
      <div
        v-for="(user, index) in userList"
        :key="index"
        class="user_card"
        :class="[{ selected: isCurrentUserSelected(user) }]"
        v-on:click="setCurrentUser(user)">
        <span>{{ user.id }}</span>
        <span>{{ user.name }}</span>
        <span>{{ user.role }}</span>
      </div>
    </div>
  </BentoBlock>
  <BentoBlock v-if="currentUserId !== undefined" :is-animated="true" style="max-width: 400px !important">
    <h1>Редактирование пользователя</h1>
    <hr />

    <div class="inputs__wrapper">
      <BaseInput title="id" :text="currentUserId.toString()" v-model="currentUserId" />
      <BaseInput title="Фамилия" />
      <BaseInput title="Имя" :text="currentUserName" v-model="currentUserName" />
      <BaseInput title="Отчество" />
      <BaseInput title="Логин" />
      <BaseInput title="Почта" />
      <BaseInput title="Пароль" />
      <BaseInput title="Роль" :text="currentUserRole" v-model="currentUserRole" />
      <BaseInput title="Кафедра" />
      <BaseInput title="Группа" />
    </div>

    <button style="margin-bottom: 15px">Обновить данные</button>
    <button style="background-color: var(--accent-color-3)">
      Удалить пользователя
    </button>
  </BentoBlock>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import BentoBlock from '@/components/BentoBlock.vue';
import { ref, watch } from 'vue';

interface User {
  id: number;
  name: string;
  role: string;
}

const currentUserId = ref<number | undefined>(undefined);
const currentUserName = ref('');
const currentUserRole = ref('');

const userList: User[] = [
  {
    id: 0,
    name: 'Тестов Тест Тестович 1',
    role: 'Администратор',
  },
  {
    id: 1,
    name: 'Тестов Тест Тестович 2',
    role: 'Преподаватель',
  },
  {
    id: 2,
    name: 'Тестов Тест Тестович 3',
    role: 'Студент',
  },
  {
    id: 3,
    name: 'Тестов Тест Тестович 4',
    role: 'Студент',
  },
];

const setCurrentUser = (user: User) => {
  currentUserId.value = user.id;
  currentUserName.value = user.name;
  currentUserRole.value = user.role;
};

const isCurrentUserSelected = (user: User) => {
  return user.id === currentUserId.value;
};

watch(currentUserId, () => {
  console.log(currentUserId.value);
  
})
</script>

<style scoped>
.users__wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.head__wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  padding: 10px;
}
.head__wrapper > span:nth-child(1) {
  text-align: center;
}

.user_card {
  width: 100%;
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  padding: 10px;
  border: 1px solid var(--accent-color-1);
  border-radius: var(--br-small);
}
.user_card.selected {
  background-color: var(--accent-color-1);
}
.user_card:not(.selected):hover {
  background-color: #ffa60066;
}
.user_card > span:nth-child(1) {
  text-align: center;
}

span {
  font-size: 16px;
  font-weight: 570;
}

.inputs__wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 100px;
}
</style>
