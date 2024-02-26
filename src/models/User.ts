export enum UserRole {
  STUDENT,
  TEACHER,
  ADMIN,
  EDITOR,
}

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
