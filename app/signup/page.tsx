'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '../../src/stores/userStore';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((s) => s.setUser);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        router.push('/');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow p-8 space-y-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign Up</h1>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">Name</label>
          <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} className="w-full px-3 py-2 border border-gray-400 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>
        {error && <div className="text-red-600 dark:text-red-300 text-sm">{error}</div>}
        <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">{loading ? 'Signing up...' : 'Sign Up'}</button>
        <div className="text-center text-sm mt-2">
          Already have an account? <a href="/signin" className="text-blue-700 dark:text-blue-300 hover:underline">Sign In</a>
        </div>
      </form>
    </div>
  );
} 