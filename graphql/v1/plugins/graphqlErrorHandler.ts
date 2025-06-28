import {GraphQLRequestContext} from '@apollo/server';
import {Context} from '../context';
import {WithRequired} from '@apollo/utils.withrequired';
import { ForbiddenError, NotFoundError, UnauthorizedError } from '@/errors';

const ignoredErrors = [UnauthorizedError, ForbiddenError, NotFoundError];

const isErrorCanBeIgnored = (error: any) => {
  if (ignoredErrors.some((ignoredError) => error instanceof ignoredError)) {
    return true;
  }

  return false;
};

const graphqlErrorHandler = {
  requestDidStart: async () => ({
    didEncounterErrors: async (
      executionRequestContext: WithRequired<
        GraphQLRequestContext<Context>,
        'errors'
      >,
    ) => {
      const context = executionRequestContext.contextValue;

      for (const error of executionRequestContext.errors) {
        if (isErrorCanBeIgnored(error)) {
          continue;
        }

        
 
      }

      return;
    },
  }),
};

export default graphqlErrorHandler;
