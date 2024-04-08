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
        v-for="(user, index) in userList.sort(
          (a, b) => (a.id ?? 0) - (b.id ?? 0),
        )"
        :key="index"
        class="user_card"
        :class="[{ selected: isCurrentUserSelected(user) }]"
        v-on:click="setCurrentUser(user)"
      >
        <span>{{ user.id }}</span>
        <span>{{ user.fullName }}</span>
        <span>{{ UserRoleName[user.role ?? 0] }}</span>
      </div>
    </div>
  </BentoBlock>
  <BentoBlock
    v-if="currentUserId !== undefined"
    :is-animated="true"
    style="max-width: 400px !important"
  >
    <h1>Редактирование пользователя</h1>
    <hr />

    <div class="inputs__wrapper">
      <BaseRadioForm
        title="Роль"
        name="role"
        :items="roleList"
        :current-item-id="currentUserRole"
        v-model="currentUserRole"
      />
      <BaseInput
        title="id"
        type="number"
        :autocomplete="false"
        :text="inputId.toString()"
        v-model="inputId"
      />
      <BaseInput
        title="Фамилия"
        :text="currentUserLastName"
        v-model="currentUserLastName"
      />
      <BaseInput
        title="Имя"
        :text="currentUserFirstName"
        v-model="currentUserFirstName"
      />
      <BaseInput
        title="Отчество"
        :text="currentUserMiddleName"
        v-model="currentUserMiddleName"
      />
      <BaseInput
        v-if="currentUserRole === UserRole.STUDENT"
        title="Логин"
        :autocomplete="false"
        :text="currentUserLogin"
        v-model="currentUserLogin"
      />
      <BaseInput
        title="Почта"
        type="email"
        :text="currentUserEmail"
        v-model="currentUserEmail"
      />
      <BaseInput
        title="Телефон"
        type="phone"
        :text="currentUserPhone"
        v-model="currentUserPhone"
      />
      <BaseInput
        type="password"
        title="Пароль"
        :autocomplete="false"
        v-model="currentUserPassword"
      />
      <BaseInput
        title="Кафедра"
        :text="currentUserDepartment"
        v-model="currentUserDepartment"
      />
      <BaseInput
        v-if="currentUserRole === UserRole.STUDENT"
        title="Группа"
        :text="currentUserGroup"
        v-model="currentUserGroup"
      />
    </div>

    <BaseButton
      text="Обновить данные"
      @click="updateUser(currentUserId)"
      style="margin-bottom: 15px"
    />
    <BaseButton
      text="Удалить пользователя"
      @click="deleteUser(currentUserId)"
      style="--color: var(--accent-color-3)"
    />
  </BentoBlock>
</template>

<script setup lang="ts">
  import BaseInput from '@/components/BaseInput.vue';
  import BaseRadioForm from '@/components/BaseRadioForm.vue';
  import BentoBlock from '@/components/BentoBlock.vue';
  import { ref } from 'vue';
  import {
    roleList,
    UserRoleName,
    UserRole,
    type User,
    userList,
  } from '../../models/User';
  import BaseButton from '@/components/BaseButton.vue';
  import { useModalsStore } from '../../stores/useModalsStore';

  const modalsStore = useModalsStore();

  const currentUserId = ref();
  const currentUserFirstName = ref();
  const currentUserLastName = ref();
  const currentUserMiddleName = ref();
  const currentUserEmail = ref();
  const currentUserPhone = ref();
  const currentUserPassword = ref();
  const currentUserRole = ref();
  const currentUserDepartment = ref();

  const currentUserLogin = ref();
  const currentUserGroup = ref();

  const inputId = ref();

  const setCurrentUser = (user: User) => {
    inputId.value = user.id;
    currentUserId.value = user.id;
    currentUserFirstName.value = user.firstName;
    currentUserLastName.value = user.lastName;
    currentUserMiddleName.value = user.middleName;
    currentUserEmail.value = user.email;
    currentUserPhone.value = user.phoneNumber;
    currentUserRole.value = user.role;
    currentUserDepartment.value = user.department;

    if (currentUserRole.value === UserRole.STUDENT) {
      currentUserLogin.value = user.login;
      currentUserGroup.value = user.group;
    } else {
      currentUserLogin.value = null;
      currentUserGroup.value = null;
    }
  };

  const isCurrentUserSelected = (user: User) => {
    return user.id === currentUserId.value;
  };

  const updateUser = (id: number) => {
    if (inputId.value === '') {
      modalsStore.openToastModal('error', 'Некорректный ввод');
      return;
    }

    let count = 0;
    userList.value.forEach((user) => {
      if (user.id === inputId.value && currentUserId.value !== inputId.value) {
        count += 1;
      }
    });
    if (count > 0) {
      modalsStore.openToastModal(
        'error',
        `Пользователь с id(${inputId.value}) уже существует!`,
      );
      return;
    }
    userList.value = userList.value.map((user) => {
      if (user.id === id) {
        currentUserId.value = inputId.value;
        user.id = currentUserId.value;
        user.firstName = currentUserFirstName.value;
        user.lastName = currentUserLastName.value;
        user.middleName = currentUserMiddleName.value;
        user.email = currentUserEmail.value;
        user.phoneNumber = currentUserPhone.value;
        user.role = currentUserRole.value;
        user.department = currentUserDepartment.value;
        user.fullName = `${user.lastName} ${user.firstName} ${user.middleName}`;

        if (currentUserRole.value === UserRole.STUDENT) {
          user.login = currentUserLogin.value;
          user.group = currentUserGroup.value;
        } else {
          user.login = null;
          user.group = null;
        }
        modalsStore.openToastModal('success', 'Пользователь отредактирован');
      }
      return user;
    });
  };

  const deleteUser = (id: number) => {
    userList.value = userList.value.filter((user) => user.id !== id);
    currentUserId.value = undefined;
    inputId.value = undefined;
    modalsStore.openToastModal('success', 'Пользователь успешно удалён!');
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
    transition: 0.05s ease-in-out;
  }
  .user_card.selected {
    background-color: var(--accent-color-1);
    scale: 1.01;
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
    margin-bottom: 50px;
  }
</style>
