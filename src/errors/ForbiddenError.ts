import HttpError from './HttpError';
import {ApolloServerErrorCode} from '@apollo/server/errors';

export default class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, ApolloServerErrorCode.BAD_REQUEST, 403);
  }
}
