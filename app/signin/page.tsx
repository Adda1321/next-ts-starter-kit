'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '../../src/stores/userStore';

export default function SigninPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const isAuthInitialized = useUserStore((s) => s.isAuthInitialized);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isAuthInitialized) return;
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/';
      router.push(redirect);
    }
  }, [isAuthInitialized, isAuthenticated, router, searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: include cookies
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        const redirect = searchParams.get('redirect') || '/';
        router.push(redirect);
      } else {
        setError(data.error || 'Signin failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthInitialized || isAuthenticated) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 text-gray-900 dark:bg-slate-950 dark:text-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-lg border border-slate-300 bg-white p-8 shadow dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 pr-10 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.064 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {error && <div className="text-red-600 dark:text-red-300 text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'Signing in...' : 'Sign In'}</button>
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account? <a href="/signup" className="text-blue-700 dark:text-blue-300 hover:underline">Sign Up</a>
        </div>
      </form>
    </div>
  );
} 