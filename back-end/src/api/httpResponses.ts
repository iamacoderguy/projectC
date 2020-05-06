type ResponseResult = {
  message?: string[];
  payload?: unknown;
  failure: ResponseFailure;
}

type ResponseFailure = {
  reason: string;
}

export const ErrorResult = (failure: ResponseFailure): ResponseResult => ({
  failure,
});
