<template>
  <BentoBlock>
    <h1>Профиль пользователя</h1>
    <hr />

    <span style="font-size: 36px"> {{ authStore.user.fullName }} </span>

    <div class="info__wrapper">
      <div class="info_block">
        <span>Контактная информация</span>
        <div class="info">
          <div class="row">
            <span>E-Mail:</span>
            <a class="info_desc" style="text-decoration: underline">{{
              authStore.user.email
            }}</a>
          </div>
          <div class="row">
            <span>Телефон:</span>
            <span class="info_desc">{{ authStore.user.phoneNumber }}</span>
          </div>
        </div>
      </div>

      <div class="info_block">
        <span>Дополнительная информация</span>
        <div class="info">
          <div class="row">
            <span>Кафедра:</span>
            <span class="info_desc">{{ authStore.user.department }}</span>
          </div>
          <div class="row">
            <span>Группа:</span>
            <span class="info_desc">{{ authStore.user.group }}</span>
          </div>
        </div>
      </div>

      <BaseButton
        text="Редактировать профиль"
        @click="
          () => {
            isEdit = true;
          }
        "
      />
    </div>
  </BentoBlock>

  <BentoBlock v-if="isEdit" :is-animated="true" style="max-width: 450px">
    <h1>Редактирование пользователя</h1>
    <hr />
    <div style="display: flex; flex-direction: column; gap: 15px">
      <BaseInput
        title="Имя"
        :text="currentUserFirstName ?? ''"
        v-model="currentUserFirstName"
      />
      <BaseInput
        title="Фамилия"
        :text="currentUserLastName ?? ''"
        v-model="currentUserLastName"
      />
      <BaseInput
        title="Отчество"
        :text="currentUserMiddleName ?? ''"
        v-model="currentUserMiddleName"
      />
      <BaseInput
        title="Почта"
        :text="currentUserEmail ?? ''"
        v-model="currentUserEmail"
      />
      <BaseInput title="Пароль" type="password" v-model="currentUserPassword" />
      <BaseInput
        title="Телефон"
        type="phone"
        :text="currentUserPhone ?? ''"
        v-model="currentUserPhone"
      />

      <BaseButton
        text="Редактировать"
        @click="
          () => {
            isEdit = false;
          }
        "
      />
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
  import BentoBlock from '@/components/BentoBlock.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import { ref } from 'vue';
  import BaseInput from '@/components/BaseInput.vue';
  import { useAuthStore } from '../stores/useAuthStore';

  const authStore = useAuthStore();

  const currentUserFirstName = ref(authStore.user.firstName);
  const currentUserLastName = ref(authStore.user.lastName);
  const currentUserMiddleName = ref(authStore.user.middleName);
  const currentUserEmail = ref(authStore.user.email);
  const currentUserPassword = ref();
  const currentUserPhone = ref(authStore.user.phoneNumber);

  const isEdit = ref(false);
</script>

<style scoped>
  .info__wrapper {
    display: flex;
    flex-direction: column;
    gap: 50px;
    margin-top: 25px;
    max-width: fit-content;
  }
  .info_block > span {
    font-weight: 700;
  }
  .info_block > .info > .row {
    margin-top: 17px;
  }

  .info_desc {
    font-weight: 550;
  }

  .row {
    display: grid;
    grid-template-columns: 200px 1fr;
  }

  @media (width < 450px) {
    .row {
      display: grid;
      grid-template-columns: 1fr;
      gap: 5px;
    }
  }
</style>
