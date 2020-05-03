import * as Keychain from 'react-native-keychain';
import { isNullOrWhitespace } from '../shared/utils/string';

type Key = 'refreshToken' | 'accessToken';

export const saveCredentials = async (key: Key, value: string) => {
  const credentialsAsMap = await getCredentialsAsMap();
  credentialsAsMap.set(key, value);

  const credentialsAsString = stringify(credentialsAsMap);
  await Keychain.setGenericPassword('buzzCredentials', credentialsAsString);
};

export const loadCredentials = async (key: Key) => {
  const credentialsAsMap = await getCredentialsAsMap();
  return credentialsAsMap.get(key);
};

export const stringify = (credentialsAsMap: Map<string, string>) => {
  return JSON.stringify([...credentialsAsMap]);
};

export const parse = (credentialsAsString: string) => {
  if (isNullOrWhitespace(credentialsAsString)) {
    return new Map<string, string>();
  }

  return new Map<string, string>(JSON.parse(credentialsAsString));
};

const getCredentialsAsMap = async () => {
  const keychainCredentials = await Keychain.getGenericPassword();
  const credentialsAsString = keychainCredentials ? keychainCredentials.password : '';
  return parse(credentialsAsString);
};
