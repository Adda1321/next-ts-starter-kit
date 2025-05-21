import {Context} from '@/graphql/v1';

const users = async (parent: any, args: any, context: Context) => {
  const {filter, orderBy, skip, take} = args;
  // eslint-disable-next-line no-unused-vars
  const {roles, ...userSelect} = args.select;

  const users = await context.prisma.user.findMany({
    orderBy: orderBy || {firstName: 'asc'},
    where: {
      ...filter,
      isActive: true,
    },
    skip: skip || 0,
    take: take || 50,
    select: {
      ...userSelect,
    },
  });

  if (!users) {
    return [];
  }

  return users.map((user) => ({
    ...user,
  }));
};

export default users;
