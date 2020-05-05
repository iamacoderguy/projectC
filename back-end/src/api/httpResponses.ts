type ResponseResult = {
  message?: string[];
  payload?: unknown;
  failures?: ResponseFailure[];
}

type ResponseFailure = {
  reason: string;
}

export const ErrorResult = (failure: ResponseFailure): ResponseResult => ({
  failures: [failure],
});
