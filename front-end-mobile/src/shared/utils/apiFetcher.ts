import R from 'shared/res/R';
import { URL } from 'whatwg-url';

let _token: string;
export const setToken = (token: string) => {
  _token = token;
};

export const getToken = () => {
  return _token;
};

export const fetchToJson = async (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  path: string,
  data?: any,
  auth?: boolean,
) => {
  const apiHost = R.config.API_HOST;
  const url = new URL(path, apiHost);

  console.log(`${method} at ${url}`);

  const fetchTask = fetch(url.href, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(auth && { 'Authorization': 'Bearer ' + _token }),
    },
    body: data ? JSON.stringify(data) : null,
  });

  const res = (await fetchTask) as Response;
  const apiResponse = (res.status == 200) ? (await res.json()) : (await res.text());
  return apiResponse;
};