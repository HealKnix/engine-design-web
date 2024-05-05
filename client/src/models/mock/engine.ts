interface Engine {
  id: number;
  name: string;
  status: string | number | null;
}

export const engineList: Engine[] = [
  {
    id: 0,
    name: 'Асинхронный с кз',
    status: 'Ещё не выдавали',
  },
  {
    id: 1,
    name: 'Асинхронный с кз',
    status: 'Выдан этой группе',
  },
  {
    id: 2,
    name: 'Асинхронный с кз',
    status: 'Активный',
  },
];
