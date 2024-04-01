import { createRouter, createWebHistory } from 'vue-router';
import AvailableEnginesView from '../views/AvailableEnginesView.vue';
import ProfileView from '@/views/ProfileView.vue';
import StudentsView from '@/views/StudentsView.vue';
import EngineChoiceView from '@/views/EngineChoiceView.vue';
import ConstructorView from '@/views/ConstructorView.vue';
import DashboardView from '@/views/Admin/DashboardView.vue';
import UsersView from '@/views/Admin/UsersView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/profile',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/students',
      name: 'students',
      component: StudentsView,
    },
    {
      path: '/students/:id/engine-choice',
      props: true,
      name: 'engine-choice',
      component: EngineChoiceView,
    },
    {
      path: '/constructor',
      name: 'constructor',
      component: ConstructorView,
    },
    {
      path: '/engines',
      name: 'engines',
      component: AvailableEnginesView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: DashboardView,
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: UsersView,
    },
  ],
});

export default router;
