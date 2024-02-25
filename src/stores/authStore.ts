import { defineStore } from 'pinia';

export enum UserRole {
  STUDENT,
  TEACHER,
  ADMIN,
  EDITOR,
}

export type User = {
  name: string | null | undefined;
  email: string | null | undefined;
  role: UserRole | null | undefined;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: <User>{
      name: null,
      email: null,
      role: UserRole.EDITOR,
    },
  }),
  getters: {
    isLogin(): Boolean {
      return Boolean(this.user.role);
    },
    isStudent(): Boolean {
      return (
        this.user.role === UserRole.STUDENT ||
        this.user.role === UserRole.EDITOR
      );
    },
    isTeacher(): Boolean {
      return (
        this.user.role === UserRole.TEACHER ||
        this.user.role === UserRole.EDITOR
      );
    },
    isAdmin(): Boolean {
      return (
        this.user.role === UserRole.ADMIN || this.user.role === UserRole.EDITOR
      );
    },
  },
  actions: {
    setName(name: string) {
      this.user.name = name;
    },
    setEmail(email: string) {
      this.user.email = email;
    },
  },
});
