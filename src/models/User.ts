import { ref } from "vue";

export enum UserRole {
  STUDENT = 0,
  TEACHER = 1,
  ADMIN = 2,
  EDITOR = 3,
}

export const UserRoleName: Record<UserRole, string> = {
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
  { id: UserRole.STUDENT, name: 'Студент' },
  { id: UserRole.TEACHER, name: 'Преподаватель' },
  { id: UserRole.ADMIN, name: 'Администратор' },
])

export interface User {
  id: number;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  fullName: string | null;
  shortName: string | null;
  email: string | null;
  role: UserRole | null;
}
