import { strings, install, SKey as localSKey, oriTranslation } from './strings';

export type SKey = localSKey;
export const extension = {
  install,
  oriTranslation,
};

export default strings;