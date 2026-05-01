import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-12 sm:px-8">
        <div className="w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <h1 className="text-2xl font-bold mb-4">About Me</h1>
          <p className="mb-6 text-slate-700 dark:text-slate-300">
            I am a results-driven Software Engineer with 3+ years of experience in full-stack development. I have a proven track record of delivering high-performance, scalable solutions for startups and established businesses. I am passionate about clean code, user-centric design, and seamless user experiences.
          </p>
          <Link href="/" className="text-blue-700 hover:underline dark:text-blue-300">&larr; Back to Portfolio</Link>
        </div>
      </div>
    </div>
  );
}