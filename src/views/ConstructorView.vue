<template>
  <BentoWrapper style="height: 100%">
    <BentoBlock
      type="width"
      overflow="none"
      padding="25px"
      style="height: fit-content"
    >
      <div class="engine_name__wrapper">
        <h2>Двигатель:</h2>
        <input placeholder="Введите название" class="engine_name" />
      </div>
    </BentoBlock>

    <BentoWrapper direction="row">
      <BentoBlock class="variable_choice__wrapper" style="width: 425px">
        <h2 style="text-align: center">Выберите переменную</h2>
        <hr />
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
      </BentoBlock>

      <BentoWrapper style="height: 100%">
        <BentoBlock
          style="
            & > .bento__wrapper {
              width: fit-content !important;
            }
          "
        >
          <h2>
            {{ tables[currentTableId].name }}
          </h2>
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
                  <tr
                    v-for="(row, index) in tables[currentTableId].rows"
                    :key="index"
                  >
                    <td
                      class="number"
                      @click="deleteRowById(index)"
                      :class="{ deletable: true }"
                    >
                      {{ index + 1 }}
                    </td>
                    <td class="formula">{{ row.formula }}</td>
                    <td class="dim">{{ row.dim }}</td>
                    <td v-for="(column, index1) in row.columns" :key="index1">
                      <input
                        type="text"
                        v-model="row.columns[index1].value"
                        @mousedown="selectInputById(index, index1)"
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
              <BaseButton
                id="create_new_row_btn"
                text="+"
                color="var(--color-green)"
                @click="createNewRow"
              />
            </div>

            <div
              class="inputs__wrapper"
              style="min-width: 170px"
              overflow="none"
            >
              <BaseInput title="a" />
              <BaseInput title="b" />
            </div>
          </div>
        </BentoBlock>

        <BentoBlock
          id-for-vert-scroll="tables_vertical_scroll"
          overflow="none"
          padding="15px"
          style="height: fit-content"
        >
          <div class="tables__wrapper">
            <div
              v-for="(table, index) in tables"
              :key="table.id"
              class="tables__wrapper__table__wrapper"
            >
              <div
                :id="`table_${index}`"
                :ref="`table_${index}`"
                class="tables__wrapper__table_name"
                :class="{ selected: currentTableId == index }"
                @click="
                  () => {
                    currentTableId = index;
                  }
                "
                @dblclick="
                  (e: any) => {
                    const divElement = (
                      $refs[
                        `table_${index}`
                      ] as HTMLCollectionOf<HTMLDivElement>
                    )[0];

                    if (e.target.id == `table_${index}`) {
                      divElement.contentEditable = 'true';
                      divElement.focus();
                      divElement.addEventListener('focusout', () => {
                        divElement.contentEditable = 'false';
                      });
                      divElement.addEventListener('keydown', (e) => {
                        if (e.key == 'Enter') {
                          divElement.contentEditable = 'false';
                        }
                      });
                    }
                  }
                "
                @input="
                  () => {
                    const divElement = (
                      $refs[
                        `table_${index}`
                      ] as HTMLCollectionOf<HTMLDivElement>
                    )[0];

                    tables[index].name = divElement.innerText;
                  }
                "
              >
                {{ table.name }}
              </div>
              <div
                v-if="tables.length != 1"
                class="tables__wrapper__delete_table_btn"
                @click="deleteTableById(table.id)"
              >
                X
              </div>
            </div>
            <BaseButton
              id="create_new_table_btn"
              text="+"
              width="fit-content"
              padding="0 15px"
              border-radius="50%"
              color="var(--color-border-3)"
              text-color="var(--color-text-1)"
              @click="createNewTable(tables.length)"
            />
          </div>
        </BentoBlock>
      </BentoWrapper>
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
  import type { Table } from '@/models/Table';

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
            (inputY.value ?? 0) ==
              tables.value[currentTableId.value].rows.length - 1
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
      if (
        (inputY.value ?? 0) >=
        tables.value[currentTableId.value].rows.length - 1
      )
        inputY.value = tables.value[currentTableId.value].rows.length - 1;
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
      const column =
        tables.value[currentTableId.value].rows[inputY.value ?? 0].columns[
          inputX.value ?? 0
        ];
      if (!column.value) column.value = '';
      column.value += varName;
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

  const currentTableId = ref<number>(0);
  const tables = ref<Table[]>([
    {
      id: 0,
      name: 'Таблица 1',
      s: [0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.024],
      initial_data: [
        {
          name: 'a',
          value: 12.3,
        },
        {
          name: 'b',
          value: 1.65,
        },
      ],
      rows: [
        {
          number: 1,
          formula: 'Y = a * b 1',
          dim: 'Ом.',
          columns: [
            ref(23),
            ref(25),
            ref(26),
            ref(77),
            ref(12),
            ref(23),
            ref(51),
          ],
        },
        {
          number: 2,
          formula: 'Y = a * b 2',
          dim: 'Ом.',
          columns: [
            ref(23),
            ref(25),
            ref(26),
            ref(77),
            ref(12),
            ref(23),
            ref(51),
          ],
        },
        {
          number: 3,
          formula: 'Y = a * b 3',
          dim: 'Ом.',
          columns: [
            ref(23),
            ref(25),
            ref(26),
            ref(77),
            ref(12),
            ref(23),
            ref(51),
          ],
        },
      ],
    },
    {
      id: 1,
      name: 'Таблица 2',
      s: [0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.024],
      initial_data: [
        {
          name: 'a',
          value: 12.3,
        },
        {
          name: 'b',
          value: 1.65,
        },
      ],
      rows: [
        {
          number: 1,
          formula: 'Y = a * b 1',
          dim: 'Ом.',
          columns: [
            ref(23),
            ref(25),
            ref(26),
            ref(77),
            ref(12),
            ref(23),
            ref(51),
          ],
        },
        {
          number: 2,
          formula: 'Y = a * b 2',
          dim: 'Ом.',
          columns: [
            ref(23),
            ref(25),
            ref(26),
            ref(77),
            ref(12),
            ref(23),
            ref(51),
          ],
        },
        {
          number: 3,
          formula: 'Y = a * b 3',
          dim: 'Ом.',
          columns: [
            ref(23),
            ref(25),
            ref(26),
            ref(77),
            ref(12),
            ref(23),
            ref(51),
          ],
        },
      ],
    },
  ]);

  let tablesCount = tables.value.length;
  const createNewTable = (id: number) => {
    if (tables.value.length >= 10) {
      modalStore.openToastModal(
        'warning',
        'Вы превисили лимит в колличестве таблиц',
      );
      return;
    }

    tables.value.push({
      id: tablesCount,
      name: `Таблица ${++tablesCount}`,
      s: [0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.024],
      initial_data: [
        {
          name: 'a',
          value: 12.3,
        },
        {
          name: 'b',
          value: 1.65,
        },
      ],
      rows: [
        {
          number: 1,
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
        },
      ],
    });

    currentTableId.value = tables.value.length - 1;

    const create_new_table_btn = document.getElementById(
      'create_new_table_btn',
    ) as HTMLButtonElement;
    const content = document.getElementById(
      'tables_vertical_scroll',
    ) as HTMLElement;

    const content_scroll_width = content.scrollWidth;
    let content_scoll_left = content.scrollLeft;
    create_new_table_btn.addEventListener('click', () => {
      content_scoll_left += content_scroll_width;
      if (content_scoll_left >= content_scroll_width) {
        content_scoll_left = content_scroll_width;
      }
      content.scrollLeft = content_scoll_left;
    });
  };

  const deleteRowById = (id: number) => {
    if (tables.value[currentTableId.value].rows.length == 1) {
      tables.value[currentTableId.value].rows = tables.value[
        currentTableId.value
      ].rows.filter((row, index) => index != id);
      createNewRow();
    } else {
      tables.value[currentTableId.value].rows = tables.value[
        currentTableId.value
      ].rows.filter((row, index) => index != id);
    }
    if (tables.value[currentTableId.value].rows.length <= (inputY.value ?? 0)) {
      selectedInputId.value = null;
    }
  };

  const deleteTableById = (id: number) => {
    if (tables.value.length > 1) {
      tables.value = tables.value.filter((table, index) => {
        if (table.id == id) {
          if (index < currentTableId.value) currentTableId.value--;
        }
        return table.id != id;
      });
    }
    if (currentTableId.value >= tables.value.length - 1)
      currentTableId.value = tables.value.length - 1;
    else if (currentTableId.value <= 0) {
      currentTableId.value = 0;
    }
  };

  const createNewRow = () => {
    if (tables.value[currentTableId.value].rows.length >= 50) {
      modalStore.openToastModal(
        'warning',
        'Вы превисили лимит в колличестве формул',
      );
      return;
    }

    tables.value[currentTableId.value].rows.push({
      number: tables.value[currentTableId.value].rows.length + 1,
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

    const create_new_row_btn = document.getElementById(
      'create_new_row_btn',
    ) as HTMLButtonElement;
    create_new_row_btn.scrollIntoView(true);
  };
</script>

<style scoped lang="scss">
  .variables__wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    justify-items: center;
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
    border: 2px solid var(--color-border-1);
    overflow: hidden;
  }

  table > tr > td,
  table > tr > th {
    border: none;
    box-shadow: 0 0 0 0.65px var(--color-border-1);
  }
  th,
  td {
    font-size: 18px;
  }

  th {
    background-color: var(--color-border-3);
    box-shadow: inset 0 0 0 1px var(--color-border-1) !important;
    padding: 20px 10px;
  }

  td > input {
    --color-select: var(--color-green);

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

  td > input:focus,
  td > input.selected {
    box-shadow: inset 0 0 0 2px var(--color-select);
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
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'X';
    font-weight: 600;
    width: 100%;
    height: 100%;
    border-radius: var(--br-small);
    color: var(--color-white);
    background-color: var(--color-red);
  }

  .table__wrapper {
    width: fit-content;
    display: flex;
    gap: 25px;
  }

  .inputs__wrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .tables__wrapper {
    display: flex;
    gap: 15px;
    width: fit-content;
  }

  .tables__wrapper__table__wrapper {
    user-select: none;
    position: relative;
    padding-right: 15px;
    border-right: 1px solid var(--color-border-1);

    & > .tables__wrapper__table_name {
      cursor: pointer;
      text-wrap: nowrap;
      padding: 10px 15px;
      border-radius: var(--br-big);
      font-weight: 600;

      &:hover {
        background-color: color-mix(
          in srgb,
          var(--color-yellow) 25%,
          transparent 100%
        );
      }

      &:focus {
        outline: 2px solid var(--color-yellow);
        outline-offset: 2px;
      }

      &.selected {
        background-color: var(--color-yellow);
      }
    }

    & > .tables__wrapper__delete_table_btn {
      cursor: pointer;
      display: none;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 5px;
      top: -10px;
      width: 20px;
      height: 20px;
      background-color: var(--color-red);
      color: var(--color-white);
      font-weight: 600;
      border-radius: 50%;
    }

    &:has(:hover) > .tables__wrapper__delete_table_btn {
      display: flex;
    }
  }
</style>
