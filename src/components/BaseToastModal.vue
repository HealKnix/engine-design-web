<template>
  <div class="toast__wrapper">
    <div
      v-for="toast in modalStore.toasts"
      :key="toast.toastIdModal"
      class="toast"
      :class="[
        { success: toast.toastStatusModal === 'success' },
        { error: toast.toastStatusModal === 'error' },
        { warning: toast.toastStatusModal === 'warning' },
        { show: toast.toastShowModal },
      ]"
      @animationend="closeToast(toast, $event)"
      @click="closeToast(toast, $event)">
      <div class="icon">
        <span>
          <i
            class="fa-solid"
            :class="[
              { 'fa-check': toast.toastStatusModal === 'success' },
              { 'fa-multiply': toast.toastStatusModal === 'error' },
              { 'fa-warning': toast.toastStatusModal === 'warning' },
            ]"></i>
        </span>
      </div>
      <div class="content">
        <span class="title" style="text-wrap: wrap">
          {{
            toast.toastStatusModal === 'success'
              ? 'Успешно'
              : toast.toastStatusModal === 'warning'
                ? 'Предупреждение'
                : toast.toastStatusModal === 'error'
                  ? 'Ошибка'
                  : ''
          }}
        </span>
        <span class="description"> {{ toast.toastTextModal }} </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalsStore } from '../stores/useModalsStore';

const modalStore = useModalsStore();

const closeToast = (toast: any, element: any) => {
  toast.toastShowModal = false;

  setTimeout(() => {
    modalStore.updateToasts(toast);
  }, 250);
};
</script>

<style scoped>
.toast__wrapper {
  position: absolute;
  top: 25px;
  right: 0;
  z-index: 9999;
}

.toast {
  --margin: 10px;

  cursor: default;
  display: flex;
  opacity: 0;
  width: 350px;
  margin: var(--margin);
  transform: translate3d(calc(100% + var(--margin)), 0, 0);
  min-height: 70px;
  border-radius: var(--br-big);
  box-shadow: 0 0 10px 0 rgba(33, 33, 33, 0.2);
  overflow: hidden;
  transition: 0.25s ease-in-out;
  will-change: auto;
  view-timeline-name: ttt;
}

.toast::after {
  display: block;
  content: '';
  position: absolute;
  bottom: 0;
  width: 0%;
  height: 3px;
  animation: toastDelay 5s linear;
}

.toast:hover::after {
  animation-play-state: paused;
}

@keyframes toastDelay {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.toast.show {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  view-timeline: inherit;
}

.toast.success {
  background: linear-gradient(to right, var(--toast-success) -10%, white 40%);
}
.toast.success::after {
  background-color: var(--toast-success);
}

.toast.warning {
  background: linear-gradient(to right, var(--toast-warning) -10%, white 40%);
}
.toast.warning::after {
  background-color: var(--toast-warning);
}

.toast.error {
  background: linear-gradient(to right, var(--toast-error) -10%, white 40%);
}
.toast.error::after {
  background-color: var(--toast-error);
}

.toast.show {
  transform: translate3d(0, 0, 0);
}

.icon {
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon > span {
  width: 25px;
  height: 25px;
  line-height: 25px;
  font-weight: bold;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 28px;
}

i {
  color: white;
}

.toast.success > .icon > span {
  background-color: var(--toast-success);
}

.toast.warning > .icon > span {
  background-color: var(--toast-warning);
}

.toast.error > .icon > span {
  background-color: var(--toast-error);
}

.content {
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 2;
  padding: 10px;
}

.content > .title {
  font-weight: 700;
}

.content > .description {
  font-size: 0.9rem;
  font-weight: 500;
}
</style>
