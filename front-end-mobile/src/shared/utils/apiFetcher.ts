import R from 'shared/res/R';
import { URL } from 'whatwg-url';
import { isNullOrWhitespace } from './string';

const TAG = 'API_FETCHER';

let _token: string;
const setToken = (token: string) => {
  _token = token;
};
const getToken = () => {
  return _token;
};

type ErrorHandler = (err: Error, callParams: {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  path: string,
  data?: any, 
  auth?: boolean
}) => Promise<any>;
let _errorHandler: ErrorHandler | undefined;
const setErrorHandler = (handler: ErrorHandler) => {
  _errorHandler = handler;
};

const isJsonResponse = (contentType: string | null) => {
  return contentType && contentType.indexOf('application/json') !== -1;
};
const _fetch = async (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  path: string,
  data?: any,
  auth?: boolean,
) => {
  const apiHost = R.config.API_HOST;
  const url = new URL(path, apiHost);

  console.info(`${TAG} - ${method} at ${url}`);

  const res = await fetch(url.href, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(auth && { 'Authorization': 'Bearer ' + _token }),
    },
    body: data ? JSON.stringify(data) : null,
  });
  const contentType = res.headers.get('content-type');

  console.info(`${TAG} - status: ${res.status}`);
  console.info(`${TAG} - contentType: ${contentType}`);

  if (res.status == 200) {
    return isJsonResponse(contentType) ? res.json() : res.text(); 
  }

  let error = new Error();
  error.name = res.status.toString();

  if (isJsonResponse(contentType)) {
    error.message = (await res.json()).failure?.reason;
  }

  if (isNullOrWhitespace(error.message)) {
    error.message = 'unknown error';
  }

  if (_errorHandler) {
    return _errorHandler(error, { method, path, data, auth });
  }

  throw error;
};

export default {
  setToken,
  getToken,
  fetch: _fetch,
  setErrorHandler,
};