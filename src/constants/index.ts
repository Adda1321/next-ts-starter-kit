import {Session} from 'next-auth';
import {ICONS} from './IconObj';
import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {getInitials} from '@/src/components/TipTap/library/TipTapHelperFunc';
import {GroupedAttendees} from '@/src/types';
import {ListAgendaItem} from '@/src/features/agendas/agenda-lib';
import {MinutesTemplateVersion} from '@/src/components/TipTap/AgendaData';
import {Agenda} from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const PATH_DASHBOARD = {
  root: '/bookcase',
  people: '/people',
  ssoManagement: '/sso-management',
  createAgenda: '/agenda',
  editAgenda: '/agenda/edit',
  manageMinutes: '/minute-management-board',
  settings: '/settings',
  profile: '/profile',
  produceMeetingMinutes: '/produce-meeting-minutes',
  addMultipleUsers: '/add-multiple-users',
  userManagement: '/user-management',
  companySettings: '/company-settings',
  actions: '/actions',
};

export const sidebarLinks = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      {
        title: 'Bookcases',
        path: PATH_DASHBOARD.root,
        // privilege: ['R', 'PM', 'MM', 'UA'],
        icon: ICONS.bookcase,
        children: [],
      },
      {
        title: 'Create Agenda',
        path: PATH_DASHBOARD.editAgenda,
        privilege: ['PM', 'MM', 'UA'],
        icon: ICONS.addBookcase,
        children: [],
      },
      {
        title: 'Edit Agenda',
        path: PATH_DASHBOARD.createAgenda,
        privilege: ['R', 'PM'],
        icon: ICONS.addBookcase,
        children: [],
        hide: true,
      },
      {
        title: 'Manage Minutes',
        path: PATH_DASHBOARD.manageMinutes,
        privilege: ['MM'],
        icon: ICONS.bookmark,
      },
      {
        title: 'My Actions',
        path: PATH_DASHBOARD.actions,
        icon: ICONS.actions,
      },
      {
        title: 'People',
        path: PATH_DASHBOARD.people,
        icon: ICONS.person,
        privilege: ['UA', 'GSA'],
      },
      {
        title: 'Profile',
        path: PATH_DASHBOARD.profile,
        icon: ICONS.person,
        hide: true,
      },
      {
        title: 'Produce Meeting minutes',
        path: PATH_DASHBOARD.produceMeetingMinutes,
        icon: ICONS.person,
        privilege: ['MM'],
        hide: true,
      },
      {
        title: 'Add multiple users',
        path: PATH_DASHBOARD.addMultipleUsers,
        icon: ICONS.person,
        privilege: ['UA', 'GSA'],
        hide: true,
      },
      {
        title: 'User Management',
        path: PATH_DASHBOARD.userManagement,
        icon: ICONS.person,
        privilege: ['UA', 'GSA'],
        hide: true,
      },
      {
        title: 'Company Settings',
        path: PATH_DASHBOARD.companySettings,
        icon: ICONS.settings,
        privilege: ['GSA'],
        hide: true,
      },
      {
        title: 'SSO Management',
        path: PATH_DASHBOARD.ssoManagement,
        icon: ICONS.settings,
        privilege: ['GSA'],
        hide: true,
      },
    ],
  },
];

export const MAX_FILTER_LIMIT = 20;

export const DEFAULT_LOCALE = 'en-gb';

const getMissingRequiredFieldsError = (fields: string[]): string => {
  return `Missing required data: ${fields.join(', ')}`;
};

export const errorMessages = {
  credentialsNotEnabled: 'You are not authorised to log in with credentials.',
  oktaNotEnabled: 'You are not authorised to log in with Okta.',
  ssoNotEnabled: 'You are not authorised to log in with Microsoft SSO.',
  userNotFound: 'We could not find a user matching the provided details.',
  userDeactivatedOrSuspendedOrDisabled:
    'Your account is currently disabled, deactivated or suspended. For assistance, please reach out to your company administrator for further details or support.',
  genericAuthError: 'Authentication failed',
  userNotInCompany: 'User does not belong to the company',
  companyNameNotFound: 'Company name not found',
  passwordLinkExpired:
    'Your password reset link has expired. Please request a new one.',
  emailExist: 'This email address is already in use by another user',
  missingRequiredFields: (fields: string[]) =>
    getMissingRequiredFieldsError(fields),
  companyNotFound: 'Company not found',
};

export const returnMessages = {
  accountNotExists: `If an account exists, an email will be sent with further
              instructions.`,
};

export const permissionMapping: {[key: string]: string[]} = {
  R: ['packs:read'],
  PM: ['packs:write'],
  MM: ['minutes:write'],
  UA: ['users:write'],
};

export const fetchProtectedData = async (session: Session | null) =>
  new Promise(async (resolve, reject) => {
    if (!session) return;

    try {
      const res = await fetch('/api/v1/token', {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch protected data');
      }

      const data = await res.json();
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

export // Helper function to read a file as text
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as text.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };
    reader.readAsText(file);
  });
};

// Helper function to read a file as ArrayBuffer
export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (result instanceof ArrayBuffer) {
        resolve(result);
      } else {
        reject(new Error('Failed to read file as ArrayBuffer.'));
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file.'));
    };
    reader.readAsArrayBuffer(file);
  });
};

export const capitalizeFirstLetter = (
  input: string | null | undefined,
): string | null | undefined => {
  if (!input) {
    return input;
  }
  const trimmedInput = input?.trim();

  return trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1);
};

export const twoTabs =
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

export const handleScrollToElement = (id: string) => {
  const element = document.getElementById(id?.trim()?.toLowerCase());
  if (element) {
    element.scrollIntoView({behavior: 'smooth'});
  }
};

export const handleBack = (router: AppRouterInstance, route: string = '/') => {
  if (window.history.state) {
    router.back();
  } else {
    router.push(route);
  }
};

export const urlPattern =
  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/;

export const uploadCompanyLogo = (file?: File | null) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (file) {
      // Define what happens when the reader successfully reads the file
      reader.onload = async () => {
        try {
          const fileContent = reader.result as string;
          const base64Content = fileContent.split(',')[1];

          const fileNameParts = file.name.split('.');
          const extension = fileNameParts.pop() || '';

          const fileInput = {
            name: file.name,
            extension: extension,
            base64Content: base64Content,
          };
          resolve(fileInput);
        } catch (error) {
          reject(error);
        }
      };

      // Start reading the file as a Data URL (this triggers reader.onload)
      reader.readAsDataURL(file);
    } else {
      resolve(null);
    }
  });

export const getLogoUrl = (logoPath: string): string => {
  if (!logoPath) {
    return '';
  }
  const baseUrl = `${window.location.origin}/api/v1/company-logo/`;
  return `${baseUrl}${logoPath}`;
};

export const groupAttendeesByStatus = (attendees: any) => {
  const grouped: GroupedAttendees = {
    Present: [],
    Absent: [],
    'In Attendance': [],
    Chair: [],
  };

  attendees?.forEach((attendee: any) => {
    const {status, user} = attendee; // Assuming 'role' exists for guests
    const fullName = `${capitalizeFirstLetter(user?.firstName || '')} ${capitalizeFirstLetter(user?.lastName || '')}`;
    const initials = getInitials(fullName);

    switch (status) {
      case 'PRESENT':
        grouped.Present.push(`${fullName} ("${initials}")`);
        break;
      case 'ABSENT':
        grouped.Absent.push(`${fullName} ("${initials}")`);
        break;
      case 'IN_ATTENDANCE':
        const guestInfo = `${fullName} ("${initials}")`;
        grouped['In Attendance'].push(guestInfo);
        break;
      case 'CHAIR':
        const chairInfo = `${fullName} ("${initials}")`;
        grouped.Chair.push(chairInfo);
        break;
      default:
        break;
    }
  });

  return grouped;
};

export const calculateTotalDuration = (items: ListAgendaItem[]): number => {
  return items.reduce((total, item) => total + Number(item.duration || 0), 0);
};

export const convertMinutesToHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60); // Calculate whole hours
  const remainingMinutes = minutes % 60; // Calculate remaining minutes

  let result = '';
  if (hours > 0) {
    result += `${hours} hr${hours > 1 ? 's' : ''}`; // Add 's' for plural hours
  }
  if (remainingMinutes > 0) {
    if (result) result += ' '; // Add a space if hours are present
    result += `${remainingMinutes} min${remainingMinutes > 1 ? 's' : ''}`; // Add 's' for plural minutes
  }

  return result || ''; // Return "0 mins" if input is 0
};

export const templateVersions: {[key: string]: MinutesTemplateVersion} = {
  agendaItemAboveMinutes: 'AGENDA_ITEM_ABOVE_MINUTES',
  agendaItemLeftMinutes: 'AGENDA_ITEM_LEFT_MINUTES',
  agendaItemLeftMinutesBordered: 'AGENDA_ITEM_LEFT_MINUTES_BORDERED',
  agendaItemAboveMinutesBordered: 'AGENDA_ITEM_ABOVE_MINUTES_BORDERED',
};
export const minutesTemplates = [
  {
    title: 'Paragraph Layout',
    description: 'Ideal for most meetings - especially 1hr +',
    imageSrc: '/images/Option_1_Pretty.png',
    imageAlt: 'Option 1 Preview',
    templateVersion: templateVersions.agendaItemAboveMinutes,
  },
  {
    title: 'Column Layout',
    description: 'A good option for short meetings',
    imageSrc: '/images/Option_2_Pretty.png',
    imageAlt: 'Option 2 Preview',
    templateVersion: templateVersions.agendaItemLeftMinutes,
  },
  {
    title: 'Card Layout',
    description: '',
    imageSrc: '/images/Option_4_Pretty.png',
    imageAlt: 'Option 2 Preview',
    templateVersion: templateVersions.agendaItemAboveMinutesBordered,
  },
  {
    title: 'Table Layout',
    description: '',
    imageSrc: '/images/Option_3_Pretty.png',
    imageAlt: 'Table Layout Preview',
    templateVersion: templateVersions.agendaItemLeftMinutesBordered,
  },
];

export function flipObject<T extends Record<string, string>>(
  obj: T,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key]),
  );
}

type FormattedAgendaItem = {
  name: string;
  owner?: string;
  pageCount: number;
  hasFiles: boolean;
  index: number;
  startPage: number;
  endPage: number;
};

export function calculatePageIntervals(
  agendaItems: FormattedAgendaItem[],
  startPageIndex: number,
): FormattedAgendaItem[] {
  let currentPage = startPageIndex;
  return agendaItems.map((item) => {
    const startPage = currentPage;
    const endPage = currentPage + item.pageCount - 1;
    currentPage = endPage + 1;
    return {
      ...item,
      startPage,
      endPage,
    };
  });
}

export const rootStyle = (text: string = '') => ({
  padding: '4px 8px',
  maxHeight: '40px',
  border: text === 'Saved' ? '0.4px solid #688878' : '0.4px solid #F2D058',
  background: text === 'Saved' ? '#EDFDF5' : '#FDF9ED',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
});

export const STAGING_ALLOWED_EMAILS = [
  'david@davidhanby.com',
  'korlok99@gmail.com',
  'hamzatoluwashina@yahoo.com',
  'tiaanherbst90@gmail.com',
  'd.hanby@minute-master.com',
  'adda1325@maildrop.cc',
];

export const PROD_ALLOWED_EMAILS = [
  'korlok99@gmail.com',
  'david@davidhanby.com',
  'jonferrara@live.com',
  'jonathan.ferrara@Vistra.com',
  'rihjerseyned@gmail.com',
  'sentosajersey@me.com',
  'simonswords@gmail.com',
  'simon.swords@fundipedia.com',
  'r.harwood@minute-master.com',
  'd.hanby@minute-master.com',
];

export const generateCalendarLinks = (
  agenda: Agenda,
  isEmail: boolean = false,
) => {
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const startDateTime = dayjs(agenda.meetingDate);
    const endDateTime = startDateTime.add(1, 'hour');

    const formatToGoogleTime = (dt: dayjs.Dayjs) => {
      return dt.format('YYYYMMDDTHHmmss');
    };

    const startTimeForGoogle = formatToGoogleTime(startDateTime);
    const endTimeForGoogle = formatToGoogleTime(endDateTime);

    // Handle Outlook format with proper timezone awareness
    const formatToOutlookTime = (dt: dayjs.Dayjs) => {
      if (isEmail) {
        return dt.utc().format('YYYY-MM-DDTHH:mm:ss[Z]');
      }
      return dt.format('YYYY-MM-DDTHH:mm:ss');
    };

    const startTimeOutlook = formatToOutlookTime(startDateTime);
    const endTimeOutlook = formatToOutlookTime(endDateTime);

    const title = encodeURIComponent(agenda.name || '');
    const details = encodeURIComponent(
      `${agenda.details || ''}\n\nMeeting Link: ${agenda.meetingLink || ''}`,
    );
    const location = encodeURIComponent(agenda.location || '');

    // Generate calendar links
    const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTimeForGoogle}/${endTimeForGoogle}&details=${details}&location=${location}&ctz=${encodeURIComponent(userTimezone)}`;

    // For Outlook, adding timezone parameter for better cross-timezone handling
    const outlookCalendarLink = isEmail
      ? `https://outlook.office.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startTimeOutlook}&enddt=${endTimeOutlook}&body=${details}&location=${location}`
      : `https://outlook.office.com/calendar/0/deeplink/compose?subject=${title}&startdt=${startTimeOutlook}&enddt=${endTimeOutlook}&body=${details}&location=${location}`;

    const icsCalendarLink = `https://addevent.com/dir/?client=CLIENT_ID&start=${startTimeOutlook}&end=${endTimeOutlook}&title=${title}&description=${details}&location=${location}&timezone=${encodeURIComponent(userTimezone)}&service=ical`;

    return {
      google: googleCalendarLink,
      outlook: outlookCalendarLink,
      ics: icsCalendarLink,
    };
  } catch (error) {
    console.error('Error generating calendar links:', error);
    return {
      google: '',
      outlook: '',
      ics: '',
    };
  }
};

// Mapping of extensions to MIME types to ensure strict validation
export const MAX_FILE_SIZE = 104857600;

export type AllowedExtension =
  | 'doc'
  | 'docx'
  | 'rtf'
  | 'txt'
  | 'odt'
  | 'xls'
  | 'xlsx'
  | 'csv'
  | 'ods'
  | 'ppt'
  | 'pptx'
  | 'odp'
  | 'odg'
  | 'svg'
  | 'odf'
  | 'html'
  | 'xml'
  | 'pdf';

export const ALLOWED_FILE_TYPES: Record<AllowedExtension, string[]> = {
  doc: ['application/msword'],
  docx: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  rtf: ['application/rtf'],
  txt: ['text/plain'],
  odt: ['application/vnd.oasis.opendocument.text'],
  xls: ['application/vnd.ms-excel'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  csv: ['text/csv'],
  ods: ['application/vnd.oasis.opendocument.spreadsheet'],
  ppt: ['application/vnd.ms-powerpoint'],
  pptx: [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ],
  odp: ['application/vnd.oasis.opendocument.presentation'],
  odg: ['application/vnd.oasis.opendocument.graphics'],
  svg: ['image/svg+xml'],
  odf: ['application/vnd.oasis.opendocument.formula'],
  html: ['text/html'],
  xml: ['application/xml'],
  pdf: ['application/pdf'],
};

export const ALLOWED_VARIABLES = [
  'attendee_name',
  'meeting_title',
  'meeting_date',
  'meeting_time',
  'meeting_location',
  'sender_name',
  'bookcase_name',
  'bookshelf_name',
  'company_name',
];

export const getVariableDescription = (variable: string) => {
  const descriptions: Record<string, string> = {
    attendee_name: 'The full name of the meeting attendee',
    meeting_title: 'The title of the scheduled meeting',
    meeting_date: 'The date when the meeting will take place',
    meeting_time: 'The scheduled time of the meeting',
    meeting_location: 'The location or venue of the meeting',
    sender_name: 'The name of the person sending the notice',
    bookcase_name: 'The name of the bookcase',
    bookshelf_name: 'The name of the bookshelf',
    company_name: 'The name of the company',
  };
  return descriptions[variable] || 'No description available';
};

export enum NoticeType {
  ClientNotice = 'CLIENT_NOTICE',
  CompanyNotice = 'COMPANY_NOTICE',
  Standard = 'STANDARD',
}

export const EMAIL_TEMPLATES = [
  {
    label: 'Agenda Notice',
    description:
      'Write a custom notice to be sent to invitees when a meeting agenda is published.',
  },
] as const;

export const DEFAULT_EMAIL_CONTENT = `
<p>Dear {{attendee_name}},</p>
<p>You are invited to attend the following meeting:</p>
<p><strong>Meeting:</strong> {{meeting_title}}<br>
<strong>Date:</strong> {{meeting_date}}<br>
<strong>Time:</strong> {{meeting_time}}<br>
<strong>Location:</strong> {{meeting_location}}</p>
<p>Please confirm your attendance by responding to this invitation.</p>
<p>Best regards,<br>
{{sender_name}}</p>`;

export const SPREADSHEET_EXTENSIONS = ['xlsx', 'xls', 'csv', 'ods', 'numbers'];
export const renderFooterTemplate = (
  template: string,
  {
    company,
    agendaName,
    location,
    bookshelfName,
    meetingDate,
  }: {
    company: string;
    agendaName: string;
    location: string;
    bookshelfName: string;
    meetingDate: string;
  },
) => {
  const year = new Date().getFullYear();
  return template
    .replace(/{year}/gi, year.toString())
    .replace(/{company}/gi, company)
    .replace(/{companyName}/gi, company)
    .replace(/{agenda}/gi, agendaName)
    .replace(/{agendaName}/gi, agendaName)
    .replace(/{date}/gi, dayjs().format('DD MMM YYYY'))
    .replace(/{time}/gi, dayjs().format('HH:mm'))
    .replace(/{location}/gi, location)
    .replace(/{bookshelf}/gi, bookshelfName)
    .replace(/{bookshelfName}/gi, bookshelfName)
    .replace(/{meetingDate}/gi, meetingDate)
    .replace(/{meeting}/gi, meetingDate);
};
