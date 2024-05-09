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
                @click="putVariableIntoInput(var1)"
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
                      v-model="row.columns[index1].value"
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
  import { onMounted, ref, type Ref } from 'vue';
  import { useModalsStore } from '@/stores/useModalsStore';

  const modalStore = useModalsStore();

  onMounted(() => {
    const table = document.getElementById('engine_table');
    table?.addEventListener('keydown', (e) => {
      if (e.key == 'Tab') {
        if (e.shiftKey) {
          if ((inputX.value ?? 0) == 0 && (inputY.value ?? 0) == 0) {
            selectedInputId.value = null;
            return;
          }
          e.preventDefault();
          inputX.value = (inputX.value ?? 0) - 1;
        } else {
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

  const putVariableIntoInput = (varName: string) => {
    const inputHTML = document.getElementById(
      selectedInputId.value ?? '',
    ) as HTMLInputElement;
    if (inputHTML) {
      const column = rows.value[inputY.value ?? 0].columns[inputX.value ?? 0];
      if (!column.value) column.value = '';
      column.value += varName;
      // inputHTML.value += varName;
      inputHTML.focus();
    }
  };

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
      columns: Ref<number | null | string>[];
    }[]
  >([
    {
      number: 1,
      formula: 'Y = a * b 1',
      dim: 'Ом.',
      columns: [ref(23), ref(25), ref(26), ref(77), ref(12), ref(23), ref(51)],
    },
    {
      number: 2,
      formula: 'Y = a * b 2',
      dim: 'Ом.',
      columns: [ref(23), ref(25), ref(26), ref(77), ref(12), ref(23), ref(51)],
    },
    {
      number: 3,
      formula: 'Y = a * b 3',
      dim: 'Ом.',
      columns: [ref(23), ref(25), ref(26), ref(77), ref(12), ref(23), ref(51)],
    },
  ]);

  const deleteRowById = (id: number) => {
    if (rows.value.length == 1) {
      rows.value = rows.value.filter((row, index) => index != id);
      createNewRow();
    } else {
      rows.value = rows.value.filter((row, index) => index != id);
    }
    if (rows.value.length <= (inputY.value ?? 0)) {
      selectedInputId.value = null;
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
      columns: [
        ref(null),
        ref(null),
        ref(null),
        ref(null),
        ref(null),
        ref(null),
        ref(null),
      ],
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
    text-align: center;
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

  td > input.selected:not(:focus) {
    animation: anim1 1s ease-in-out infinite;
  }

  @keyframes anim1 {
    from {
      box-shadow: inset 0 0 0 2px var(--color-primary);
    }
    50% {
      box-shadow: inset 0 0 0 1px var(--color-primary);
    }
    to {
      box-shadow: inset 0 0 0 2px var(--color-primary);
    }
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
