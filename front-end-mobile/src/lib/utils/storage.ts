const config = {
  token: '',
};

export const saveCredentials = (token: string) => {
  config.token = token;
};

export const loadCredentials = () => {
  return config.token;
};