import { UserRole, type User } from '@/models/User';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: <User>{
      fullName: null,
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
    setName(lastName: string, firstName: string, middleName: string) {
      this.user.lastName = lastName;
      this.user.firstName = firstName;
      this.user.middleName = middleName;
      this.user.fullName = `${lastName} ${firstName} ${middleName}`;
      this.user.shortName = `${lastName} ${firstName[0]}.${middleName[0]}`;
    },
    setEmail(email: string) {
      this.user.email = email;
    },
  },
});
