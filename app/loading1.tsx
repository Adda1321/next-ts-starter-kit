export default function Loading1() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="text-lg text-gray-700">Loading, please wait...</p>
    </div>
  );
} 