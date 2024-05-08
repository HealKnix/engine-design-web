<template>
  <BentoWrapper style="height: 100%">
    <BentoWrapper>
      <BentoBlock type="width" overflow="none" style="height: 90px">
        <div class="engine_name__wrapper">
          <h2>Двигатель:</h2>
          <input placeholder="Введите название" class="engine_name" />
        </div>
      </BentoBlock>
    </BentoWrapper>

    <BentoWrapper direction="row">
      <BentoBlock class="variable_choice__wrapper" style="width: 425px">
        <div
          style="display: grid; grid-template-rows: 0fr 1fr 0fr; height: 100%"
        >
          <div>
            <h2 style="text-align: center">Выберите переменную</h2>
            <hr />
          </div>

          <div class="variable_choice">
            <div class="variables__wrapper">
              <div
                v-for="(var1, index) in vars"
                :key="index"
                class="variable_card"
                @click="
                  () => {
                    console.log(`${var1} in ${selectedInputId}`);
                  }
                "
              >
                <span>{{ var1 }}</span>
              </div>
            </div>
          </div>

          <BaseButton text="Создать двигатель" style="margin-top: 25px" />
        </div>
      </BentoBlock>

      <BentoBlock>
        <h2>Таблица</h2>
        <hr />
        <div class="table__wrapper" style="margin-bottom: 50px">
          <div class="table">
            <div class="table_flex">
              <table id="engine_table">
                <tr>
                  <th>№</th>
                  <th>Расчётная формула</th>
                  <th>Размерность</th>
                  <th>x</th>
                  <th>x</th>
                  <th>x</th>
                  <th>x</th>
                  <th>x</th>
                  <th>x</th>
                  <th>x</th>
                </tr>
                <tr v-for="(row, index) in rows" :key="index">
                  <td
                    class="number"
                    @click="deleteRowById(index)"
                    :class="{ deletable: rows.length > 1 }"
                  >
                    {{ index + 1 }}
                  </td>
                  <td class="formula">{{ row.formula }}</td>
                  <td class="dim">{{ row.dim }}</td>
                  <td v-for="(column, index1) in row.columns" :key="index1">
                    <input
                      type="text"
                      @click="selectInputById(index, index1)"
                      :id="`table_input_${index}${index1}`"
                      :class="{
                        selected:
                          selectedInputId == `table_input_${index}${index1}`,
                      }"
                    />
                  </td>
                </tr>
              </table>
            </div>
            <BaseButton text="+" @click="createNewRow" />
          </div>

          <div class="inputs__wrapper" style="width: 450px">
            <BaseInput title="a" />
            <BaseInput title="b" />
          </div>
        </div>
      </BentoBlock>
    </BentoWrapper>
  </BentoWrapper>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/BaseButton.vue';
  import BentoBlock from '@/components/BentoBlock.vue';
  import BentoWrapper from '@/components/BentoWrapper.vue';
  import BaseInput from '@/components/BaseInput.vue';
  import { onMounted, ref } from 'vue';
  import { useModalsStore } from '@/stores/useModalsStore';

  const modalStore = useModalsStore();

  onMounted(() => {
    const table = document.getElementById('engine_table');
    table?.addEventListener('keydown', (e) => {
      if (e.key == 'Tab' && e.shiftKey) {
        if ((inputX.value ?? 0) == 0 && (inputY.value ?? 0) == 0) {
          selectedInputId.value = null;
          return;
        }
        e.preventDefault();
        inputX.value = (inputX.value ?? 0) - 1;
      } else if (e.key == 'Tab' && !e.shiftKey) {
        if (
          (inputX.value ?? 0) == 6 &&
          (inputY.value ?? 0) == rows.value.length - 1
        ) {
          selectedInputId.value = null;
          return;
        }
        e.preventDefault();
        inputX.value = (inputX.value ?? 0) + 1;
      }

      if (e.key == 'ArrowUp') inputY.value = (inputY.value ?? 0) - 1;
      if (e.key == 'ArrowDown') inputY.value = (inputY.value ?? 0) + 1;
      if (e.key == 'ArrowLeft') inputX.value = (inputX.value ?? 0) - 1;
      if (e.key == 'ArrowRight') inputX.value = (inputX.value ?? 0) + 1;

      if ((inputX.value ?? 0) > 6) {
        inputX.value = 0;
        inputY.value = (inputY.value ?? 0) + 1;
      }
      if ((inputX.value ?? 0) < 0) {
        inputX.value = 6;
        inputY.value = (inputY.value ?? 0) - 1;
      }
      if ((inputY.value ?? 0) >= rows.value.length - 1)
        inputY.value = rows.value.length - 1;
      if ((inputY.value ?? 0) <= 0) inputY.value = 0;

      selectedInputId.value = `table_input_${inputY.value}${inputX.value}`;
      document.getElementById(selectedInputId.value)?.focus();
    });
  });

  const selectedInputId = ref<string | null>(null);
  const inputX = ref<number | null>(null);
  const inputY = ref<number | null>(null);

  const selectInputById = (id: number, id1: number) => {
    inputX.value = id1;
    inputY.value = id;
    selectedInputId.value = `table_input_${id}${id1}`;
  };

  const test = ref(null);

  const vars = ref<string[]>(['a', 'b', 'c', 'Y', 'z']);

  console.log(vars);

  const rows = ref<
    {
      number: Number;
      formula: String;
      dim: String;
      columns: Number[] | null[];
    }[]
  >([
    {
      number: 1,
      formula: 'Y = a * b',
      dim: 'Ом.',
      columns: [23, 25, 26, 77, 12, 23, 51],
    },
    {
      number: 2,
      formula: 'Y = a * b',
      dim: 'Ом.',
      columns: [23, 25, 26, 77, 12, 23, 51],
    },
    {
      number: 3,
      formula: 'Y = a * b',
      dim: 'Ом.',
      columns: [23, 25, 26, 77, 12, 23, 51],
    },
  ]);

  const deleteRowById = (id: number) => {
    if (rows.value.length == 1) {
      rows.value = rows.value.filter((row, index) => index != id);
      createNewRow();
    } else {
      rows.value = rows.value.filter((row, index) => index != id);
    }
  };

  const createNewRow = () => {
    if (rows.value.length >= 50) {
      modalStore.openToastModal(
        'warning',
        'Вы превисили лимит в колличестве формул',
      );
      return;
    }

    rows.value.push({
      number: rows.value.length + 1,
      formula: '',
      dim: '',
      columns: [null, null, null, null, null, null, null],
    });
  };
</script>

<style scoped lang="scss">
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
    background-color: var(--color-yellow);
    border-radius: var(--br-big);
    transition: 0.05s ease-in-out;
  }

  .variable_card:hover {
    background-color: color-mix(in srgb, var(--color-yellow), white 10%);
  }
  .variable_card:active {
    scale: 1.1;
  }

  .engine_name__wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .engine_name {
    width: 100%;
    border: none;
    padding: 0 5px;
    color: var(--text-primary);
    font-size: 24px;
    border-radius: var(--br-small);
  }

  .engine_name:focus {
    outline: 1px solid #33333333;
  }

  .variable_choice__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .table_flex {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: scroll;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    border-radius: var(--br-big);
    outline: none;
    border: 1px solid var(--color-border-1);
    overflow: hidden;
  }

  table > tr > td,
  table > tr > th {
    border: none;
    box-shadow: 0 0 0 1px var(--color-border-1);
  }
  th,
  td {
    text-align: left;
    font-size: 18px;
  }

  th {
    background-color: rgba(0, 0, 0, 0.05);
    padding: 20px 10px;
  }

  td > input {
    outline: none;
    width: 100%;
    min-width: 110px;
    height: 100%;
    border: none;
    font-size: 20px;
    font-weight: 500;
    padding: 15px;
    border-radius: 0 !important;
    background-color: transparent;
    transition: 0.15s ease-in-out;
    -webkit-transition: 0.15s ease-in-out;
    -moz-transition: 0.15s ease-in-out;
    -ms-transition: 0.15s ease-in-out;
    -o-transition: 0.15s ease-in-out;
  }

  tr:last-child > td:last-child > input {
    border-bottom-right-radius: var(--br-big) !important;
  }

  td > input:focus {
    box-shadow: inset 0 0 0 2px var(--color-primary);
  }

  td > input.selected {
    box-shadow: inset 0 0 0 2px var(--color-primary);
  }

  td.number,
  td.formula,
  td.dim {
    text-align: center;
    padding: 15px;
  }

  td.number {
    position: relative;
    min-width: 50px;
    user-select: none;
  }

  td.number.deletable {
    cursor: pointer;
  }

  td.number.deletable:hover::after {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'X';
    width: 30px;
    height: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    color: var(--color-white);
    background-color: var(--color-red);
  }

  .table__wrapper {
    display: flex;
    gap: 25px;
  }

  .inputs__wrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
</style>
