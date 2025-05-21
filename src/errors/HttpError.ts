import {ApolloServerErrorCode} from '@apollo/server/errors';
import {GraphQLError} from 'graphql/error';

export default class HttpError extends GraphQLError {
  constructor(
    message: string,
    code: string,
    statusCode: number,
    details?: any,
  ) {
    super(message, {
      extensions: {
        code: code || ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
        statusCode: statusCode || 500,
        details: details,
      },
    });
  }
}
