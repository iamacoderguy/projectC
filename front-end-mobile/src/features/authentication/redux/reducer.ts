import { Action } from 'lib/types/action';
import { authenticated, setMode } from './actions';
import { getType } from 'typesafe-actions';

export type RootState = {
  accessToken?: string;
  refreshToken?: string;
  testMode: boolean;
}

const initialState: RootState = {
  testMode: false,
};

function rootReducer(previousState: RootState = initialState, action: Action): RootState {
  switch (action.type) {
    case getType(authenticated):
      return {
        ...previousState,
        accessToken: (action as ReturnType<typeof authenticated>).payload.accessToken,
        refreshToken: (action as ReturnType<typeof authenticated>).payload.refreshToken,
      };

    case getType(setMode):
      return {
        ...previousState,
        testMode: (action as ReturnType<typeof setMode>).payload,
      };

    default:
      return previousState;
  }
}

export default rootReducer;