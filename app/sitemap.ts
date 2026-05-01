import type { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls = [
    '/',
    '/about',
    '/contact',
    '/signin',
    '/signup',
    '/projects',
    '/learn',
    '/learn/client-component',
    '/learn/server-component',
    '/learn/csr',
    '/learn/ssr',
    '/learn/ssg',
    '/webhooks',
    '/admin',
  ];

  return urls.map((url) => ({
    url: `${APP_URL}${url}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
}
