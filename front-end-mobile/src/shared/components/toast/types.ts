export type ToastType = 'error' | 'info' | 'warn' | 'success' | 'log';
export type ToastTheme = 'Toastify' | 'LogBox';
export type ToastMessage = {
  type: ToastType,
  content: string;
}

export type ToastRef = {
  show: (toastMsg: ToastMessage, onClose?: () => void) => void;
  hide: () => void;
}