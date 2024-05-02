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
      @animationstart="addAnimation(toast)"
      @animationend="removeAnimation(toast)"
      @click="removeAnimation(toast)"
    >
      <div class="icon">
        <span>
          <svg
            v-if="toast.toastStatusModal === 'success'"
            id="_Слой_2"
            data-name="Слой 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 42.11 31.44"
          >
            <g id="_Слой_1-2" data-name="Слой 1">
              <polyline
                class="success_svg"
                points="2.5 18.28 13.17 28.94 39.61 2.5"
              />
            </g>
          </svg>
          <svg
            v-if="toast.toastStatusModal === 'error'"
            id="_Слой_2"
            data-name="Слой 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40.94 40.94"
          >
            <g id="_Слой_1-2" data-name="Слой 1">
              <g>
                <line
                  class="error_svg"
                  x1="2.5"
                  y1="2.5"
                  x2="38.44"
                  y2="38.44"
                />
                <line
                  class="error_svg"
                  x1="2.5"
                  y1="38.44"
                  x2="38.44"
                  y2="2.5"
                />
              </g>
            </g>
          </svg>
          <svg
            v-if="toast.toastStatusModal === 'warning'"
            id="_Слой_2"
            data-name="Слой 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 43.22 38.1"
          >
            <g id="_Слой_1-2" data-name="Слой 1">
              <path
                class="warning_svg"
                d="M42.89,34.35L23.78,1.25c-.45-.77-1.27-1.25-2.17-1.25s-1.72.48-2.17,1.25L.33,34.35c-.45.77-.45,1.73,0,2.5.45.77,1.27,1.25,2.17,1.25h38.22c.89,0,1.72-.48,2.17-1.25.45-.77.45-1.73,0-2.5ZM24.18,10.64l-.85,16h-3.39l-.82-16h5.06ZM23.58,34.04c-.51.51-1.16.77-1.93.77s-1.46-.26-1.98-.77c-.53-.51-.79-1.14-.79-1.9s.26-1.38.79-1.88c.52-.5,1.19-.75,1.98-.75s1.42.25,1.93.75c.51.5.77,1.13.77,1.88s-.26,1.39-.77,1.9Z"
              />
            </g>
          </svg>
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

  const addAnimation = (toast: any) => {
    toast.toastShowModal = true;
  };

  const removeAnimation = (toast: any) => {
    toast.toastShowModal = false;

    setTimeout(() => {
      modalStore.updateToasts(toast);
    }, 250);
  };
</script>

<style scoped lang="scss">
  .success_svg,
  .error_svg {
    fill: none;
    stroke: white;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 8px;
  }
  .warning_svg {
    fill: white;
    stroke: none;
    stroke-width: 0px;
    transform: translateY(-4px);
  }

  .toast__wrapper {
    position: absolute;
    top: 25px;
    right: 0;
    z-index: 9999;
    max-height: 95%;
    overflow-y: auto;
    overflow-x: hidden;
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
    border-radius: var(--br-small);
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    color: white;
    border-radius: 50%;
  }

  .icon > span > svg {
    width: 13px;
    height: 13px;
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
    font-weight: 600;
  }

  .content > .description {
    font-size: 0.9rem;
    font-weight: 500;
  }
</style>
