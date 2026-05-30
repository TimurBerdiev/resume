const http = require('http');
const fs = require('fs');
const theme = require('jsonresume-theme-stackoverflow');

const PORT = 4000;

const serve = () => {
  const resume = JSON.parse(fs.readFileSync('./resume.json', 'utf-8'));
  const html = theme.render(resume);
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }).listen(PORT, () => {
    console.log(`Resume preview: http://localhost:${PORT}`);
  });
};

serve();
