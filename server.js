const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve assets
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Handle all routes by serving index.html (for single page app)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Verdancy Storyworks server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});