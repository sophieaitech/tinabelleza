const fs = require('fs');

const indexPath = fs.existsSync('lyos/index.html') ? 'lyos/index.html' : 'LYOS Profesional ecommerce PWA v2/index.html';
const html = fs.readFileSync(indexPath, 'utf8');

// Check unclosed tags or invalid expressions {{ ... }}
const exprs = html.match(/\{\{([\s\S]*?)\}\}/g) || [];
console.log('Total {{ expr }} tags found:', exprs.length);

let errors = [];
exprs.forEach((e, i) => {
  const code = e.slice(2, -2).trim();
  try {
    new Function('return (' + code + ')');
  } catch (err) {
    errors.push({ expr: e, err: err.message });
  }
});

if (errors.length) {
  console.error('EXPRESSION SYNTAX ERRORS:', errors);
} else {
  console.log('ALL {{ expr }} TEMPLATE EXPRESSIONS ARE VALID JAVASCRIPT!');
}
