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
        return 'text-green-600 bg-green-100';
      case 'connecting':
        return 'text-yellow-600 bg-yellow-100';
      case 'disconnected':
        return 'text-red-600 bg-red-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🔔 Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Real-time contact notifications</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  isConnected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(connectionStatus)}`}>
                  {connectionStatus}
                </span>
              </div>
              
              {/* Client ID */}
              {clientId && (
                <div className="text-sm text-gray-500">
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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">🔌 WebSocket Connection</h3>
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
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              📢 Live Contact Notifications
            </h2>
            <p className="text-gray-600 mt-1">
              Real-time updates when someone submits the contact form
            </p>
          </div>

          <div className="p-6">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                <p className="text-gray-600">
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
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">👤</span>
                        <h3 className="font-semibold text-gray-900">
                          New Contact: {notification.data.name}
                        </h3>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <div className="text-gray-900">{notification.data.email}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Time:</span>
                        <div className="text-gray-900">
                          {formatTimestamp(notification.data.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="font-medium text-gray-700">Message:</span>
                      <div className="text-gray-900 mt-1 p-3 bg-gray-50 rounded border">
                        {notification.data.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">🧪 Testing Instructions</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>1. Keep this admin dashboard open in one browser tab</p>
            <p>2. Open the contact form in another tab: <Link href="/contact" className="underline">/contact</Link></p>
            <p>3. Submit a contact form and watch for real-time notifications here!</p>
            <p>4. No page refresh needed - notifications appear instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
} 