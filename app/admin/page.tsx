'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSocket } from '../../src/hooks/useSocket';

/**
 * Contact notification interface
 */
interface ContactNotification {
  id: string;
  type: string;
  data: {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
  };
  timestamp: string;
}

/**
 * Admin Dashboard Component
 * 
 * This component provides a real-time admin dashboard that:
 * - Connects to WebSocket server using custom hook
 * - Displays live contact notifications
 * - Shows connection status
 * - Provides real-time updates without page refresh
 */
export default function AdminDashboard() {
  const [notifications, setNotifications] = useState<ContactNotification[]>([]);
  
  // Use custom WebSocket hook
  const { 
    isConnected, 
    connectionStatus, 
    clientId, 
    joinAdmin, 
    on 
  } = useSocket();

  // Stable handler to avoid re-creation
  const handleNotification = useCallback((notification: ContactNotification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]);
  }, []);

  useEffect(() => {
    if (!isConnected) return;
    joinAdmin();
    // Attach listener and always clean up
    const cleanup = on('contact_notification', handleNotification);
    return () => {
      if (cleanup) cleanup();
    };
  }, [isConnected, joinAdmin, on, handleNotification]);

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  /**
   * Get connection status color
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'disconnected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-sm dark:bg-slate-900">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">🔔 Admin Dashboard</h1>
              <p className="mt-2 text-gray-600 dark:text-slate-300">Real-time contact notifications</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(connectionStatus)}`}>
                  {connectionStatus}
                </span>
              </div>
              
              {/* Client ID */}
              {clientId && (
                <div className="text-sm text-gray-500 dark:text-slate-400">
                  ID: {clientId.slice(0, 8)}...
                </div>
              )}
              
              {/* Back to Portfolio */}
              <Link 
                href="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ← Portfolio
              </Link>
            </div>
          </div>
        </div>

        {/* Connection Info */}
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
          <h3 className="mb-2 text-lg font-semibold text-blue-800 dark:text-blue-300">🔌 WebSocket Connection</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Status:</span> {connectionStatus}
            </div>
            <div>
              <span className="font-medium">Client ID:</span> {clientId || 'Not connected'}
            </div>
            <div>
              <span className="font-medium">Notifications:</span> {notifications.length}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-lg bg-white shadow-sm dark:bg-slate-900">
          <div className="border-b border-gray-200 p-6 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
              📢 Live Contact Notifications
            </h2>
            <p className="mt-1 text-gray-600 dark:text-slate-300">
              Real-time updates when someone submits the contact form
            </p>
          </div>

          <div className="p-6">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-slate-100">No notifications yet</h3>
                <p className="text-gray-600 dark:text-slate-300">
                  Submit a contact form to see real-time notifications here!
                </p>
                <div className="mt-4">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Test Contact Form →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">👤</span>
                        <h3 className="font-semibold text-gray-900 dark:text-slate-100">
                          New Contact: {notification.data.name}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-slate-400">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700 dark:text-slate-300">Email:</span>
                        <div className="text-gray-900 dark:text-slate-100">{notification.data.email}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700 dark:text-slate-300">Time:</span>
                        <div className="text-gray-900 dark:text-slate-100">
                          {formatTimestamp(notification.data.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="font-medium text-gray-700 dark:text-slate-300">Message:</span>
                      <div className="mt-1 rounded border bg-gray-50 p-3 text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
                        {notification.data.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
} 