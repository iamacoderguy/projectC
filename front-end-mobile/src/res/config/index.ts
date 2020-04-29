import env from 'react-native-config';

const config = {
  api: {
    host: env.API_HOST,
    timeout: 20000,
  },
  env: {
    isProduction: env.ENV === 'production',
    name: env.ENV,
  },
  auth0: {
    credentials: {
      clientId: env.AUTH0_CLIENT_ID,
      domain: env.AUTH0_DOMAIN,
    },
    connections: {
      database: env.AUTH0_CONNECTION_DATABASE,
    },
  },
};

const API_HOST = config.api.host;
const ENV = config.env.name;
const IS_PRODUCTION = config.env.isProduction;
const AUTH0 = config.auth0;

export default { 
  ENV, 
  API_HOST,
  IS_PRODUCTION, 
  AUTH0, 
};
