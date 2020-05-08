import { 
  createStore, 
  applyMiddleware, 
  Store, 
} from 'redux';

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import orchestrator from './saga';
import createDebugger from 'redux-flipper';
import { RootState } from '../types/rootState';
import { Action } from 'shared/types/action';

const loggerMiddleware = createLogger({
  level: 'info',
});
const sagaMiddleware = createSagaMiddleware();
const reduxDebugger = createDebugger();

let store: Store<RootState, Action> & {
  dispatch: unknown;
};

if (__DEV__) {
  store = createStore(
    rootReducer,
    applyMiddleware(
      loggerMiddleware,
      sagaMiddleware,
      reduxDebugger,
    ),
  );
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(
      loggerMiddleware,
      sagaMiddleware,
    ),
  );
}

sagaMiddleware.run(orchestrator.orchestrate());

export default store;