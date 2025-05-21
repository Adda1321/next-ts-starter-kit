import HttpError from './HttpError';
import {ApolloServerErrorCode} from '@apollo/server/errors';

export default class InternalServerError extends HttpError {
  constructor(message: string) {
    super(message, ApolloServerErrorCode.INTERNAL_SERVER_ERROR, 500);
  }
}
