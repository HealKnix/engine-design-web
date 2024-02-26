<template>
  <header>
    <ul>
      <li v-if="authStore.isTeacher">
        <RouterLink to="/students">Студенты</RouterLink>
      </li>
      <li v-if="authStore.isTeacher">
        <RouterLink to="/constructor">Конструктор</RouterLink>
      </li>
      <li v-if="authStore.isStudent">
        <RouterLink to="/engines">Двигатели</RouterLink>
      </li>
    </ul>

    <div>
      <div class="user_info" v-on:click="toProfilePage">
        <img class="user_icon" src="/src/assets/icons/user.svg" />
        <span> Тестов Т.Т. </span>
      </div>

      <img
        class="logout_icon"
        src="/src/assets/icons/logout.svg"
        v-on:click="toLogoutPage" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { RouterLink } from 'vue-router';
import router from '../router/index';

const toProfilePage = () => {
  router.push('/profile');
};

const toLogoutPage = () => {
  router.push('/logout');
};

const authStore = useAuthStore();
</script>

<style scoped>
header {
  display: flex;
  gap: 15px;
}

header > * {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  background-color: var(--bento-block);
  border-radius: var(--br-big);
  font-size: 24px;
  font-weight: bold;
}

header > *:nth-child(1) {
  flex-grow: 1;
  padding: 25px 100px;
}

header > *:nth-child(2) {
  flex-grow: 0;
  gap: 25px;
  padding: 15px 25px;
}

li {
  cursor: pointer;
  position: relative;
}

li::after {
  position: absolute;
  display: block;
  content: '';
  width: 0%;
  transition: 0.15s ease-in-out;
}

li:hover::after {
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 5px;
  bottom: -5.5px;
  border-radius: 1000rem;
  background-color: var(--accent-color-1);
}

.user_info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: 25px;
  border-radius: var(--br-big);
}

.user_info {
  cursor: pointer;
  padding: 0 15px;
}

.user_info:hover {
  background-color: rgb(244, 244, 244);
}

.logout_icon {
  cursor: pointer;
  border-radius: var(--br-big);
}

.logout_icon:hover {
  filter: brightness(0.9);
}

.router-link-active::after {
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 5px;
  bottom: -5.5px;
  border-radius: 1000rem;
  background-color: var(--accent-color-1);
}
</style>
