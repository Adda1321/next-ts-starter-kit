import {TemplateType} from '@prisma/client';

export interface EmailNoticeTemplate {
  id: string;
  companyId: string;
  shelfId?: string | null;
  type: TemplateType;
  subject: string;
  body: string;
  variables: string[];
  useShelfNotice: boolean;
  createdAt: string;
  updatedAt?: string;
  createdByUserId: string;
  updatedByUserId?: string;
}

export interface UpsertEmailNoticeTemplateInput {
  companyId: string;
  shelfId?: string;
  type?: TemplateType;
  subject: string;
  body: string;
  useShelfNotice?: boolean;
}

export interface SendPreviewEmailInput {
  companyId: string;
  shelfId?: string;
  type?: TemplateType;
  email: string;
}
