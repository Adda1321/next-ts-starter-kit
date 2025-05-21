import {Context} from '@/graphql/v1';

type UserRolesArgs = {
  select: any;
  userId: string;
};

const userRolesHandler = async (
  parent: any,
  args: UserRolesArgs,
  context: Context,
) => {
  const {
    userId,
    select: {...roleSelect},
  } = args;

  return context.prisma.role.findMany({
    where: {
      isDeleted: false,
      isActive: true,
      users: {
        some: {
          userId,
        },
      },
    },
    select: {
      ...roleSelect,
    },
  });
};

export default userRolesHandler;
