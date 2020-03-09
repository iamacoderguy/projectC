import { takeLatest, all, spawn, call, takeEvery } from 'redux-saga/effects';
import { Action } from 'lib/types/action';

export class SagaOrchestrator {
  private _sagas: Function[] = [];
  private _onError: Function | undefined;

  public takeEvery(pattern: string | string[], saga: (action: Action) => any) {
    let patterns = pattern instanceof Array ? pattern : [pattern];
    for (let p of patterns) {
      this._sagas.push(function* () {
        yield takeEvery(p, saga);
      });
    }

    return this;
  }

  public takeLatest(pattern: string | string[], saga: (action: Action) => any) {
    let patterns = pattern instanceof Array ? pattern : [pattern];
    for (let p of patterns) {
      this._sagas.push(function* () {
        yield takeLatest(p, saga);
      });
    }

    return this;
  }

  public onError(fn: Function) {
    this._onError = fn;
    return this;
  }

  public orchestrate() {
    let onError = this._onError;
    let sagas = this._sagas;
    return function* () {
      yield all(sagas.map((saga) => {
        return spawn(function* () {
          while (true) {
            try {
              yield call(saga as GeneratorFunction);
              return;
            } catch (error) {
              if (onError) {
                let shouldContinue = yield call(onError as GeneratorFunction, error);
                if (!shouldContinue) {
                  return;
                }
              }
            }
          }
        });
      }));
    };
  }
}