import { AppErrorCodes } from './AppErrorCodes';
import HttpError from './HttpError';

export default class NotFoundError extends HttpError {
  constructor(message: string) {
    super(message, AppErrorCodes.NOT_FOUND, 404);
  }
}
