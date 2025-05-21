import HttpError from './HttpError';
import {AppErrorCodes} from './AppErrorCodes';

export default class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(message, AppErrorCodes.UNAUTHORIZED, 401);
  }
}
