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
  <BentoBlock v-if="currentUser" :is-animated="true" style="width: fit-content">
    <h1>Редактирование пользователя</h1>
    <hr />

    <div class="input__wrapper">
      <div class="input">
        <label class="input_title">id</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Фамилия</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Имя</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Отчество</label>
        <input type="text" v-model="currentUser.name" />
      </div>

      <div class="input">
        <label class="input_title">Логин</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Почта</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Пароль</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Роль</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Кафедра</label>
        <input type="text" />
      </div>

      <div class="input">
        <label class="input_title">Группа</label>
        <input type="text" />
      </div>
    </div>

    <button style="margin-bottom: 15px">Обновить данные</button>
    <button style="background-color: var(--accent-color-3)">
      Удалить пользователя
    </button>
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import { ref } from 'vue';

const currentUser = ref<any>(null);

const userList = [
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

const setCurrentUser = (user: any) => {
  currentUser.value = user;
};

const isCurrentUserSelected = (user: any) => {
  return user.id === currentUser?.value?.id;
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

.input__wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 100px;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 2.5px;
  font-size: 20px;
}
.input > input {
  max-width: 300px;
}
</style>
