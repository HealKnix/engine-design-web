<template>
  <BentoBlock style="max-width: 400px; height: fit-content">
    <div class="login__wrapper">
      <h1 style="text-align: center">Вход</h1>

      <BaseInput type="email" text="" title="Почта" v-model="email" />
      <BaseInput type="password" text="" title="Пароль" v-model="password" />

      <div style="width: 100%; text-align: center">
        Нет аккаунта?
        <br />
        <a href="#">Регистрация</a>
      </div>

      <BaseButton text="Войти" />
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
</script>

<style scoped>
.login__wrapper {
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 15px;
}
</style>
