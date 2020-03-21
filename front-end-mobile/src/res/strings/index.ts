import { strings, install, uninstall, SKey as localSKey, oriTranslation } from './strings';

export type SKey = localSKey;
export const extension = {
  install,
  uninstall,
  oriTranslation,
};

export default strings;