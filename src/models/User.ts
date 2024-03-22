import { ref } from "vue";

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
}

export interface Role {
  id: UserRole;
  name: string;
}

export const roleList = ref<Role[]>([
  { id: UserRole.GUEST, name: 'Гость' },
  { id: UserRole.STUDENT, name: 'Студент' },
  { id: UserRole.TEACHER, name: 'Преподаватель' },
  { id: UserRole.ADMIN, name: 'Администратор' },
])

export interface User {
  id: number | null;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  fullName: string | null;
  shortName: string | null;
  email: string | null;
  role: UserRole | null;
}
