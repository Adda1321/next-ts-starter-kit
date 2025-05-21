import {Context} from '@/graphql/v1';

type UserPermissionsArgs = {
  select: Object;
  userId: string;
};

const userPermissionsHandler = async (
  parent: any,
  args: UserPermissionsArgs,
  context: Context,
) => {
  // const {userId, select} = args;

  // return context.prisma.permission.findMany({
  //   where: {
  //     isDeleted: false,
  //     isActive: true,
  //   },
  //   select,
  // });

  return [];
};

export default userPermissionsHandler;
