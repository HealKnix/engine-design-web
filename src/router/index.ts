import { createRouter, createWebHistory } from 'vue-router';
import AvailableEnginesView from '../views/AvailableEnginesView.vue';
import ProfileView from '@/views/ProfileView.vue';
import StudentsView from '@/views/StudentsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/profile',
    },
    {
      path: '/students',
      name: 'students',
      component: StudentsView,
    },
    {
      path: '/constructor',
      name: 'constructor',
      component: AvailableEnginesView,
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
  ],
});

export default router;
