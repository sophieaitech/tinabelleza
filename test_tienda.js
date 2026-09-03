const fs = require('fs');
const vm = require('vm');

const tiendaPath = fs.existsSync('lyos/tienda.html') ? 'lyos/tienda.html' : 'LYOS Profesional ecommerce PWA v2/tienda.html';
const html = fs.readFileSync(tiendaPath, 'utf8');
const match = html.match(/<script type="text\/x-dc"[\s\S]*?>([\s\S]*?)<\/script>/);

if (!match) {
  console.log('No matching script tag found in tienda.html');
  process.exit(1);
}

const js = match[1];
console.log('Extracted JS lines:', js.split('\n').length);

try {
  new vm.Script(js);
  console.log('TIENDA.HTML JS SYNTAX OK');
} catch (e) {
  console.error('TIENDA.HTML SYNTAX ERROR:', e);
}
