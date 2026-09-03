const fs = require('fs');

const file = 'c:\\Users\\sophi\\Downloads\\Tina Belleza\\LYOS Profesional\\Website - Ecommerce\\LYOS Profesional ecommerce PWA v2\\academia.html';
let content = fs.readFileSync(file, 'utf8');

// Update CSS body to include zoom: 0.86 and better responsive rules
const oldBodyCss = `body{margin:0;background:var(--bg);color:var(--txt);font-family:'DM Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;transition:background-color .3s,color .3s}
a{text-decoration:none;color:inherit}
button{font:inherit;cursor:pointer;border:0;background:transparent}
.mi{font-family:'Material Symbols Rounded';font-weight:400;font-style:normal;line-height:1;display:inline-block;white-space:nowrap;direction:ltr;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;user-select:none}
.desk{display:none!important}
@media(min-width:960px){.desk{display:flex!important}.mob{display:none!important}}`;

const newBodyCss = `body{margin:0;background:var(--bg);color:var(--txt);font-family:'DM Sans',system-ui,-apple-system,sans-serif;-webkit-font-smoothing:antialiased;text-wrap:pretty;overflow-x:hidden;zoom:0.86;transition:background-color .3s ease,color .3s ease}
a{text-decoration:none;color:inherit}
button{font:inherit;cursor:pointer;border:0;background:transparent}
.mi{font-family:'Material Symbols Rounded';font-weight:400;font-style:normal;line-height:1;display:inline-block;white-space:nowrap;direction:ltr;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24;user-select:none}

.desk{display:none!important}
.mob-btn{display:grid!important}
@media(min-width:980px){
  .desk{display:flex!important}
  .mob-btn{display:none!important}
}

/* Mobile Drawer */
#mobileDrawer{
  position:fixed;top:0;right:-100%;width:min(320px,85vw);height:100vh;
  background:var(--surf);border-left:1.5px solid var(--line2);box-shadow:var(--e3);
  z-index:100;padding:24px 20px;display:flex;flex-direction:column;justify-content:space-between;
  transition:right .3s cubic-bezier(0.16, 1, 0.3, 1);
}
#mobileDrawer.open{right:0}
#drawerOverlay{
  position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(10px);
  z-index:95;opacity:0;pointer-events:none;transition:opacity .3s;
}
#drawerOverlay.open{opacity:1;pointer-events:auto}`;

content = content.replace(oldBodyCss, newBodyCss);

// Replace entire <header> section with robust, perfectly centered and responsive header
const oldHeader = `<header style="position:fixed;top:0;inset-x:0;z-index:80;backdrop-filter:blur(28px) saturate(1.8);-webkit-backdrop-filter:blur(28px) saturate(1.8);background:var(--glass);border-bottom:1px solid var(--line);transition:all .3s">
  <div style="max-width:1320px;margin:0 auto;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px">
    
    <!-- Logo -->
    <a href="index.html" style="display:flex;flex-direction:column;line-height:1">
      <span style="font-family:'Outfit',sans-serif;font-weight:900;font-size:26px;letter-spacing:-.04em;color:var(--txt)">LY<span style="background:var(--goldGrad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent">O</span>S</span>
      <span style="font-size:8px;letter-spacing:.42em;color:var(--gold);font-weight:800;margin-top:2px">ACADEMIA</span>
    </a>

    <!-- Navigation Pills -->
    <nav class="desk" style="display:flex;align-items:center;gap:6px;padding:4px 8px;border-radius:999px;background:var(--surf2);border:1px solid var(--line)">
      <a href="index.html" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;color:var(--txt);transition:all .2s" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--txt)'">← Tienda</a>
      <a href="#modulos" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;color:var(--txt);transition:all .2s" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--txt)'">4 Módulos</a>
      <a href="#modalidades" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;color:var(--txt);transition:all .2s" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--txt)'">Modalidades</a>
      <a href="#kit" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;color:var(--txt);transition:all .2s" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--txt)'">Kit &amp; Diploma</a>
      <a href="#roi" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;color:var(--txt);transition:all .2s" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--txt)'">Calculadora ROI</a>
      <a href="#faq" style="padding:7px 16px;border-radius:999px;font-size:13px;font-weight:600;color:var(--txt);transition:all .2s" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--txt)'">FAQ</a>
    </nav>

    <!-- Right Utility -->
    <div style="display:flex;align-items:center;gap:10px">
      <!-- Theme Switcher -->
      <button id="themeBtn" aria-label="Cambiar tema" style="width:38px;height:38px;border-radius:999px;border:1px solid var(--line2);background:var(--surf);display:grid;place-items:center;color:var(--txt)">
        <span class="mi" id="themeIcon" style="font-size:19px;color:var(--gold)">light_mode</span>
      </button>

      <!-- Primary Action -->
      <a href="https://wa.me/573135959808?text=Hola%20Cristina,%20quiero%20inscribirme%20en%20la%20Academia%20Capilar%20LYOS." target="_blank" class="btn-gold" style="height:40px;padding:0 20px;font-size:13px">
        <span>Inscribirme</span>
      </a>
    </div>

  </div>
</header>`;

const newHeader = `<!-- Drawer Overlay -->
<div id="drawerOverlay" onclick="toggleDrawer()"></div>

<!-- Slide-Out Mobile Drawer -->
<div id="mobileDrawer">
  <div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:1px solid var(--line2);margin-bottom:20px">
      <a href="index.html" style="display:flex;flex-direction:column;line-height:1">
        <span style="font-family:'Outfit',sans-serif;font-weight:900;font-size:24px;color:var(--txt)">LY<span style="background:var(--goldGrad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent">O</span>S</span>
        <span style="font-size:8px;letter-spacing:.4em;color:var(--gold);font-weight:800;margin-top:2px">ACADEMIA</span>
      </a>
      <button onclick="toggleDrawer()" aria-label="Cerrar menú" style="width:36px;height:36px;border-radius:999px;border:1px solid var(--line2);display:grid;place-items:center;color:var(--txt)">
        <span class="mi" style="font-size:20px">close</span>
      </button>
    </div>

    <div style="display:grid;gap:12px;font-size:14px;font-weight:700">
      <a href="index.html" onclick="toggleDrawer()" style="padding:10px 14px;border-radius:12px;background:var(--surf2);color:var(--txt);display:flex;align-items:center;gap:8px">
        <span class="mi" style="font-size:18px;color:var(--gold)">storefront</span>
        <span>← Volver a la Tienda</span>
      </a>
      <a href="#modulos" onclick="toggleDrawer()" style="padding:10px 14px;border-radius:12px;color:var(--txt);display:flex;align-items:center;gap:8px">
        <span class="mi" style="font-size:18px;color:var(--gold)">menu_book</span>
        <span>4 Módulos Técnicos</span>
      </a>
      <a href="#modalidades" onclick="toggleDrawer()" style="padding:10px 14px;border-radius:12px;color:var(--txt);display:flex;align-items:center;gap:8px">
        <span class="mi" style="font-size:18px;color:var(--gold)">tune</span>
        <span>Modalidades (Cali / Virtual)</span>
      </a>
      <a href="#roi" onclick="toggleDrawer()" style="padding:10px 14px;border-radius:12px;color:var(--txt);display:flex;align-items:center;gap:8px">
        <span class="mi" style="font-size:18px;color:var(--gold)">calculate</span>
        <span>Calculadora de Rentabilidad</span>
      </a>
      <a href="#agendar" onclick="toggleDrawer()" style="padding:10px 14px;border-radius:12px;color:var(--txt);display:flex;align-items:center;gap:8px">
        <span class="mi" style="font-size:18px;color:var(--gold)">event_available</span>
        <span>Agendar Asesoría 1 a 1</span>
      </a>
      <a href="#faq" onclick="toggleDrawer()" style="padding:10px 14px;border-radius:12px;color:var(--txt);display:flex;align-items:center;gap:8px">
        <span class="mi" style="font-size:18px;color:var(--gold)">help</span>
        <span>Preguntas Frecuentes</span>
      </a>
    </div>
  </div>

  <div style="padding-top:16px;border-top:1px solid var(--line2)">
    <a href="https://wa.me/573135959808?text=Hola%20Cristina,%20quiero%20inscribirme%20en%20la%20Academia%20Capilar%20LYOS." target="_blank" class="btn-gold" style="width:100%;height:48px;font-size:14px">
      <span>Inscribirme por WhatsApp</span>
    </a>
  </div>
</div>

<!-- ====================================================================== -->
<!-- HEADER DE NAVEGACIÓN PRINCIPAL (PERFECTAMENTE ALINEADO Y CENTRADO)     -->
<!-- ====================================================================== -->
<header style="position:sticky;top:0;z-index:80;backdrop-filter:blur(28px) saturate(1.8);-webkit-backdrop-filter:blur(28px) saturate(1.8);background:var(--glass);border-bottom:1px solid var(--line);transition:background-color .3s, border-color .3s">
  <div style="max-width:1320px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px">
    
    <!-- Left: Brand Logo -->
    <a href="index.html" aria-label="LYOS Academia Inicio" style="display:flex;flex-direction:column;line-height:1;padding:4px 0;flex:none;text-decoration:none">
      <span style="font-family:'Outfit',sans-serif;font-weight:900;font-size:26px;letter-spacing:-.04em;color:var(--txt)">LY<span style="background:var(--goldGrad);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent">O</span>S</span>
      <span style="font-size:8px;letter-spacing:.42em;color:var(--gold);font-weight:800;margin-top:2px">ACADEMIA</span>
    </a>

    <!-- Center: Desktop Navigation Pills -->
    <nav class="desk" style="display:flex;align-items:center;gap:3px;padding:4px 6px;border-radius:999px;background:var(--surf2);border:1px solid var(--line);flex:none">
      <a href="index.html" style="padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:700;color:var(--txt);transition:all .2s;white-space:nowrap" onmouseover="this.style.color='var(--gold)';this.style.background='var(--surf)'" onmouseout="this.style.color='var(--txt)';this.style.background='transparent'">← Tienda</a>
      <a href="#modulos" style="padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:700;color:var(--txt);transition:all .2s;white-space:nowrap" onmouseover="this.style.color='var(--gold)';this.style.background='var(--surf)'" onmouseout="this.style.color='var(--txt)';this.style.background='transparent'">4 Módulos</a>
      <a href="#modalidades" style="padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:700;color:var(--txt);transition:all .2s;white-space:nowrap" onmouseover="this.style.color='var(--gold)';this.style.background='var(--surf)'" onmouseout="this.style.color='var(--txt)';this.style.background='transparent'">Modalidades</a>
      <a href="#roi" style="padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:700;color:var(--txt);transition:all .2s;white-space:nowrap" onmouseover="this.style.color='var(--gold)';this.style.background='var(--surf)'" onmouseout="this.style.color='var(--txt)';this.style.background='transparent'">Calculadora ROI</a>
      <a href="#agendar" style="padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:700;color:var(--txt);transition:all .2s;white-space:nowrap" onmouseover="this.style.color='var(--gold)';this.style.background='var(--surf)'" onmouseout="this.style.color='var(--txt)';this.style.background='transparent'">Agendar</a>
      <a href="#faq" style="padding:6px 14px;border-radius:999px;font-size:12.5px;font-weight:700;color:var(--txt);transition:all .2s;white-space:nowrap" onmouseover="this.style.color='var(--gold)';this.style.background='var(--surf)'" onmouseout="this.style.color='var(--txt)';this.style.background='transparent'">FAQ</a>
    </nav>

    <!-- Right: Utility Controls & Primary CTA -->
    <div style="display:flex;align-items:center;gap:8px;flex:none">
      
      <!-- Theme Switcher -->
      <button id="themeBtn" aria-label="Cambiar tema claro / oscuro" title="Cambiar tema" style="width:39px;height:39px;border-radius:999px;border:1px solid var(--line2);background:var(--surf);display:grid;place-items:center;cursor:pointer;color:var(--txt);transition:all .2s">
        <span class="mi" id="themeIcon" style="font-size:19px;color:var(--gold)">light_mode</span>
      </button>

      <!-- Primary Action (Desktop) -->
      <a href="https://wa.me/573135959808?text=Hola%20Cristina,%20quiero%20inscribirme%20en%20la%20Academia%20Capilar%20LYOS." target="_blank" class="desk btn-gold" style="height:39px;padding:0 18px;font-size:12.5px;white-space:nowrap">
        <span>Inscribirme</span>
      </a>

      <!-- Mobile Hamburger Button -->
      <button onclick="toggleDrawer()" class="mob-btn" aria-label="Abrir menú" style="width:39px;height:39px;border-radius:999px;border:1px solid var(--line2);background:var(--surf);place-items:center;cursor:pointer;color:var(--txt)">
        <span class="mi" style="font-size:22px">menu</span>
      </button>

    </div>

  </div>
</header>`;

content = content.replace(oldHeader, newHeader);

// Add toggleDrawer JS function
const scriptToAdd = `
function toggleDrawer() {
  const d = document.getElementById('mobileDrawer');
  const o = document.getElementById('drawerOverlay');
  if (d && o) {
    d.classList.toggle('open');
    o.classList.toggle('open');
  }
}
`;

content = content.replace('// Theme Logic', scriptToAdd + '\n// Theme Logic');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully fixed header alignment and responsiveness in academia.html');
