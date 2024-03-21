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
        <span>{{ UserRoleName[user.role] }}</span>
      </div>
    </div>
  </BentoBlock>
  <BentoBlock
    v-if="currentUserId !== undefined"
    :is-animated="true"
    style="max-width: 400px !important">
    <h1>Редактирование пользователя</h1>
    <hr />

    <div class="inputs__wrapper">
      <BaseInput
        title="id"
        :text="currentUserId.toString()"
        v-model="currentUserId" />
      <BaseInput title="Фамилия" />
      <BaseInput
        title="Имя"
        :text="currentUserName"
        v-model="currentUserName" />
      <BaseInput title="Отчество" />
      <BaseInput title="Логин" />
      <BaseInput title="Почта" />
      <BaseInput title="Пароль" />
      <BaseRadioForm
        title="Роль"
        name="role"
        :items="roleList"
        :current-item-id="currentUserRole"
        v-model="currentUserRole" />
      <BaseInput title="Кафедра" />
      <BaseInput title="Группа" />
    </div>

    <button @click="updateUser(currentUserId)" style="margin-bottom: 15px">
      Обновить данные
    </button>
    <button
      @click="deleteUser(currentUserId)"
      style="background-color: var(--accent-color-3)">
      Удалить пользователя
    </button>
  </BentoBlock>
</template>

<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import BaseRadioForm from '@/components/BaseRadioForm.vue';
import BentoBlock from '@/components/BentoBlock.vue';
import { ref } from 'vue';
import { UserRole, roleList, UserRoleName } from '../../models/User';

interface User {
  id: number;
  name: string;
  role: UserRole;
}

const currentUserId = ref();
const currentUserName = ref();
const currentUserRole = ref<UserRole>();

const userList = ref<User[]>([
  {
    id: 0,
    name: 'Тестов Тест Тестович 1',
    role: UserRole.ADMIN,
  },
  {
    id: 1,
    name: 'Тестов Тест Тестович 2',
    role: UserRole.TEACHER,
  },
  {
    id: 2,
    name: 'Тестов Тест Тестович 3',
    role: UserRole.STUDENT,
  },
  {
    id: 3,
    name: 'Тестов Тест Тестович 4',
    role: UserRole.STUDENT,
  },
]);

const setCurrentUser = (user: User) => {
  currentUserId.value = user.id;
  currentUserName.value = user.name;
  currentUserRole.value = user.role;
};

const isCurrentUserSelected = (user: User) => {
  return user.id === currentUserId.value;
};

const updateUser = (id: number) => {
  userList.value = userList.value.map((user) => {
    if (user.id === id) {
      user.name = currentUserName.value;
      user.role = currentUserRole.value ?? 0;
    }
    return user;
  });
};

const deleteUser = (id: number) => {
  userList.value = userList.value.filter((user) => user.id !== id);
  currentUserId.value = undefined;
};
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
