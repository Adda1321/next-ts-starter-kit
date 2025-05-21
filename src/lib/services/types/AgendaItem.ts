import {AgendaItemType} from '@prisma/client';

export default interface AgendaItem {
  id: String;
  name: String;
  owner: String;
  duration: String;
  type: AgendaItemType;
  agendaId: String;
  parentAgendaItemId: String;
  childAgendaItems?: [AgendaItem] | null;
  index: Number;
  createdAt: String;
  updatedAt: String;
}
