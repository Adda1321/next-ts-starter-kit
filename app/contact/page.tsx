'use client';

import Link from "next/link";
import { useState } from "react";

/**
 * Contact Page Component
 * 
 * This page provides a contact form that:
 * - Allows users to submit contact messages
 * - Triggers webhook events when messages are sent
 * - Provides real-time feedback to users
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Handle form input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   * This will trigger a webhook event when a contact is created
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        console.log('✅ Contact form submitted successfully! Webhook event triggered.');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to send message');
        console.error('❌ Contact form submission failed:', result.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
      console.error('❌ Network error during contact submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-6">Contact Me</h1>
        
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              placeholder="Your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 resize-none"
              placeholder="Your message..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 border border-green-400 text-green-700 dark:text-green-300 rounded-md">
            ✅ Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 rounded-md">
            ❌ {errorMessage}
          </div>
        )}

        {/* Webhook Info */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
            🔔 Webhook Integration
          </h3>
          <p className="text-xs text-blue-600 dark:text-blue-400">
            When you submit this form, it triggers a webhook event that can notify external services 
            (like Slack, email services, or CRM systems) about new contact messages in real-time.
          </p>
        </div>

        {/* Alternative Contact Info */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-2">Other Ways to Reach Me</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <div>📧 Email: <a href="mailto:adilmustafa13@gmail.com" className="text-blue-600 hover:underline">adilmustafa13@gmail.com</a></div>
            <div>📱 Phone: +92 303 5103015</div>
            <div>💼 LinkedIn: <a href="https://linkedin.com/in/adil-mustafa1325" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">adil-mustafa1325</a></div>
          </div>
        </div>

        <Link href="/" className="block mt-6 text-blue-600 hover:underline text-center">
          &larr; Back to Portfolio
        </Link>
      </div>
    </div>
  );
} 