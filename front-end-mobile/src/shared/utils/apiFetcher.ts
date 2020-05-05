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
  console.log(`${tag} - status: ${res.status}`);

  const apiResponse = (res.status == 200) ? (await res.json()) : (await res.text());

  return apiResponse;
};

export default {
  setToken,
  getToken,
  fetchToJson,
};