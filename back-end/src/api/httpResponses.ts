type ResponseResult = {
  message?: string[];
  payload?: unknown;
  failures?: ResponseFailure[];
}

type ResponseFailure = {
  reason: string;
}

export const UnauthorizedResult = (failure: ResponseFailure): ResponseResult => ({
  failures: [failure],
});
