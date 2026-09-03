const fs = require('fs');

const indexPath = fs.existsSync('lyos/index.html') ? 'lyos/index.html' : 'LYOS Profesional ecommerce PWA v2/index.html';
const tiendaPath = fs.existsSync('lyos/tienda.html') ? 'lyos/tienda.html' : 'LYOS Profesional ecommerce PWA v2/tienda.html';

const index = fs.readFileSync(indexPath, 'utf8');
const tienda = fs.readFileSync(tiendaPath, 'utf8');

console.log('--- INDEX.HTML (PORTADA) ---');
console.log('1. Título Fórmulas Más Vendidas:', index.includes('Fórmulas Más Vendidas'));
console.log('2. Enlace a tienda.html en CTA header:', index.includes('href="tienda.html"'));
console.log('3. Banner de invitación a Tienda Completa:', index.includes('Ver Tienda'));
console.log('4. Productos limitados a los 4 más vendidos:', index.includes('products = all.slice(0, 4)'));

console.log('\n--- TIENDA.HTML (LANDING ESPECIAL TIENDA) ---');
console.log('1. Hero Catálogo Completo Profesional:', tienda.includes('Catálogo Completo Profesional'));
console.log('2. Botón Volver al Inicio:', tienda.includes('Volver al Inicio'));
console.log('3. Barra de búsqueda en tiempo real:', tienda.includes('searchVal'));
console.log('4. Pestañas de categorías completas:', tienda.includes('cats'));
console.log('5. Filtro completo de todos los 7 productos:', tienda.includes('products = all.filter'));
console.log('6. Apertura automática del carrito drawer:', tienda.includes('cartOpen:true'));
