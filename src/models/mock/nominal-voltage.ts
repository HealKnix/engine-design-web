interface NominalVoltage {
  id: number;
  name: string;
  value: string | number | null;
}

export const nominalVoltageList: NominalVoltage[] = [
  {
    id: 0,
    name: '220',
    value: 220,
  },
  {
    id: 1,
    name: '380',
    value: 380,
  },
  {
    id: 2,
    name: '660',
    value: 660,
  },
];
