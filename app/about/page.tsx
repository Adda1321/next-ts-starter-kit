'use client';

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">About Me</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          I am a results-driven Software Engineer with 3+ years of experience in full-stack development. I have a proven track record of delivering high-performance, scalable solutions for startups and established businesses. I am passionate about clean code, user-centric design, and seamless user experiences.
        </p>
        <Link href="/" className="text-primary hover:underline">&larr; Back to Portfolio</Link>
      </div>
    </div>
  );
} 