import {Context} from '@/graphql/v1';
import {sendSingleEmail} from '@/src/lib/email-sender/sendSingleEmail';
import {
  templates,
  productName,
  currentYear,
} from '@/src/lib/email-sender/constants';
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '@/src/errors';
import {errorMessages} from '@/constants';
import {oktaConfigRepository} from '@/src/lib/repositories';

interface AddUserInput {
  email: string;
  firstName: string;
  lastName: string;
  telephone?: string;
  provider?: string;
  groupId?: string;
}

const addUser = async (_: any, args: any, context: Context) => {
  const {user, companyId, isSaveAndExit} = args;
  const {email, firstName, lastName, telephone, provider, groupId} =
    user as AddUserInput;
  const {userId: loggedInUserId, origin, serviceLocator} = context;
  const {usersService} = serviceLocator;

  if (!loggedInUserId) {
    throw new UnauthorizedError(errorMessages.userNotFound);
  }

  if (!companyId || !email || !firstName || !lastName || !provider) {
    throw new BadRequestError(
      errorMessages.missingRequiredFields([
        'company',
        'email',
        'firstName',
        'lastName',
        'provider',
        'group',
      ]),
    );
  }

  try {
    const loggedInUserWithCompany = await usersService.getUserWithCompany(
      {userId: loggedInUserId},
      companyId,
    );
    if (!loggedInUserWithCompany) {
      throw new UnauthorizedError(errorMessages.userNotInCompany);
    }

    const newUserWithCompany = await usersService.getUserWithCompany(
      {email},
      companyId,
    );
    if (newUserWithCompany) {
      throw new UnauthorizedError(errorMessages.emailExist);
    }

    const {user: loggedInUser, company} = loggedInUserWithCompany;

    const hashedPassword = await usersService.generateAndHashPassword();

    // if (provider?.includes('okta')) {
    //   const oktaResult = await oktaConfigRepository.provisionOktaUser({
    //     email,
    //     firstName,
    //     lastName,
    //     companyId: companyId,
    //   });

    //   if (!oktaResult.success) {
    //     throw new Error(oktaResult.message);
    //   }
    // }

    const createdUser = await usersService.addUser({
      email,
      firstName,
      lastName,
      telephone,
      companyId,
      password: hashedPassword,
      provider,
      createdByUserId: loggedInUser.id,
      groupId,
    });

    if (isSaveAndExit) {
      return createdUser;
    }

    const {id: userId} = createdUser;
    const actionUrl = origin;
    const inviterName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    const companyName = company.name;
    const emailTemplate = {
      name: `${createdUser?.firstName} ${createdUser?.lastName}`,
      inviter_name: inviterName,
      company_name: companyName,
      product_name: productName,
      current_year: currentYear,
      expires_in: process.env.TOKEN_EXPIRATION_TIME,
    };

    const userCompaniesCount = await usersService.countUserCompanies(userId);

    if (userCompaniesCount > 1) {
      if (provider?.includes('credentials') && provider?.includes('azure-ad')) {
        await sendSingleEmail(email, templates.credsAndAzureWelcome, {
          action_url: actionUrl,
          action_url_2: actionUrl,
          ...emailTemplate,
        });
        return createdUser;
      }
      (!provider || provider?.includes('credentials')) &&
        (await sendSingleEmail(
          email,
          templates.existingUserPasswordTemplateId,
          {
            action_url: actionUrl,
            ...emailTemplate,
          },
        ));
      provider &&
        provider?.includes('azure-ad') &&
        (await sendSingleEmail(email, templates.azureSSOWelcome, {
          ...emailTemplate,
          action_url: actionUrl,
          expires_in: '',
        }));
      return createdUser;
    }

    const token = usersService.generateToken(userId);

    await usersService.upsertPasswordResetToken(userId, token);

    const createPasswordUrl = `${origin}/create-password/${token}/${companyId}`;

    if (provider?.includes('okta')) {
      await sendSingleEmail(email, templates.newUserPasswordTemplateId, {
        action_url: createPasswordUrl + '?okta=true',
        ...emailTemplate,
      });
    }

    if (provider?.includes('okta')) {
      await oktaConfigRepository.provisionOktaUser({
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        companyId: context.companyId!,
      });
      await sendSingleEmail(email, templates.newUserPasswordTemplateId, {
        action_url: createPasswordUrl + '?okta=true',
        ...emailTemplate,
      });

      return createdUser;
    }

    if (provider?.includes('credentials') && provider?.includes('azure-ad')) {
      await sendSingleEmail(email, templates.credsAndAzureWelcome, {
        action_url: createPasswordUrl,
        action_url_2: actionUrl,
        ...emailTemplate,
      });
      return createdUser;
    }

    (!provider || provider?.includes('credentials')) &&
      (await sendSingleEmail(email, templates.newUserPasswordTemplateId, {
        action_url: createPasswordUrl,
        ...emailTemplate,
      }));

    provider &&
      provider?.includes('azure-ad') &&
      (await sendSingleEmail(email, templates.azureSSOWelcome, {
        ...emailTemplate,
        action_url: actionUrl,
        expires_in: '',
      }));

    return createdUser;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

export default addUser;
