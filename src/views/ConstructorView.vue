<template>
  <BentoWrapper style="height: 100%">
    <BentoWrapper>
      <BentoBlock type="width" overflow="hidden">
        <div class="engine_name__wrapper">
          <h2>Двигатель:</h2>
          <span class="engine_name" contenteditable="plaintext-only"
            >Введите название</span
          >
        </div>
      </BentoBlock>
    </BentoWrapper>

    <BentoWrapper direction="row">
      <BentoBlock class="variable_choice__wrapper" style="width: 425px">
        <div>
          <h2 style="text-align: center">Выберите переменную</h2>
          <hr />
          <div class="variables__wrapper">
            <div class="variable_card">
              <span>Y</span>
            </div>
            <div class="variable_card">
              <span>a</span>
            </div>
            <div class="variable_card">
              <span>b</span>
            </div>
            <div class="variable_card">
              <span>r</span>
            </div>
            <div class="variable_card">
              <span>c</span>
            </div>
            <div class="variable_card">
              <span>Z</span>
            </div>
          </div>
        </div>

        <button>Создать двигатель</button>
      </BentoBlock>

      <BentoBlock>
        <h2>Таблица</h2>
        <hr />
      </BentoBlock>
    </BentoWrapper>
  </BentoWrapper>
</template>

<script setup lang="ts">
import BentoBlock from '@/components/BentoBlock.vue';
import BentoWrapper from '@/components/BentoWrapper.vue';
</script>

<style scoped>
.variables__wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 15px;
}

.variable_card {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
  background-color: var(--accent-color-1);
  border-radius: var(--br-big);
}

.engine_name__wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.engine_name {
  text-decoration: underline;
  font-size: 24px;
}

.variable_choice__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
