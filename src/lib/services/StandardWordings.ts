import {
  AddStandardWordingInput,
  UpdateStandardWordingInput,
  GetStandardWordingsOptions,
  StandardWording,
} from './types/StandardWording';
import {NotFoundError} from '@/src/errors';
import BaseService from './BaseService';
import {PrismaClient, Prisma} from '@prisma/client';
import {Context} from '@/graphql/v1/context';

export default class StandardWordings extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  private defaultSelect(includeShelf: boolean = true) {
    return {
      id: true,
      shelfId: includeShelf ? true : false,
      agendaItemTitle: true,
      options: true,
      createdAt: true,
      updatedAt: true,
      createdByUserId: true,
      updatedByUserId: true,
      deleted: true,
      shelf: includeShelf
        ? {
            select: {
              id: true,
              name: true,
              description: true,
            },
          }
        : false,
    };
  }

  private mapper(wording: any): StandardWording {
    return {
      id: wording.id,
      shelfId: wording.shelfId || null,
      companyId: wording.companyId || null,
      agendaItemTitle: wording.agendaItemTitle,
      options: wording.options as any[],
      createdAt: wording.createdAt,
      updatedAt: wording.updatedAt,
      createdByUserId: wording.createdByUserId,
      updatedByUserId: wording.updatedByUserId,
      deleted: wording.deleted,
      shelf: wording.shelf || null,
    };
  }

  private toJsonValue(options: any[]): Prisma.InputJsonValue {
    return options as Prisma.InputJsonValue;
  }

  async findById(id: string) {
    const wording = await this.client.standardWording.findUnique({
      where: {id},
      select: this.defaultSelect(true),
    });

    if (!wording || wording.deleted) {
      throw new NotFoundError('Standard wording not found');
    }

    return this.mapper(wording);
  }

  async findByShelf(
    shelfId?: string,
    options?: GetStandardWordingsOptions,
    companyId?: string,
  ) {
    const where: Prisma.StandardWordingWhereInput = {
      deleted: false,
    };

    if (shelfId) {
      where.shelfId = shelfId;
    } else {
      where.shelfId = null;
      where.companyId = companyId;
    }

    if (options?.search) {
      where.options = {
        path: ['$[*].wording'],
        string_contains: options.search,
      };
    }

    const selectFields = shelfId
      ? this.defaultSelect(true)
      : this.defaultSelect(false);

    const wordings = await this.client.standardWording.findMany({
      where,
      skip: options?.skip,
      take: options?.take,
      orderBy: {
        createdAt: 'asc',
      },
      select: selectFields,
    });

    return wordings.map(this.mapper);
  }

  async create(input: AddStandardWordingInput, companyId: string) {
    const {shelfId, agendaItemTitle, options, createdByUserId} = input;

    const data: Prisma.StandardWordingCreateInput = {
      company: {
        connect: {id: companyId},
      },
      agendaItemTitle,
      options: this.toJsonValue(options),
      createdByUserId,
      shelf: shelfId
        ? {
            connect: {id: shelfId},
          }
        : undefined, // If shelfId is not provided, don't include it
    };

    const created = await this.client.standardWording.create({
      data,
      select: shelfId ? this.defaultSelect(true) : this.defaultSelect(false), // If shelfId is present, include it in the select fields
    });

    return this.mapper(created);
  }

  async update(input: UpdateStandardWordingInput) {
    const {id, agendaItemTitle, options, updatedByUserId} = input;

    const existingWording = await this.client.standardWording.findUnique({
      where: {id},
      select: this.defaultSelect(true),
    });

    if (!existingWording || existingWording.deleted) {
      throw new NotFoundError('Standard wording not found');
    }

    const updated = await this.client.standardWording.update({
      where: {id},
      data: {
        ...(agendaItemTitle && {agendaItemTitle}),
        ...(options && {options: this.toJsonValue(options)}),
        updatedByUserId,
      },
      select: this.defaultSelect(true),
    });
    return this.mapper(updated);
  }

  async delete(id: string, updatedByUserId: string) {
    const wording = await this.client.standardWording.findUnique({
      where: {id},
      select: this.defaultSelect(true),
    });

    if (!wording || wording.deleted) {
      throw new NotFoundError('Standard wording not found');
    }

    await this.client.standardWording.update({
      where: {id},
      data: {
        deleted: true,
        updatedByUserId,
      },
    });
  }
}
