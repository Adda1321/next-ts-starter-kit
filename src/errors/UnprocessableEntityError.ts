import HttpError from './HttpError';
import {ApolloServerErrorCode} from '@apollo/server/errors';

export default class UnprocessableEntityError extends HttpError {
  constructor(message: string) {
    super(message, ApolloServerErrorCode.GRAPHQL_PARSE_FAILED, 422);
  }
}
