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
          style="display: grid; grid-template-rows: 0fr 1fr 0fr; height: 100%">
          <div>
            <h2 style="text-align: center">Выберите переменную</h2>
            <hr />
          </div>

          <div class="variable_choice">
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

          <BaseButton text="Создать двигатель" style="margin-top: 25px" />
        </div>
      </BentoBlock>

      <BentoBlock>
        <h2>Таблица</h2>
        <hr />
        <div class="table__wrapper" style="margin-bottom: 50px">
          <div class="table">
            <div class="table_flex"></div>
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
              <tr>
                <td class="number">1</td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
                <td>
                  <input type="text" />
                </td>
              </tr>
            </table>
            <button class="add_new_row_btn" v-on:click="createNewRow">+</button>
          </div>

          <div class="input__wrapper">
            <div class="input">
              <label>a&nbsp;=</label>
              <input type="text" />
            </div>

            <div class="input">
              <label>b&nbsp;=</label>
              <input type="text" />
            </div>
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

  const createNewRow = () => {
    const table = document.querySelector('#engine_table');
    const newRow = document.createElement('tr');
    if (table) {
      const columnsCount = table.children.item(0)?.children.length;
      if (columnsCount) {
        for (let i = 0; i < columnsCount; i++) {
          const newColumn = document.createElement('td');
          const newInput = document.createElement('input');
          newColumn.appendChild(newInput);
          if (i === 0) {
            newColumn.innerText = table.children.length.toString();
            newColumn.classList.add('number');
          }
          newRow.appendChild(newColumn);
        }
        table.appendChild(newRow);
      }
    }
  };
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
    transition: 0.05s ease-in-out;
  }

  .variable_card:hover {
    background-color: color-mix(in srgb, var(--accent-color-1), white 10%);
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
    color: var(--text-light);
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

  .table {
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: scroll;
    border-radius: var(--br-big);
    box-shadow: inset 0 0 0 1px #b3b3b3;
  }

  .add_new_row_btn {
    flex-grow: 1;
    width: 100%;
    background-color: transparent !important;
    color: var(--text-light);
    font-size: 36px;
    line-height: 16px;
    font-weight: bold;
    background-color: #f3f3f3;
  }

  .add_new_row_btn:hover {
    background-color: #3d68ed11 !important;
    filter: none;
    border-radius: 0 0 0 0;
  }

  .add_new_row_btn:focus {
    outline: 2px solid var(--accent-color-2);
    background-color: #3d68ed11 !important;
  }

  .table__wrapper {
    display: flex;
    gap: 25px;
  }

  .input__wrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .input {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 175px;
    gap: 15px;
    border-radius: var(--br-small);
  }

  .input > label {
    font-size: 20px;
    text-wrap: nowrap;
    font-weight: bold;
  }
</style>
