require('dotenv').config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FORCE_HTTPS = process.env.FORCE_HTTPS === 'true';

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'", "https://www.youtube.com", "https://verdancystoryworks.substack.com"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// HTTPS redirect in production
if (FORCE_HTTPS) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

// Rate limiting to prevent DoS attacks (skip in development)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: NODE_ENV === 'production' ? 200 : 1000, // higher limit in dev
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path.startsWith('/assets'), // don't count static assets
});

// Apply rate limiter to all requests
app.use(limiter);

// Serve static assets only (not the entire source directory)
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Serve specific public files at root level
app.use('/robots.txt', express.static(path.join(__dirname, 'robots.txt')));
app.use('/sitemap.xml', express.static(path.join(__dirname, 'sitemap.xml')));

// Define valid routes for your single page app
const validRoutes = ['/', '/index.html', '/googlea2e45079fd62ebd3.html'];

// Handle specific routes
app.get(validRoutes, (req, res) => {
  if (req.path === '/googlea2e45079fd62ebd3.html') {
    res.sendFile(path.join(__dirname, 'googlea2e45079fd62ebd3.html'));
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
});

// Handle 404 errors for non-existent routes
app.get('*', (req, res) => {
  res.status(404).send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found | Verdancy Storyworks</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background: #0a0a0a;
            color: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            text-align: center;
        }
        .error-container {
            max-width: 600px;
            padding: 2rem;
        }
        h1 {
            font-size: 6rem;
            margin: 0;
            background: linear-gradient(135deg, #00ffcc, #ff00ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        h2 {
            font-size: 1.5rem;
            margin: 1rem 0;
            color: #888;
        }
        p {
            color: #aaa;
            line-height: 1.6;
        }
        a {
            color: #00ffcc;
            text-decoration: none;
            border-bottom: 1px solid #00ffcc;
            transition: all 0.3s ease;
        }
        a:hover {
            color: #ff00ff;
            border-color: #ff00ff;
        }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist in this timeline.</p>
        <p><a href="/">Return to Verdancy Storyworks</a></p>
    </div>
</body>
</html>`);
});

// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Verdancy Storyworks server running on port ${PORT}`);
    console.log(`🌐 Visit: http://localhost:${PORT}`);
  });
}

module.exports = app;