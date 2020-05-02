import R from 'res/R';
import { URL } from 'whatwg-url';

let _token: string;
export function setToken(token: string) {
  _token = token;
}

export function removeToken() {
  _token = '';
}

export const fetchToJson = async (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  path: string,
  data?: any,
  auth?: boolean,
) => {
  const apiHost = R.config.API_HOST;
  const url = new URL(path, apiHost);
  console.warn(apiHost);
  console.warn(url.href);

  const fetchTask = fetch(url.href, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(auth && { 'Authorization': 'Bearer ' + _token }),
    },
    body: data ? JSON.stringify(data) : null,
  });

  const res = await fetchTask;
  const apiResponse = await (res as Response).json();
  return apiResponse;
};