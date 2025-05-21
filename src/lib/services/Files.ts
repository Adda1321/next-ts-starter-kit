import {PrismaClient} from '@prisma/client';
import {File} from '@/src/lib/services/types';
import BaseService from '@/src/lib/services/BaseService';

export default class Files extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  async getFilesByAgendaItemId(
    agendaItemId: string,
    origin: String = '',
  ): Promise<File[]> {
    const uploadedFileLinks = await this.client.agendaItemUploadedFile.findMany(
      {
        where: {
          agendaItemId,
          deleted: false,
          uploadedFile: {
            deleted: false,
          },
        },
        select: {
          uploadedFile: {
            select: {
              id: true,
              name: true,
              extension: true,
              pageCount: true,
            },
          },
        },
      },
    );

    if (uploadedFileLinks === null) {
      return [];
    }

    return uploadedFileLinks.map((link) => this.mapFile(link, origin));
  }

  private mapFile({uploadedFile}: any, origin: String): File {
    return {
      id: uploadedFile.id,
      name: uploadedFile.name,
      extension: uploadedFile.extension,
      url: `${origin}/api/v1/files/${uploadedFile.id}`,
      pageCount: uploadedFile.pageCount,
    };
  }
}
