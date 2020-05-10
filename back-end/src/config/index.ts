/* eslint-disable import/first */
process.env.NODE_CONFIG_DIR = 'src/config/';
import configNPM from 'config';

const config = {
  env: configNPM.get<string>('env'),
};

export default config;
