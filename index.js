const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Default to index.html for root path
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, 'public', filePath);

  // Get file extension
  const ext = path.extname(filePath).toLowerCase();
  
  // Set content type based on file extension
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  
  const contentType = contentTypes[ext] || 'text/plain';

  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server Error', 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`ConnectCampus server running at ${url}`);
  
  // Automatically open the URL in the default browser
  const os = require('os');
  const { exec } = require('child_process');
  
  const openCommand = {
    'darwin': `open ${url}`,
    'win32': `start ${url}`,
    'linux': `xdg-open ${url}`
  }[os.platform()];
  
  if (openCommand) {
    setTimeout(() => {
      exec(openCommand);
    }, 500);
  }
});
