import env from 'react-native-config';

const config = {
  api: {
    host: env.API_HOST,
    timeout: 20000,
  },
  env: {
    isProduction: env.ENV === 'prod',
    name: env.ENV,
  },
};

const API_HOST = config.api.host;
const ENV = config.env.name;
const IS_PRODUCTION = config.env.isProduction;

export default {
  ENV,
  API_HOST,
  IS_PRODUCTION,
};
