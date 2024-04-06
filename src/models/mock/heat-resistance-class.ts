interface HeatResistanceClass {
  id: number;
  name: string;
  value: string | number | null;
}

export const heatResistanceClassList: HeatResistanceClass[] = [
  {
    id: 0,
    name: 'F',
    value: 'F',
  },
  {
    id: 1,
    name: 'B',
    value: 'B',
  },
  {
    id: 2,
    name: 'H',
    value: 'H',
  },
];
