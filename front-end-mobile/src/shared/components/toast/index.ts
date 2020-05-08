import { ToastMessage } from './types';

export * from './types';

export const isToastMessageEqual = (message1: ToastMessage, message2: ToastMessage) => {
  return message1.content === message2.content && message1.type === message2.type;
};

export { default as Toast } from './Toast';
