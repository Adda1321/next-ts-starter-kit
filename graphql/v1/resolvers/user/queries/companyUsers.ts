import {Context} from '@/graphql/v1';

interface CompanyUsersArgs {
  companyId: string;
  select: Object;
  query: string | null;
  skip: number | null;
  take: number | null;
}

const companyUsersHandler = async (
  parent: any,
  args: CompanyUsersArgs,
  context: Context,
) => {
  const {companyId, query, skip, take, select} = args;
  const userId = context.userId!;
  return context.serviceLocator.usersService.companyUsers(
    companyId,
    userId,
    select,
    query,
    skip,
    take,
  );
};

export default companyUsersHandler;
