import * as React from 'react';
import { 
  ToastRef,
  ToastMessage,
  isToastMessageEqual,
} from 'shared/components/toast/Toast';

export const toastRef = React.createRef<ToastRef>();

const config: {
  toastQueue: ToastMessage[];
  currentMessage: ToastMessage | undefined;
  isRunning: boolean;
} = {
  toastQueue: [],
  currentMessage: undefined,
  isRunning: false,
};

const isMessageExisted = (message: ToastMessage) =>
  config.currentMessage && isToastMessageEqual(config.currentMessage, message) ||
  config.toastQueue.findIndex(m => isToastMessageEqual(m, message)) !== -1;

const start = () => {
  let currentMessage = dequeue();
  
  if (!toastRef.current || !currentMessage) {
    config.isRunning = false;
    return;
  }
  
  config.isRunning = true;
  config.currentMessage = currentMessage;
  toastRef.current.show(currentMessage, () => {
    config.currentMessage = undefined;
    start();
  });
};

const enqueueUnique = (toastMesage: ToastMessage) => {
  if (isMessageExisted(toastMesage)) {
    return;
  }

  config.toastQueue.push(toastMesage);

  if (config.isRunning) {
    return;
  }

  start();
};

const dequeue = () => {
  return config.toastQueue.shift();
};

const error = (msg: string) => {
  enqueueUnique({
    type: 'error',
    content: msg,
  });
};
const info = (msg: string) => {
  enqueueUnique({
    type: 'info',
    content: msg,
  });

};
const warn = (msg: string) => {
  enqueueUnique({
    type: 'warn',
    content: msg,
  });
};
const success = (msg: string) => {
  enqueueUnique({
    type: 'success',
    content: msg,
  });
};
const log = (msg: string) => {
  enqueueUnique({
    type: 'log',
    content: msg,
  });
};

export default {
  error,
  info,
  warn,
  success,
  log,
};