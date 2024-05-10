<template>
  <BentoBlock style="max-width: 450px; height: fit-content">
    <div class="login__wrapper">
      <h1 style="text-align: center">Вход</h1>

      <BaseInput
        type="email"
        :text="email"
        title="Почта или № зачетки"
        v-model="email"
        :req="isEmailEmpty"
        placeholder="Адрес эл. почты или № зачетки"
      />
      <BaseInput
        type="password"
        :text="password"
        title="Пароль"
        v-model="password"
        :req="isPasswordEmpty"
        placeholder="Пароль"
      />

      <!-- <div style="width: 100%; text-align: center">
        Нет аккаунта?
        <br />
        <a href="#">Регистрация</a>
      </div> -->

      <BaseButton text="Войти" @click="login" style="margin-top: 15px" />
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
  import BentoBlock from '@/components/BentoBlock.vue';
  import BaseInput from '@/components/BaseInput.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import { ref, watch } from 'vue';
  import { userList } from '../models/User';
  import { useAuthStore } from '../stores/useAuthStore';
  import { useModalsStore } from '../stores/useModalsStore';
  import router from '@/router';
  import { sha256 } from '@/utils/crypto';

  const authStore = useAuthStore();
  const modalStore = useModalsStore();

  const email = ref('');
  const isEmailEmpty = ref(false);
  const password = ref('');
  const isPasswordEmpty = ref(false);

  watch(email, () => {
    isEmailEmpty.value = false;
  });

  watch(password, () => {
    isPasswordEmpty.value = false;
  });

  const login = () => {
    if (!email.value) {
      isEmailEmpty.value = true;
    }
    if (!password.value) {
      isPasswordEmpty.value = true;
    }
    if (!password.value || !email.value) {
      return;
    }

    const findUser = userList.value.find((user) => {
      if (
        user.email === email.value &&
        user.password === sha256(password.value)
      ) {
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

<style scoped lang="scss">
  .login__wrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 15px;
  }
</style>
