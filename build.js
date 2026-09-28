const fs = require('fs');
const themes = {
  tailwind: require('jsonresume-theme-tailwind')
};

const resume = JSON.parse(fs.readFileSync('./resume.json', 'utf-8'));

for (const [name, theme] of Object.entries(themes)) {
  let html = theme.render(resume);

  // Keep the email and LinkedIn contact details on one line.
  if (name === 'tailwind') {
    html = html.replace(
      '</head>',
      `<style>
        .header .contact, .header .profiles {
          display: inline-flex !important;
          vertical-align: middle;
          width: auto !important;
          margin-top: 0 !important;
        }
        .header .profiles { margin-left: 1.25rem !important; }
      </style></head>`
    );
  }

  html = html.replace(
    '<body>',
    `<body><style>
      .size-28 { display: none !important; }
      .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem !important; }
      .gap-y-3 { row-gap: .35rem !important; }
      .text-muted-foreground br { display: none !important; }
      @media print {
        html { font-size: calc(100% - 1pt) !important; }
        .container { padding: 1rem !important; }
        .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: .6rem !important; }
      }
    </style>`
  );

  fs.writeFileSync(`./${name}.html`, html);
}

// Provide separate web and PDF-ready versions.
let webHtml = fs.readFileSync('./tailwind.html', 'utf8');
webHtml = webHtml.replace('</head>', '<style>html { font-size: 110% !important; }</style></head>');
fs.writeFileSync('./web.html', webHtml);
fs.copyFileSync('./tailwind.html', './pdf.html');
fs.copyFileSync('./web.html', './index.html');
console.log('Generated web.html and pdf.html');
