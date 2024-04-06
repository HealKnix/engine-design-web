<template>
  <BentoBlock style="max-width: 450px; height: fit-content">
    <div class="login__wrapper">
      <h1 style="text-align: center">Вход</h1>

      <BaseInput type="email" :text="email" title="Почта" v-model="email" />
      <BaseInput
        type="password"
        :text="password"
        title="Пароль"
        v-model="password" />
      <!--
      <div style="width: 100%; text-align: center">
        Нет аккаунта?
        <br />
        <a href="#">Регистрация</a>
      </div>
      -->

      <BaseButton text="Войти" @click="login" style="margin-top: 15px" />
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
  import BentoBlock from '@/components/BentoBlock.vue';
  import BaseInput from '@/components/BaseInput.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import { ref } from 'vue';
  import { userList } from '../models/User';
  import { useAuthStore } from '../stores/useAuthStore';
  import { useModalsStore } from '../stores/useModalsStore';
  import router from '@/router';

  const authStore = useAuthStore();
  const modalStore = useModalsStore();

  const email = ref('');
  const password = ref('');

  const login = () => {
    const findUser = userList.value.find((user) => {
      if (user.email === email.value && user.password === password.value) {
        return user;
      }
    });

    if (findUser) {
      authStore.setUser(findUser);
      modalStore.openToastModal('success', 'Вы успешно вошли в аккаунт');
      router.push('/profile');
    } else {
      modalStore.openToastModal('error', 'Такого аккаунта не существует');
    }
  };
</script>

<style scoped>
  .login__wrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 15px;
  }
</style>
