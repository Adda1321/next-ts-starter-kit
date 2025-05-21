// 'use client';
// import React, {useState, Suspense, useEffect} from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Container,
//   InputAdornment,
//   IconButton,
//   Tabs,
//   Tab,
// } from '@mui/material';
// import {notifyError} from '@/src/components/Alert';
// import {useRouter} from 'next/navigation';
// import {ApolloError, useApolloClient} from '@apollo/client';
// import {GET_USER} from '@/src/services/agenda.services';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import FullScreenLoader from '@/src/components/FullScreenLoader';
// import Link from 'next/link';
// import {useForm} from 'react-hook-form';
// import {signIn as NextAuthSignIn, signOut} from 'next-auth/react';
// import {LoginInputs} from '@/src/types';
// import {PATH_DASHBOARD} from '@/constants';
// import AzureSSOButton from './AzureSSOButton';
// import OktaMfaVerification from './OktaMfaVerification';
// import OktaSSOButton from './OktaSSOButton';

// // Update Login inputs
// type ExtendedLoginInputs = LoginInputs & {
//   organizationDomain?: string;
// };

// type Props = {
//   className?: string;
//   callbackUrl?: string;
//   error?: string;
//   companyId?: string;
//   method?: string;
//   org?: string;
// };

// const LoginPage = (props: Props) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [mfaRequired, setMfaRequired] = useState(false);
//   const [isLoggingIn, setIsLoggingIn] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);
//   const [mfaInfo, setMfaInfo] = useState<{
//     stateToken: string;
//     factors: Array<{id: string; factorType: string; provider: string}>;
//     email: string;
//     companyId: string;
//     organizationDomain?: string;
//   } | null>(null);
//   const client = useApolloClient();
//   const router = useRouter();
//   const companyId = props.companyId;
//   const method = props.method;
//   const org = props.org;

//   // Set companyId in cookie if available
//   React.useEffect(() => {
//     if (companyId) {
//       // Set cookie for companyId that will be accessible server-side
//       document.cookie = [
//         `companyId=${companyId}`,
//         `path=/`,
//         `max-age=3600`,
//         `Secure`,
//         `SameSite=None`,
//       ].join('; ');
//     }
//   }, [companyId]);

//   const {
//     register,
//     handleSubmit,
//     formState: {errors, isSubmitting},
//     watch,
//     setValue,
//   } = useForm<ExtendedLoginInputs>({
//     defaultValues: {email: '', password: '', organizationDomain: ''},
//   });

//   useEffect(() => {
//     if (method) {
//       setActiveTab(method === 'okta' ? 1 : method === 'azure' ? 2 : 0);
//     }
//   }, [method]);

//   useEffect(() => {
//     if (method === 'okta' && org) {
//       setValue('organizationDomain', org);
//     }
//   }, [org, method]);

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setActiveTab(newValue);
//   };

//   const handleLogin = async ({
//     email,
//     password,
//     organizationDomain,
//   }: ExtendedLoginInputs) => {
//     try {
//       setIsLoggingIn(true);

//       // Use regular NextAuth credentials flow for non-Okta login
//       const res = await NextAuthSignIn('credentials', {
//         email,
//         password,
//         organizationDomain,
//         redirect: false,
//       });

//       if (!res?.error) {
//         await handleSuccessfulLogin();
//       } else {
//         throw new Error(res.error);
//       }
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoggingIn(false);
//     }
//   };

//   const handleSuccessfulLogin = async () => {
//     try {
//       const {data} = await client.query({
//         query: GET_USER,
//         fetchPolicy: 'network-only',
//       });

//       const mmUser = data.me;
//       const activeCompanies = mmUser.companies.filter((item: any) =>
//         ['ACTIVE', 'PENDING'].includes(item.accountStatus || ''),
//       );

//       if (activeCompanies.length === 0) {
//         notifyError(
//           'Your account has been deactivated. Please contact your company administrator.',
//         );
//         await signOut({redirect: false});
//         return;
//       }
//       if (typeof window !== 'undefined') {
//         router.push(props.callbackUrl || PATH_DASHBOARD.root);
//       }
//     } catch (error) {
//       console.error('Error after login:', error);
//       notifyError('Error fetching user data. Please try again.');
//     }
//   };

//   const handleCancelMfa = () => {
//     setMfaRequired(false);
//     setMfaInfo(null);
//   };

//   const handleError = (error: any) => {
//     if (error instanceof ApolloError) {
//       const graphQLError = error.graphQLErrors?.[0]?.message;

//       if (graphQLError) {
//         switch (graphQLError) {
//           case 'Access denied: Company account status is not ACTIVE.':
//             notifyError(
//               'Your account has been deactivated. Please contact the administrator.',
//             );
//             break;
//           case 'Access denied: User company account is inactive.':
//             notifyError(
//               'Your company account is not active. Please contact the administrator.',
//             );
//             break;
//           default:
//             notifyError(
//               'Unable to connect to the server. Please try again later.',
//             );
//         }
//       }
//     } else {
//       notifyError(
//         error.message || 'Something went wrong. Please try again later.',
//       );
//     }
//   };

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handlePasswordlessMfa = (mfaInfo: {
//     stateToken: string;
//     factors: Array<{id: string; factorType: string; provider: string}>;
//     email: string;
//     companyId: string;
//   }) => {
//     if (!mfaInfo.factors || mfaInfo.factors.length === 0) {
//       notifyError('No Okta Verify factors available.');
//       return;
//     }

//     // Add organization domain from the form
//     const organizationDomain = watch('organizationDomain');

//     setMfaInfo({
//       ...mfaInfo,
//       organizationDomain: organizationDomain || undefined,
//     });
//     setMfaRequired(true);
//   };

//   // If MFA is required, show the MFA verification component
//   if (mfaRequired && mfaInfo) {
//     return (
//       <OktaMfaVerification
//         stateToken={mfaInfo.stateToken}
//         factors={mfaInfo.factors}
//         email={mfaInfo.email}
//         companyId={mfaInfo.companyId}
//         onCancel={handleCancelMfa}
//         callbackUrl={props.callbackUrl}
//       />
//     );
//   }

//   console.log('v', process.env.NEXT_PUBLIC_APP_VERSION);

//   return (
//     <div className="flex justify-center items-center">
//       <Container
//         maxWidth="sm"
//         className="bg-white p-4 rounded-lg shadow-lg relative"
//       >
//         <svg
//           width="100%"
//           height="100%"
//           className="absolute rounded-sm top-0 right-0 p-3"
//         >
//           <rect
//             width="100%"
//             height="100%"
//             fill="none"
//             stroke="#CCCCCC"
//             strokeWidth="4"
//             strokeDasharray="10, 10"
//           />
//         </svg>
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit(handleLogin)}
//           className="rounded-md py-8"
//           sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             px: 4,
//             gap: 2,
//           }}
//         >
//           {/* Title and Instructions */}
//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-primary-mm!">Login</h1>
//             <Typography component="p" color={'primary'} my={2}>
//               Please choose your login method
//             </Typography>
//           </div>

//           <Tabs
//             value={activeTab}
//             onChange={handleTabChange}
//             centered
//             sx={{borderBottom: 1, borderColor: 'divider', mb: 3}}
//           >
//             <Tab label="Email & Password" />
//             <Tab label="Okta SSO" />
//             <Tab label="Azure SSO" />
//           </Tabs>

//           {activeTab === 0 && (
//             <>
//               <TextField
//                 required
//                 fullWidth
//                 id="email"
//                 placeholder="Email"
//                 autoComplete="email"
//                 autoFocus
//                 {...register('email', {
//                   required: 'This is required!',
//                   pattern: {
//                     value: /\S+@\S+\.\S+/,
//                     message: 'Entered value does not match email format',
//                   },
//                 })}
//                 helperText={
//                   !!errors.email && 'Please enter a valid email address.'
//                 }
//                 error={!!errors.email}
//               />

//               <TextField
//                 required
//                 fullWidth
//                 id="password"
//                 placeholder="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 autoComplete="current-password"
//                 {...register('password', {
//                   required: 'Password is required!',
//                 })}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end" className="bg-transparent">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 helperText={!!errors.password && errors.password?.message}
//                 error={!!errors.password}
//               />

//               <Button
//                 id="login-button"
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 disabled={isSubmitting || isLoggingIn}
//               >
//                 Login
//               </Button>

//               <Button
//                 LinkComponent={Link}
//                 href="/reset-password"
//                 variant="text"
//                 disableRipple
//                 sx={{
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   textAlign: 'center',
//                   fontSize: 16,
//                   py: 0,
//                   '&:hover': {
//                     bgcolor: 'transparent',
//                     textDecoration: 'underline',
//                   },
//                 }}
//               >
//                 Forgotten your password?
//               </Button>
//             </>
//           )}

//           {activeTab === 1 && (
//             <Box sx={{py: 2}}>
//               <OktaSSOButton
//                 email={watch('email')}
//                 password={watch('password')}
//                 organizationDomain={watch('organizationDomain')}
//                 companyId={props.companyId}
//                 onMfaRequired={handlePasswordlessMfa}
//                 method={method}
//               />
//             </Box>
//           )}

//           {activeTab === 2 && (
//             <Box sx={{py: 2}}>
//               <AzureSSOButton
//                 callbackUrl={props.callbackUrl}
//                 tenantId={org}
//                 method={method}
//               />
//             </Box>
//           )}
//         </Box>
//       </Container>
//       {(isSubmitting || isLoggingIn) && <FullScreenLoader />}
//     </div>
//   );
// };

// const LoginPageWrapper = (props: Props) => (
//   <Suspense fallback={<FullScreenLoader />}>
//     <LoginPage {...props} />
//   </Suspense>
// );

// export default LoginPageWrapper;
