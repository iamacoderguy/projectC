import { Store } from 'redux';
import { RootState } from '../types/rootState';
import { Action } from 'shared/types/action';

let _store: Store<RootState, Action> | undefined;
const setStore = (store: Store<RootState, Action>) => {
  _store = store;
};
const getStore = () => {
  return _store;
};

export default {
  setStore,
  getStore,
};