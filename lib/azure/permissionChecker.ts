import {PrismaClient} from '@prisma/client';
import {Session} from 'next-auth';

const prisma = new PrismaClient();

export class PermissionChecker {
  static async isAdmin(session: Session | null): Promise<boolean> {
    if (!session?.user?.email) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: {email: session.user.email},
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    return (
      user?.roles.some(
        (userRole) =>
          userRole.role.name === 'ADMIN' ||
          userRole.role.name === 'SUPER_ADMIN',
      ) ?? false
    );
  }
}
