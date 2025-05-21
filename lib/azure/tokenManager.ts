import {ConfidentialClientApplication} from '@azure/msal-node';
import {PrismaClient} from '@prisma/client';
import {encrypt, decrypt} from './encryption';

export class TokenManager {
  private static prisma = new PrismaClient();

  private static async getClientApplication(tenantId: string) {
    const clientId = process.env.AZURE_AD_CLIENT_ID;
    const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Azure AD client credentials not configured');
    }

    return new ConfidentialClientApplication({
      auth: {
        clientId,
        clientSecret,
        authority: `https://login.microsoftonline.com/${tenantId}`,
      },
    });
  }

  static async getAccessToken(
    tenantId: string,
    companyId: string,
  ): Promise<string> {
    try {
      const storedToken = await this.getStoredToken(tenantId, companyId);

      if (storedToken && this.isTokenValid(storedToken.expiresAt)) {
        return decrypt(storedToken.accessToken);
      }

      const app = await this.getClientApplication(tenantId);

      const result = await app.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default'],
      });

      if (!result?.accessToken) {
        throw new Error('Failed to acquire access token');
      }

      await this.storeToken({
        tenantId,
        companyId,
        accessToken: result.accessToken,
        refreshToken: '',
        expiresIn: result.expiresOn!.getTime() - Date.now(),
      });

      return result.accessToken;
    } catch (error) {
      throw new Error('Failed to get access token');
    }
  }

  private static async getStoredToken(tenantId: string, companyId: string) {
    return await this.prisma.azureToken.findUnique({
      where: {
        tenantId_companyId: {
          tenantId,
          companyId,
        },
      },
    });
  }

  private static async storeToken({
    tenantId,
    companyId,
    accessToken,
    refreshToken,
    expiresIn,
  }: {
    tenantId: string;
    companyId: string;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }) {
    const expiresAt = new Date(Date.now() + expiresIn);

    return await this.prisma.azureToken.upsert({
      where: {
        tenantId_companyId: {
          tenantId,
          companyId,
        },
      },
      update: {
        accessToken: encrypt(accessToken),
        refreshToken: encrypt(refreshToken),
        expiresAt,
        isActive: true,
      },
      create: {
        tenantId,
        companyId,
        accessToken: encrypt(accessToken),
        refreshToken: encrypt(refreshToken),
        expiresAt,
        isActive: true,
      },
    });
  }

  private static isTokenValid(expiresAt: Date): boolean {
    const bufferTime = 5 * 60 * 1000;
    return Date.now() < expiresAt.getTime() - bufferTime;
  }
}
