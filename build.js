const fs = require('fs');
const theme = require('jsonresume-theme-stackoverflow');

const resume = JSON.parse(fs.readFileSync('./resume.json', 'utf-8'));
const html = theme.render(resume);
fs.writeFileSync('./index.html', html);
console.log('index.html generated');
