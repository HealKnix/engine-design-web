<template>
  <BentoBlock>
    <h1>Выбор двигателя</h1>
    <hr />
    <div class="engines__wrapper">
      <div
        v-for="engine in engineList"
        :key="engine.id"
        class="engine_card"
        :class="[
          { 'not-active': engine.status === 'Выдан этой группе' },
          { selected: isCurrentStudentSelected(engine) },
        ]"
        v-on:click="setCurrentEngine(engine)"
      >
        <h2>{{ engine.name }}</h2>
        <span class="engine_status">
          {{ engine.status }}
        </span>
      </div>
    </div>
  </BentoBlock>

  <BentoBlock v-if="currentEngine" :is-animated="true" style="max-width: 350px">
    <h1>Номинальный вариант</h1>
    {{ currentEngine.name }}
    <br />
    {{ studentList.find((stud) => stud.id.toString() === studentId)?.name }}
    <hr />

    <div style="display: flex; flex-direction: column; gap: 15px">
      <BaseSelect
        title="Мощность двигателя"
        name="engine_power"
        :items="enginePowerList"
        v-model="currentEnginePower"
      />
      <BaseSelect
        title="Номинальное напряжение"
        name="nom_voltage"
        :items="nominalVoltageList"
        v-model="currentNomVoltage"
      />
      <BaseSelect
        title="Число полюсов"
        name="poles_count"
        :items="poleNumberList"
        v-model="currentPolesCount"
      />
      <BaseSelect
        title="Класс нагревостойкости"
        name="heat_class"
        :items="heatResistanceClassList"
        v-model="currentHeatClass"
      />
      <BaseInput
        title="S_ном"
        type="number"
        :step="0.01"
        :min="0"
        :max="1"
        :text="currentSnom.toString()"
        v-model="currentSnom"
      />
      <BaseButton
        @click="
          () => {
            modalStore.openToastModal('success', 'Вариант назначен');
          }
        "
        text="Назначить"
        style="margin-top: 20px"
      />
    </div>
  </BentoBlock>
</template>

<script setup lang="ts">
  import BentoBlock from '@/components/BentoBlock.vue';
  import router from '../router/index';
  import { ref } from 'vue';
  import BaseInput from '@/components/BaseInput.vue';
  import BaseButton from '@/components/BaseButton.vue';
  import BaseSelect from '@/components/BaseSelect.vue';
  import { studentList } from '@/models/mock/students';
  import { useModalsStore } from '@/stores/useModalsStore';
  import { enginePowerList } from '@/models/mock/engine-power';
  import { nominalVoltageList } from '../models/mock/nominal-voltage';
  import { poleNumberList } from '../models/mock/pole-number';
  import { heatResistanceClassList } from '../models/mock/heat-resistance-class';
  import { engineList } from '../models/mock/engine';

  const props = defineProps({
    id: {
      default: -1,
      required: false,
      type: [String, Number],
    },
  });

  const currentEnginePower = ref();
  const currentNomVoltage = ref();
  const currentPolesCount = ref();
  const currentHeatClass = ref();
  const currentSnom = ref(0);

  const studentId = router.currentRoute.value.params.id;

  const modalStore = useModalsStore();

  const currentEngine = ref<any>(null);

  const setCurrentEngine = (engine: any) => {
    if (engine.status === 'Выдан этой группе') return;
    currentEngine.value = engine;
  };

  const isCurrentStudentSelected = (engine: any) => {
    return engine.id === currentEngine?.value?.id;
  };
</script>

<style scoped lang="scss">
  .engines__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .engine_card {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 30px 23px;
    box-shadow: 0 0 0 3px var(--color-yellow);
    border-radius: var(--br-big);
  }
  .engine_card.not-active {
    cursor: default;
    box-shadow: 0 0 0 3px var(--color-disabled);
  }

  .engine_card.selected {
    background-color: var(--color-yellow);
  }

  .engine_card:not(.not-active):not(.selected):hover {
    background-color: #ffa60066;
  }
</style>
@/models/mock/student
