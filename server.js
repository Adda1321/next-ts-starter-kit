const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { initializeSocketServer } = require('./lib/socket-server');

/**
 * Custom Next.js Server with Socket.io Integration
 * 
 * This server combines Next.js with Socket.io to enable real-time
 * WebSocket functionality for the admin dashboard.
 */

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Prepare the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create HTTP server
  const server = createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      
      // Let Next.js handle the request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  // Initialize Socket.io server
  initializeSocketServer(server);

  // Start the server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Ready on http://${hostname}:${port}`);
    console.log(`🔌 WebSocket server running on ws://${hostname}:${port}`);
    console.log(`📊 Admin dashboard: http://${hostname}:${port}/admin`);
    console.log(`📝 Contact form: http://${hostname}:${port}/contact`);
  });
}); 