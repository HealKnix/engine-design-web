import { ref } from 'vue';

export enum UserRole {
  GUEST = 0,
  STUDENT = 1,
  TEACHER = 2,
  ADMIN = 3,
  EDITOR = 4,
}

export const UserRoleName: Record<UserRole, string> = {
  [UserRole.GUEST]: 'Гость',
  [UserRole.STUDENT]: 'Студент',
  [UserRole.TEACHER]: 'Преподаватель',
  [UserRole.ADMIN]: 'Администратор',
  [UserRole.EDITOR]: 'Редактор',
};

export interface Role {
  id: UserRole;
  name: string;
}

export const roleList = ref<Role[]>([
  { id: UserRole.GUEST, name: 'Гость' },
  { id: UserRole.STUDENT, name: 'Студент' },
  { id: UserRole.TEACHER, name: 'Преподаватель' },
  { id: UserRole.ADMIN, name: 'Администратор' },
  { id: UserRole.EDITOR, name: 'Редактор' },
]);

export interface User {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  fullName: string | null;
  shortName: string | null;
  login?: string | null;
  email: string | null;
  password: string | null;
  phoneNumber: string | null;
  role: UserRole | null;
  department: string | null;
  group?: string | null;
}

export const userList = ref<User[]>([
  {
    id: 0,
    firstName: 'Даниил',
    lastName: 'Михайлов',
    middleName: 'Александрович',
    fullName: 'Михайлов Даниил Александрович',
    shortName: 'Михайлов Д.А.',
    email: 'mikhaylov.daniil2014@yandex.ru',
    password: 'test',
    phoneNumber: '79248005533',
    role: UserRole.EDITOR,
    department: 'ИИТиАД',
  },
  {
    id: 1,
    firstName: 'Илья',
    lastName: 'Дубровин',
    middleName: 'Сергеевич',
    fullName: 'Дубровин Илья Сергеевич',
    shortName: 'Дубровин И.С.',
    email: 'dubrov.ilya2014@yandex.ru',
    password: 'test',
    phoneNumber: '79248005534',
    role: UserRole.ADMIN,
    department: 'ИИТиАД',
  },
  {
    id: 2,
    firstName: 'Валерий',
    lastName: 'Бобров',
    middleName: 'Михайлович',
    fullName: 'Бобров Валерий Михайлович',
    shortName: 'Бобров В.М.',
    email: 'bobrov.valeriy2014@yandex.ru',
    password: 'test',
    phoneNumber: '79248005535',
    role: UserRole.ADMIN,
    department: 'ИИТиАД',
  },
  {
    id: 3,
    firstName: 'Константин',
    lastName: 'Геннадий',
    middleName: 'Григорьевич',
    fullName: 'Константинов Геннадий Григорьевич',
    shortName: 'Константинов Г.Г.',
    email: 'kgg40@mail.ru',
    password: 'test',
    phoneNumber: '79248005536',
    role: UserRole.TEACHER,
    department: 'ЭиЭТ',
  },
  {
    id: 4,
    firstName: 'Денис',
    lastName: 'Ветров',
    middleName: 'Константинович',
    fullName: 'Ветров Денис Константинович',
    shortName: 'Ветров Д.К.',
    email: 'vetrov.denis2014@yandex.ru',
    password: 'test',
    login: '20210001',
    phoneNumber: '79248005537',
    role: UserRole.STUDENT,
    department: 'ЭиЭТ',
    group: 'ЭТ-1',
  },
]);
