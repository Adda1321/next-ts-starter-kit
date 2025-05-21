import me from './me';
import users from './users';
import userRoles from './userRoles';
import userPermissions from './userPermissions';
import companyUsers from './companyUsers';
import {handler as authHandler} from '@/graphql/v1/auth';
import {handlerMiddleware, baseListQueryHandler} from '@/graphql/v1/helpers';

const middlewares = handlerMiddleware([authHandler, baseListQueryHandler]);

const queries = {
  me: middlewares.execute(me),
  users: middlewares.execute(users),
  userRoles: middlewares.execute(userRoles),
  userPermissions: middlewares.execute(userPermissions),
  companyUsers: middlewares.execute(companyUsers),
};

export default queries;
