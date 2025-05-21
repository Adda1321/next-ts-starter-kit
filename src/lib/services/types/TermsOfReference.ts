// TermsOfReference.ts interfaces

export interface AddTermsOfReferenceInput {
  shelfId: string;
  meetingDescription: string;
  quorumDecisionMakers: number;
  quorumTotalMembers: number;
  meetingFrequency?: string;
  deliverables: string;
  createdByUserId: string;
}

export interface GetTermsOfReferenceOptions {
  search?: string;
  skip?: number;
  take?: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
}

export interface TermsOfReference {
  id: string;
  shelfId: string;
  meetingDescription: string;
  quorumDecisionMakers: number;
  quorumTotalMembers: number;
  meetingFrequency?: string;
  deliverables: string;
  createdAt: Date;
  updatedAt?: Date;
  createdByUserId: string;
  updatedByUserId?: string;
  deleted: boolean;
  shelf: {
    id: string;
    name?: string;
  };
  members: TORMember[]; // Members of the Terms of Reference
}

// Member interface
export interface TORMember {
  id: string;
  termsOfReferenceId: string;
  userId: string;
  role?: string;
  isDecisionMaker: boolean;
  createdAt: Date;
  createdByUserId: string;
  updatedAt?: Date;
  updatedByUserId?: string;
  deleted: boolean;
}
