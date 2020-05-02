/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = 'src/config/';
import configNPM from 'config';

const config = {
  dbConfig: {
    connectionString: configNPM.get<string>('dbConfig.connectionString').replace('<password>', configNPM.get('mongoDB_pwd')),
    connectTimeoutInMs: configNPM.get<number>('dbConfig.connectTimeoutInMs'),
  },
  auth0: {
    domain: configNPM.get<string>('auth0.domain'),
    buzzApiId: configNPM.get<string>('auth0.buzz_api_id'),
  },
};

export default config;
