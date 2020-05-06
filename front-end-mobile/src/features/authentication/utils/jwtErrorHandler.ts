import apiFetcher, { ErrorHandler } from 'shared/utils/apiFetcher';
import { isNullOrWhitespace } from 'shared/utils/string';

export const jwtErrorHandler : (
  jwtExpiredHandler: () => Promise<void>,
  otherJwtErrorCallback: () => Promise<void>,
  recallApi: boolean,
) => ErrorHandler = (
  jwtExpiredHandler,
  otherJwtErrorCallback,
  recallApi,
) => async (res, callParams) => {
  let error = new Error();
  error.name = res.status.toString();

  if (apiFetcher.isJsonResponse(res)) {
    error.message = (await res.json()).failure?.reason;
  }

  if (isNullOrWhitespace(error.message)) {
    error.message = 'unknown error';
  }

  if (error.name == '401' || error.name == '403') {
    if (error.message == 'jwt expired') {
      await jwtExpiredHandler();

      if (recallApi) {
        try {
          return apiFetcher.fetch(callParams.method, callParams.path, callParams.data, callParams.auth);
        }
        catch (error) {
          await otherJwtErrorCallback();
          throw error;
        }
      }

      throw error;
    }

    await otherJwtErrorCallback();
    throw error;
  }
  throw error;
};