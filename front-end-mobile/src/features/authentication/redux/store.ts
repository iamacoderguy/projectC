import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import orchestrator from './saga';

const loggerMiddleware = createLogger({
  level: 'info',
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(
    loggerMiddleware,
    sagaMiddleware,
  ),
);

sagaMiddleware.run(orchestrator.orchestrate());

export default store;