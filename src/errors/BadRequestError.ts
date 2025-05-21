import AppValidationError from '@/lib/validators/AppValidationError';
import HttpError from './HttpError';
import {ApolloServerErrorCode} from '@apollo/server/errors';

export default class BadRequestError extends HttpError {
  constructor(message: string, validationErrors?: AppValidationError[]) {
    if (!validationErrors) {
      super(message, ApolloServerErrorCode.BAD_REQUEST, 400);
      return;
    }

    super(message, ApolloServerErrorCode.BAD_USER_INPUT, 400, validationErrors);
  }
}
