const fs = require('fs');

function audit(filename) {
  const html = fs.readFileSync(filename, 'utf8');
  const tagRegex = /<(?:button|a)\b([^>]*)>([\s\S]*?)<\/(?:button|a)>/gi;
  let match;
  const list = [];
  while ((match = tagRegex.exec(html)) !== null) {
    const attrs = match[1];
    const inner = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (attrs.includes('style=') || attrs.includes('class=')) {
      if (inner.length > 0 && inner.length < 120 && !attrs.includes('display:none')) {
        const lineNum = html.substring(0, match.index).split('\n').length;
        list.push({ line: lineNum, text: inner, attrs: attrs });
      }
    }
  }
  return list;
}

const list = audit('LYOS Profesional ecommerce PWA v2/index.html');
list.forEach((item, i) => {
  if (i >= 60) {
    console.log(`${item.line}: ${item.text}`);
  }
});
