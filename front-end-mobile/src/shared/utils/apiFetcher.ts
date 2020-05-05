import R from 'shared/res/R';
import { URL } from 'whatwg-url';

const TAG = 'API_FETCHER';

let _token: string;
const setToken = (token: string) => {
  _token = token;
};
const getToken = () => {
  return _token;
};

export type ErrorHandler = (res: Response, callParams: {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  path: string,
  data?: any, 
  auth?: boolean
}) => Promise<any>;
let _errorHandler: ErrorHandler | undefined;
const setErrorHandler = (handler: ErrorHandler) => {
  _errorHandler = handler;
};

const isJsonResponse = (res: Response) => {
  const contentType = res.headers.get('content-type');
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

  console.info(`${TAG} - status: ${res.status}`);

  if (_errorHandler) {
    if (res.status == 200) {
      return isJsonResponse(res) ? res.json() : res.text(); 
    }
    
    return _errorHandler(res, { method, path, data, auth });
  }

  return isJsonResponse(res) ? res.json() : res.text();
};

export default {
  setToken,
  getToken,
  fetch: _fetch,
  setErrorHandler,
  isJsonResponse,
};