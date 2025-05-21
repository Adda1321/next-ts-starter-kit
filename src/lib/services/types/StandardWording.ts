export interface WordingVariation {
  text: string;
  label?: string;
  description?: string;
}

export interface StandardWordingOption {
  condition?: string;
  wording: string;
}

export interface StandardWording {
  id: string;
  companyId: string;
  shelfId?: string;
  agendaItemTitle: string;
  options: StandardWordingOption[];
  createdAt: Date;
  updatedAt: Date | null;
  createdByUserId: string;
  updatedByUserId: string | null;
  deleted: boolean;
  shelf?: {
    id: string;
    name: string;
    description: string | null;
  };
}

export interface AddStandardWordingInput {
  shelfId?: string;
  agendaItemTitle: string;
  options: StandardWordingOption[];
  createdByUserId: string;
}

export interface UpdateStandardWordingInput {
  id: string;
  agendaItemTitle?: string;
  options?: StandardWordingOption[];
  updatedByUserId: string;
}

export interface GetStandardWordingsOptions {
  search?: string;
  skip?: number;
  take?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
}
