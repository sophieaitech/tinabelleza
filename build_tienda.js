const fs = require('fs');
const path = require('path');

const pwaDir = path.join(__dirname, 'LYOS Profesional ecommerce PWA v2');
const indexPath = path.join(pwaDir, 'index.html');
const tiendaPath = path.join(pwaDir, 'tienda.html');

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update Title & Meta Description
html = html.replace(
  '<title>LYOS Profesional | Fórmulas Capilares Premium & Academia Cali</title>',
  '<title>Tienda Oficial LYOS Profesional | Catálogo Completo Grado Salón</title>'
);
html = html.replace(
  '<meta name="description" content="Descubre la línea capilar profesional LYOS: Alisado Hialurónico sin formol, Shampoo clarificante, Tratamiento reparador y Termoprotector. Compra online en Cali y toda Colombia.">',
  '<meta name="description" content="Tienda Oficial LYOS Profesional: Alisado Hialurónico sin formol, Alisado Brasileño Bio Intense, Alisado Coreano Korea Liss, tratamientos y kits de salón con envío seguro en Colombia.">'
);

// 2. In Navigation Header: Replace the "Tienda LYOS" button with "← Volver al Inicio"
const oldNavHeader = `<a href="tienda.html" class="desk" style="height:39px;padding:0 18px;border-radius:999px;background:var(--goldGrad);color:var(--onGold);font-weight:700;font-size:12.5px;letter-spacing:.02em;display:flex;align-items:center;gap:7px;transition:all .25s;box-shadow:0 6px 18px -4px rgba(168,124,47,.5);white-space:nowrap;text-decoration:none" style-hover="filter:brightness(1.08);transform:translateY(-1px);box-shadow:0 10px 24px -4px rgba(168,124,47,.7)">
        <span class="mi" style="font-size:16px">storefront</span>
        <span>Tienda LYOS</span>
      </a>`;

const newNavHeader = `<a href="index.html" class="desk" style="height:39px;padding:0 18px;border-radius:999px;background:var(--surf);border:1.5px solid var(--line2);color:var(--txt);font-weight:700;font-size:12.5px;letter-spacing:.02em;display:flex;align-items:center;gap:7px;transition:all .25s;box-shadow:var(--e1);white-space:nowrap;text-decoration:none" style-hover="background:var(--surf2);border-color:var(--gold);color:var(--gold);transform:translateY(-1px)">
        <span class="mi" style="font-size:17px;color:var(--gold)">arrow_back</span>
        <span>Volver al Inicio</span>
      </a>`;

html = html.replace(oldNavHeader, newNavHeader);

// Also replace the desktop nav links to point back to index.html sections
html = html.replace('<a href="tienda.html" style="padding:7px 14px;border-radius:999px;font-size:13px;font-weight:600;letter-spacing:.01em;color:var(--txt);transition:all .22s;text-decoration:none" style-hover="background:var(--surf);color:var(--gold);box-shadow:var(--e1)"><span>Tienda LYOS</span></a>',
  '<a href="index.html" style="padding:7px 14px;border-radius:999px;font-size:13px;font-weight:600;letter-spacing:.01em;color:var(--txt);transition:all .22s;text-decoration:none" style-hover="background:var(--surf);color:var(--gold);box-shadow:var(--e1)"><span>Inicio</span></a>');
html = html.replace('<a href="#comparador"', '<a href="index.html#comparador"');
html = html.replace('<a href="#resenas"', '<a href="index.html#resenas"');
html = html.replace('<a href="#contacto"', '<a href="index.html#contacto"');

// In mobile nav: replace inicio / productos links
html = html.replace(
  '<a href="#inicio" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px;border-radius:999px;color:var(--txt);font-size:10px;font-weight:700;text-decoration:none;transition:all .2s" style-hover="color:var(--gold)"><span class="mi mio" style="font-size:21px">home</span><span data-i18n="nav_home">Inicio</span></a>',
  '<a href="index.html" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px;border-radius:999px;color:var(--txt);font-size:10px;font-weight:700;text-decoration:none;transition:all .2s" style-hover="color:var(--gold)"><span class="mi mio" style="font-size:21px">home</span><span data-i18n="nav_home">Inicio</span></a>'
);
html = html.replace('<a href="#comparador"', '<a href="index.html#comparador"');
html = html.replace('<a href="#contacto"', '<a href="index.html#contacto"');

// 3. In tienda.html: Remove the entire Homepage Hero (#inicio), Brand Video Section, and Top Marquee Ticker!
// Instead, insert the dedicated STOREFRONT HERO BANNER right before <section id="productos">
const heroStartMarker = '<section id="inicio">';
const productosMarker = '<section id="productos"';

const heroStartIndex = html.indexOf(heroStartMarker);
const productosIndex = html.indexOf(productosMarker);

if (heroStartIndex !== -1 && productosIndex !== -1) {
  const storeHeroHtml = `<!-- DEDICATED STOREFRONT HERO BANNER -->
<section id="tienda-hero" style="position:relative;background:linear-gradient(180deg,rgba(11,10,8,.95) 0%,rgba(18,16,12,.8) 100%),url('assets/equipo-gold.jpg') center 30% / cover no-repeat;padding:calc(clamp(40px,6vw,76px) + 68px) 18px clamp(32px,4vw,48px);border-bottom:1px solid var(--line);overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 20%,rgba(217,182,121,.16) 0%,transparent 60%)"></div>
  <div style="position:relative;z-index:2;max-width:1320px;margin:0 auto">
    
    <!-- Breadcrumbs & Back Link -->
    <div style="display:flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:var(--mut);margin-bottom:18px">
      <a href="index.html" style="color:var(--txt);display:inline-flex;align-items:center;gap:5px;transition:color .2s" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--txt)'">
        <span class="mi" style="font-size:16px">home</span>
        <span>Inicio</span>
      </a>
      <span style="color:var(--dim)">/</span>
      <span style="color:var(--gold)">Tienda Oficial LYOS</span>
    </div>

    <div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:24px">
      <div style="max-width:760px">
        <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:999px;background:rgba(217,182,121,.12);border:1px solid rgba(217,182,121,.3);color:var(--gold);font-size:10.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;margin-bottom:12px">
          <span style="width:6px;height:6px;border-radius:999px;background:var(--gold)"></span>
          ✦ TIENDA OFICIAL LYOS PROFESIONAL · TECNOLOGÍA BRASILEÑA & COREANA
        </div>
        <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(32px,5.5vw,60px);font-weight:800;letter-spacing:-.045em;line-height:1.02;color:#FFFDF8;margin:0">
          Catálogo Completo Profesional
        </h1>
        <p style="font-size:clamp(14px,1.6vw,17px);line-height:1.6;color:rgba(255,253,248,.82);margin:14px 0 0;max-width:62ch">
          Explora todas nuestras fórmulas de grado salón con <strong>Ácido Hialurónico puro, Manteca de Murumuru y 0% formol</strong>. Presentaciones de litro para salones, formatos mediano y personal para cuidado en casa.
        </p>
      </div>

      <!-- Trust Badges Strip on Store Hero -->
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;min-width:min(100%,360px)">
        <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px)">
          <span class="mi" style="font-size:22px;color:var(--gold)">local_shipping</span>
          <div>
            <div style="font-size:12px;font-weight:800;color:#FFFDF8">Envíos Gratis</div>
            <div style="font-size:10.5px;color:rgba(255,255,255,.7)">Desde $150.000 COP</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px)">
          <span class="mi" style="font-size:22px;color:var(--gold)">verified</span>
          <div>
            <div style="font-size:12px;font-weight:800;color:#FFFDF8">100% Original</div>
            <div style="font-size:10.5px;color:rgba(255,255,255,.7)">INVIMA Vigente</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px)">
          <span class="mi" style="font-size:22px;color:var(--gold)">payments</span>
          <div>
            <div style="font-size:12px;font-weight:800;color:#FFFDF8">Pago Seguro</div>
            <div style="font-size:10.5px;color:rgba(255,255,255,.7)">Nequi, Wompi & Entrega</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);backdrop-filter:blur(10px)">
          <span class="mi" style="font-size:22px;color:var(--gold)">support_agent</span>
          <div>
            <div style="font-size:12px;font-weight:800;color:#FFFDF8">Asesoría VIP</div>
            <div style="font-size:10.5px;color:rgba(255,255,255,.7)">Atención técnica directa</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

`;
  html = html.substring(0, heroStartIndex) + storeHeroHtml + html.substring(productosIndex);
}

// 4. In <section id="productos"> inside tienda.html:
// Add search input & full category tabs!
const tiendaProductsHeader = `  <div style="position:relative;z-index:2;display:flex;flex-wrap:wrap;align-items:flex-end;gap:18px;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:20px">
    <div style="max-width:720px">
      
      <!-- Sleek Meta Row -->
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-bottom:10px">
        <span style="font-size:10.5px;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);font-weight:800;display:inline-flex;align-items:center;gap:6px">
          <span style="width:6px;height:6px;border-radius:999px;background:var(--gold);display:inline-block"></span>
          PORTAFOLIO COMPLETO · 7 FÓRMULAS
        </span>
        <span style="color:var(--dim);font-size:11px">·</span>
        <div style="display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--txt);font-weight:700">
          <span style="color:var(--gold);letter-spacing:1px;font-size:13px">★★★★★</span>
          <span>4.9</span>
          <span style="font-size:11.5px;color:var(--mut);font-weight:500">(+4.200 salones en Colombia)</span>
        </div>
      </div>

      <!-- Main Title -->
      <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(30px,4.5vw,48px);font-weight:800;letter-spacing:-.04em;line-height:1.06;margin:0;color:var(--txt)">
        Todos los Productos LYOS
      </h2>
      
      <!-- Subtitle -->
      <p style="font-size:14.5px;color:var(--mut);margin:8px 0 0;line-height:1.6;max-width:54ch">
        Selecciona la presentación que necesitas, añade a tu bolsa con un clic o solicita asesoría técnica personalizada.
      </p>
    </div>

    <!-- Layout Switcher & Fast Back -->
    <div style="display:flex;align-items:center;gap:10px">
      <a href="index.html" style="height:42px;padding:0 20px;border-radius:999px;background:var(--surf);border:1.5px solid var(--line2);color:var(--txt);font-weight:700;font-size:13px;display:inline-flex;align-items:center;gap:7px;text-decoration:none;box-shadow:var(--e1);transition:all .25s" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='var(--line2)';this.style.color='var(--txt)'">
        <span class="mi" style="font-size:17px;color:var(--gold)">arrow_back</span>
        <span>Volver a Portada</span>
      </a>
      <div style="display:flex;gap:4px;padding:4px;border-radius:999px;background:var(--surf);border:1.5px solid var(--line2);box-shadow:var(--e1)">
        <button onClick="{{ setEditorial }}" style="{{ edStyle }}"><span class="mi mio" style="font-size:17px">view_agenda</span>Editorial</button>
        <button onClick="{{ setGallery }}" style="{{ glStyle }}"><span class="mi mio" style="font-size:17px">grid_view</span>Galería</button>
      </div>
    </div>
  </div>

  <!-- Luxury Real-Time Search & Category Filters Bar -->
  <div style="margin:24px 0 28px;display:flex;flex-direction:column;gap:14px">
    
    <!-- Instant Search Input -->
    <div style="position:relative;max-width:540px">
      <input type="text" placeholder="Buscar por nombre, ingrediente o beneficio..." value="{{ searchVal }}" onInput="{{ onSearchInput }}" style="width:100%;height:48px;padding:0 46px 0 46px;border-radius:999px;background:var(--surf);border:1.5px solid var(--line2);color:var(--txt);font-size:13.5px;font-family:inherit;outline:none;transition:all .25s;box-shadow:var(--e1)" onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 4px rgba(217,182,121,.15)'" onblur="this.style.borderColor='var(--line2)';this.style.boxShadow='var(--e1)'" />
      <span class="mi" style="position:absolute;left:16px;top:50%;transform:translateY(-50%);font-size:20px;color:var(--gold);pointer-events:none">search</span>
      <sc-if value="{{ hasSearchVal }}" hint-placeholder-val="{{ false }}">
        <button onClick="{{ clearSearch }}" aria-label="Limpiar búsqueda" style="position:absolute;right:14px;top:50%;transform:translateY(-50%);width:24px;height:24px;border-radius:50%;background:var(--surf3);color:var(--mut);border:0;display:grid;place-items:center;cursor:pointer;font-size:14px"><span class="mi" style="font-size:16px">close</span></button>
      </sc-if>
    </div>

    <!-- Category Pills Tabs -->
    <div class="hs" style="display:flex;gap:8px;overflow-x:auto;padding:4px 2px 10px;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;align-items:center">
      <sc-for list="{{ cats }}" as="c" hint-placeholder-count="6">
        <button onClick="{{ c.pick }}" style="{{ c.pillStyle }}" style-hover="{{ c.pillHover }}">
          <span class="mi" style="{{ c.pillIconStyle }}">{{ c.icon }}</span>
          <span>{{ c.label }}</span>
          <span style="{{ c.countStyle }}">{{ c.count }}</span>
        </button>
      </sc-for>
    </div>
  </div>`;

// Replace the section header in tienda.html
html = html.replace(
  html.substring(
    html.indexOf('<div style="position:relative;z-index:2;display:flex;flex-wrap:wrap;align-items:flex-end;gap:18px;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:20px">'),
    html.indexOf('<!-- VIEW 1: EDITORIAL SHOWCASE')
  ),
  tiendaProductsHeader + '\n\n  '
);

// In tienda.html: Remove the "High-Conversion Tienda LYOS Complete Catalog Invitation Banner" since we're already IN the complete store!
const bannerMarker = '<!-- High-Conversion Tienda LYOS Complete Catalog Invitation Banner -->';
const bannerEnd = '<div style="margin-top:clamp(36px,5vw,56px);padding:22px 28px;border-radius:28px';

const bStart = html.indexOf(bannerMarker);
const bEnd = html.indexOf(bannerEnd);
if (bStart !== -1 && bEnd !== -1) {
  html = html.substring(0, bStart) + html.substring(bEnd);
}

// 5. In tienda.html Component JavaScript:
// Ensure `products` returns ALL filtered products (not sliced to 4) and provide searchVal / onSearchInput!
const oldProductsSlice = `    const all = PRODUCTS.map(dec);
    // On the initial landing page, showcase the top 4 essential bestsellers
    const products = all.slice(0, 4).map((p, i) => ({ ...p, imgOrder:i % 2 === 1 ? 2 : 1 }));`;

const fullProductsCode = `    const all = PRODUCTS.map(dec);
    // In Tienda LYOS, show ALL products filtered by category and search:
    const products = all.filter(p => {
      if (S.cat === 'Todos') return true;
      if (S.cat === 'Alisadores') return p.cat === 'Alisador';
      if (S.cat === 'Shampoo') return p.cat === 'Shampoo';
      if (S.cat === 'Tratamientos') return p.cat === 'Tratamiento';
      if (S.cat === 'Termo protector') return p.cat === 'Termoprotector';
      if (S.cat === 'Mascarillas') return p.cat === 'Mascarilla' || p.cat === 'Tratamiento';
      return p.cat === S.cat;
    }).filter(p => {
      if (!S.q || !S.q.trim()) return true;
      const q = S.q.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || (p.tags && p.tags.some(t => t.toLowerCase().includes(q)));
    }).map((p, i) => ({ ...p, imgOrder:i % 2 === 1 ? 2 : 1 }));`;

html = html.replace(oldProductsSlice, fullProductsCode);

// Add searchVal, hasSearchVal, onSearchInput, clearSearch to renderVals()
const renderValsStart = 'return {';
const searchBindings = `return {
      searchVal:S.q || '',
      hasSearchVal:Boolean(S.q && S.q.trim()),
      onSearchInput:e => this.setState({ q:e.target.value }),
      clearSearch:() => this.setState({ q:'' }),`;

html = html.replace(renderValsStart, searchBindings);

// Update CATS counts to reflect 7 products:
html = html.replace("{ id:'Todos', icon:'auto_awesome', count:'6'", "{ id:'Todos', icon:'auto_awesome', count:'7'");
html = html.replace("{ id:'Tratamiento', icon:'spa', count:'1'", "{ id:'Tratamiento', icon:'spa', count:'2'");

fs.writeFileSync(tiendaPath, html, 'utf8');
console.log('Successfully created tienda.html! Total length:', html.length);
