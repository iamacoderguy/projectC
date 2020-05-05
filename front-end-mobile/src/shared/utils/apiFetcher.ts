import R from 'shared/res/R';
import { URL } from 'whatwg-url';

const tag = 'API_FETCHER';
let _token: string;
const setToken = (token: string) => {
  _token = token;
};

const getToken = () => {
  return _token;
};

const fetchToJson = async (
  method: 'POST' | 'GET' | 'DELETE' | 'PUT',
  path: string,
  data?: any,
  auth?: boolean,
) => {
  const apiHost = R.config.API_HOST;
  const url = new URL(path, apiHost);

  console.log(`${tag} - ${method} at ${url}`);

  const res = await fetch(url.href, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(auth && { 'Authorization': 'Bearer ' + _token }),
    },
    body: data ? JSON.stringify(data) : null,
  });

  console.log(`${tag} - status: ${res.status}`);

  switch (res.status) {
    case 200:
    case 401:
      return await res.json();
  
    default:
      return await res.text();
  }
};

export default {
  setToken,
  getToken,
  fetchToJson,
};