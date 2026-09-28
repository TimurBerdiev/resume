const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 4000);
const root = process.cwd();

const server = http.createServer((req, res) => {
  const requested = req.url === '/' ? '/web.html' : req.url;
  const filePath = path.resolve(root, `.${requested}`);

  if (!filePath.startsWith(root) || !fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(filePath).pipe(res);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the existing server or run PORT=4001 npm run serve.`);
    process.exit(1);
  }
  throw error;
});

server.listen(PORT, () => {
  console.log(`Resume preview: http://localhost:${PORT}/web.html`);
});
