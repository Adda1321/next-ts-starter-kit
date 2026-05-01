import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

/**
 * WebSocket Hook
 * 
 * A custom React hook that provides WebSocket functionality:
 * - Connection management
 * - Event handling
 * - Connection status tracking
 * - Automatic reconnection
 */
export function useSocket(url: string = 'http://localhost:3000') {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [clientId, setClientId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // Only initialize socket once on mount
  useEffect(() => {
    const socket = io(url, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;
    setConnectionStatus('connecting');

    socket.on('connect', () => {
      setIsConnected(true);
      setConnectionStatus('connected');
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
      setConnectionStatus('disconnected');
    });
    socket.on('connection_status', (data) => {
      setClientId(data.clientId);
      setConnectionStatus(data.status);
    });
    socket.on('connect_error', (error) => {
      setConnectionStatus('error');
      setIsConnected(false);
    });
    socket.on('reconnect', () => {
      setConnectionStatus('connected');
      setIsConnected(true);
    });
    socket.on('reconnect_error', () => {
      setConnectionStatus('error');
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [url]);

  // Join admin room
  const joinAdmin = useCallback(() => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('admin_join');
    }
  }, [isConnected]);

  // Emit event
  const emit = useCallback((event: string, data?: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
    }
  }, [isConnected]);

  // Listen to events
  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
      // Return cleanup function
      return () => {
        socketRef.current && socketRef.current.off(event, callback);
      };
    }
    return undefined;
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    connectionStatus,
    clientId,
    joinAdmin,
    emit,
    on,
  };
} 