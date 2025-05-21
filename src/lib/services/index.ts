import db from '@/prisma/db';
import RolesService from './Roles';
import FilesService from './Files';
import AgendaItemsService from './AgendaItems';
import UsersService from './Users';
import CompaniesService from './Companies';
import PermissionsService from './Permissions';
import CompanyUserResourcePermissionService from './CompanyUserResourcePermission';
import DupCompanyUserResourcePermissionService from './DuplicateCompanyUserResourcePermission';
import { PrismaClient } from '@prisma/client';
import PasswordResetService from './PasswordReset';
import GroupsService from './Groups';
import StandardWordingsService from './StandardWordings';
import TermsOfReferenceService from './TermsOfReferences';
import ActionItemsService from './ActionItems';
import EmailNoticesService from './EmailNoticesService';

export default class ServiceLocator {
  private client: PrismaClient;

  public rolesService: RolesService;
  public filesService: FilesService;
  public agendaItemsService: AgendaItemsService;
  public usersService: UsersService;
  public companiesService: CompaniesService;
  public permissionsService: PermissionsService;
  public companyUserResourcePermissionService: CompanyUserResourcePermissionService;
  public dupCompanyUserResourcePermissionService: DupCompanyUserResourcePermissionService;
  public passwordResetService: PasswordResetService;
  public groupsService: GroupsService;
  public standardWordingsService: StandardWordingsService;
  public termsOfReferenceService: TermsOfReferenceService;
  public actionItemsService: ActionItemsService;
  public emailNoticesService: EmailNoticesService;

  constructor(client: PrismaClient) {
    this.client = client;

    this.rolesService = new RolesService(client);
    this.filesService = new FilesService(client);
    this.agendaItemsService = new AgendaItemsService(client);
    this.usersService = new UsersService(client);
    this.companiesService = new CompaniesService(client);
    this.permissionsService = new PermissionsService(client);
    this.companyUserResourcePermissionService =
      new CompanyUserResourcePermissionService(client);
    this.dupCompanyUserResourcePermissionService =
      new DupCompanyUserResourcePermissionService(client);
    this.passwordResetService = new PasswordResetService(
      client,
      this.usersService,
    );
    this.groupsService = new GroupsService(client);
    this.standardWordingsService = new StandardWordingsService(client);
    this.actionItemsService = new ActionItemsService(client);
    this.termsOfReferenceService = new TermsOfReferenceService(client);
    this.emailNoticesService = new EmailNoticesService(client);
  }
}

export const Users = new UsersService(db);
