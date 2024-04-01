import { userList, UserRole, type User } from '@/models/User';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: <User>{
      id: userList.value[0].id,
      firstName: userList.value[0].firstName,
      lastName: userList.value[0].lastName,
      middleName: userList.value[0].middleName,
      fullName: userList.value[0].fullName,
      shortName: userList.value[0].shortName,
      login: userList.value[0].login,
      email: userList.value[0].email,
      password: userList.value[0].password,
      phoneNumber: userList.value[0].phoneNumber,
      role: userList.value[0].role,
      department: userList.value[0].department,
      group: userList.value[0].group,
    },
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
      this.user.id = user.id;
      this.user.firstName = user.firstName;
      this.user.lastName = user.lastName;
      this.user.middleName = user.middleName;
      this.user.fullName = user.fullName;
      this.user.shortName = user.shortName;
      this.user.login = user.login;
      this.user.email = user.email;
      this.user.password = user.password;
      this.user.phoneNumber = user.phoneNumber;
      this.user.role = user.role;
      this.user.department = user.department;
      this.user.group = user.group;
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
      this.user.shortName = `${lastName} ${firstName[0]}.${middleName[0]}`;
    },
    setEmail(email: string) {
      this.user.email = email;
    },
  },
});
