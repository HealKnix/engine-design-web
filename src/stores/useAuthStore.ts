import { userList, UserRole, type User } from '@/models/User';
import { sha256 } from '@/utils/crypto';
import { defineStore } from 'pinia';

const userId = 0;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: userList.value[userId],
  }),
  getters: {
    getUserData(): User {
      return {
        id: this.user.id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        middleName: this.user.middleName,
        fullName: this.user.fullName,
        shortName: this.user.shortName,
        login: this.user.login,
        email: this.user.email,
        password: this.user.password,
        phoneNumber: this.user.phoneNumber,
        role: this.user.role,
        department: this.user.department,
        group: this.user.group,
      };
    },
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
      userList.value = userList.value.map((user1) => {
        if (user1.id == this.user.id) {
          user1 = this.user;
          user1.password = sha256(this.user.password ?? '');
          user1.fullName = `${user1.lastName} ${user1.firstName} ${user1.middleName}`;
          user1.shortName = `${user1.lastName} ${user1.firstName?.[0]}.${user1.middleName?.[0]}.`;
        }
        return user1;
      });
    },
    clearUser() {
      this.user = {
        id: null,
        firstName: null,
        lastName: null,
        middleName: null,
        fullName: null,
        shortName: null,
        login: null,
        email: null,
        password: null,
        phoneNumber: null,
        role: UserRole.GUEST,
        department: null,
        group: null,
      };
    },
  },
});
