import * as React from 'react';
import { ToastRef } from 'shared/components/toast/Toast';

export const toastRef = React.createRef<ToastRef>();

const error = (msg: string) => {
  toastRef.current?.error(msg);
};
const info = (msg: string) => {
  toastRef.current?.info(msg);
};
const warn = (msg: string) => {
  toastRef.current?.warn(msg);
};
const success = (msg: string) => {
  toastRef.current?.success(msg);
};
const log = (msg: string) => {
  toastRef.current?.log(msg);
};

export default {
  error,
  info,
  warn,
  success,
  log,
};