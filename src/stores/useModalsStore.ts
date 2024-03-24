import { defineStore } from 'pinia';

type ToastStatus = 'success' | 'error' | 'warning';

interface State {
  toastIdModal: number;
  toastStatusModal?: String;
  toastTextModal?: String;
  toastShowModal?: Boolean;
}

let index = 0;

export const useModalsStore = defineStore('modals', {
  state: () => ({
    toasts: <State[]>[],
  }),
  actions: {
    openToastModal(status: ToastStatus, text: String) {
      this.toasts.push({
        toastIdModal: index,
        toastStatusModal: status,
        toastTextModal: text,
        toastShowModal: false,
      });
      index++;
    },

    updateToasts(toastT: State) {
      this.toasts = this.toasts.filter(
        (toast) => toast.toastIdModal !== toastT.toastIdModal,
      );
    },
  },
});
