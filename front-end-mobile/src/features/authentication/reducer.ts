import { Action } from 'lib/types/action';
import { signInSuccess } from './actions';
import { getType } from 'typesafe-actions';

export type RootState = {
  token: string;
}

const initialState: RootState = {
  token: '',
};

const rootReducer = (previousState: RootState = initialState, action: Action) => {
  switch (action.type) {
    case getType(signInSuccess):
      return { ...previousState, token: (action as ReturnType<typeof signInSuccess>).payload.token };

    default:
      return previousState;
  }
};

export default rootReducer;