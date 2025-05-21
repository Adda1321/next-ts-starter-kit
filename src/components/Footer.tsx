// import {UserState} from '@/src/types';
// import {
//   Button,
//   Chip,
//   CircularProgress,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import React, {useState} from 'react';
// import LogoutIcon from '@mui/icons-material/Logout';
// import {cn} from '@/lib/utils';
// import useSidebarStore from '@/src/hooks/useSidebarStore';
// import {signOut, useSession} from 'next-auth/react';
// import {useRouter} from 'next/navigation';
// import useUserStore from '@/src/hooks/userStore';
// import Link from 'next/link';
// import {PATH_DASHBOARD} from '@/constants';
// import PersonIcon from '@mui/icons-material/Person';
// import {useApolloClient} from '@apollo/client';
// import SettingsIcon from '@mui/icons-material/Settings';
// import useBookcaseStore from '@/src/hooks/useBookcaseStore';
// import SwitchCompanyModal from './SwitchCompanyModal';

// declare interface FooterProps {
//   user: UserState;
//   type?: 'desktop' | 'mobile';
// }

// const Footer = ({user, type = 'desktop'}: FooterProps) => {
//   const {data: session} = useSession();
//   const {resetUser, roles} = useUserStore();
//   const {isSidebarOpen} = useSidebarStore();
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();
//   const client = useApolloClient();
//   const {reset} = useBookcaseStore();

//   const isGSA = roles?.some((role) => role.key === 'GSA');

//   const assignedRoleNames = roles
//     ?.filter(
//       (role) =>
//         !!role?.key &&
//         role.key !== 'SA' &&
//         role.name?.toLowerCase() !== 'super admin',
//     )
//     ?.map((role) => `${role.name} (${role.key})`)
//     ?.join('\n');

//   const handleLogout = async () => {
//     try {
//       setIsLoading(true);
//       await signOut({redirect: false});
//       await client.clearStore();
//       reset();
//       localStorage.clear();
//       resetUser();
//       router.push('/login');
//     } catch (error) {
//       console.log('ERROR SIGNING YOU OUT: ', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <footer
//       className={cn('footer', {
//         'px-2': isSidebarOpen,
//       })}
//     >
//       {isSidebarOpen ? (
//         <div className="footer_email">
//           <Link href={PATH_DASHBOARD.profile}>
//             <p className="text-14 cursor-pointer truncate font-semibold capitalize text-primary-mm!">
//               {user.firstName} {user.lastName}
//             </p>
//             <p className="text-xs truncate font-normal text-primary-mm! opacity-70">
//               {user?.email || session?.user?.email || ''}
//             </p>
//           </Link>
//           <div className="mt-1 text-xs truncate font-normal text-primary-mm! opacity-70 flex gap-1 items-center justify-start">
//             <span>{user?.companyName || ''}</span>
//             <SwitchCompanyModal />
//             {isGSA && (
//               <Tooltip title="Company Settings">
//                 <span>
//                   <IconButton
//                     className="p-1!"
//                     onClick={() => router.push(PATH_DASHBOARD.companySettings)}
//                   >
//                     <SettingsIcon color="primary" />
//                   </IconButton>
//                 </span>
//               </Tooltip>
//             )}
//           </div>
//           <div className="flex gap-2 mt-1 flex-col items-start">
//             <Tooltip
//               placement="right"
//               title={
//                 <div className="text-left">
//                   {assignedRoleNames?.split('\n').map((line, index) => (
//                     <span key={index}>
//                       {line}
//                       <br />
//                     </span>
//                   ))}
//                 </div>
//               }
//             >
//               <Chip
//                 label={'My Roles'}
//                 size="small"
//                 sx={{
//                   textTransform: 'capitalize',
//                   px: 0.8,
//                 }}
//                 className="cursor-pointer"
//               />
//             </Tooltip>
//             <div className="flex gap-2">
//               {user?.providers
//                 ?.filter(
//                   (v) =>
//                     !session?.user?.provider ||
//                     v?.toLowerCase() === session?.user?.provider?.toLowerCase(),
//                 )
//                 ?.map(
//                   (v, i) =>
//                     v && (
//                       <Chip
//                         key={i}
//                         label={v}
//                         size="small"
//                         sx={{
//                           ...(v === 'azure' && {
//                             bgcolor: '#005a9e',
//                             color: 'white',
//                           }),
//                           ...(v === 'okta' && {
//                             bgcolor: '#007DC1',
//                             color: 'white',
//                           }),
//                           textTransform: 'capitalize',
//                         }}
//                       />
//                     ),
//                 )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <Link href={PATH_DASHBOARD.profile} className="ps-3 pe-3">
//           <IconButton
//             aria-label="Profile"
//             sx={{width: 40, height: 40, borderRadius: '50%'}}
//           >
//             <PersonIcon sx={{width: 24, height: 24}} />
//           </IconButton>
//         </Link>
//       )}

//       {isSidebarOpen ? (
//         <Button
//           size="small"
//           variant="text"
//           onClick={handleLogout}
//           disabled={isLoading}
//           className="py-2!"
//           startIcon={
//             isLoading ? <CircularProgress size={20} /> : <LogoutIcon />
//           }
//         >
//           Logout
//         </Button>
//       ) : (
//         <IconButton
//           disabled={isLoading}
//           onClick={handleLogout}
//           className="w-full! rounded-none!"
//         >
//           {isLoading ? <CircularProgress size={20} /> : <LogoutIcon />}
//         </IconButton>
//       )}
//     </footer>
//   );
// };

// export default Footer;
