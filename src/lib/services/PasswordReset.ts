import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendSingleEmail } from '@/src/lib/email-sender/sendSingleEmail';
import {
  currentYear,
  productName,
  templates,
} from '@/src/lib/email-sender/constants';
import { BadRequestError } from '@/src/errors';
import Users from './Users';
import BaseService from './BaseService';
import { AccountStatusList, Prisma, PrismaClient } from '@prisma/client';
import { errorMessages } from '@/constants';

export default class PasswordResetService extends BaseService {
  private usersService: Users;

  constructor(client: PrismaClient, usersService: Users) {
    super(client);
    this.usersService = usersService;
  }

  private async findUserAndToken(resetToken: string) {
    const userAndToken = await this.client.passwordResetToken.findUnique({
      where: { token: resetToken },
      select: {
        token: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            companies: {
              select: {
                companyId: true,
                accountStatus: true,
              },
            },
          },
        },
      },
    });

    if (!userAndToken || !userAndToken.user) {
      throw new BadRequestError(errorMessages.passwordLinkExpired);
    }

    return userAndToken;
  }

  private async updateUserPassword(
    prisma: any,
    userId: string,
    hashedPassword: string,
  ) {
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  private async updateUserStatusOnCompany(
    prisma: any,
    userId: string,
    companyId: string,
  ) {
    await prisma.usersOnCompanies.update({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
      data: {
        accountStatus: AccountStatusList.ACTIVE,
        isActive: true,
      },
    });
  }

  private generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, {
      expiresIn: '30d',
    });
  };

  private verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return null;
      }
    }
    return null;
  }

  private async updatePasswordResetToken(
    prisma: any,
    userId: string,
    token: string | 'invalidateToken',
  ) {
    await prisma.passwordResetToken.deleteMany({
      where: { userId },
    });

    if (token !== 'invalidateToken') {
      await prisma.passwordResetToken.create({
        data: { userId, token },
      });
    }
  }

  private async sendResetPasswordEmail(user: any, origin: string | null) {
    await sendSingleEmail(user.email!, templates.resetUserPasswordTemplateId, {
      name: `${user.firstName} ${user.lastName}`,
      product_name: productName,
      login_url: `${origin}/login`,
      current_year: currentYear,
      change_date: new Date().toLocaleDateString(),
    });
  }

  private async sendGenerateResetTokenEmail(
    userEmail: string,
    firstName: string,
    lastName: string,
    token: string,
    origin: string | null,
  ) {
    const resetPasswordUrl = `${origin}/reset-password/${token}`;
    await sendSingleEmail(userEmail, templates.generateResetTokenTemplateId, {
      name: `${firstName} ${lastName}`,
      action_url: resetPasswordUrl,
      product_name: productName,
      expires_in: process.env.TOKEN_EXPIRATION_TIME,
      current_year: currentYear,
    });
  }

  public async resetPassword(
    resetToken: string,
    hashedPassword: string,
    origin: string | null,
  ) {
    const { token, user } = await this.findUserAndToken(resetToken);
    const { id: userId } = user;

    const decoded = this.verifyToken(token);

    if (!decoded) {
      throw new BadRequestError(errorMessages.passwordLinkExpired);
    }

    await this.client.$transaction(async (tx) => {
      await this.updateUserPassword(tx, userId, hashedPassword);
      await this.updatePasswordResetToken(tx, userId, 'invalidateToken');
    });

    this.sendResetPasswordEmail(user, origin);
  }

  public async generateResetToken(email: string, origin: string | null) {
    const existingUser = await this.usersService.userExists(email);

    if (!existingUser) {
      throw new BadRequestError(errorMessages.userNotFound);
    }

    const allCompaniesInactive =
      existingUser.companies.length > 0 &&
      existingUser.companies.every(
        (company) =>
          !company.isActive ||
          company.accountStatus === AccountStatusList.SUSPENDED ||
          company.accountStatus === AccountStatusList.DEACTIVATED,
      );

    if (allCompaniesInactive) {
      throw new BadRequestError(
        errorMessages.userDeactivatedOrSuspendedOrDisabled,
      );
    }
    if (
      existingUser?.companies?.every(
        (company) =>
          company?.provider &&
          !company.provider.includes('credentials') &&
          !company.provider.includes('okta'),
      )
    ) {
      throw new BadRequestError(errorMessages.credentialsNotEnabled);
    }

    const {
      id: userId,
      email: userEmail,
      firstName,
      lastName,
      passwordResetToken,
    } = existingUser;

    let token = passwordResetToken?.token;

    if (!token) {
      token = this.generateToken(userId);
      await this.updatePasswordResetToken(this.client, userId, token);
    } else {
      const isTokenValid = this.verifyToken(token);
      if (!isTokenValid) {
        token = this.generateToken(userId);
        await this.updatePasswordResetToken(this.client, userId, token);
      }
    }

    await this.sendGenerateResetTokenEmail(
      userEmail,
      firstName,
      lastName,
      token,
      origin,
    );
  }

  public async createUserPassword(
    companyId: string,
    resetToken: string,
    hashedPassword: string,
    origin: string | null,
  ) {
    const { token, user } = await this.findUserAndToken(resetToken);
    const { id: userId } = user;

    const decoded = this.verifyToken(token);

    if (!decoded) {
      throw new BadRequestError(errorMessages.passwordLinkExpired);
    }

    await this.client.$transaction(async (prisma) => {
      await this.updateUserPassword(prisma, userId, hashedPassword);
      await this.updateUserStatusOnCompany(prisma, userId, companyId);
      await this.updatePasswordResetToken(prisma, userId, 'invalidateToken');
    });

    await this.sendResetPasswordEmail(user, origin);
  }
}
