import { userList, UserRole, type User } from '@/models/User';
import { defineStore } from 'pinia';

const userId = 0;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: userList.value[userId],
  }),
  getters: {
    isLogin(): Boolean {
      return Boolean(this.user.role !== UserRole.GUEST);
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
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user.id = null;
      this.user.firstName = null;
      this.user.lastName = null;
      this.user.middleName = null;
      this.user.fullName = null;
      this.user.shortName = null;
      this.user.login = null;
      this.user.email = null;
      this.user.password = null;
      this.user.phoneNumber = null;
      this.user.role = UserRole.GUEST;
      this.user.department = null;
      this.user.group = null;
    },
    setName(lastName: string, firstName: string, middleName: string) {
      this.user.lastName = lastName;
      this.user.firstName = firstName;
      this.user.middleName = middleName;
      this.user.fullName = `${lastName} ${firstName} ${middleName}`;
      this.user.shortName = `${lastName} ${firstName[0]}.${middleName[0]}.`;
    },
    setEmail(email: string) {
      this.user.email = email;
    },
  },
});
