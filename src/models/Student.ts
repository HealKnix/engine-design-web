export interface Student {
  id: number;
  name: string;
  group: string;
}

export interface StudentWithCompletedTasks extends Student {
  isTaskCompleted: boolean;
}

export const studentList: Student[] = [
  {
    id: 0,
    name: '',
    group: 'ИСТб-21-2',
  },
  {
    id: 1,
    name: '',
    group: 'ИСТб-21-2',
  },
  {
    id: 2,
    name: '',
    group: 'ИСТб-21-2',
  },
  {
    id: 3,
    name: '',
    group: 'ИСТб-21-2',
  },
  {
    id: 4,
    name: '',
    group: 'ИСТб-21-2',
  },
  {
    id: 5,
    name: '',
    group: 'ИСТб-21-2',
  },
  {
    id: 6,
    name: '',
    group: 'ИСТб-21-2',
  },
  {
    id: 7,
    name: '',
    group: 'ИСТб-21-2',
  },
];
