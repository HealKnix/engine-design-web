<template>
  <BentoBlock>
    <h1>Профиль пользователя</h1>
    <hr />

    <span style="font-size: 30px; font-weight: 400">
      Тестов Тест Тестович
    </span>

    <div class="info__wrapper">
      <div class="info_block">
        <span>Контактная информация</span>
        <div class="info">
          <div class="row">
            <span>E-Mail:</span>
            <a class="info_desc" style="text-decoration: underline"
              >www.test@test.com</a
            >
          </div>
          <div class="row">
            <span>Телефон:</span>
            <span class="info_desc">+7 (800) 555-35-35</span>
          </div>
        </div>
      </div>

      <div class="info_block">
        <span>Дополнительная информация</span>
        <div class="info">
          <div class="row">
            <span>Кафедра:</span>
            <span class="info_desc">Машиностроение</span>
          </div>
          <div class="row">
            <span>Должность:</span>
            <span class="info_desc">Мышинник</span>
          </div>
        </div>
      </div>

      <BaseButton text="Редактировать профиль" />
    </div>
  </BentoBlock>

  <BentoBlock v-if="isEdit" :is-animated="true">
    <h1>Редактирование пользователя</h1>
    <hr />
  </BentoBlock>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import BaseButton from '@/components/BaseButton.vue';
import { ref } from 'vue';

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
  font-weight: 600;
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
</style>
