import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Contact</h1>
        <div className="mb-4 text-gray-700 dark:text-gray-300">
          <div>Email: <a href="mailto:adilmustafa13@gmail.com" className="text-primary hover:underline">adilmustafa13@gmail.com</a></div>
          <div>Phone: +92 303 5103015</div>
          <div>LinkedIn: <a href="https://linkedin.com/in/adil-mustafa1325" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">adil-mustafa1325</a></div>
        </div>
        <Link href="/" className="text-primary hover:underline">&larr; Back to Portfolio</Link>
      </div>
    </div>
  );
} 