// import {PATH_DASHBOARD} from '@/constants';
// import useUserStore from '@/src/hooks/userStore';
// import {Button} from '@mui/material';
// import {useRouter} from 'next/navigation';
// import React, {useEffect, useState} from 'react';

// const AccessDenied = () => {
//   const router = useRouter();
//   const [countdown, setCountdown] = useState(5);
//   const roles = useUserStore((state) => state.roles);
//   const isGSA = roles?.some((role) => role.key === 'GSA');
//   const [isMounted, setIsMounted] = useState(false);

//   const homeRoute = isGSA ? PATH_DASHBOARD.people : PATH_DASHBOARD.root;

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);
//   // Countdown logic
//   useEffect(() => {
//     if (!isMounted) return;
//     const timer = setInterval(() => {
//       setCountdown((prevCountdown) => {
//         if (prevCountdown <= 1) {
//           clearInterval(timer);
//           router.push(homeRoute); // Redirect when countdown reaches 0
//           return 0;
//         }
//         return prevCountdown - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup the interval on unmount
//   }, [router, isMounted]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100">
//       <div className="text-center max-w-xl">
//         <h2 className="mt-4 text-3xl font-bold text-gray-800">
//           Heads Up: Permission Required
//         </h2>
//         <p className="mt-2 text-lg text-gray-600 text-center">
//           It seems you don&apos;t have the required permissions to access this
//           page. Not to worry – we&apos;re here to help you get back on track.
//         </p>
//         <p className="text-sm text-gray-500 mt-2">
//           If you need to access this page, please{' '}
//           <span className="text-gray-800 font-medium">
//             reach out to your administrator to grant you access.
//           </span>
//         </p>
//         <div className="mt-6 space-y-4">
//           <Button
//             onClick={() => router.push(homeRoute)}
//             variant="contained"
//             color="primary"
//             className="w-full max-w-xs"
//           >
//             Back to Home
//           </Button>
//         </div>
//         <p className="mt-4 text-gray-600">
//           You will be redirected in{' '}
//           <span className="font-bold text-gray-800">{countdown}</span> seconds.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AccessDenied;
