/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = 'src/config/';
import configNPM from 'config';

const config = {
  dbConfig: {
    connectionString: configNPM.get<string>('dbConfig.connectionString').replace('<password>', configNPM.get('mongoDB_pwd')),
    connectTimeoutInMs: configNPM.get<number>('dbConfig.connectTimeoutInMs'),
  },
};

export default config;
