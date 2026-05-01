export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-800 dark:bg-slate-950 dark:text-slate-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-2">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="text-blue-600 hover:underline dark:text-blue-300">Go Home</a>
    </div>
  );
} 