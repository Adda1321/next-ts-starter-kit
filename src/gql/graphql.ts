/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  Void: { input: any; output: any; }
};

export enum AccountStatusList {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type ActionItem = {
  __typename?: 'ActionItem';
  actionItem: Scalars['String']['output'];
  actionRef?: Maybe<Scalars['String']['output']>;
  agendaId: Scalars['ID']['output'];
  agendaMinuteId: Scalars['ID']['output'];
  assignees: Array<User>;
  bookcaseName?: Maybe<Scalars['String']['output']>;
  bookshelfId?: Maybe<Scalars['ID']['output']>;
  bookshelfName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  externalAssignees: Array<ExternalAssignee>;
  id: Scalars['ID']['output'];
  meetingName?: Maybe<Scalars['String']['output']>;
  status: ActionItemStatus;
  update?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ActionItemStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type ActionItemUpdate = {
  __typename?: 'ActionItemUpdate';
  content?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['DateTime']['output']>;
};

export type AddAgendaInput = {
  details?: InputMaybe<Scalars['String']['input']>;
  includeActionLog?: InputMaybe<Scalars['Boolean']['input']>;
  index: Scalars['Int']['input'];
  items?: InputMaybe<Array<AddAgendaItemInput>>;
  location?: InputMaybe<Scalars['String']['input']>;
  meetingDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingLink?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shortname?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type AddAgendaItemInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AgendaItemType>;
};

export type AddBookcaseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type AddBookshelfInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type AddCompanyInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type AddPermissionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type AddReviewersToMinutesInput = {
  agendaMinuteId: Scalars['ID']['input'];
  minutesAmendmentNotes: Scalars['String']['input'];
  reviewerIds: Array<Scalars['ID']['input']>;
};

export type AddRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  permissionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type AddSignatureToMinutes = {
  __typename?: 'AddSignatureToMinutes';
  message?: Maybe<Scalars['String']['output']>;
  signature?: Maybe<File>;
};

export type AddStandardWordingInput = {
  agendaItemTitle: Scalars['String']['input'];
  options: Array<StandardWordingOptionInput>;
  shelfId?: InputMaybe<Scalars['ID']['input']>;
};

export type AddUpdateAgendaItemInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  index: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  owner?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AgendaItemType>;
};

export type AddUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  groupId?: InputMaybe<Scalars['ID']['input']>;
  lastName: Scalars['String']['input'];
  provider?: InputMaybe<Scalars['String']['input']>;
  telephone?: InputMaybe<Scalars['String']['input']>;
};

export type AddUsers = {
  __typename?: 'AddUsers';
  createdUsers: Array<User>;
  existingUsers: Array<User>;
};

export type Agenda = {
  __typename?: 'Agenda';
  agendaMinute?: Maybe<AgendaMinute>;
  agendaPublishFile?: Maybe<UploadFile>;
  archived?: Maybe<Scalars['Boolean']['output']>;
  bookshelf?: Maybe<Bookshelf>;
  color?: Maybe<Scalars['String']['output']>;
  companyName?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deleted?: Maybe<Scalars['Boolean']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  highlights?: Maybe<Array<Highlight>>;
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  items?: Maybe<Array<AgendaItem>>;
  location?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  meetingDate?: Maybe<Scalars['DateTime']['output']>;
  meetingLink?: Maybe<Scalars['String']['output']>;
  meetingMinuteTranscription?: Maybe<Array<Maybe<Transcription>>>;
  minutesTemplateVersion?: Maybe<MinutesTemplateVersion>;
  name?: Maybe<Scalars['String']['output']>;
  published?: Maybe<Scalars['Boolean']['output']>;
  shortname?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AgendaAttendee = {
  __typename?: 'AgendaAttendee';
  agendaId?: Maybe<Scalars['String']['output']>;
  attendeeId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<AttendeeStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type AgendaConfiguration = {
  __typename?: 'AgendaConfiguration';
  confidentialityFooter?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  showDate: Scalars['Boolean']['output'];
  showInvitees: Scalars['Boolean']['output'];
  showLocation: Scalars['Boolean']['output'];
  showMeetingDetails: Scalars['Boolean']['output'];
  showMeetingLink: Scalars['Boolean']['output'];
  showTime: Scalars['Boolean']['output'];
  showTitle: Scalars['Boolean']['output'];
};

export type AgendaCreateInput = {
  details?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  items?: InputMaybe<Array<AgendaItemCreateInput>>;
  location?: InputMaybe<Scalars['String']['input']>;
  meetingDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingLink?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shortname?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type AgendaEmailTemplateInput = {
  additionalNotes?: InputMaybe<Scalars['String']['input']>;
  calendarLink?: InputMaybe<Scalars['String']['input']>;
};

export type AgendaItem = {
  __typename?: 'AgendaItem';
  agenda?: Maybe<Agenda>;
  agendaId?: Maybe<Scalars['ID']['output']>;
  childAgendaItems?: Maybe<Array<AgendaItem>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  files?: Maybe<Array<File>>;
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Scalars['String']['output']>;
  parentAgendaItemId?: Maybe<Scalars['ID']['output']>;
  type?: Maybe<AgendaItemType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AgendaItemCreateInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AgendaItemType>;
};

export type AgendaItemFileRequest = {
  __typename?: 'AgendaItemFileRequest';
  AgendaItemFileRequest?: Maybe<AgendaItemFileRequest>;
  agendaItem?: Maybe<AgendaItem>;
  agendaItemFileRequestId?: Maybe<Scalars['String']['output']>;
  agendaItemId?: Maybe<Scalars['String']['output']>;
  approved?: Maybe<Scalars['Boolean']['output']>;
  baseUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  uploadedFile?: Maybe<File>;
  uploadedFileId?: Maybe<Scalars['String']['output']>;
  uploader?: Maybe<User>;
};

export enum AgendaItemType {
  Agenda = 'AGENDA',
  Break = 'BREAK'
}

export type AgendaItemUpdateInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  index: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  parentAgendaItemId?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AgendaItemType>;
};

export type AgendaItemUploadedFile = {
  __typename?: 'AgendaItemUploadedFile';
  agendaItemId: Scalars['String']['output'];
  baseUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['String']['output'];
  isLarge: Scalars['Boolean']['output'];
  uploadedFile?: Maybe<UploadedFile>;
  uploadedFileId: Scalars['String']['output'];
};

export type AgendaMinute = {
  __typename?: 'AgendaMinute';
  agendaId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['String']['output'];
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meetingLanguage?: Maybe<Scalars['String']['output']>;
  minutes?: Maybe<Scalars['JSON']['output']>;
  minutesAmendmentNotes?: Maybe<Scalars['String']['output']>;
  minutesAmendments?: Maybe<Array<Maybe<MinutesAmendment>>>;
  minutesLanguage?: Maybe<Scalars['String']['output']>;
  previousMinutes?: Maybe<Scalars['JSON']['output']>;
  signatureRequestNotes?: Maybe<Scalars['String']['output']>;
  signatures?: Maybe<Array<Maybe<Signature>>>;
  staleData?: Maybe<Scalars['Boolean']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['String']['output']>;
};

export type AgendaUpdateInput = {
  details?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  items?: InputMaybe<Array<AgendaItemUpdateInput>>;
  location?: InputMaybe<Scalars['String']['input']>;
  meetingDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingLink?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  shortname?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export enum AmendmentStatus {
  AmendsRequired = 'AMENDS_REQUIRED',
  Approved = 'APPROVED',
  Resolved = 'RESOLVED'
}

export type AssigneeUser = {
  __typename?: 'AssigneeUser';
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
};

export enum AttendeeStatus {
  Absent = 'ABSENT',
  Chair = 'CHAIR',
  InAttendance = 'IN_ATTENDANCE',
  Present = 'PRESENT'
}

export type AzureAdConfig = {
  __typename?: 'AzureAdConfig';
  clientId: Scalars['String']['output'];
  companyId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  needsSecretUpdate: Scalars['Boolean']['output'];
  redirectUri?: Maybe<Scalars['String']['output']>;
  tenantId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Bookcase = {
  __typename?: 'Bookcase';
  bookshelves?: Maybe<Array<Bookshelf>>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Bookshelf = {
  __typename?: 'Bookshelf';
  agendas?: Maybe<Array<Agenda>>;
  bookcase?: Maybe<Bookcase>;
  color?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  showClientCompanyBranding?: Maybe<Scalars['Boolean']['output']>;
};

export type Company = {
  __typename?: 'Company';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  logo?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  zip?: Maybe<Scalars['String']['output']>;
};

export type CompanyStatistics = {
  __typename?: 'CompanyStatistics';
  activeUsers: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lastLoginTime?: Maybe<Scalars['String']['output']>;
  lastLoginUser?: Maybe<User>;
  name: Scalars['String']['output'];
  totalAgendas: Scalars['Int']['output'];
  totalBookcases: Scalars['Int']['output'];
  totalBookshelves: Scalars['Int']['output'];
  totalMinutes: Scalars['Int']['output'];
};

export type CompnayUserPermission = {
  __typename?: 'CompnayUserPermission';
  hasPermission: Scalars['Boolean']['output'];
  isActive: Scalars['Boolean']['output'];
  permissionId: Scalars['ID']['output'];
  resourceId?: Maybe<Scalars['ID']['output']>;
  resourceType?: Maybe<Scalars['String']['output']>;
};

export type CreateActionItemInput = {
  actionItem: Scalars['String']['input'];
  agendaMinuteId: Scalars['ID']['input'];
  assigneeIds: Array<Scalars['ID']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ActionItemStatus>;
  update?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAzureAdConfigInput = {
  clientId: Scalars['String']['input'];
  clientSecret: Scalars['String']['input'];
  companyId: Scalars['ID']['input'];
  redirectUri?: InputMaybe<Scalars['String']['input']>;
  tenantId: Scalars['String']['input'];
};

export type CreateOktaConfigInput = {
  companyId: Scalars['String']['input'];
  oktaApiToken: Scalars['String']['input'];
  oktaClientId: Scalars['String']['input'];
  oktaClientSecret: Scalars['String']['input'];
  oktaOrgUrl: Scalars['String']['input'];
  organizationDomain: Scalars['String']['input'];
  organizationName: Scalars['String']['input'];
};

export type CreateOktaOidcConfigInput = {
  clientId: Scalars['String']['input'];
  clientSecret: Scalars['String']['input'];
  companyId: Scalars['ID']['input'];
  issuer: Scalars['String']['input'];
  redirectUri?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrUpdateAgendaMinuteInput = {
  agendaId: Scalars['String']['input'];
  minutes: Scalars['JSON']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EmailNoticeTemplate = {
  __typename?: 'EmailNoticeTemplate';
  body: Scalars['String']['output'];
  companyId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  shelfId?: Maybe<Scalars['ID']['output']>;
  subject: Scalars['String']['output'];
  type?: Maybe<TemplateType>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['ID']['output']>;
  useShelfNotice?: Maybe<Scalars['Boolean']['output']>;
  variables?: Maybe<Array<Scalars['String']['output']>>;
};

export type ExternalAssignee = {
  __typename?: 'ExternalAssignee';
  assignedByUserId?: Maybe<Scalars['ID']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ExternalAssigneeInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type ExternalRecipientInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export enum Feedback {
  Approved = 'APPROVED',
  Deleted = 'DELETED',
  Downloaded = 'DOWNLOADED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type File = {
  __typename?: 'File';
  extension: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isLarge: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pageCount?: Maybe<Scalars['Int']['output']>;
  url: Scalars['String']['output'];
};

export type ForwardActionItemInput = {
  actionItemId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
  recipientEmail?: InputMaybe<Scalars['String']['input']>;
  recipientId?: InputMaybe<Scalars['ID']['input']>;
  recipientName?: InputMaybe<Scalars['String']['input']>;
  recipientType: RecipientType;
};

export type ForwardActionItemResponse = {
  __typename?: 'ForwardActionItemResponse';
  success: Scalars['Boolean']['output'];
};

export type ForwardedBy = {
  __typename?: 'ForwardedBy';
  date: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Group = {
  __typename?: 'Group';
  companyId: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  createdByUserId: Scalars['ID']['output'];
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  isSuperGroup: Scalars['Boolean']['output'];
  managers: Array<GroupUser>;
  name: Scalars['String']['output'];
  resourcePermissions?: Maybe<Array<ResourcePermission>>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  updatedByUserId?: Maybe<Scalars['ID']['output']>;
  users: Array<GroupUser>;
};

export type GroupBasic = {
  __typename?: 'GroupBasic';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type GroupInput = {
  autoAddCurrentUserAsAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  companyId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isSuperGroup: Scalars['Boolean']['input'];
  managerIds: Array<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  userIds: Array<Scalars['ID']['input']>;
};

export type GroupUser = {
  __typename?: 'GroupUser';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type GuestActionItem = {
  __typename?: 'GuestActionItem';
  actionItem: Scalars['String']['output'];
  assignee?: Maybe<ExternalAssignee>;
  bookcase?: Maybe<Scalars['String']['output']>;
  bookshelf?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  forwardedBy?: Maybe<ForwardedBy>;
  id: Scalars['ID']['output'];
  meeting?: Maybe<Scalars['String']['output']>;
  meetingDate?: Maybe<Scalars['DateTime']['output']>;
  organization?: Maybe<Scalars['String']['output']>;
  status: ActionItemStatus;
  update?: Maybe<ActionItemUpdate>;
};

export type Highlight = {
  __typename?: 'Highlight';
  comment?: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPublic?: Maybe<Scalars['Boolean']['output']>;
  position: Scalars['String']['output'];
  userId: Scalars['ID']['output'];
};

export enum LogoType {
  CompanyLogo = 'COMPANY_LOGO',
  None = 'NONE',
  ShelfLogo = 'SHELF_LOGO'
}

export type MeetingActionLog = {
  __typename?: 'MeetingActionLog';
  actionItems: Array<Scalars['JSON']['output']>;
  meetingDate: Scalars['String']['output'];
  meetingId: Scalars['ID']['output'];
  meetingName: Scalars['String']['output'];
};

export type MinutesAmendment = {
  __typename?: 'MinutesAmendment';
  agendaMinute?: Maybe<AgendaMinute>;
  agendaMinuteId?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  reviewer?: Maybe<User>;
  reviewerId?: Maybe<Scalars['String']['output']>;
  reviews?: Maybe<Array<Maybe<MinutesAmendmentReview>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['String']['output']>;
};

export type MinutesAmendmentReview = {
  __typename?: 'MinutesAmendmentReview';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  minutesAmendment?: Maybe<MinutesAmendment>;
  minutesAmendmentId?: Maybe<Scalars['ID']['output']>;
  status?: Maybe<AmendmentStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['String']['output']>;
};

export enum MinutesTemplateVersion {
  AgendaItemAboveMinutes = 'AGENDA_ITEM_ABOVE_MINUTES',
  AgendaItemAboveMinutesBordered = 'AGENDA_ITEM_ABOVE_MINUTES_BORDERED',
  AgendaItemLeftMinutes = 'AGENDA_ITEM_LEFT_MINUTES',
  AgendaItemLeftMinutesBordered = 'AGENDA_ITEM_LEFT_MINUTES_BORDERED'
}

export type Minutetranscription = {
  __typename?: 'Minutetranscription';
  agendaId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  transcription: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  activateCompanyUser?: Maybe<Scalars['Void']['output']>;
  activateUser?: Maybe<Scalars['Void']['output']>;
  addAgenda: Agenda;
  addAgendaItemToAgendaItem: AgendaItem;
  addAgendaItemsToAgenda: Array<AgendaItem>;
  addBookcase: Bookcase;
  addBookshelf: Bookshelf;
  addCarryOverActionLog: Response;
  addCompany: Company;
  addCompanyUser?: Maybe<Scalars['Void']['output']>;
  addCompanyUsers?: Maybe<Scalars['Void']['output']>;
  addCompanyWithUser: User;
  addHighlight?: Maybe<Highlight>;
  addMinutesTemplateVersion: Agenda;
  addPermission?: Maybe<Permission>;
  addReviewToMinutesAmendment: MinutesAmendment;
  addReviewersToMinutes: AgendaMinute;
  addRole?: Maybe<Role>;
  addRolePermissions?: Maybe<Array<Scalars['ID']['output']>>;
  addSignatureToMinutes?: Maybe<AddSignatureToMinutes>;
  addStandardWording: StandardWording;
  addUser: User;
  addUserRoles?: Maybe<Array<Scalars['ID']['output']>>;
  addUsers: AddUsers;
  archiveAgenda: Agenda;
  calendarEmail: EmailResponse;
  changePassword?: Maybe<Scalars['Void']['output']>;
  cloneAgenda: Agenda;
  createAzureAdConfig: AzureAdConfig;
  createGroup: Group;
  createOktaConfig: OktaConfig;
  createOktaOidcConfig: OktaOidcConfig;
  createOrUpdateAgendaMinute: AgendaMinute;
  createTermsOfReference?: Maybe<Scalars['String']['output']>;
  createUserPassword?: Maybe<Scalars['Void']['output']>;
  deactivateCompanyUser?: Maybe<Scalars['Void']['output']>;
  deactivateUser?: Maybe<Scalars['Void']['output']>;
  deleteActionItem: Scalars['Boolean']['output'];
  deleteAgenda: Scalars['ID']['output'];
  deleteAgendaItem: Scalars['ID']['output'];
  deleteAgendaItemFile: Scalars['ID']['output'];
  deleteAgendaMinute: AgendaMinute;
  deleteBookcase: Scalars['ID']['output'];
  deleteBookshelf: Scalars['ID']['output'];
  deleteCompany?: Maybe<Scalars['String']['output']>;
  deleteCompanyUser?: Maybe<Scalars['Void']['output']>;
  deleteGroup: Group;
  deleteMinutesAndTranscript?: Maybe<Scalars['Void']['output']>;
  deleteOktaConfig: Scalars['Boolean']['output'];
  deleteOktaOidcConfig: Scalars['Boolean']['output'];
  deletePermission?: Maybe<Scalars['Void']['output']>;
  deleteRole: Scalars['ID']['output'];
  deleteStandardWording: Scalars['ID']['output'];
  deleteTranscript?: Maybe<Scalars['ID']['output']>;
  downloadMinutesAsWord: Scalars['String']['output'];
  forwardActionItem: ForwardActionItemResponse;
  generateMinutesFromCustomPrompt: Scalars['String']['output'];
  generateResetToken?: Maybe<Scalars['Void']['output']>;
  provisionOktaUser: OktaOperationResult;
  publishAgenda: PublishAgenda;
  reInviteUser: Scalars['String']['output'];
  removeAllHighlights: Array<Maybe<Highlight>>;
  removeBookshelfLogo: Bookshelf;
  removeCompanyLogo: Company;
  removeCompanyUser?: Maybe<Scalars['Void']['output']>;
  removeHighlight?: Maybe<Highlight>;
  removeRolePermissions?: Maybe<Array<Scalars['ID']['output']>>;
  removeUserRoles?: Maybe<Array<Scalars['ID']['output']>>;
  requestAgendaItemFile?: Maybe<Scalars['Void']['output']>;
  requestEmail: EmailResponse;
  requestSignatureForMinutes?: Maybe<RequestSignatureForMinutes>;
  resetUserPassword?: Maybe<Scalars['Void']['output']>;
  resolveMinutesAmendment: MinutesAmendmentReview;
  sendActionItems: SendActionItemsResponse;
  sendOktaVerification: OktaOperationResult;
  sendPreviewEmail: SendPreviewEmailResponse;
  updateAgenda: Agenda;
  updateAgendaConfiguration: AgendaConfiguration;
  updateAgendaItem: AgendaItem;
  updateAttendeeStatus?: Maybe<UpdatedAttendeeResponse>;
  updateAttendees?: Maybe<UpdatedAttendeesResponse>;
  updateAzureAdConfig: AzureAdConfig;
  updateBookcase: Bookcase;
  updateBookshelf: Bookshelf;
  updateCompany: Company;
  updateGroup: Group;
  updateGuestActionItem: Scalars['Boolean']['output'];
  updateHighlight?: Maybe<Highlight>;
  updateHighlightVisibility?: Maybe<Highlight>;
  updateLastSignIn?: Maybe<Scalars['ID']['output']>;
  updateOktaConfig: OktaConfig;
  updateOktaOidcConfig: OktaOidcConfig;
  updateOriginalMinutes: AgendaMinute;
  updatePermission?: Maybe<Permission>;
  updateRole?: Maybe<Role>;
  updateStandardWording: StandardWording;
  updateUser: User;
  updateUserAccountStatus: User;
  uploadAgendaItemFile: Array<File>;
  uploadAgendaItemRequestedFile: Array<File>;
  upsertActionItem: ActionItem;
  upsertCompanyUserResourcePermission?: Maybe<Scalars['Void']['output']>;
  upsertCompanyUserShelfPermission?: Maybe<Scalars['Void']['output']>;
  upsertEmailNoticeTemplate: EmailNoticeTemplate;
  upsertGroupResourcePermissions: Group;
  upsertRestrictedAgendaResourcePermission: UpsertResponse;
  welcomeEmail: EmailResponse;
};


export type MutationActivateCompanyUserArgs = {
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationActivateUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationAddAgendaArgs = {
  bookshelfId: Scalars['ID']['input'];
  data: AddAgendaInput;
};


export type MutationAddAgendaItemToAgendaItemArgs = {
  agendaItemId: Scalars['ID']['input'];
  data: AddAgendaItemInput;
};


export type MutationAddAgendaItemsToAgendaArgs = {
  agendaId: Scalars['ID']['input'];
  data: Array<AddAgendaItemInput>;
};


export type MutationAddBookcaseArgs = {
  companyId: Scalars['ID']['input'];
  data: AddBookcaseInput;
};


export type MutationAddBookshelfArgs = {
  bookcaseId: Scalars['ID']['input'];
  data: AddBookshelfInput;
};


export type MutationAddCarryOverActionLogArgs = {
  agendaId: Scalars['ID']['input'];
  bookshelfId: Scalars['ID']['input'];
};


export type MutationAddCompanyArgs = {
  data: AddCompanyInput;
};


export type MutationAddCompanyUserArgs = {
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationAddCompanyUsersArgs = {
  companyId: Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']>;
};


export type MutationAddCompanyWithUserArgs = {
  companyId: Scalars['ID']['input'];
  companyInput: AddCompanyInput;
  password?: InputMaybe<Scalars['String']['input']>;
  userInput: AddUserInput;
};


export type MutationAddHighlightArgs = {
  agendaId: Scalars['ID']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  position: Scalars['String']['input'];
};


export type MutationAddMinutesTemplateVersionArgs = {
  agendaId: Scalars['ID']['input'];
  templateVersion: MinutesTemplateVersion;
};


export type MutationAddPermissionArgs = {
  data: AddPermissionInput;
};


export type MutationAddReviewToMinutesAmendmentArgs = {
  comment: Scalars['String']['input'];
  minutesAmendmentId: Scalars['ID']['input'];
};


export type MutationAddReviewersToMinutesArgs = {
  data?: InputMaybe<AddReviewersToMinutesInput>;
};


export type MutationAddRoleArgs = {
  data: AddRoleInput;
};


export type MutationAddRolePermissionsArgs = {
  id: Scalars['ID']['input'];
  permissionIds: Array<Scalars['ID']['input']>;
};


export type MutationAddSignatureToMinutesArgs = {
  agendaMinuteId: Scalars['ID']['input'];
  signatureFile: UploadFileInput;
  signedAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type MutationAddStandardWordingArgs = {
  data: AddStandardWordingInput;
};


export type MutationAddUserArgs = {
  companyId: Scalars['ID']['input'];
  isSaveAndExit?: InputMaybe<Scalars['Boolean']['input']>;
  user: AddUserInput;
};


export type MutationAddUserRolesArgs = {
  roleIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  userId: Scalars['ID']['input'];
};


export type MutationAddUsersArgs = {
  companyId: Scalars['ID']['input'];
  users: Array<AddUserInput>;
};


export type MutationArchiveAgendaArgs = {
  agendaId: Scalars['ID']['input'];
};


export type MutationCalendarEmailArgs = {
  data: CalendarEmailInput;
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCloneAgendaArgs = {
  agendaId: Scalars['ID']['input'];
  bookshelfId: Scalars['ID']['input'];
};


export type MutationCreateAzureAdConfigArgs = {
  data: CreateAzureAdConfigInput;
};


export type MutationCreateGroupArgs = {
  input: GroupInput;
};


export type MutationCreateOktaConfigArgs = {
  data: CreateOktaConfigInput;
};


export type MutationCreateOktaOidcConfigArgs = {
  data: CreateOktaOidcConfigInput;
};


export type MutationCreateOrUpdateAgendaMinuteArgs = {
  data: CreateOrUpdateAgendaMinuteInput;
};


export type MutationCreateTermsOfReferenceArgs = {
  data: TermsOfReferenceInput;
};


export type MutationCreateUserPasswordArgs = {
  companyId: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};


export type MutationDeactivateCompanyUserArgs = {
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeactivateUserArgs = {
  userId: Scalars['ID']['input'];
};


export type MutationDeleteActionItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAgendaArgs = {
  agendaId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
  sendNotification?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationDeleteAgendaItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteAgendaItemFileArgs = {
  agendaItemId: Scalars['ID']['input'];
  fileId: Scalars['ID']['input'];
};


export type MutationDeleteAgendaMinuteArgs = {
  agendaMinuteId: Scalars['ID']['input'];
};


export type MutationDeleteBookcaseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteBookshelfArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteCompanyUserArgs = {
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMinutesAndTranscriptArgs = {
  agendaId: Scalars['ID']['input'];
};


export type MutationDeleteOktaConfigArgs = {
  companyId: Scalars['ID']['input'];
};


export type MutationDeleteOktaOidcConfigArgs = {
  companyId: Scalars['ID']['input'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStandardWordingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTranscriptArgs = {
  agendaId: Scalars['ID']['input'];
};


export type MutationDownloadMinutesAsWordArgs = {
  file: UploadFileInput;
};


export type MutationForwardActionItemArgs = {
  input: ForwardActionItemInput;
};


export type MutationGenerateMinutesFromCustomPromptArgs = {
  agendaId: Scalars['ID']['input'];
  prompt: Scalars['String']['input'];
};


export type MutationGenerateResetTokenArgs = {
  email: Scalars['String']['input'];
};


export type MutationProvisionOktaUserArgs = {
  data: ProvisionOktaUserInput;
};


export type MutationPublishAgendaArgs = {
  agendaId: Scalars['String']['input'];
  attendeesId: Array<Scalars['ID']['input']>;
  companyId: Scalars['ID']['input'];
  file: UploadFileInput;
  guestIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  logoType: LogoType;
  meetingDetails?: InputMaybe<AgendaEmailTemplateInput>;
  noticeType: Scalars['String']['input'];
  sendNotification: Scalars['Boolean']['input'];
};


export type MutationReInviteUserArgs = {
  companyId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
  isSystemAdmin?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationRemoveAllHighlightsArgs = {
  agendaId: Scalars['ID']['input'];
};


export type MutationRemoveBookshelfLogoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCompanyLogoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCompanyUserArgs = {
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationRemoveHighlightArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveRolePermissionsArgs = {
  id: Scalars['ID']['input'];
  permissionIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveUserRolesArgs = {
  roleIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  userId: Scalars['ID']['input'];
};


export type MutationRequestAgendaItemFileArgs = {
  agendaItemId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  requesteeIds: Array<Scalars['ID']['input']>;
};


export type MutationRequestEmailArgs = {
  data: RequestEmailInput;
};


export type MutationRequestSignatureForMinutesArgs = {
  agendaMinuteId: Scalars['ID']['input'];
  sendNotification: Scalars['Boolean']['input'];
  signatories: Array<Scalars['String']['input']>;
  signatureRequestNotes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResetUserPasswordArgs = {
  newPassword: Scalars['String']['input'];
  resetToken: Scalars['String']['input'];
};


export type MutationResolveMinutesAmendmentArgs = {
  minutesAmendmentReviewId: Scalars['ID']['input'];
};


export type MutationSendActionItemsArgs = {
  input: SendActionItemsInput;
};


export type MutationSendOktaVerificationArgs = {
  email: Scalars['String']['input'];
};


export type MutationSendPreviewEmailArgs = {
  input: SendPreviewEmailInput;
};


export type MutationUpdateAgendaArgs = {
  data: UpdateAgendaInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateAgendaConfigurationArgs = {
  bookshelfId: Scalars['ID']['input'];
  configuration: UpdateAgendaConfigurationInput;
};


export type MutationUpdateAgendaItemArgs = {
  data: UpdateAgendaItemInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateAttendeeStatusArgs = {
  agendaId: Scalars['ID']['input'];
  attendeeId: Scalars['ID']['input'];
  status: AttendeeStatus;
};


export type MutationUpdateAttendeesArgs = {
  addOnly?: InputMaybe<Scalars['Boolean']['input']>;
  agendaId: Scalars['ID']['input'];
  attendeesId: Array<Scalars['ID']['input']>;
  bookshelfId: Scalars['ID']['input'];
  existingIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  guestIds: Array<Scalars['ID']['input']>;
};


export type MutationUpdateAzureAdConfigArgs = {
  data: UpdateAzureAdConfigInput;
};


export type MutationUpdateBookcaseArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateBookshelfArgs = {
  data: UpdateBookshelfInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateCompanyArgs = {
  data: UpdateCompanyInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateGroupArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGroupInput;
};


export type MutationUpdateGuestActionItemArgs = {
  id: Scalars['ID']['input'];
  input: UpdateGuestActionItemInput;
};


export type MutationUpdateHighlightArgs = {
  comment?: InputMaybe<Scalars['JSON']['input']>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
};


export type MutationUpdateHighlightVisibilityArgs = {
  highlightId: Scalars['ID']['input'];
  isPublic: Scalars['Boolean']['input'];
};


export type MutationUpdateLastSignInArgs = {
  companyId: Scalars['ID']['input'];
};


export type MutationUpdateOktaConfigArgs = {
  data: UpdateOktaConfigInput;
};


export type MutationUpdateOktaOidcConfigArgs = {
  data: UpdateOktaOidcConfigInput;
};


export type MutationUpdateOriginalMinutesArgs = {
  data: CreateOrUpdateAgendaMinuteInput;
};


export type MutationUpdatePermissionArgs = {
  data: UpdatePermissionInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateRoleArgs = {
  data: UpdateRoleInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateStandardWordingArgs = {
  data: UpdateStandardWordingInput;
};


export type MutationUpdateUserArgs = {
  companyId: Scalars['ID']['input'];
  user: AddUserInput;
  userId: Scalars['ID']['input'];
};


export type MutationUpdateUserAccountStatusArgs = {
  accountStatus: Scalars['String']['input'];
};


export type MutationUploadAgendaItemFileArgs = {
  agendaItemId: Scalars['ID']['input'];
  files: Array<UploadFileInput>;
};


export type MutationUploadAgendaItemRequestedFileArgs = {
  agendaItemFileRequestId: Scalars['ID']['input'];
  agendaItemId: Scalars['ID']['input'];
  files: Array<UploadFileInput>;
};


export type MutationUpsertActionItemArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: UpsertActionItemInput;
};


export type MutationUpsertCompanyUserResourcePermissionArgs = {
  assignedRoles?: InputMaybe<Array<Scalars['ID']['input']>>;
  companyId: Scalars['ID']['input'];
  removedRoles?: InputMaybe<Array<Scalars['ID']['input']>>;
  resourcePermissions?: InputMaybe<Array<ResourcePermissionInput>>;
  userId: Scalars['ID']['input'];
};


export type MutationUpsertCompanyUserShelfPermissionArgs = {
  companyId: Scalars['ID']['input'];
  resourceId: Scalars['ID']['input'];
  shelfPermissions?: InputMaybe<Array<ShelfPermissionInput>>;
};


export type MutationUpsertEmailNoticeTemplateArgs = {
  input: UpsertEmailNoticeTemplateInput;
};


export type MutationUpsertGroupResourcePermissionsArgs = {
  groupId: Scalars['ID']['input'];
  resourcePermissions: Array<ResourcePermissionInput>;
};


export type MutationUpsertRestrictedAgendaResourcePermissionArgs = {
  companyId: Scalars['String']['input'];
  resourcePermissions: Array<RestrictedResourcePermissionInput>;
  userId: Scalars['String']['input'];
};


export type MutationWelcomeEmailArgs = {
  data: WelcomeEmailInput;
};

export type OktaConfig = {
  __typename?: 'OktaConfig';
  company?: Maybe<Company>;
  companyId: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  needsTokenUpdate?: Maybe<Scalars['Boolean']['output']>;
  oktaClientId: Scalars['String']['output'];
  oktaOrgUrl: Scalars['String']['output'];
  organizationDomain: Scalars['String']['output'];
  organizationName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OktaOidcConfig = {
  __typename?: 'OktaOidcConfig';
  clientId: Scalars['String']['output'];
  companyId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  issuer: Scalars['String']['output'];
  needsSecretUpdate?: Maybe<Scalars['Boolean']['output']>;
  redirectUri?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OktaOperationResult = {
  __typename?: 'OktaOperationResult';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type OktaUser = {
  __typename?: 'OktaUser';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  oktaVerified?: Maybe<Scalars['Boolean']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};

export type OrderByClause = {
  direction: SortDirection;
  field: Scalars['String']['input'];
};

export type Permission = {
  __typename?: 'Permission';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ProvisionOktaUserInput = {
  companyId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type PublishAgenda = {
  __typename?: 'PublishAgenda';
  message: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  actionItems: Array<ActionItem>;
  agenda?: Maybe<Agenda>;
  agendaAttendee?: Maybe<Array<AgendaAttendee>>;
  agendaItem: AgendaItem;
  agendaItemRequestedFiles?: Maybe<Array<AgendaItemFileRequest>>;
  agendaItemUploadedFiles?: Maybe<Array<File>>;
  agendaItemsByAgendaId?: Maybe<Array<AgendaItem>>;
  agendaItemsByAgendaItemId?: Maybe<Array<AgendaItem>>;
  agendaMinute?: Maybe<AgendaMinute>;
  agendaMinuteByAgendaId?: Maybe<AgendaMinute>;
  agendas?: Maybe<Array<Agenda>>;
  agendasV2?: Maybe<Array<Agenda>>;
  agendasWithPermissions?: Maybe<Array<Agenda>>;
  allBookcases?: Maybe<Array<Bookcase>>;
  authorizedBookcasesByRole?: Maybe<Array<Bookcase>>;
  authorizedCompanyUsers?: Maybe<Array<User>>;
  bookcase: Bookcase;
  bookcases?: Maybe<Array<Bookcase>>;
  bookshelf: Bookshelf;
  bookshelves?: Maybe<Array<Bookshelf>>;
  companies?: Maybe<Array<Company>>;
  company: Company;
  companyStatistics: Array<CompanyStatistics>;
  companyUserResourcePermissions?: Maybe<Array<ResourcePermission>>;
  companyUsers?: Maybe<Array<User>>;
  fetchCompanyUsersWithAgendaPermissions?: Maybe<Array<UserWrapper>>;
  getActionLogsForBookshelf: Array<MeetingActionLog>;
  getAgendaConfiguration?: Maybe<AgendaConfiguration>;
  getAzureAdConfig?: Maybe<AzureAdConfig>;
  getCarryOverActionItems: Array<ActionItem>;
  getEmailNoticeTemplate?: Maybe<EmailNoticeTemplate>;
  getGuestActionItem?: Maybe<GuestActionItem>;
  getOktaConfig?: Maybe<OktaConfig>;
  getOktaOidcConfig?: Maybe<OktaOidcConfig>;
  getOktaUsers?: Maybe<Array<OktaUser>>;
  group?: Maybe<Group>;
  groupBookcases: Array<Bookcase>;
  groupResourcePermissions: Array<ResourcePermission>;
  groups: Array<Group>;
  isUserAttendee: Response;
  me: User;
  minuteSignatures?: Maybe<Array<Maybe<Signature>>>;
  minutesToAmend: MinutesAmendment;
  permission: Permission;
  permissions?: Maybe<Array<Permission>>;
  role: Role;
  roles?: Maybe<Array<Role>>;
  standardWording?: Maybe<StandardWording>;
  standardWordings: Array<StandardWording>;
  termsOfReference: Array<TermsOfReference>;
  userActions: Array<ActionItem>;
  userGroups: Array<GroupBasic>;
  userPermissions?: Maybe<Array<Permission>>;
  userRoles?: Maybe<Array<Role>>;
  users?: Maybe<Array<User>>;
  usersByCompany: Array<UserWrapper>;
  usersInManagedGroups: Array<User>;
  version: Scalars['String']['output'];
};


export type QueryActionItemsArgs = {
  agendaMinuteId: Scalars['ID']['input'];
};


export type QueryAgendaArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryAgendaAttendeeArgs = {
  agendaId: Scalars['ID']['input'];
};


export type QueryAgendaItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAgendaItemRequestedFilesArgs = {
  agendaItemId: Scalars['ID']['input'];
  orderBy?: InputMaybe<Array<OrderByClause>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAgendaItemUploadedFilesArgs = {
  agendaItemId: Scalars['ID']['input'];
  orderBy?: InputMaybe<Array<OrderByClause>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAgendaItemsByAgendaIdArgs = {
  agendaId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAgendaItemsByAgendaItemIdArgs = {
  agendaItemId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAgendaMinuteArgs = {
  agendaMinuteId: Scalars['ID']['input'];
};


export type QueryAgendaMinuteByAgendaIdArgs = {
  agendaId: Scalars['ID']['input'];
};


export type QueryAgendasArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  companyId: Scalars['String']['input'];
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  query?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAgendasV2Args = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  bookshelfId: Scalars['ID']['input'];
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAgendasWithPermissionsArgs = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  companyId: Scalars['String']['input'];
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  orderBy?: InputMaybe<Array<OrderByClause>>;
  query?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAllBookcasesArgs = {
  companyId: Scalars['ID']['input'];
  orderBy?: InputMaybe<Array<OrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAuthorizedBookcasesByRoleArgs = {
  companyId: Scalars['ID']['input'];
  orderBy?: InputMaybe<Array<OrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAuthorizedCompanyUsersArgs = {
  companyId: Scalars['ID']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBookcaseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookcasesArgs = {
  companyId: Scalars['ID']['input'];
  orderBy?: InputMaybe<Array<OrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryBookshelfArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBookshelvesArgs = {
  bookcaseId: Scalars['ID']['input'];
  orderBy?: InputMaybe<Array<OrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCompaniesArgs = {
  orderBy?: InputMaybe<Array<OrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCompanyUserResourcePermissionsArgs = {
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryCompanyUsersArgs = {
  companyId: Scalars['ID']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryFetchCompanyUsersWithAgendaPermissionsArgs = {
  agendaId: Scalars['ID']['input'];
  agendaItemIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  companyId: Scalars['ID']['input'];
};


export type QueryGetActionLogsForBookshelfArgs = {
  bookshelfId: Scalars['ID']['input'];
};


export type QueryGetAgendaConfigurationArgs = {
  bookshelfId: Scalars['ID']['input'];
};


export type QueryGetAzureAdConfigArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryGetCarryOverActionItemsArgs = {
  agendaId: Scalars['ID']['input'];
};


export type QueryGetEmailNoticeTemplateArgs = {
  companyId: Scalars['ID']['input'];
  shelfId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<TemplateType>;
};


export type QueryGetGuestActionItemArgs = {
  actionItemId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
};


export type QueryGetOktaConfigArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryGetOktaOidcConfigArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryGetOktaUsersArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryGroupArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGroupBookcasesArgs = {
  companyId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
  orderBy?: InputMaybe<Array<OrderByClause>>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGroupResourcePermissionsArgs = {
  groupId: Scalars['ID']['input'];
};


export type QueryGroupsArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryIsUserAttendeeArgs = {
  agendaId: Scalars['String']['input'];
};


export type QueryMeArgs = {
  companyId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMinuteSignaturesArgs = {
  agendaMinuteId: Scalars['ID']['input'];
};


export type QueryPermissionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStandardWordingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStandardWordingsArgs = {
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  shelfId?: InputMaybe<Scalars['ID']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTermsOfReferenceArgs = {
  orderBy?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  shelfId: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUserActionsArgs = {
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type QueryUserGroupsArgs = {
  companyId: Scalars['ID']['input'];
};


export type QueryUserPermissionsArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUserRolesArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryUsersByCompanyArgs = {
  companyId: Scalars['ID']['input'];
  getAllUsers?: InputMaybe<Scalars['Boolean']['input']>;
  shelfId: Scalars['ID']['input'];
};


export type QueryUsersInManagedGroupsArgs = {
  companyId: Scalars['ID']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type RecipientInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type: RecipientType;
};

export enum RecipientType {
  External = 'external',
  Internal = 'internal'
}

export type RequestSignatureForMinutes = {
  __typename?: 'RequestSignatureForMinutes';
  message?: Maybe<Scalars['String']['output']>;
};

export type ResourcePermission = {
  __typename?: 'ResourcePermission';
  includedPermissionIds?: Maybe<Array<Scalars['String']['output']>>;
  resourceId: Scalars['ID']['output'];
  resourceType: ResourceType;
};

export type ResourcePermissionInput = {
  includedPermissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  resourceId: Scalars['ID']['input'];
  resourceType: ResourceType;
};

export enum ResourceType {
  Agenda = 'AGENDA',
  AgendaItem = 'AGENDA_ITEM',
  Bookcase = 'BOOKCASE',
  Bookshelf = 'BOOKSHELF'
}

export type Response = {
  __typename?: 'Response';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RestrictedResourcePermissionInput = {
  hasPermission: Scalars['Boolean']['input'];
  includedPermissionId: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};

export type Role = {
  __typename?: 'Role';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
};

export type SendActionItemsInput = {
  agendaMinuteId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
};

export type SendActionItemsResponse = {
  __typename?: 'SendActionItemsResponse';
  message?: Maybe<Scalars['String']['output']>;
  results?: Maybe<SendActionItemsResults>;
  success: Scalars['Boolean']['output'];
};

export type SendActionItemsResults = {
  __typename?: 'SendActionItemsResults';
  errors?: Maybe<Array<Scalars['String']['output']>>;
  failed: Scalars['Int']['output'];
  sent: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SendPreviewEmailInput = {
  companyId: Scalars['String']['input'];
  email: Scalars['String']['input'];
  shelfId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type SendPreviewEmailResponse = {
  __typename?: 'SendPreviewEmailResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type ShelfPermissionInput = {
  excludedPermissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  includedPermissionIds?: InputMaybe<Array<Scalars['String']['input']>>;
  userId: Scalars['ID']['input'];
};

export type Signature = {
  __typename?: 'Signature';
  agendaMinute?: Maybe<AgendaMinute>;
  agendaMinuteId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  signatoryId?: Maybe<Scalars['String']['output']>;
  signatureUploadFile?: Maybe<SignatureUploadFile>;
  signed?: Maybe<Scalars['Boolean']['output']>;
  signedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type SignatureUploadFile = {
  __typename?: 'SignatureUploadFile';
  baseUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  signatureId?: Maybe<Scalars['String']['output']>;
  uploadedFileId?: Maybe<Scalars['String']['output']>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StandardWording = {
  __typename?: 'StandardWording';
  agendaItemTitle: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['ID']['output'];
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  options: Array<StandardWordingOption>;
  shelf?: Maybe<Bookshelf>;
  shelfId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['ID']['output']>;
};

export type StandardWordingOption = {
  __typename?: 'StandardWordingOption';
  condition?: Maybe<Scalars['String']['output']>;
  wording: Scalars['String']['output'];
};

export type StandardWordingOptionInput = {
  condition: Scalars['String']['input'];
  wording: Scalars['String']['input'];
};

export type TorMember = {
  __typename?: 'TORMember';
  id: Scalars['ID']['output'];
  isDecisionMaker: Scalars['Boolean']['output'];
  role?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type TorMemberInput = {
  id: Scalars['String']['input'];
  isDecisionMaker: Scalars['Boolean']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  role: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export enum TemplateType {
  AgendaNotice = 'AGENDA_NOTICE'
}

export type TermsOfReference = {
  __typename?: 'TermsOfReference';
  agendaItemTitle?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdByUserId: Scalars['ID']['output'];
  deleted: Scalars['Boolean']['output'];
  deliverables?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  meetingDescription?: Maybe<Scalars['String']['output']>;
  meetingFrequency?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<TorMember>>;
  quorumDecisionMakers: Scalars['Int']['output'];
  quorumTotalMembers: Scalars['Int']['output'];
  shelf: Bookshelf;
  shelfId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  updatedByUserId?: Maybe<Scalars['ID']['output']>;
};

export type TermsOfReferenceInput = {
  deliverables?: InputMaybe<Scalars['String']['input']>;
  meetingDescription?: InputMaybe<Scalars['String']['input']>;
  meetingFrequency?: InputMaybe<Scalars['String']['input']>;
  members: Array<TorMemberInput>;
  quorumDecisionMakers?: InputMaybe<Scalars['Int']['input']>;
  quorumTotalMembers?: InputMaybe<Scalars['Int']['input']>;
  shelfId: Scalars['String']['input'];
};

export type Transcription = {
  __typename?: 'Transcription';
  agendaId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  transcription?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UpdateActionItemInput = {
  actionItem?: InputMaybe<Scalars['String']['input']>;
  assigneeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ActionItemStatus>;
  update?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAgendaConfigurationInput = {
  confidentialityFooter?: InputMaybe<Scalars['String']['input']>;
  showDate?: InputMaybe<Scalars['Boolean']['input']>;
  showInvitees?: InputMaybe<Scalars['Boolean']['input']>;
  showLocation?: InputMaybe<Scalars['Boolean']['input']>;
  showMeetingDetails?: InputMaybe<Scalars['Boolean']['input']>;
  showMeetingLink?: InputMaybe<Scalars['Boolean']['input']>;
  showTime?: InputMaybe<Scalars['Boolean']['input']>;
  showTitle?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateAgendaInput = {
  details?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  items?: InputMaybe<Array<AddUpdateAgendaItemInput>>;
  location?: InputMaybe<Scalars['String']['input']>;
  meetingDate?: InputMaybe<Scalars['DateTime']['input']>;
  meetingLink?: InputMaybe<Scalars['String']['input']>;
  minutesTemplateVersion?: InputMaybe<MinutesTemplateVersion>;
  name: Scalars['String']['input'];
  shortname?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAgendaItemInput = {
  duration?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  parentAgendaItemId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<AgendaItemType>;
};

export type UpdateAzureAdConfigInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  companyId: Scalars['ID']['input'];
  redirectUri?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBookcaseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type UpdateBookshelfInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<UploadFileInput>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  showClientCompanyBranding?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateCompanyInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  file?: InputMaybe<UploadFileInput>;
  logo?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  state?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateGroupInput = {
  autoAddCurrentUserAsAdmin?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isSuperGroup?: InputMaybe<Scalars['Boolean']['input']>;
  managerIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateGuestActionItemInput = {
  closeItem: Scalars['Boolean']['input'];
  email: Scalars['String']['input'];
  update: Scalars['String']['input'];
};

export type UpdateOktaConfigInput = {
  companyId: Scalars['String']['input'];
  oktaApiToken?: InputMaybe<Scalars['String']['input']>;
  oktaClientId?: InputMaybe<Scalars['String']['input']>;
  oktaClientSecret?: InputMaybe<Scalars['String']['input']>;
  oktaOrgUrl?: InputMaybe<Scalars['String']['input']>;
  organizationDomain?: InputMaybe<Scalars['String']['input']>;
  organizationName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOktaOidcConfigInput = {
  clientId?: InputMaybe<Scalars['String']['input']>;
  clientSecret?: InputMaybe<Scalars['String']['input']>;
  companyId: Scalars['ID']['input'];
  issuer?: InputMaybe<Scalars['String']['input']>;
  redirectUri?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePermissionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStandardWordingInput = {
  agendaItemTitle?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  options?: InputMaybe<Array<StandardWordingOptionInput>>;
};

export type UpdatedAttendeeResponse = {
  __typename?: 'UpdatedAttendeeResponse';
  attendee?: Maybe<AgendaAttendee>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatedAttendeesResponse = {
  __typename?: 'UpdatedAttendeesResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UploadFile = {
  __typename?: 'UploadFile';
  agendaId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdByUserId?: Maybe<Scalars['String']['output']>;
  uploadedFileId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type UploadFileInput = {
  base64Content: Scalars['String']['input'];
  extension: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UploadedFile = {
  __typename?: 'UploadedFile';
  name?: Maybe<Scalars['String']['output']>;
};

export type UpsertActionItemInput = {
  actionItem: Scalars['String']['input'];
  agendaMinuteId: Scalars['ID']['input'];
  assigneeIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  externalAssignees?: InputMaybe<Array<ExternalAssigneeInput>>;
  status?: InputMaybe<ActionItemStatus>;
  update?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertEmailNoticeTemplateInput = {
  body: Scalars['String']['input'];
  companyId: Scalars['ID']['input'];
  shelfId?: InputMaybe<Scalars['ID']['input']>;
  subject: Scalars['String']['input'];
  type?: InputMaybe<TemplateType>;
  useShelfNotice?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpsertResponse = {
  __typename?: 'UpsertResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type User = {
  __typename?: 'User';
  companies?: Maybe<Array<UsersonCompanies>>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  lastSignedIn?: Maybe<Scalars['DateTime']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  roles?: Maybe<Array<Role>>;
  telephone?: Maybe<Scalars['String']['output']>;
};

export type UserRole = {
  __typename?: 'UserRole';
  role: Role;
};

export type UserWithPermission = {
  __typename?: 'UserWithPermission';
  CompanyUserResourcePermission: Array<CompnayUserPermission>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  roles: Array<UserRole>;
};

export type UserWrapper = {
  __typename?: 'UserWrapper';
  user: UserWithPermission;
};

export type UsersonCompanies = {
  __typename?: 'UsersonCompanies';
  accountStatus?: Maybe<AccountStatusList>;
  company?: Maybe<Company>;
  companyId?: Maybe<Scalars['String']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  lastSignedIn?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
};

export type CalendarEmailInput = {
  dateEnd: Scalars['String']['input'];
  dateStart: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  summary: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type EmailResponse = {
  __typename?: 'emailResponse';
  ErrorCode?: Maybe<Scalars['String']['output']>;
  Message?: Maybe<Scalars['String']['output']>;
  MessageID?: Maybe<Scalars['String']['output']>;
  SubmittedAt?: Maybe<Scalars['String']['output']>;
  To?: Maybe<Scalars['String']['output']>;
};

export type RequestEmailInput = {
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  to: Scalars['String']['input'];
};

export type WelcomeEmailInput = {
  name: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type UpdateAgendaConfigurationMutationVariables = Exact<{
  bookshelfId: Scalars['ID']['input'];
  configuration: UpdateAgendaConfigurationInput;
}>;


export type UpdateAgendaConfigurationMutation = { __typename?: 'Mutation', updateAgendaConfiguration: { __typename?: 'AgendaConfiguration', id: string, showInvitees: boolean, showTitle: boolean, showDate: boolean, showTime: boolean, showLocation: boolean, showMeetingLink: boolean, showMeetingDetails: boolean, confidentialityFooter?: string | null } };

export type UserActionsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type UserActionsQuery = { __typename?: 'Query', userActions: Array<{ __typename?: 'ActionItem', id: string, actionItem: string, dueDate?: any | null, status: ActionItemStatus, bookshelfId?: string | null, agendaId: string, agendaMinuteId: string, update?: string | null, createdAt: any, updatedAt: any, meetingName?: string | null, bookshelfName?: string | null, bookcaseName?: string | null, actionRef?: string | null, assignees: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string }>, externalAssignees: Array<{ __typename?: 'ExternalAssignee', name: string, email: string, assignedByUserId?: string | null, updatedAt?: any | null }> }> };

export type GetCarryOverActionItemsQueryVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type GetCarryOverActionItemsQuery = { __typename?: 'Query', getCarryOverActionItems: Array<{ __typename?: 'ActionItem', id: string, actionItem: string, dueDate?: any | null, status: ActionItemStatus, update?: string | null, agendaId: string, agendaMinuteId: string, createdAt: any, updatedAt: any, meetingName?: string | null, bookshelfName?: string | null, bookcaseName?: string | null, actionRef?: string | null, assignees: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string }>, externalAssignees: Array<{ __typename?: 'ExternalAssignee', name: string, email: string, assignedByUserId?: string | null, updatedAt?: any | null }> }> };

export type GetGuestActionItemQueryVariables = Exact<{
  actionItemId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
}>;


export type GetGuestActionItemQuery = { __typename?: 'Query', getGuestActionItem?: { __typename?: 'GuestActionItem', id: string, actionItem: string, status: ActionItemStatus, dueDate?: any | null, organization?: string | null, bookcase?: string | null, bookshelf?: string | null, meeting?: string | null, meetingDate?: any | null, update?: { __typename?: 'ActionItemUpdate', date?: any | null, content?: string | null } | null, assignee?: { __typename?: 'ExternalAssignee', name: string, email: string } | null, forwardedBy?: { __typename?: 'ForwardedBy', name: string, email: string, date: any } | null } | null };

export type ActionItemsQueryVariables = Exact<{
  agendaMinuteId: Scalars['ID']['input'];
}>;


export type ActionItemsQuery = { __typename?: 'Query', actionItems: Array<{ __typename?: 'ActionItem', id: string, agendaMinuteId: string, actionItem: string, dueDate?: any | null, status: ActionItemStatus, update?: string | null, createdAt: any, updatedAt: any, actionRef?: string | null, bookshelfName?: string | null, bookcaseName?: string | null, assignees: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string }>, externalAssignees: Array<{ __typename?: 'ExternalAssignee', name: string, email: string, assignedByUserId?: string | null, updatedAt?: any | null }> }> };

export type GetActionLogsForBookshelfQueryVariables = Exact<{
  bookshelfId: Scalars['ID']['input'];
}>;


export type GetActionLogsForBookshelfQuery = { __typename?: 'Query', getActionLogsForBookshelf: Array<{ __typename?: 'MeetingActionLog', meetingId: string, meetingName: string, meetingDate: string, actionItems: Array<any> }> };

export type AddCarryOverActionLogMutationVariables = Exact<{
  bookshelfId: Scalars['ID']['input'];
  agendaId: Scalars['ID']['input'];
}>;


export type AddCarryOverActionLogMutation = { __typename?: 'Mutation', addCarryOverActionLog: { __typename?: 'Response', success: boolean } };

export type UpsertActionItemMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  input: UpsertActionItemInput;
}>;


export type UpsertActionItemMutation = { __typename?: 'Mutation', upsertActionItem: { __typename?: 'ActionItem', id: string, agendaMinuteId: string, actionItem: string, dueDate?: any | null, status: ActionItemStatus, update?: string | null, createdAt: any, updatedAt: any, assignees: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string }>, externalAssignees: Array<{ __typename?: 'ExternalAssignee', name: string, email: string, assignedByUserId?: string | null, updatedAt?: any | null }> } };

export type UpdateGuestActionItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateGuestActionItemInput;
}>;


export type UpdateGuestActionItemMutation = { __typename?: 'Mutation', updateGuestActionItem: boolean };

export type DeleteActionItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteActionItemMutation = { __typename?: 'Mutation', deleteActionItem: boolean };

export type ForwardActionItemMutationVariables = Exact<{
  input: ForwardActionItemInput;
}>;


export type ForwardActionItemMutation = { __typename?: 'Mutation', forwardActionItem: { __typename?: 'ForwardActionItemResponse', success: boolean } };

export type SendActionItemsMutationVariables = Exact<{
  input: SendActionItemsInput;
}>;


export type SendActionItemsMutation = { __typename?: 'Mutation', sendActionItems: { __typename?: 'SendActionItemsResponse', success: boolean, message?: string | null, results?: { __typename?: 'SendActionItemsResults', total: number, sent: number, failed: number, errors?: Array<string> | null } | null } };

export type AgendasQueryVariables = Exact<{
  query: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AgendasQuery = { __typename?: 'Query', agendas?: Array<{ __typename?: 'Agenda', id: string, createdAt: any, updatedAt?: any | null, index: number, name?: string | null, shortname?: string | null, agendaMinute?: { __typename?: 'AgendaMinute', id: string, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null } | null> | null, minutesAmendments?: Array<{ __typename?: 'MinutesAmendment', reviewer?: { __typename?: 'User', firstName: string, lastName: string } | null, reviews?: Array<{ __typename?: 'MinutesAmendmentReview', id?: string | null, status?: AmendmentStatus | null, comment?: string | null, minutesAmendment?: { __typename?: 'MinutesAmendment', reviewer?: { __typename?: 'User', firstName: string, lastName: string } | null } | null } | null> | null } | null> | null } | null }> | null };

export type AgendasWithPermissionsQueryVariables = Exact<{
  query: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AgendasWithPermissionsQuery = { __typename?: 'Query', agendasWithPermissions?: Array<{ __typename?: 'Agenda', id: string, createdAt: any, updatedAt?: any | null, index: number, meetingDate?: any | null, startTime?: string | null, location?: string | null, name?: string | null, shortname?: string | null, logo?: string | null, color?: string | null, bookshelf?: { __typename?: 'Bookshelf', id: string, name?: string | null, bookcase?: { __typename?: 'Bookcase', id: string, name?: string | null } | null } | null, agendaMinute?: { __typename?: 'AgendaMinute', id: string, minutes?: any | null, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null, signatureUploadFile?: { __typename?: 'SignatureUploadFile', uploadedFileId?: string | null, baseUrl?: string | null, createdAt?: any | null } | null } | null> | null, minutesAmendments?: Array<{ __typename?: 'MinutesAmendment', reviewer?: { __typename?: 'User', firstName: string, lastName: string } | null, reviews?: Array<{ __typename?: 'MinutesAmendmentReview', id?: string | null, status?: AmendmentStatus | null, comment?: string | null, minutesAmendment?: { __typename?: 'MinutesAmendment', reviewer?: { __typename?: 'User', firstName: string, lastName: string } | null } | null } | null> | null } | null> | null } | null }> | null };

export type AgendaQueryVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type AgendaQuery = { __typename?: 'Query', agenda?: { __typename?: 'Agenda', id: string, name?: string | null, shortname?: string | null, startTime?: string | null, location?: string | null, meetingDate?: any | null, meetingLink?: string | null, details?: string | null, published?: boolean | null, minutesTemplateVersion?: MinutesTemplateVersion | null, index: number, color?: string | null, logo?: string | null, companyName?: string | null, bookshelf?: { __typename?: 'Bookshelf', id: string, name?: string | null, showClientCompanyBranding?: boolean | null, bookcase?: { __typename?: 'Bookcase', id: string, name?: string | null } | null } | null, items?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, type?: AgendaItemType | null, duration?: string | null, parentAgendaItemId?: string | null, index: number, files?: Array<{ __typename?: 'File', pageCount?: number | null }> | null, childAgendaItems?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, type?: AgendaItemType | null, duration?: string | null, parentAgendaItemId?: string | null, index: number, files?: Array<{ __typename?: 'File', pageCount?: number | null }> | null, childAgendaItems?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, type?: AgendaItemType | null, duration?: string | null, parentAgendaItemId?: string | null, index: number, files?: Array<{ __typename?: 'File', pageCount?: number | null }> | null, childAgendaItems?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, type?: AgendaItemType | null, duration?: string | null, parentAgendaItemId?: string | null, index: number, files?: Array<{ __typename?: 'File', pageCount?: number | null }> | null, childAgendaItems?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, type?: AgendaItemType | null, duration?: string | null, parentAgendaItemId?: string | null, index: number, files?: Array<{ __typename?: 'File', pageCount?: number | null }> | null }> | null }> | null }> | null }> | null }> | null, agendaPublishFile?: { __typename?: 'UploadFile', url?: string | null } | null, agendaMinute?: { __typename?: 'AgendaMinute', updatedAt?: any | null, minutesAmendmentNotes?: string | null, minutes?: any | null, previousMinutes?: any | null, id: string, meetingLanguage?: string | null, minutesLanguage?: string | null, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null } | null> | null, minutesAmendments?: Array<{ __typename?: 'MinutesAmendment', id?: string | null, reviewer?: { __typename?: 'User', firstName: string, lastName: string, id: string } | null, reviews?: Array<{ __typename?: 'MinutesAmendmentReview', comment?: string | null, id?: string | null, status?: AmendmentStatus | null } | null> | null } | null> | null } | null, meetingMinuteTranscription?: Array<{ __typename?: 'Transcription', transcription?: string | null, id?: string | null } | null> | null, highlights?: Array<{ __typename?: 'Highlight', content: string, id: string, position: string, userId: string, comment?: string | null, isPublic?: boolean | null }> | null } | null };

export type MinuteSignaturesQueryVariables = Exact<{
  agendaMinuteId: Scalars['ID']['input'];
}>;


export type MinuteSignaturesQuery = { __typename?: 'Query', minuteSignatures?: Array<{ __typename?: 'Signature', signatoryId?: string | null, signed?: boolean | null, user?: { __typename?: 'User', firstName: string, lastName: string } | null, signatureUploadFile?: { __typename?: 'SignatureUploadFile', uploadedFileId?: string | null, baseUrl?: string | null, createdAt?: any | null } | null } | null> | null };

export type CompanyUsersQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyUsersQuery = { __typename?: 'Query', companyUsers?: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, lastSignedIn?: any | null, roles?: Array<{ __typename?: 'Role', permissions?: Array<{ __typename?: 'Permission', name: string } | null> | null }> | null, companies?: Array<{ __typename?: 'UsersonCompanies', accountStatus?: AccountStatusList | null }> | null }> | null };

export type DeleteMinutesAndTranscriptMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type DeleteMinutesAndTranscriptMutation = { __typename?: 'Mutation', deleteMinutesAndTranscript?: any | null };

export type AddReviewToMinutesAmendmentMutationVariables = Exact<{
  minutesAmendmentId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
}>;


export type AddReviewToMinutesAmendmentMutation = { __typename?: 'Mutation', addReviewToMinutesAmendment: { __typename?: 'MinutesAmendment', reviews?: Array<{ __typename?: 'MinutesAmendmentReview', comment?: string | null } | null> | null } };

export type UpdateLastSignInMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type UpdateLastSignInMutation = { __typename?: 'Mutation', updateLastSignIn?: string | null };

export type ResolveMinutesAmendmentMutationVariables = Exact<{
  minutesAmendmentReviewId: Scalars['ID']['input'];
}>;


export type ResolveMinutesAmendmentMutation = { __typename?: 'Mutation', resolveMinutesAmendment: { __typename?: 'MinutesAmendmentReview', id?: string | null, status?: AmendmentStatus | null } };

export type AddSignatureToMinutesMutationVariables = Exact<{
  agendaMinuteId: Scalars['ID']['input'];
  signatureFile: UploadFileInput;
  signedAt?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type AddSignatureToMinutesMutation = { __typename?: 'Mutation', addSignatureToMinutes?: { __typename?: 'AddSignatureToMinutes', message?: string | null, signature?: { __typename?: 'File', url: string } | null } | null };

export type GetCompanyUsersQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type GetCompanyUsersQuery = { __typename?: 'Query', companyUsers?: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, telephone?: string | null, roles?: Array<{ __typename?: 'Role', key?: string | null, name?: string | null }> | null, companies?: Array<{ __typename?: 'UsersonCompanies', companyId?: string | null, accountStatus?: AccountStatusList | null, lastSignedIn?: string | null, provider?: string | null }> | null }> | null };

export type GetAuthorizedCompanyUsersQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAuthorizedCompanyUsersQuery = { __typename?: 'Query', authorizedCompanyUsers?: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, telephone?: string | null, roles?: Array<{ __typename?: 'Role', key?: string | null, name?: string | null }> | null, companies?: Array<{ __typename?: 'UsersonCompanies', companyId?: string | null, accountStatus?: AccountStatusList | null, lastSignedIn?: string | null, provider?: string | null }> | null }> | null };

export type MeQueryVariables = Exact<{
  companyId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, telephone?: string | null, companies?: Array<{ __typename?: 'UsersonCompanies', provider?: string | null, isActive?: boolean | null, accountStatus?: AccountStatusList | null, company?: { __typename?: 'Company', id: string, name?: string | null } | null }> | null, roles?: Array<{ __typename?: 'Role', key?: string | null, name?: string | null }> | null } };

export type CompanyUserResourcePermissionsQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
}>;


export type CompanyUserResourcePermissionsQuery = { __typename?: 'Query', companyUserResourcePermissions?: Array<{ __typename?: 'ResourcePermission', resourceType: ResourceType, resourceId: string, includedPermissionIds?: Array<string> | null }> | null };

export type AgendaMinuteByAgendaIdQueryVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type AgendaMinuteByAgendaIdQuery = { __typename?: 'Query', agendaMinuteByAgendaId?: { __typename?: 'AgendaMinute', minutes?: any | null, previousMinutes?: any | null, id: string, meetingLanguage?: string | null, minutesLanguage?: string | null, updatedAt?: any | null } | null };

export type AgendaAttendeeQueryVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type AgendaAttendeeQuery = { __typename?: 'Query', agendaAttendee?: Array<{ __typename?: 'AgendaAttendee', agendaId?: string | null, attendeeId?: string | null, createdByUserId?: string | null, updatedAt?: any | null, createdAt?: any | null, updatedByUserId?: string | null, status?: AttendeeStatus | null, user?: { __typename?: 'User', firstName: string, lastName: string, id: string, email: string } | null }> | null };

export type IsUserAttendeeQueryVariables = Exact<{
  agendaId: Scalars['String']['input'];
}>;


export type IsUserAttendeeQuery = { __typename?: 'Query', isUserAttendee: { __typename?: 'Response', message?: string | null, success: boolean } };

export type AgendaItemUploadedFilesQueryVariables = Exact<{
  agendaItemId: Scalars['ID']['input'];
}>;


export type AgendaItemUploadedFilesQuery = { __typename?: 'Query', agendaItemUploadedFiles?: Array<{ __typename?: 'File', id: string, name: string, extension: string, url: string }> | null };

export type AgendaItemRequestedFilesQueryVariables = Exact<{
  agendaItemId: Scalars['ID']['input'];
}>;


export type AgendaItemRequestedFilesQuery = { __typename?: 'Query', agendaItemRequestedFiles?: Array<{ __typename?: 'AgendaItemFileRequest', agendaItemId?: string | null, uploadedFileId?: string | null, uploader?: { __typename?: 'User', firstName: string } | null, uploadedFile?: { __typename?: 'File', name: string } | null }> | null };

export type UpdateAgendaMutationVariables = Exact<{
  updateAgendaId: Scalars['ID']['input'];
  data: UpdateAgendaInput;
}>;


export type UpdateAgendaMutation = { __typename?: 'Mutation', updateAgenda: { __typename?: 'Agenda', id: string, name?: string | null, shortname?: string | null, location?: string | null, meetingDate?: any | null, startTime?: string | null, meetingLink?: string | null, details?: string | null, index: number, createdAt: any, updatedAt?: any | null, items?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, duration?: string | null, type?: AgendaItemType | null, agendaId?: string | null, updatedAt?: any | null }> | null } };

export type AddHighlightMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
  position: Scalars['String']['input'];
  content: Scalars['String']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AddHighlightMutation = { __typename?: 'Mutation', addHighlight?: { __typename?: 'Highlight', id: string, content: string, position: string, comment?: string | null, userId: string, isPublic?: boolean | null } | null };

export type RemoveAllHighlightsMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type RemoveAllHighlightsMutation = { __typename?: 'Mutation', removeAllHighlights: Array<{ __typename?: 'Highlight', id: string } | null> };

export type RemoveHighlightMutationVariables = Exact<{
  removeHighlightId: Scalars['ID']['input'];
}>;


export type RemoveHighlightMutation = { __typename?: 'Mutation', removeHighlight?: { __typename?: 'Highlight', id: string } | null };

export type UpdateHighlightMutationVariables = Exact<{
  updateHighlightId: Scalars['ID']['input'];
  content?: InputMaybe<Scalars['JSON']['input']>;
  position?: InputMaybe<Scalars['JSON']['input']>;
  comment?: InputMaybe<Scalars['JSON']['input']>;
  isPublic?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateHighlightMutation = { __typename?: 'Mutation', updateHighlight?: { __typename?: 'Highlight', id: string, isPublic?: boolean | null } | null };

export type UpdateHighlightVisibilityMutationVariables = Exact<{
  highlightId: Scalars['ID']['input'];
  isPublic: Scalars['Boolean']['input'];
}>;


export type UpdateHighlightVisibilityMutation = { __typename?: 'Mutation', updateHighlightVisibility?: { __typename?: 'Highlight', id: string, isPublic?: boolean | null } | null };

export type DownloadMinutesAsWordMutationVariables = Exact<{
  file: UploadFileInput;
}>;


export type DownloadMinutesAsWordMutation = { __typename?: 'Mutation', downloadMinutesAsWord: string };

export type AddAgendaMutationVariables = Exact<{
  bookshelfId: Scalars['ID']['input'];
  data: AddAgendaInput;
}>;


export type AddAgendaMutation = { __typename?: 'Mutation', addAgenda: { __typename?: 'Agenda', id: string, name?: string | null, shortname?: string | null, startTime?: string | null, location?: string | null, meetingDate?: any | null, meetingLink?: string | null, details?: string | null, published?: boolean | null, index: number, bookshelf?: { __typename?: 'Bookshelf', id: string, name?: string | null, showClientCompanyBranding?: boolean | null, bookcase?: { __typename?: 'Bookcase', id: string, name?: string | null } | null } | null, items?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, type?: AgendaItemType | null, duration?: string | null, parentAgendaItemId?: string | null, index: number, files?: Array<{ __typename?: 'File', pageCount?: number | null }> | null, childAgendaItems?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, type?: AgendaItemType | null, duration?: string | null, parentAgendaItemId?: string | null, index: number, files?: Array<{ __typename?: 'File', pageCount?: number | null }> | null }> | null }> | null, agendaPublishFile?: { __typename?: 'UploadFile', url?: string | null } | null, agendaMinute?: { __typename?: 'AgendaMinute', minutesAmendmentNotes?: string | null, minutes?: any | null, previousMinutes?: any | null, id: string, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null } | null> | null, minutesAmendments?: Array<{ __typename?: 'MinutesAmendment', id?: string | null, reviewer?: { __typename?: 'User', firstName: string, lastName: string, id: string } | null, reviews?: Array<{ __typename?: 'MinutesAmendmentReview', comment?: string | null, id?: string | null, status?: AmendmentStatus | null } | null> | null } | null> | null } | null, meetingMinuteTranscription?: Array<{ __typename?: 'Transcription', transcription?: string | null, id?: string | null } | null> | null } };

export type DeactivateCompanyUserMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type DeactivateCompanyUserMutation = { __typename?: 'Mutation', deactivateCompanyUser?: any | null };

export type PublishAgendaMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  agendaId: Scalars['String']['input'];
  attendeesId: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  guestIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  sendNotification: Scalars['Boolean']['input'];
  file: UploadFileInput;
  meetingDetails?: InputMaybe<AgendaEmailTemplateInput>;
  logoType: LogoType;
  noticeType: Scalars['String']['input'];
}>;


export type PublishAgendaMutation = { __typename?: 'Mutation', publishAgenda: { __typename?: 'PublishAgenda', message: string } };

export type AddBookcaseMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  data: AddBookcaseInput;
}>;


export type AddBookcaseMutation = { __typename?: 'Mutation', addBookcase: { __typename?: 'Bookcase', id: string, name?: string | null, description?: string | null, bookshelves?: Array<{ __typename?: 'Bookshelf', id: string, name?: string | null, description?: string | null, agendas?: Array<{ __typename?: 'Agenda', id: string, createdAt: any, updatedAt?: any | null, meetingDate?: any | null, index: number, name?: string | null, shortname?: string | null, published?: boolean | null, agendaMinute?: { __typename?: 'AgendaMinute', id: string, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null } | null> | null } | null }> | null }> | null } };

export type UpsertCompanyUserShelfPermissionMutationVariables = Exact<{
  resourceId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
  shelfPermissions?: InputMaybe<Array<ShelfPermissionInput> | ShelfPermissionInput>;
}>;


export type UpsertCompanyUserShelfPermissionMutation = { __typename?: 'Mutation', upsertCompanyUserShelfPermission?: any | null };

export type UpsertCompanyUserResourcePermissionMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
  assignedRoles?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  removedRoles?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  resourcePermissions?: InputMaybe<Array<ResourcePermissionInput> | ResourcePermissionInput>;
}>;


export type UpsertCompanyUserResourcePermissionMutation = { __typename?: 'Mutation', upsertCompanyUserResourcePermission?: any | null };

export type AgendaItemsByAgendaIdQueryVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type AgendaItemsByAgendaIdQuery = { __typename?: 'Query', agendaItemsByAgendaId?: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, duration?: string | null, type?: AgendaItemType | null, agendaId?: string | null, updatedAt?: any | null }> | null };

export type BookcasesQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BookcasesQuery = { __typename?: 'Query', bookcases?: Array<{ __typename?: 'Bookcase', id: string, name?: string | null, description?: string | null, bookshelves?: Array<{ __typename?: 'Bookshelf', id: string, name?: string | null, description?: string | null, color?: string | null, logo?: string | null, showClientCompanyBranding?: boolean | null, agendas?: Array<{ __typename?: 'Agenda', id: string, createdAt: any, updatedAt?: any | null, meetingDate?: any | null, index: number, name?: string | null, shortname?: string | null, published?: boolean | null, agendaMinute?: { __typename?: 'AgendaMinute', id: string, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null } | null> | null } | null }> | null }> | null }> | null };

export type DeleteBookcaseMutationVariables = Exact<{
  deleteBookcaseId: Scalars['ID']['input'];
}>;


export type DeleteBookcaseMutation = { __typename?: 'Mutation', deleteBookcase: string };

export type UpdateBookcaseMutationVariables = Exact<{
  updateBookcaseId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateBookcaseMutation = { __typename?: 'Mutation', updateBookcase: { __typename?: 'Bookcase', id: string, name?: string | null, description?: string | null } };

export type AddBookshelfMutationVariables = Exact<{
  bookcaseId: Scalars['ID']['input'];
  data: AddBookshelfInput;
}>;


export type AddBookshelfMutation = { __typename?: 'Mutation', addBookshelf: { __typename?: 'Bookshelf', id: string, name?: string | null, description?: string | null, agendas?: Array<{ __typename?: 'Agenda', id: string, createdAt: any, updatedAt?: any | null, meetingDate?: any | null, index: number, name?: string | null, shortname?: string | null, published?: boolean | null, agendaMinute?: { __typename?: 'AgendaMinute', id: string, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null } | null> | null } | null }> | null } };

export type DeleteBookshelfMutationVariables = Exact<{
  deleteBookshelfId: Scalars['ID']['input'];
}>;


export type DeleteBookshelfMutation = { __typename?: 'Mutation', deleteBookshelf: string };

export type RemoveBookshelfLogoMutationVariables = Exact<{
  removeBookshelfLogoId: Scalars['ID']['input'];
}>;


export type RemoveBookshelfLogoMutation = { __typename?: 'Mutation', removeBookshelfLogo: { __typename?: 'Bookshelf', logo?: string | null } };

export type UpdateBookshelfMutationVariables = Exact<{
  updateBookshelfId: Scalars['ID']['input'];
  data: UpdateBookshelfInput;
}>;


export type UpdateBookshelfMutation = { __typename?: 'Mutation', updateBookshelf: { __typename?: 'Bookshelf', id: string, name?: string | null, color?: string | null, description?: string | null } };

export type CreateOrUpdateAgendaMinuteMutationVariables = Exact<{
  data: CreateOrUpdateAgendaMinuteInput;
}>;


export type CreateOrUpdateAgendaMinuteMutation = { __typename?: 'Mutation', createOrUpdateAgendaMinute: { __typename?: 'AgendaMinute', id: string, minutes?: any | null, agendaId: string, createdByUserId: string, createdAt: any, updatedAt?: any | null, updatedByUserId?: string | null, staleData?: boolean | null } };

export type UpdateOriginalMinutesMutationVariables = Exact<{
  data: CreateOrUpdateAgendaMinuteInput;
}>;


export type UpdateOriginalMinutesMutation = { __typename?: 'Mutation', updateOriginalMinutes: { __typename?: 'AgendaMinute', id: string, minutes?: any | null, agendaId: string, createdByUserId: string, createdAt: any, updatedAt?: any | null, updatedByUserId?: string | null } };

export type GenerateMinutesFromCustomPromptMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
  prompt: Scalars['String']['input'];
}>;


export type GenerateMinutesFromCustomPromptMutation = { __typename?: 'Mutation', generateMinutesFromCustomPrompt: string };

export type RequestSignatureForMinutesMutationVariables = Exact<{
  agendaMinuteId: Scalars['ID']['input'];
  signatories: Array<Scalars['String']['input']> | Scalars['String']['input'];
  signatureRequestNotes?: InputMaybe<Scalars['String']['input']>;
  sendNotification: Scalars['Boolean']['input'];
}>;


export type RequestSignatureForMinutesMutation = { __typename?: 'Mutation', requestSignatureForMinutes?: { __typename?: 'RequestSignatureForMinutes', message?: string | null } | null };

export type AddReviewersToMinutesMutationVariables = Exact<{
  agendaMinuteId: Scalars['ID']['input'];
  minutesAmendmentNotes: Scalars['String']['input'];
  reviewerIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type AddReviewersToMinutesMutation = { __typename?: 'Mutation', addReviewersToMinutes: { __typename?: 'AgendaMinute', minutesAmendments?: Array<{ __typename?: 'MinutesAmendment', reviewerId?: string | null } | null> | null } };

export type AddUserMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  user: AddUserInput;
  isSaveAndExit?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string, lastSignedIn?: any | null, email: string, firstName: string, lastName: string, telephone?: string | null } };

export type AddUsersMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  users: Array<AddUserInput> | AddUserInput;
}>;


export type AddUsersMutation = { __typename?: 'Mutation', addUsers: { __typename?: 'AddUsers', createdUsers: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, lastSignedIn?: any | null, telephone?: string | null }> } };

export type UpdateUserMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
  user: AddUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, provider?: string | null, telephone?: string | null, lastSignedIn?: any | null } };

export type GenerateResetTokenMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GenerateResetTokenMutation = { __typename?: 'Mutation', generateResetToken?: any | null };

export type ChangePasswordMutationVariables = Exact<{
  userId: Scalars['ID']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword?: any | null };

export type CreateUserPasswordMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  resetToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type CreateUserPasswordMutation = { __typename?: 'Mutation', createUserPassword?: any | null };

export type ResetUserPasswordMutationVariables = Exact<{
  resetToken: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ResetUserPasswordMutation = { __typename?: 'Mutation', resetUserPassword?: any | null };

export type UploadAgendaItemFileMutationVariables = Exact<{
  agendaItemId: Scalars['ID']['input'];
  files: Array<UploadFileInput> | UploadFileInput;
}>;


export type UploadAgendaItemFileMutation = { __typename?: 'Mutation', uploadAgendaItemFile: Array<{ __typename?: 'File', id: string, name: string, extension: string, url: string }> };

export type UploadAgendaItemRequestedFileMutationVariables = Exact<{
  agendaItemId: Scalars['ID']['input'];
  agendaItemFileRequestId: Scalars['ID']['input'];
  files: Array<UploadFileInput> | UploadFileInput;
}>;


export type UploadAgendaItemRequestedFileMutation = { __typename?: 'Mutation', uploadAgendaItemRequestedFile: Array<{ __typename?: 'File', id: string, name: string, extension: string, url: string }> };

export type RequestAgendaItemFileMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  agendaItemId: Scalars['ID']['input'];
  requesteeIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
}>;


export type RequestAgendaItemFileMutation = { __typename?: 'Mutation', requestAgendaItemFile?: any | null };

export type DeleteAgendaMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
  companyId: Scalars['ID']['input'];
}>;


export type DeleteAgendaMutation = { __typename?: 'Mutation', deleteAgenda: string };

export type ArchiveAgendaMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type ArchiveAgendaMutation = { __typename?: 'Mutation', archiveAgenda: { __typename?: 'Agenda', id: string, name?: string | null, shortname?: string | null, location?: string | null, meetingDate?: any | null, startTime?: string | null, meetingLink?: string | null, details?: string | null, index: number, createdAt: any, updatedAt?: any | null, published?: boolean | null, deleted?: boolean | null } };

export type CloneAgendaMutationVariables = Exact<{
  bookshelfId: Scalars['ID']['input'];
  agendaId: Scalars['ID']['input'];
}>;


export type CloneAgendaMutation = { __typename?: 'Mutation', cloneAgenda: { __typename?: 'Agenda', id: string } };

export type ActivateCompanyUserMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type ActivateCompanyUserMutation = { __typename?: 'Mutation', activateCompanyUser?: any | null };

export type DeleteAgendaItemFileMutationVariables = Exact<{
  agendaItemId: Scalars['ID']['input'];
  fileId: Scalars['ID']['input'];
}>;


export type DeleteAgendaItemFileMutation = { __typename?: 'Mutation', deleteAgendaItemFile: string };

export type AddCompanyWithUserMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  companyInput: AddCompanyInput;
  userInput: AddUserInput;
}>;


export type AddCompanyWithUserMutation = { __typename?: 'Mutation', addCompanyWithUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, telephone?: string | null } };

export type CompaniesQueryVariables = Exact<{ [key: string]: never; }>;


export type CompaniesQuery = { __typename?: 'Query', companies?: Array<{ __typename?: 'Company', id: string, name?: string | null }> | null };

export type ReInviteUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  companyId: Scalars['ID']['input'];
  isSystemAdmin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type ReInviteUserMutation = { __typename?: 'Mutation', reInviteUser: string };

export type DeleteCompanyUserMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type DeleteCompanyUserMutation = { __typename?: 'Mutation', deleteCompanyUser?: any | null };

export type AuthorizedBookcasesByRoleQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AuthorizedBookcasesByRoleQuery = { __typename?: 'Query', authorizedBookcasesByRole?: Array<{ __typename?: 'Bookcase', id: string, name?: string | null, description?: string | null, bookshelves?: Array<{ __typename?: 'Bookshelf', id: string, name?: string | null, description?: string | null, agendas?: Array<{ __typename?: 'Agenda', id: string, createdAt: any, updatedAt?: any | null, meetingDate?: any | null, index: number, name?: string | null, shortname?: string | null, published?: boolean | null, agendaMinute?: { __typename?: 'AgendaMinute', id: string, signatures?: Array<{ __typename?: 'Signature', signed?: boolean | null } | null> | null } | null }> | null }> | null }> | null };

export type AddMinutesTemplateVersionMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
  templateVersion: MinutesTemplateVersion;
}>;


export type AddMinutesTemplateVersionMutation = { __typename?: 'Mutation', addMinutesTemplateVersion: { __typename?: 'Agenda', id: string, minutesTemplateVersion?: MinutesTemplateVersion | null } };

export type GetAgendaConfigurationQueryVariables = Exact<{
  bookshelfId: Scalars['ID']['input'];
}>;


export type GetAgendaConfigurationQuery = { __typename?: 'Query', getAgendaConfiguration?: { __typename?: 'AgendaConfiguration', showInvitees: boolean, showTitle: boolean, showDate: boolean, showTime: boolean, showLocation: boolean, showMeetingLink: boolean, showMeetingDetails: boolean, confidentialityFooter?: string | null } | null };

export type AddAgendaItemsToAgendaMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
  data: Array<AddAgendaItemInput> | AddAgendaItemInput;
}>;


export type AddAgendaItemsToAgendaMutation = { __typename?: 'Mutation', addAgendaItemsToAgenda: Array<{ __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, duration?: string | null, type?: AgendaItemType | null, agendaId?: string | null, parentAgendaItemId?: string | null, index: number, createdAt?: any | null, updatedAt?: any | null }> };

export type MutationMutationVariables = Exact<{
  agendaItemId: Scalars['ID']['input'];
  data: AddAgendaItemInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', addAgendaItemToAgendaItem: { __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, duration?: string | null, type?: AgendaItemType | null, agendaId?: string | null, parentAgendaItemId?: string | null, index: number, createdAt?: any | null, updatedAt?: any | null } };

export type UpdateAgendaItemMutationVariables = Exact<{
  updateAgendaItemId: Scalars['ID']['input'];
  data: UpdateAgendaItemInput;
}>;


export type UpdateAgendaItemMutation = { __typename?: 'Mutation', updateAgendaItem: { __typename?: 'AgendaItem', id: string, name?: string | null, owner?: string | null, duration?: string | null, type?: AgendaItemType | null, agendaId?: string | null, parentAgendaItemId?: string | null, index: number, createdAt?: any | null, updatedAt?: any | null } };

export type DeleteAgendaItemMutationVariables = Exact<{
  deleteAgendaItemId: Scalars['ID']['input'];
}>;


export type DeleteAgendaItemMutation = { __typename?: 'Mutation', deleteAgendaItem: string };

export type DeleteTranscriptMutationVariables = Exact<{
  agendaId: Scalars['ID']['input'];
}>;


export type DeleteTranscriptMutation = { __typename?: 'Mutation', deleteTranscript?: string | null };

export type GetAzureAdConfigQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type GetAzureAdConfigQuery = { __typename?: 'Query', getAzureAdConfig?: { __typename?: 'AzureAdConfig', id: string, companyId: string, tenantId: string, clientId: string, redirectUri?: string | null, createdAt: any, updatedAt: any, needsSecretUpdate: boolean } | null };

export type CreateAzureAdConfigMutationVariables = Exact<{
  data: CreateAzureAdConfigInput;
}>;


export type CreateAzureAdConfigMutation = { __typename?: 'Mutation', createAzureAdConfig: { __typename?: 'AzureAdConfig', id: string, companyId: string, tenantId: string, clientId: string, redirectUri?: string | null, createdAt: any, updatedAt: any, needsSecretUpdate: boolean } };

export type UpdateAzureAdConfigMutationVariables = Exact<{
  data: UpdateAzureAdConfigInput;
}>;


export type UpdateAzureAdConfigMutation = { __typename?: 'Mutation', updateAzureAdConfig: { __typename?: 'AzureAdConfig', id: string, companyId: string, tenantId: string, clientId: string, redirectUri?: string | null, createdAt: any, updatedAt: any, needsSecretUpdate: boolean } };

export type UpdateCompanyMutationVariables = Exact<{
  updateCompanyId: Scalars['ID']['input'];
  data: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: string, logo?: string | null, name?: string | null, state?: string | null, website?: string | null, zip?: string | null, address1?: string | null, address2?: string | null, city?: string | null, color?: string | null, updatedAt?: any | null } };

export type CompanyQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type CompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, logo?: string | null, name?: string | null, state?: string | null, website?: string | null, zip?: string | null, address1?: string | null, address2?: string | null, city?: string | null, color?: string | null, countryCode?: string | null, updatedAt?: any | null } };

export type RemoveCompanyLogoMutationVariables = Exact<{
  removeCompanyLogoId: Scalars['ID']['input'];
}>;


export type RemoveCompanyLogoMutation = { __typename?: 'Mutation', removeCompanyLogo: { __typename?: 'Company', logo?: string | null } };

export type CompanyStatisticsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyStatisticsQuery = { __typename?: 'Query', companyStatistics: Array<{ __typename?: 'CompanyStatistics', id: string, name: string, totalBookshelves: number, totalBookcases: number, totalAgendas: number, totalMinutes: number, lastLoginTime?: string | null, activeUsers: number, lastLoginUser?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null }> };

export type DeleteCompanyMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany?: string | null };

export type UpsertEmailNoticeTemplateMutationVariables = Exact<{
  input: UpsertEmailNoticeTemplateInput;
}>;


export type UpsertEmailNoticeTemplateMutation = { __typename?: 'Mutation', upsertEmailNoticeTemplate: { __typename?: 'EmailNoticeTemplate', id: string, subject: string, body: string, companyId?: string | null, shelfId?: string | null, type?: TemplateType | null, variables?: Array<string> | null, useShelfNotice?: boolean | null, createdAt?: any | null, updatedAt?: any | null } };

export type GetEmailNoticeTemplateQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  type: TemplateType;
  shelfId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetEmailNoticeTemplateQuery = { __typename?: 'Query', getEmailNoticeTemplate?: { __typename?: 'EmailNoticeTemplate', id: string, subject: string, body: string, companyId?: string | null, shelfId?: string | null, type?: TemplateType | null, variables?: Array<string> | null, useShelfNotice?: boolean | null } | null };

export type SendPreviewEmailMutationVariables = Exact<{
  input: SendPreviewEmailInput;
}>;


export type SendPreviewEmailMutation = { __typename?: 'Mutation', sendPreviewEmail: { __typename?: 'SendPreviewEmailResponse', success: boolean, message: string } };

export type GroupsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type GroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, description?: string | null, type?: string | null, isActive: boolean, isSuperGroup: boolean, companyId: string, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null, users: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }>, managers: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }> }> };

export type UserGroupsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type UserGroupsQuery = { __typename?: 'Query', userGroups: Array<{ __typename?: 'GroupBasic', id: string, name: string }> };

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  description: Scalars['String']['input'];
  companyId: Scalars['ID']['input'];
  managerIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  isSuperGroup: Scalars['Boolean']['input'];
  autoAddCurrentUserAsAdmin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string, type?: string | null, description?: string | null, isActive: boolean, isSuperGroup: boolean, companyId: string, users: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }>, managers: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }> } };

export type UpdateGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  description: Scalars['String']['input'];
  managerIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  userIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
  isSuperGroup: Scalars['Boolean']['input'];
  autoAddCurrentUserAsAdmin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string, type?: string | null, description?: string | null, isActive: boolean, isSuperGroup: boolean, companyId: string, users: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }>, managers: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }> } };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string } };

export type UpsertGroupResourcePermissionsMutationVariables = Exact<{
  groupId: Scalars['ID']['input'];
  resourcePermissions: Array<ResourcePermissionInput> | ResourcePermissionInput;
}>;


export type UpsertGroupResourcePermissionsMutation = { __typename?: 'Mutation', upsertGroupResourcePermissions: { __typename?: 'Group', id: string, name: string, description?: string | null, type?: string | null, isActive: boolean, isSuperGroup: boolean, companyId: string, createdAt: string, createdByUserId: string, updatedAt?: string | null, updatedByUserId?: string | null, users: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }>, managers: Array<{ __typename?: 'GroupUser', id: string, firstName: string, lastName: string, email: string }> } };

export type GroupResourcePermissionsQueryVariables = Exact<{
  groupId: Scalars['ID']['input'];
}>;


export type GroupResourcePermissionsQuery = { __typename?: 'Query', groupResourcePermissions: Array<{ __typename?: 'ResourcePermission', resourceId: string, resourceType: ResourceType }> };

export type UsersInManagedGroupsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  query?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UsersInManagedGroupsQuery = { __typename?: 'Query', usersInManagedGroups: Array<{ __typename?: 'User', id: string, email: string, firstName: string, lastName: string, telephone?: string | null, roles?: Array<{ __typename?: 'Role', key?: string | null, name?: string | null }> | null, companies?: Array<{ __typename?: 'UsersonCompanies', companyId?: string | null, accountStatus?: AccountStatusList | null, lastSignedIn?: string | null, provider?: string | null }> | null }> };

export type GroupBookcasesQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  groupId: Scalars['ID']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  orderBy?: InputMaybe<Array<OrderByClause> | OrderByClause>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GroupBookcasesQuery = { __typename?: 'Query', groupBookcases: Array<{ __typename?: 'Bookcase', id: string, name?: string | null, bookshelves?: Array<{ __typename?: 'Bookshelf', id: string, name?: string | null }> | null }> };

export type GetOktaConfigQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type GetOktaConfigQuery = { __typename?: 'Query', getOktaConfig?: { __typename?: 'OktaConfig', id: string, companyId: string, organizationName?: string | null, organizationDomain: string, oktaOrgUrl: string, oktaClientId: string, needsTokenUpdate?: boolean | null, createdAt?: any | null, updatedAt?: any | null, company?: { __typename?: 'Company', name?: string | null } | null } | null };

export type CreateOktaConfigMutationVariables = Exact<{
  data: CreateOktaConfigInput;
}>;


export type CreateOktaConfigMutation = { __typename?: 'Mutation', createOktaConfig: { __typename?: 'OktaConfig', id: string, companyId: string, organizationName?: string | null, organizationDomain: string, oktaOrgUrl: string, oktaClientId: string, needsTokenUpdate?: boolean | null } };

export type UpdateOktaConfigMutationVariables = Exact<{
  data: UpdateOktaConfigInput;
}>;


export type UpdateOktaConfigMutation = { __typename?: 'Mutation', updateOktaConfig: { __typename?: 'OktaConfig', id: string, companyId: string, organizationName?: string | null, organizationDomain: string, oktaOrgUrl: string, oktaClientId: string, needsTokenUpdate?: boolean | null } };

export type DeleteOktaConfigMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type DeleteOktaConfigMutation = { __typename?: 'Mutation', deleteOktaConfig: boolean };

export type GetOktaOidcConfigQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type GetOktaOidcConfigQuery = { __typename?: 'Query', getOktaOidcConfig?: { __typename?: 'OktaOidcConfig', id: string, companyId: string, issuer: string, clientId: string, redirectUri?: string | null, createdAt?: any | null, updatedAt?: any | null, needsSecretUpdate?: boolean | null } | null };

export type CreateOktaOidcConfigMutationVariables = Exact<{
  data: CreateOktaOidcConfigInput;
}>;


export type CreateOktaOidcConfigMutation = { __typename?: 'Mutation', createOktaOidcConfig: { __typename?: 'OktaOidcConfig', id: string, companyId: string, issuer: string, clientId: string, redirectUri?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type UpdateOktaOidcConfigMutationVariables = Exact<{
  data: UpdateOktaOidcConfigInput;
}>;


export type UpdateOktaOidcConfigMutation = { __typename?: 'Mutation', updateOktaOidcConfig: { __typename?: 'OktaOidcConfig', id: string, companyId: string, issuer: string, clientId: string, redirectUri?: string | null, createdAt?: any | null, updatedAt?: any | null, needsSecretUpdate?: boolean | null } };

export type DeleteOktaOidcConfigMutationVariables = Exact<{
  companyId: Scalars['ID']['input'];
}>;


export type DeleteOktaOidcConfigMutation = { __typename?: 'Mutation', deleteOktaOidcConfig: boolean };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', roles?: Array<{ __typename?: 'Role', id: string, name?: string | null, description?: string | null, key?: string | null }> | null };

export type GetUsersWithShelfPermissionsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  shelfId: Scalars['ID']['input'];
  getAllUsers?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetUsersWithShelfPermissionsQuery = { __typename?: 'Query', usersByCompany: Array<{ __typename?: 'UserWrapper', user: { __typename?: 'UserWithPermission', id: string, firstName: string, lastName: string, email?: string | null, roles: Array<{ __typename?: 'UserRole', role: { __typename?: 'Role', id: string, name?: string | null, key?: string | null } }>, CompanyUserResourcePermission: Array<{ __typename?: 'CompnayUserPermission', permissionId: string, hasPermission: boolean, isActive: boolean }> } }> };

export type FetchCompanyUsersWithAgendaPermissionsQueryVariables = Exact<{
  companyId: Scalars['ID']['input'];
  agendaId: Scalars['ID']['input'];
  agendaItemIds?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
}>;


export type FetchCompanyUsersWithAgendaPermissionsQuery = { __typename?: 'Query', fetchCompanyUsersWithAgendaPermissions?: Array<{ __typename?: 'UserWrapper', user: { __typename?: 'UserWithPermission', id: string, firstName: string, lastName: string, email?: string | null, roles: Array<{ __typename?: 'UserRole', role: { __typename?: 'Role', id: string, name?: string | null, key?: string | null } }>, CompanyUserResourcePermission: Array<{ __typename?: 'CompnayUserPermission', resourceId?: string | null, resourceType?: string | null, permissionId: string, hasPermission: boolean, isActive: boolean }> } }> | null };

export type UpsertRestrictedAgendaResourcePermissionMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  companyId: Scalars['String']['input'];
  resourcePermissions: Array<RestrictedResourcePermissionInput> | RestrictedResourcePermissionInput;
}>;


export type UpsertRestrictedAgendaResourcePermissionMutation = { __typename?: 'Mutation', upsertRestrictedAgendaResourcePermission: { __typename?: 'UpsertResponse', message?: string | null, success: boolean } };

export type GetStandardWordingsQueryVariables = Exact<{
  shelfId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetStandardWordingsQuery = { __typename?: 'Query', standardWordings: Array<{ __typename?: 'StandardWording', id: string, shelfId?: string | null, agendaItemTitle: string, createdAt: any, updatedAt?: any | null, createdByUserId: string, updatedByUserId?: string | null, deleted: boolean, options: Array<{ __typename?: 'StandardWordingOption', condition?: string | null, wording: string }>, shelf?: { __typename?: 'Bookshelf', id: string, name?: string | null } | null }> };

export type GetStandardWordingQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetStandardWordingQuery = { __typename?: 'Query', standardWording?: { __typename?: 'StandardWording', id: string, shelfId?: string | null, agendaItemTitle: string, createdAt: any, updatedAt?: any | null, createdByUserId: string, updatedByUserId?: string | null, deleted: boolean, options: Array<{ __typename?: 'StandardWordingOption', condition?: string | null, wording: string }>, shelf?: { __typename?: 'Bookshelf', id: string, name?: string | null } | null } | null };

export type AddStandardWordingMutationVariables = Exact<{
  data: AddStandardWordingInput;
}>;


export type AddStandardWordingMutation = { __typename?: 'Mutation', addStandardWording: { __typename?: 'StandardWording', id: string, shelfId?: string | null, agendaItemTitle: string, createdAt: any, updatedAt?: any | null, createdByUserId: string, updatedByUserId?: string | null, deleted: boolean, options: Array<{ __typename?: 'StandardWordingOption', condition?: string | null, wording: string }>, shelf?: { __typename?: 'Bookshelf', id: string, name?: string | null } | null } };

export type UpdateStandardWordingMutationVariables = Exact<{
  data: UpdateStandardWordingInput;
}>;


export type UpdateStandardWordingMutation = { __typename?: 'Mutation', updateStandardWording: { __typename?: 'StandardWording', id: string, shelfId?: string | null, agendaItemTitle: string, createdAt: any, updatedAt?: any | null, createdByUserId: string, updatedByUserId?: string | null, deleted: boolean, options: Array<{ __typename?: 'StandardWordingOption', condition?: string | null, wording: string }>, shelf?: { __typename?: 'Bookshelf', id: string, name?: string | null } | null } };

export type DeleteStandardWordingMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteStandardWordingMutation = { __typename?: 'Mutation', deleteStandardWording: string };

export type GetTermsOfReferenceQueryVariables = Exact<{
  shelfId: Scalars['ID']['input'];
}>;


export type GetTermsOfReferenceQuery = { __typename?: 'Query', termsOfReference: Array<{ __typename?: 'TermsOfReference', id: string, shelfId: string, meetingDescription?: string | null, quorumDecisionMakers: number, quorumTotalMembers: number, meetingFrequency?: string | null, deliverables?: string | null, createdAt: any, updatedAt?: any | null, createdByUserId: string, updatedByUserId?: string | null, deleted: boolean, shelf: { __typename?: 'Bookshelf', id: string, name?: string | null }, members?: Array<{ __typename?: 'TORMember', id: string, role?: string | null, isDecisionMaker: boolean, user: { __typename?: 'User', id: string, firstName: string } }> | null }> };

export type CreateTermsOfReferenceMutationVariables = Exact<{
  data: TermsOfReferenceInput;
}>;


export type CreateTermsOfReferenceMutation = { __typename?: 'Mutation', createTermsOfReference?: string | null };


export const UpdateAgendaConfigurationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAgendaConfiguration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"configuration"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAgendaConfigurationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAgendaConfiguration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookshelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}}},{"kind":"Argument","name":{"kind":"Name","value":"configuration"},"value":{"kind":"Variable","name":{"kind":"Name","value":"configuration"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"showInvitees"}},{"kind":"Field","name":{"kind":"Name","value":"showTitle"}},{"kind":"Field","name":{"kind":"Name","value":"showDate"}},{"kind":"Field","name":{"kind":"Name","value":"showTime"}},{"kind":"Field","name":{"kind":"Name","value":"showLocation"}},{"kind":"Field","name":{"kind":"Name","value":"showMeetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"showMeetingDetails"}},{"kind":"Field","name":{"kind":"Name","value":"confidentialityFooter"}}]}}]}}]} as unknown as DocumentNode<UpdateAgendaConfigurationMutation, UpdateAgendaConfigurationMutationVariables>;
export const UserActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserActions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userActions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionItem"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"externalAssignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assignedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookshelfId"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinuteId"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"meetingName"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelfName"}},{"kind":"Field","name":{"kind":"Name","value":"bookcaseName"}},{"kind":"Field","name":{"kind":"Name","value":"actionRef"}}]}}]}}]} as unknown as DocumentNode<UserActionsQuery, UserActionsQueryVariables>;
export const GetCarryOverActionItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCarryOverActionItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCarryOverActionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionItem"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"externalAssignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assignedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinuteId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"meetingName"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelfName"}},{"kind":"Field","name":{"kind":"Name","value":"bookcaseName"}},{"kind":"Field","name":{"kind":"Name","value":"actionRef"}}]}}]}}]} as unknown as DocumentNode<GetCarryOverActionItemsQuery, GetCarryOverActionItemsQueryVariables>;
export const GetGuestActionItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGuestActionItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"actionItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGuestActionItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"actionItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"actionItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"actionItem"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"organization"}},{"kind":"Field","name":{"kind":"Name","value":"bookcase"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelf"}},{"kind":"Field","name":{"kind":"Name","value":"meeting"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"update"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"assignee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"forwardedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]}}]} as unknown as DocumentNode<GetGuestActionItemQuery, GetGuestActionItemQueryVariables>;
export const ActionItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActionItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaMinuteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinuteId"}},{"kind":"Field","name":{"kind":"Name","value":"actionItem"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"externalAssignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assignedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"actionRef"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelfName"}},{"kind":"Field","name":{"kind":"Name","value":"bookcaseName"}}]}}]}}]} as unknown as DocumentNode<ActionItemsQuery, ActionItemsQueryVariables>;
export const GetActionLogsForBookshelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActionLogsForBookshelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getActionLogsForBookshelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookshelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meetingId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingName"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"actionItems"}}]}}]}}]} as unknown as DocumentNode<GetActionLogsForBookshelfQuery, GetActionLogsForBookshelfQueryVariables>;
export const AddCarryOverActionLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCarryOverActionLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCarryOverActionLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookshelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}}},{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AddCarryOverActionLogMutation, AddCarryOverActionLogMutationVariables>;
export const UpsertActionItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertActionItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertActionItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertActionItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinuteId"}},{"kind":"Field","name":{"kind":"Name","value":"actionItem"}},{"kind":"Field","name":{"kind":"Name","value":"assignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"externalAssignees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assignedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"update"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpsertActionItemMutation, UpsertActionItemMutationVariables>;
export const UpdateGuestActionItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGuestActionItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGuestActionItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGuestActionItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<UpdateGuestActionItemMutation, UpdateGuestActionItemMutationVariables>;
export const DeleteActionItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteActionItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteActionItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteActionItemMutation, DeleteActionItemMutationVariables>;
export const ForwardActionItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ForwardActionItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForwardActionItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forwardActionItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<ForwardActionItemMutation, ForwardActionItemMutationVariables>;
export const SendActionItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendActionItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendActionItemsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendActionItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"sent"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]}}]} as unknown as DocumentNode<SendActionItemsMutation, SendActionItemsMutationVariables>;
export const AgendasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Agendas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AgendasQuery, AgendasQueryVariables>;
export const AgendasWithPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AgendasWithPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendasWithPermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bookcase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"signatureUploadFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadedFileId"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AgendasWithPermissionsQuery, AgendasWithPermissionsQueryVariables>;
export const AgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Agenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"minutesTemplateVersion"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"showClientCompanyBranding"}},{"kind":"Field","name":{"kind":"Name","value":"bookcase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childAgendaItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childAgendaItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childAgendaItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childAgendaItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"agendaPublishFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendmentNotes"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"previousMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"minutesLanguage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meetingMinuteTranscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transcription"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"highlights"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]}}]} as unknown as DocumentNode<AgendaQuery, AgendaQueryVariables>;
export const MinuteSignaturesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MinuteSignatures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minuteSignatures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaMinuteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signatoryId"}},{"kind":"Field","name":{"kind":"Name","value":"signed"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"signatureUploadFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadedFileId"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<MinuteSignaturesQuery, MinuteSignaturesQueryVariables>;
export const CompanyUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignedIn"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}}]}}]}}]}}]} as unknown as DocumentNode<CompanyUsersQuery, CompanyUsersQueryVariables>;
export const DeleteMinutesAndTranscriptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMinutesAndTranscript"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMinutesAndTranscript"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}]}]}}]} as unknown as DocumentNode<DeleteMinutesAndTranscriptMutation, DeleteMinutesAndTranscriptMutationVariables>;
export const AddReviewToMinutesAmendmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReviewToMinutesAmendment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minutesAmendmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReviewToMinutesAmendment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"minutesAmendmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minutesAmendmentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}}]}}]}}]}}]} as unknown as DocumentNode<AddReviewToMinutesAmendmentMutation, AddReviewToMinutesAmendmentMutationVariables>;
export const UpdateLastSignInDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateLastSignIn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLastSignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}]}]}}]} as unknown as DocumentNode<UpdateLastSignInMutation, UpdateLastSignInMutationVariables>;
export const ResolveMinutesAmendmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResolveMinutesAmendment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minutesAmendmentReviewId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolveMinutesAmendment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"minutesAmendmentReviewId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minutesAmendmentReviewId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ResolveMinutesAmendmentMutation, ResolveMinutesAmendmentMutationVariables>;
export const AddSignatureToMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSignatureToMinutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signatureFile"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSignatureToMinutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaMinuteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"signatureFile"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signatureFile"}}},{"kind":"Argument","name":{"kind":"Name","value":"signedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signedAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"signature"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<AddSignatureToMinutesMutation, AddSignatureToMinutesMutationVariables>;
export const GetCompanyUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignedIn"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<GetCompanyUsersQuery, GetCompanyUsersQueryVariables>;
export const GetAuthorizedCompanyUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuthorizedCompanyUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorizedCompanyUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignedIn"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<GetAuthorizedCompanyUsersQuery, GetAuthorizedCompanyUsersQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CompanyUserResourcePermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyUserResourcePermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyUserResourcePermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"includedPermissionIds"}}]}}]}}]} as unknown as DocumentNode<CompanyUserResourcePermissionsQuery, CompanyUserResourcePermissionsQueryVariables>;
export const AgendaMinuteByAgendaIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AgendaMinuteByAgendaId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaMinuteByAgendaId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"previousMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"minutesLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AgendaMinuteByAgendaIdQuery, AgendaMinuteByAgendaIdQueryVariables>;
export const AgendaAttendeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AgendaAttendee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaAttendee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"attendeeId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<AgendaAttendeeQuery, AgendaAttendeeQueryVariables>;
export const IsUserAttendeeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUserAttendee"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUserAttendee"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<IsUserAttendeeQuery, IsUserAttendeeQueryVariables>;
export const AgendaItemUploadedFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AgendaItemUploadedFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaItemUploadedFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<AgendaItemUploadedFilesQuery, AgendaItemUploadedFilesQueryVariables>;
export const AgendaItemRequestedFilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AgendaItemRequestedFiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaItemRequestedFiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"uploader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"uploadedFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"uploadedFileId"}}]}}]}}]} as unknown as DocumentNode<AgendaItemRequestedFilesQuery, AgendaItemRequestedFilesQueryVariables>;
export const UpdateAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAgendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAgendaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAgendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateAgendaMutation, UpdateAgendaMutationVariables>;
export const AddHighlightDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddHighlight"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addHighlight"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"Argument","name":{"kind":"Name","value":"isPublic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode<AddHighlightMutation, AddHighlightMutationVariables>;
export const RemoveAllHighlightsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveAllHighlights"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAllHighlights"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveAllHighlightsMutation, RemoveAllHighlightsMutationVariables>;
export const RemoveHighlightDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveHighlight"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeHighlightId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeHighlight"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeHighlightId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveHighlightMutation, RemoveHighlightMutationVariables>;
export const UpdateHighlightDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHighlight"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateHighlightId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHighlight"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateHighlightId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}},{"kind":"Argument","name":{"kind":"Name","value":"isPublic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode<UpdateHighlightMutation, UpdateHighlightMutationVariables>;
export const UpdateHighlightVisibilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateHighlightVisibility"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"highlightId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateHighlightVisibility"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"highlightId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"highlightId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isPublic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}}]}}]}}]} as unknown as DocumentNode<UpdateHighlightVisibilityMutation, UpdateHighlightVisibilityMutationVariables>;
export const DownloadMinutesAsWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DownloadMinutesAsWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadMinutesAsWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}]}]}}]} as unknown as DocumentNode<DownloadMinutesAsWordMutation, DownloadMinutesAsWordMutationVariables>;
export const AddAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddAgendaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookshelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"showClientCompanyBranding"}},{"kind":"Field","name":{"kind":"Name","value":"bookcase"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"childAgendaItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCount"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"agendaPublishFile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reviewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reviews"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"minutesAmendmentNotes"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"previousMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meetingMinuteTranscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transcription"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AddAgendaMutation, AddAgendaMutationVariables>;
export const DeactivateCompanyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeactivateCompanyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deactivateCompanyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<DeactivateCompanyUserMutation, DeactivateCompanyUserMutationVariables>;
export const PublishAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PublishAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"attendeesId"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"guestIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendNotification"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"meetingDetails"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AgendaEmailTemplateInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"logoType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogoType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"noticeType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publishAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"attendeesId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"attendeesId"}}},{"kind":"Argument","name":{"kind":"Name","value":"guestIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"guestIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"sendNotification"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendNotification"}}},{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}},{"kind":"Argument","name":{"kind":"Name","value":"meetingDetails"},"value":{"kind":"Variable","name":{"kind":"Name","value":"meetingDetails"}}},{"kind":"Argument","name":{"kind":"Name","value":"logoType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"logoType"}}},{"kind":"Argument","name":{"kind":"Name","value":"noticeType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"noticeType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<PublishAgendaMutation, PublishAgendaMutationVariables>;
export const AddBookcaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBookcase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddBookcaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBookcase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"agendas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddBookcaseMutation, AddBookcaseMutationVariables>;
export const UpsertCompanyUserShelfPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertCompanyUserShelfPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shelfPermissions"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShelfPermissionInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertCompanyUserShelfPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"shelfPermissions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shelfPermissions"}}}]}]}}]} as unknown as DocumentNode<UpsertCompanyUserShelfPermissionMutation, UpsertCompanyUserShelfPermissionMutationVariables>;
export const UpsertCompanyUserResourcePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertCompanyUserResourcePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedRoles"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removedRoles"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourcePermissions"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResourcePermissionInput"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertCompanyUserResourcePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"assignedRoles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedRoles"}}},{"kind":"Argument","name":{"kind":"Name","value":"removedRoles"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removedRoles"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourcePermissions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourcePermissions"}}}]}]}}]} as unknown as DocumentNode<UpsertCompanyUserResourcePermissionMutation, UpsertCompanyUserResourcePermissionMutationVariables>;
export const AgendaItemsByAgendaIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AgendaItemsByAgendaId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"agendaItemsByAgendaId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AgendaItemsByAgendaIdQuery, AgendaItemsByAgendaIdQueryVariables>;
export const BookcasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Bookcases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookcases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"showClientCompanyBranding"}},{"kind":"Field","name":{"kind":"Name","value":"agendas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<BookcasesQuery, BookcasesQueryVariables>;
export const DeleteBookcaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookcase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteBookcaseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookcase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteBookcaseId"}}}]}]}}]} as unknown as DocumentNode<DeleteBookcaseMutation, DeleteBookcaseMutationVariables>;
export const UpdateBookcaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookcase"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBookcaseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookcase"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBookcaseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateBookcaseMutation, UpdateBookcaseMutationVariables>;
export const AddBookshelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddBookshelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookcaseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddBookshelfInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addBookshelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookcaseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookcaseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"agendas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddBookshelfMutation, AddBookshelfMutationVariables>;
export const DeleteBookshelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookshelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteBookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookshelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteBookshelfId"}}}]}]}}]} as unknown as DocumentNode<DeleteBookshelfMutation, DeleteBookshelfMutationVariables>;
export const RemoveBookshelfLogoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveBookshelfLogo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeBookshelfLogoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeBookshelfLogo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeBookshelfLogoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<RemoveBookshelfLogoMutation, RemoveBookshelfLogoMutationVariables>;
export const UpdateBookshelfDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookshelf"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateBookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateBookshelfInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookshelf"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateBookshelfId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<UpdateBookshelfMutation, UpdateBookshelfMutationVariables>;
export const CreateOrUpdateAgendaMinuteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrUpdateAgendaMinute"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrUpdateAgendaMinuteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateAgendaMinute"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"staleData"}}]}}]}}]} as unknown as DocumentNode<CreateOrUpdateAgendaMinuteMutation, CreateOrUpdateAgendaMinuteMutationVariables>;
export const UpdateOriginalMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOriginalMinutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrUpdateAgendaMinuteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOriginalMinutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minutes"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}}]}}]}}]} as unknown as DocumentNode<UpdateOriginalMinutesMutation, UpdateOriginalMinutesMutationVariables>;
export const GenerateMinutesFromCustomPromptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateMinutesFromCustomPrompt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateMinutesFromCustomPrompt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"prompt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prompt"}}}]}]}}]} as unknown as DocumentNode<GenerateMinutesFromCustomPromptMutation, GenerateMinutesFromCustomPromptMutationVariables>;
export const RequestSignatureForMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestSignatureForMinutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signatories"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signatureRequestNotes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sendNotification"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestSignatureForMinutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaMinuteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"signatories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signatories"}}},{"kind":"Argument","name":{"kind":"Name","value":"signatureRequestNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signatureRequestNotes"}}},{"kind":"Argument","name":{"kind":"Name","value":"sendNotification"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sendNotification"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RequestSignatureForMinutesMutation, RequestSignatureForMinutesMutationVariables>;
export const AddReviewersToMinutesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddReviewersToMinutes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"minutesAmendmentNotes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reviewerIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addReviewersToMinutes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"agendaMinuteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaMinuteId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"minutesAmendmentNotes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"minutesAmendmentNotes"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"reviewerIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reviewerIds"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"minutesAmendments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reviewerId"}}]}}]}}]}}]} as unknown as DocumentNode<AddReviewersToMinutesMutation, AddReviewersToMinutesMutationVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSaveAndExit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}},{"kind":"Argument","name":{"kind":"Name","value":"isSaveAndExit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSaveAndExit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignedIn"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const AddUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"users"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"users"},"value":{"kind":"Variable","name":{"kind":"Name","value":"users"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignedIn"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}}]}}]}}]}}]} as unknown as DocumentNode<AddUsersMutation, AddUsersMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignedIn"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const GenerateResetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateResetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateResetToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<GenerateResetTokenMutation, GenerateResetTokenMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"currentPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"resetToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<CreateUserPasswordMutation, CreateUserPasswordMutationVariables>;
export const ResetUserPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetUserPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resetToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetUserPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resetToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resetToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}]}]}}]} as unknown as DocumentNode<ResetUserPasswordMutation, ResetUserPasswordMutationVariables>;
export const UploadAgendaItemFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadAgendaItemFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadAgendaItemFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadAgendaItemFileMutation, UploadAgendaItemFileMutationVariables>;
export const UploadAgendaItemRequestedFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadAgendaItemRequestedFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemFileRequestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"files"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UploadFileInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadAgendaItemRequestedFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"agendaItemFileRequestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemFileRequestId"}}},{"kind":"Argument","name":{"kind":"Name","value":"files"},"value":{"kind":"Variable","name":{"kind":"Name","value":"files"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"extension"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<UploadAgendaItemRequestedFileMutation, UploadAgendaItemRequestedFileMutationVariables>;
export const RequestAgendaItemFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestAgendaItemFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requesteeIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestAgendaItemFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"agendaItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"requesteeIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requesteeIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"deadline"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deadline"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}]}}]} as unknown as DocumentNode<RequestAgendaItemFileMutation, RequestAgendaItemFileMutationVariables>;
export const DeleteAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}]}]}}]} as unknown as DocumentNode<DeleteAgendaMutation, DeleteAgendaMutationVariables>;
export const ArchiveAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ArchiveAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"archiveAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"meetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}}]}}]}}]} as unknown as DocumentNode<ArchiveAgendaMutation, ArchiveAgendaMutationVariables>;
export const CloneAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CloneAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cloneAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookshelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}}},{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CloneAgendaMutation, CloneAgendaMutationVariables>;
export const ActivateCompanyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateCompanyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateCompanyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<ActivateCompanyUserMutation, ActivateCompanyUserMutationVariables>;
export const DeleteAgendaItemFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAgendaItemFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAgendaItemFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fileId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileId"}}}]}]}}]} as unknown as DocumentNode<DeleteAgendaItemFileMutation, DeleteAgendaItemFileMutationVariables>;
export const AddCompanyWithUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCompanyWithUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddCompanyInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCompanyWithUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyInput"}}},{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}}]}}]}}]} as unknown as DocumentNode<AddCompanyWithUserMutation, AddCompanyWithUserMutationVariables>;
export const CompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CompaniesQuery, CompaniesQueryVariables>;
export const ReInviteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ReInviteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSystemAdmin"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reInviteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isSystemAdmin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSystemAdmin"}}}]}]}}]} as unknown as DocumentNode<ReInviteUserMutation, ReInviteUserMutationVariables>;
export const DeleteCompanyUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCompanyUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCompanyUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<DeleteCompanyUserMutation, DeleteCompanyUserMutationVariables>;
export const AuthorizedBookcasesByRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthorizedBookcasesByRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorizedBookcasesByRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"agendas"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDate"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortname"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"agendaMinute"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"signatures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signed"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AuthorizedBookcasesByRoleQuery, AuthorizedBookcasesByRoleQueryVariables>;
export const AddMinutesTemplateVersionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddMinutesTemplateVersion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"templateVersion"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MinutesTemplateVersion"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMinutesTemplateVersion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"templateVersion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"templateVersion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"minutesTemplateVersion"}}]}}]}}]} as unknown as DocumentNode<AddMinutesTemplateVersionMutation, AddMinutesTemplateVersionMutationVariables>;
export const GetAgendaConfigurationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAgendaConfiguration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAgendaConfiguration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"bookshelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bookshelfId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showInvitees"}},{"kind":"Field","name":{"kind":"Name","value":"showTitle"}},{"kind":"Field","name":{"kind":"Name","value":"showDate"}},{"kind":"Field","name":{"kind":"Name","value":"showTime"}},{"kind":"Field","name":{"kind":"Name","value":"showLocation"}},{"kind":"Field","name":{"kind":"Name","value":"showMeetingLink"}},{"kind":"Field","name":{"kind":"Name","value":"showMeetingDetails"}},{"kind":"Field","name":{"kind":"Name","value":"confidentialityFooter"}}]}}]}}]} as unknown as DocumentNode<GetAgendaConfigurationQuery, GetAgendaConfigurationQueryVariables>;
export const AddAgendaItemsToAgendaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddAgendaItemsToAgenda"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddAgendaItemInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAgendaItemsToAgenda"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AddAgendaItemsToAgendaMutation, AddAgendaItemsToAgendaMutationVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddAgendaItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addAgendaItemToAgendaItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaItemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const UpdateAgendaItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAgendaItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAgendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAgendaItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAgendaItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAgendaItemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"agendaId"}},{"kind":"Field","name":{"kind":"Name","value":"parentAgendaItemId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateAgendaItemMutation, UpdateAgendaItemMutationVariables>;
export const DeleteAgendaItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAgendaItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteAgendaItemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAgendaItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteAgendaItemId"}}}]}]}}]} as unknown as DocumentNode<DeleteAgendaItemMutation, DeleteAgendaItemMutationVariables>;
export const DeleteTranscriptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTranscript"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTranscript"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}}]}]}}]} as unknown as DocumentNode<DeleteTranscriptMutation, DeleteTranscriptMutationVariables>;
export const GetAzureAdConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAzureAdConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAzureAdConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"tenantId"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"redirectUri"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"needsSecretUpdate"}}]}}]}}]} as unknown as DocumentNode<GetAzureAdConfigQuery, GetAzureAdConfigQueryVariables>;
export const CreateAzureAdConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAzureAdConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAzureAdConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAzureAdConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"tenantId"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"redirectUri"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"needsSecretUpdate"}}]}}]}}]} as unknown as DocumentNode<CreateAzureAdConfigMutation, CreateAzureAdConfigMutationVariables>;
export const UpdateAzureAdConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAzureAdConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAzureAdConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAzureAdConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"tenantId"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"redirectUri"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"needsSecretUpdate"}}]}}]}}]} as unknown as DocumentNode<UpdateAzureAdConfigMutation, UpdateAzureAdConfigMutationVariables>;
export const UpdateCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCompanyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCompanyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCompanyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateCompanyMutation, UpdateCompanyMutationVariables>;
export const CompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Company"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"website"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CompanyQuery, CompanyQueryVariables>;
export const RemoveCompanyLogoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCompanyLogo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCompanyLogoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCompanyLogo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCompanyLogoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<RemoveCompanyLogoMutation, RemoveCompanyLogoMutationVariables>;
export const CompanyStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompanyStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalBookshelves"}},{"kind":"Field","name":{"kind":"Name","value":"totalBookcases"}},{"kind":"Field","name":{"kind":"Name","value":"totalAgendas"}},{"kind":"Field","name":{"kind":"Name","value":"totalMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginTime"}},{"kind":"Field","name":{"kind":"Name","value":"lastLoginUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"activeUsers"}}]}}]}}]} as unknown as DocumentNode<CompanyStatisticsQuery, CompanyStatisticsQueryVariables>;
export const DeleteCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteCompanyMutation, DeleteCompanyMutationVariables>;
export const UpsertEmailNoticeTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertEmailNoticeTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertEmailNoticeTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertEmailNoticeTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"shelfId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"variables"}},{"kind":"Field","name":{"kind":"Name","value":"useShelfNotice"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpsertEmailNoticeTemplateMutation, UpsertEmailNoticeTemplateMutationVariables>;
export const GetEmailNoticeTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEmailNoticeTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEmailNoticeTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"shelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"shelfId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"variables"}},{"kind":"Field","name":{"kind":"Name","value":"useShelfNotice"}}]}}]}}]} as unknown as DocumentNode<GetEmailNoticeTemplateQuery, GetEmailNoticeTemplateQueryVariables>;
export const SendPreviewEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPreviewEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendPreviewEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendPreviewEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendPreviewEmailMutation, SendPreviewEmailMutationVariables>;
export const GroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Groups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperGroup"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"managers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GroupsQuery, GroupsQueryVariables>;
export const UserGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UserGroupsQuery, UserGroupsQueryVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"managerIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSuperGroup"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoAddCurrentUserAsAdmin"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"managerIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"managerIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isSuperGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSuperGroup"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"autoAddCurrentUserAsAdmin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoAddCurrentUserAsAdmin"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperGroup"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"managers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"managerIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isSuperGroup"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoAddCurrentUserAsAdmin"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"managerIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"managerIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userIds"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"isSuperGroup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isSuperGroup"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"autoAddCurrentUserAsAdmin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoAddCurrentUserAsAdmin"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperGroup"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"managers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const DeleteGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const UpsertGroupResourcePermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertGroupResourcePermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourcePermissions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResourcePermissionInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertGroupResourcePermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourcePermissions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourcePermissions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"isSuperGroup"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"managers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<UpsertGroupResourcePermissionsMutation, UpsertGroupResourcePermissionsMutationVariables>;
export const GroupResourcePermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupResourcePermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupResourcePermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}}]}}]}}]} as unknown as DocumentNode<GroupResourcePermissionsQuery, GroupResourcePermissionsQueryVariables>;
export const UsersInManagedGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UsersInManagedGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersInManagedGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"telephone"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"accountStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastSignedIn"}},{"kind":"Field","name":{"kind":"Name","value":"provider"}}]}}]}}]}}]} as unknown as DocumentNode<UsersInManagedGroupsQuery, UsersInManagedGroupsQueryVariables>;
export const GroupBookcasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupBookcases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderByClause"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupBookcases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bookshelves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GroupBookcasesQuery, GroupBookcasesQueryVariables>;
export const GetOktaConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOktaConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOktaConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationDomain"}},{"kind":"Field","name":{"kind":"Name","value":"oktaOrgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"oktaClientId"}},{"kind":"Field","name":{"kind":"Name","value":"needsTokenUpdate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetOktaConfigQuery, GetOktaConfigQueryVariables>;
export const CreateOktaConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOktaConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOktaConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOktaConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationDomain"}},{"kind":"Field","name":{"kind":"Name","value":"oktaOrgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"oktaClientId"}},{"kind":"Field","name":{"kind":"Name","value":"needsTokenUpdate"}}]}}]}}]} as unknown as DocumentNode<CreateOktaConfigMutation, CreateOktaConfigMutationVariables>;
export const UpdateOktaConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOktaConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOktaConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOktaConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationDomain"}},{"kind":"Field","name":{"kind":"Name","value":"oktaOrgUrl"}},{"kind":"Field","name":{"kind":"Name","value":"oktaClientId"}},{"kind":"Field","name":{"kind":"Name","value":"needsTokenUpdate"}}]}}]}}]} as unknown as DocumentNode<UpdateOktaConfigMutation, UpdateOktaConfigMutationVariables>;
export const DeleteOktaConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOktaConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOktaConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}]}]}}]} as unknown as DocumentNode<DeleteOktaConfigMutation, DeleteOktaConfigMutationVariables>;
export const GetOktaOidcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOktaOidcConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOktaOidcConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"redirectUri"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"needsSecretUpdate"}}]}}]}}]} as unknown as DocumentNode<GetOktaOidcConfigQuery, GetOktaOidcConfigQueryVariables>;
export const CreateOktaOidcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOktaOidcConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOktaOidcConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOktaOidcConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"redirectUri"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateOktaOidcConfigMutation, CreateOktaOidcConfigMutationVariables>;
export const UpdateOktaOidcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOktaOidcConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOktaOidcConfigInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOktaOidcConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"companyId"}},{"kind":"Field","name":{"kind":"Name","value":"issuer"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"redirectUri"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"needsSecretUpdate"}}]}}]}}]} as unknown as DocumentNode<UpdateOktaOidcConfigMutation, UpdateOktaOidcConfigMutationVariables>;
export const DeleteOktaOidcConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOktaOidcConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOktaOidcConfig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}}]}]}}]} as unknown as DocumentNode<DeleteOktaOidcConfigMutation, DeleteOktaOidcConfigMutationVariables>;
export const RolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]} as unknown as DocumentNode<RolesQuery, RolesQueryVariables>;
export const GetUsersWithShelfPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersWithShelfPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getAllUsers"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersByCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"shelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}}},{"kind":"Argument","name":{"kind":"Name","value":"getAllUsers"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getAllUsers"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"CompanyUserResourcePermission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissionId"}},{"kind":"Field","name":{"kind":"Name","value":"hasPermission"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersWithShelfPermissionsQuery, GetUsersWithShelfPermissionsQueryVariables>;
export const FetchCompanyUsersWithAgendaPermissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchCompanyUsersWithAgendaPermissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemIds"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fetchCompanyUsersWithAgendaPermissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"agendaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaId"}}},{"kind":"Argument","name":{"kind":"Name","value":"agendaItemIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agendaItemIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"CompanyUserResourcePermission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resourceId"}},{"kind":"Field","name":{"kind":"Name","value":"resourceType"}},{"kind":"Field","name":{"kind":"Name","value":"permissionId"}},{"kind":"Field","name":{"kind":"Name","value":"hasPermission"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchCompanyUsersWithAgendaPermissionsQuery, FetchCompanyUsersWithAgendaPermissionsQueryVariables>;
export const UpsertRestrictedAgendaResourcePermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertRestrictedAgendaResourcePermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourcePermissions"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RestrictedResourcePermissionInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertRestrictedAgendaResourcePermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"companyId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"companyId"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourcePermissions"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourcePermissions"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UpsertRestrictedAgendaResourcePermissionMutation, UpsertRestrictedAgendaResourcePermissionMutationVariables>;
export const GetStandardWordingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStandardWordings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"standardWordings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shelfId"}},{"kind":"Field","name":{"kind":"Name","value":"agendaItemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"wording"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"shelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetStandardWordingsQuery, GetStandardWordingsQueryVariables>;
export const GetStandardWordingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStandardWording"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"standardWording"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shelfId"}},{"kind":"Field","name":{"kind":"Name","value":"agendaItemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"wording"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"shelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetStandardWordingQuery, GetStandardWordingQueryVariables>;
export const AddStandardWordingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddStandardWording"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddStandardWordingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addStandardWording"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shelfId"}},{"kind":"Field","name":{"kind":"Name","value":"agendaItemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"wording"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"shelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddStandardWordingMutation, AddStandardWordingMutationVariables>;
export const UpdateStandardWordingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStandardWording"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStandardWordingInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStandardWording"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shelfId"}},{"kind":"Field","name":{"kind":"Name","value":"agendaItemTitle"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"wording"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"shelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateStandardWordingMutation, UpdateStandardWordingMutationVariables>;
export const DeleteStandardWordingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStandardWording"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStandardWording"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteStandardWordingMutation, DeleteStandardWordingMutationVariables>;
export const GetTermsOfReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTermsOfReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"termsOfReference"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"shelfId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shelfId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shelfId"}},{"kind":"Field","name":{"kind":"Name","value":"meetingDescription"}},{"kind":"Field","name":{"kind":"Name","value":"quorumDecisionMakers"}},{"kind":"Field","name":{"kind":"Name","value":"quorumTotalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"meetingFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"deliverables"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByUserId"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}},{"kind":"Field","name":{"kind":"Name","value":"shelf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isDecisionMaker"}}]}}]}}]}}]} as unknown as DocumentNode<GetTermsOfReferenceQuery, GetTermsOfReferenceQueryVariables>;
export const CreateTermsOfReferenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTermsOfReference"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TermsOfReferenceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTermsOfReference"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<CreateTermsOfReferenceMutation, CreateTermsOfReferenceMutationVariables>;