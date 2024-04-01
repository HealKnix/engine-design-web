<template>
  <header>
    <ul v-if="authStore.isLogin">
      <li v-if="authStore.isAdmin">
        <RouterLink to="/admin/dashboard">Дашборд</RouterLink>
      </li>
      <li v-if="authStore.isAdmin">
        <RouterLink to="/admin/users">Пользователи</RouterLink>
      </li>
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

    <div v-if="authStore.isLogin">
      <RouterLink to="/profile" class="user_info">
        <img class="user_icon" src="/src/assets/icons/user.svg" />
        <span> {{ authStore.user.shortName }} </span>
      </RouterLink>

      <RouterLink
        to="/logout"
        style="
          display: flex;
          align-items: center;
          border: 0.1px solid transparent;
          border-radius: 14px;
        "
        @click="
          () => {
            authStore.clearUser();
            router.push('/login');
          }
        ">
        <img class="logout_icon" src="/src/assets/icons/logout.svg" />
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore';
import { RouterLink } from 'vue-router';
import router from '../router/index';

const authStore = useAuthStore();
</script>

<style scoped>
header {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

header > * {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  flex-wrap: wrap;
  gap: 25px;
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
  flex-wrap: nowrap;
  flex-grow: 0;
  gap: 25px;
  padding: 15px 25px;
}

li {
  cursor: pointer;
  position: relative;
  padding: 5px 0;
}

li > * {
  color: var(--text-light);
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
  position: relative;
  cursor: pointer;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: 25px;
  border-radius: var(--br-big);
}

.user_info::after {
  position: absolute;
  display: block;
  content: '';
  left: 0;
  width: 0%;
  transition: 0.15s ease-in-out;
}

.user_info:hover::after {
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 5px;
  bottom: -5.5px;
  border-radius: 1000rem;
  background-color: var(--accent-color-1);
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

@media (width < 1433px) {
  header {
    flex-direction: column-reverse;
  }
  header > *:nth-child(1) {
    padding: 25px;
  }
  header > *:nth-child(2) {
    justify-content: center;
    flex-grow: 1;
  }
}

@media (width < 971px) {
  header {
    flex-direction: row;
    flex-wrap: nowrap;
  }
  header > *:nth-child(1) {
    flex-grow: 1;
    font-size: 14px;
  }
  header > *:nth-child(2) {
    flex-direction: column;
    flex-grow: 0;
    font-size: 14px;
  }
  header > *:nth-child(2) > *:nth-child(1) {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }
}
</style>
