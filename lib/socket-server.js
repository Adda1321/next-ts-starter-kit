const { Server: SocketIOServer } = require('socket.io');

let io = null;

function initializeSocketServer(server) {
  if (io) {
    console.log('🔌 Socket.io server already initialized');
    return io;
  }

  console.log('🔌 Initializing Socket.io server...');

  io = new SocketIOServer(server, {
    cors: {
      origin: process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_SITE_URL
        : 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);
    socket.emit('connection_status', {
      status: 'connected',
      clientId: socket.id,
      timestamp: new Date().toISOString(),
    });
    socket.on('admin_join', () => {
      console.log(`👤 Admin joined: ${socket.id}`);
      socket.join('admin_room');
      socket.emit('admin_joined', { success: true });
    });
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
    });
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: Date.now() });
    });
  });

  global.socketIO = io;
  console.log('🔌 Socket.io server initialized successfully');
  return io;
}

function getSocketServer() {
  return io;
}

function emitToAll(event, data) {
  if (io) {
    io.emit(event, data);
  }
}

function emitToAdmin(event, data) {
  if (io) {
    io.to('admin_room').emit(event, data);
  }
}

function getConnectionStats() {
  if (!io) {
    return { connected: false, clients: 0 };
  }
  const sockets = io.sockets.sockets;
  return {
    connected: true,
    clients: sockets.size,
    adminRoom: io.sockets.adapter.rooms.get('admin_room')?.size || 0,
  };
}

module.exports = {
  initializeSocketServer,
  getSocketServer,
  emitToAll,
  emitToAdmin,
  getConnectionStats,
}; 