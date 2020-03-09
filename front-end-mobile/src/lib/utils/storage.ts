const config = {
  token: '',
};

export const saveCredentials = (token: string) => {
  console.warn('credentials saved!');
  config.token = token;
};

export const loadCredentials = () => {
  console.warn(`credentials loaded! - ${config.token}`);
  return config.token;
};