import type { Ref } from 'vue';

export interface Table {
  id: number;
  name: string;
  s: number[];
  initial_data: InitialData[];
  rows: Row[];
}

export interface InitialData {
  name: string;
  value: number;
}

export interface Row {
  number: number;
  formula: string;
  dim: string;
  columns: Ref<number | string | null>[];
}
