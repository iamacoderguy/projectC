import { Action } from 'lib/types/action';
import { signInSuccess } from './actions';
import { getType } from 'typesafe-actions';

export type RootState = {
  token: string;
}

const initialState: RootState = {
  token: '',
};

const rootReducer = (state: RootState = initialState, action: Action) => {
  switch (action.type) {
    case getType(signInSuccess):
      return { ...state, token: (action as ReturnType<typeof signInSuccess>).payload.token };

    default:
      return state;
  }
};

export default rootReducer;