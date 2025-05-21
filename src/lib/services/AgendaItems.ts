import {AgendaItem} from '@/src/lib/services/types';
import BaseService from '@/src/lib/services/BaseService';
import {PrismaClient} from '@prisma/client';
import {Context} from '@/graphql/v1';
import {companyUserResourcePermissionRepository} from '../repositories';
import {AppPermissions, ResourceType} from './enums';

export default class AgendaItems extends BaseService {
  constructor(client: PrismaClient) {
    super(client);
  }

  async getItemsByAgendaId(
    agendaId: string,
    context?: Context,
  ): Promise<AgendaItem[]> {
    const restrictedAgendaItemIds =
      await companyUserResourcePermissionRepository.getRestrictedIds(
        context?.companyId!,
        context?.userId!,
        ResourceType.agendaItem,
        AppPermissions.packsRead,
      );

    const items = await this.client.agendaItem.findMany({
      where: {
        agendaId,
        deleted: false,
      },
      orderBy: {index: 'asc'},
      select: {
        id: true,
        name: true,
        owner: true,
        duration: true,
        type: true,
        agendaId: true,
        parentAgendaItemId: true,
        childAgendaItems: {
          where: {
            deleted: false,
          },
          orderBy: {index: 'asc'},
          select: {
            id: true,
            name: true,
            owner: true,
            duration: true,
            type: true,
            agendaId: true,
            parentAgendaItemId: true,
            index: true,
            createdAt: true,
            updatedAt: true,
            childAgendaItems: {
              where: {
                deleted: false,
              },
              orderBy: {index: 'asc'},
              select: {
                id: true,
                name: true,
                owner: true,
                duration: true,
                type: true,
                agendaId: true,
                parentAgendaItemId: true,
                index: true,
                createdAt: true,
                updatedAt: true,
                childAgendaItems: {
                  where: {
                    deleted: false,
                  },
                  orderBy: {index: 'asc'},
                  select: {
                    id: true,
                    name: true,
                    owner: true,
                    duration: true,
                    type: true,
                    agendaId: true,
                    parentAgendaItemId: true,
                    index: true,
                    createdAt: true,
                    updatedAt: true,
                    childAgendaItems: {
                      where: {
                        deleted: false,
                      },
                      orderBy: {index: 'asc'},
                      select: {
                        id: true,
                        name: true,
                        owner: true,
                        duration: true,
                        type: true,
                        agendaId: true,
                        parentAgendaItemId: true,
                        index: true,
                        createdAt: true,
                        updatedAt: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        index: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (items === null) {
      return [];
    }

    return items.map((item) => this.mapper(item, restrictedAgendaItemIds));
  }

  private mapper(
    agendaItem: any,
    restrictedAgendaItemIds: string[],
  ): AgendaItem {
    if (restrictedAgendaItemIds.includes(agendaItem.id)) {
      return {
        id: agendaItem.id,
        name: agendaItem.name,
        owner: 'ITEM NOT SHARED',
        duration: '',
        type: agendaItem.type,
        agendaId: agendaItem.agendaId,
        parentAgendaItemId: '',
        childAgendaItems: null,
        index: agendaItem.index,
        createdAt: '',
        updatedAt: '',
      };
    }
    return {
      id: agendaItem.id,
      name: agendaItem.name,
      owner: agendaItem.owner,
      duration: agendaItem.duration,
      type: agendaItem.type,
      agendaId: agendaItem.agendaId,
      parentAgendaItemId: agendaItem.parentAgendaItemId,
      childAgendaItems: agendaItem.childAgendaItems,
      index: agendaItem.index,
      createdAt: agendaItem.createdAt,
      updatedAt: agendaItem.updatedAt,
    };
  }
}
