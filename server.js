/**
 * GameVerse — Local Development Server (Optional Standalone Server)
 * Runs both the Vercel serverless API handlers and serves public static files
 * on any Windows laptop without requiring Vercel CLI or external gateways.
 * 
 * Usage: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Optional .env loader without external dependencies
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  try {
    const envData = fs.readFileSync(envFile, 'utf8');
    envData.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const k = trimmed.slice(0, eqIdx).trim();
          const v = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
          if (!process.env[k]) process.env[k] = v;
        }
      }
    });
  } catch (err) {
    console.warn('[Server] Failed to parse .env file:', err.message);
  }
}

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Route mapping for /api/* serverless endpoints
const apiHandlers = {
  '/api/games': require('./api/games'),
  '/api/favorites': require('./api/favorites'),
  '/api/compare': require('./api/compare'),
  '/api/seed': require('./api/seed'),
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // 1. API Route Handler
  if (pathname.startsWith('/api/')) {
    const handler = apiHandlers[pathname];
    if (handler) {
      req.query = parsedUrl.query;

      // Parse JSON body for POST/DELETE
      if (req.method === 'POST' || req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            req.body = body ? JSON.parse(body) : {};
          } catch {
            req.body = {};
          }
          await executeHandler(handler, req, res);
        });
        return;
      }

      await executeHandler(handler, req, res);
      return;
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `API route ${pathname} not found` }));
      return;
    }
  }

  // 2. Static File Serving
  let relativePath = pathname === '/' ? 'index.html' : pathname;
  // Clean path to prevent traversal
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for html pages without .html extension
      if (!path.extname(filePath)) {
        const withHtml = filePath + '.html';
        if (fs.existsSync(withHtml)) {
          return serveFile(withHtml, res);
        }
      }
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 Not Found</h1><p><a href="/">Return to GameVerse Home</a></p>');
      return;
    }
    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error: ' + err.code);
    } else {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      });
      res.end(content);
    }
  });
}

// Wrapper to adapt Node http req/res to Vercel/Express-like res.status().json()
async function executeHandler(handler, req, res) {
  res.status = function (code) {
    this.statusCode = code;
    return this;
  };
  res.json = function (data) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(data));
    return this;
  };
  res.send = function (data) {
    this.end(data);
    return this;
  };

  try {
    await handler(req, res);
  } catch (err) {
    console.error('[Server Error]', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Server error', message: err.message });
    }
  }
}

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🎮 GameVerse Platform Local Server is Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📁 Static Assets: ${PUBLIC_DIR}`);
  console.log(`⚡ API Endpoints: /api/games, /api/favorites, /api/compare, /api/seed`);
  console.log(`======================================================\n`);
});
