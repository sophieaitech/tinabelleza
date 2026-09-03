const fs = require('fs');
const vm = require('vm');

const indexPath = fs.existsSync('lyos/index.html') ? 'lyos/index.html' : 'LYOS Profesional ecommerce PWA v2/index.html';
const html = fs.readFileSync(indexPath, 'utf8');

const match = html.match(/<script type="text\/x-dc"[\s\S]*?>([\s\S]*?)<\/script>/);
if (!match) {
  console.log('No matching script tag found');
  process.exit(1);
}

const js = match[1];
console.log('Extracted JS lines:', js.split('\n').length);

try {
  new vm.Script(js);
  console.log('SYNTAX OK');
} catch (e) {
  console.error('SYNTAX ERROR:', e);
}
