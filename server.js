const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = __dirname;
const PWA_DIR = fs.existsSync(path.join(ROOT, 'lyos')) ? path.join(ROOT, 'lyos') : path.join(ROOT, 'LYOS Profesional ecommerce PWA v2');

const MIMES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json'
};

const COMPRESSIBLE = new Set(['.html', '.js', '.json', '.css', '.svg']);

function handleRequest(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = null;

  // Rutas amigables
  if (reqPath === '/' || reqPath === '') {
    filePath = path.join(PWA_DIR, 'index.html');
  } else if (reqPath === '/academia' || reqPath === '/lyos-academia-de-cuidado-capilar' || reqPath === '/academia.html') {
    filePath = path.join(PWA_DIR, 'academia.html');
  } else if (reqPath === '/tienda' || reqPath === '/tienda.html' || reqPath === '/tienda-lyos') {
    filePath = path.join(PWA_DIR, 'tienda.html');
  } else {
    let p1 = path.join(ROOT, reqPath);
    if (fs.existsSync(p1) && fs.statSync(p1).isDirectory()) {
      p1 = path.join(p1, 'index.html');
    }

    if (fs.existsSync(p1) && fs.statSync(p1).isFile()) {
      filePath = p1;
    } else {
      let p2 = path.join(PWA_DIR, reqPath);
      if (fs.existsSync(p2) && fs.statSync(p2).isDirectory()) {
        p2 = path.join(p2, 'index.html');
      }
      if (fs.existsSync(p2) && fs.statSync(p2).isFile()) {
        filePath = p2;
      } else if (fs.existsSync(p2 + '.html') && fs.statSync(p2 + '.html').isFile()) {
        filePath = p2 + '.html';
      }
    }
  }

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found: ' + reqPath);
    return;
  }

  const stat = fs.statSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIMES[ext] || 'application/octet-stream';

  // ETag y Cache-Control optimizados
  const etag = `"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;
  const isCode = ext === '.html' || ext === '.js' || ext === '.json' || ext === '.css';
  const cacheHeader = isCode ? 'no-cache, must-revalidate' : 'public, max-age=604800, stale-while-revalidate=86400';

  res.setHeader('ETag', etag);
  res.setHeader('Cache-Control', cacheHeader);

  // Verificación de caché del cliente (HTTP 304 Not Modified)
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304);
    res.end();
    return;
  }

  // Soporte de HTTP Range para video/audio (.mp4)
  const range = req.headers.range;
  if (range && stat.size > 0) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    });
    file.pipe(res);
    return;
  }

  // Compresión GZIP / Deflate para HTML, CSS, JS, JSON, SVG
  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (COMPRESSIBLE.has(ext) && stat.size > 512) {
    res.setHeader('Vary', 'Accept-Encoding');
    if (acceptEncoding.includes('gzip')) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip'
      });
      fs.createReadStream(filePath).pipe(zlib.createGzip({ level: 6 })).pipe(res);
      return;
    } else if (acceptEncoding.includes('deflate')) {
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Encoding': 'deflate'
      });
      fs.createReadStream(filePath).pipe(zlib.createDeflate()).pipe(res);
      return;
    }
  }

  // Entrega estándar sin comprimir
  res.writeHead(200, {
    'Content-Length': stat.size,
    'Content-Type': contentType,
    'Accept-Ranges': 'bytes'
  });
  fs.createReadStream(filePath).pipe(res);
}

// Iniciar servidor soportando process.env.PORT para despliegue en la nube
const envPort = process.env.PORT ? [parseInt(process.env.PORT, 10)] : [];
const ports = [...new Set([...envPort, 8080, 3000])];
ports.forEach(port => {
  const s = http.createServer(handleRequest);
  s.listen(port, '0.0.0.0', () => {
    console.log(`[LYOS SERVER] Ultra-optimizado activo en http://localhost:${port}`);
  });
  s.on('error', err => {
    console.log(`[LYOS SERVER] Puerto ${port} ocupado (${err.code})`);
  });
});
