import { errorMessages } from '@/constants';
import { Context } from '@/graphql/v1';
import { NotFoundError } from '@/src/errors';

const me = async (
  parent: any,
  // eslint-disable-next-line no-unused-vars
  { companyId, select: { roles, ...userSelect } }: any,
  context: Context,
) => {
  const user = await context.prisma.user.findUnique({
    where: {
      id: context.userId!,
    },
    select: {
      ...userSelect,
      companies: {
        where: {
          ...(context.companyId && {
            companyId: context.companyId,
          }),
          company: {
            deleted: false
          }
        },
        ...(userSelect.companies.select && {
          select: {
            ...userSelect.companies.select,
          },
        }),
      },
      roles: {
        ...(context.companyId && {
          where: {
            companyId: context.companyId,
          },
        }),
        select: {
          role: roles,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError(errorMessages.userNotFound);
  }

  // eslint-disable-next-line no-unused-vars
  const { ...responseUser } = user;

  return {
    ...responseUser,
    roles: user.roles.map((roleOnUser) => ({
      // @ts-ignore
      ...roleOnUser.role,
    })),
  };
};

export default me;
