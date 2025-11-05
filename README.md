CatGallery · The Cat API - EJERCICIO CONQUEBLOCKS

Galería de gatos hecha con JavaScript vanilla (ES Modules), usando fetch, scroll infinito, favoritos con localStorage, filtro por raza y por tipo de imagen COMO PEDIAIS EN EL ENUNCIADO.
Proyecto para la Propuesta 3 del módulo de JS.

https://daniilabradorr.github.io/CatGallery-con-The-Cat-API/

✨ Funcionalidades

✅ Galería de imágenes desde The Cat API

✅ Scroll infinito (IntersectionObserver)

✅ Favoritos: añadir/eliminar y persistencia en localStorage

✅ Filtros: por raza (select de /breeds) y por tipo (jpg/png/gif)

✅ Estados de carga (spinner) y errores con botón Reintentar

♿ Accesibilidad: aria-live, aria-pressed, aria-controls

Nota: los detalles de raza en modal eran opcionales según el enunciado y no se incluyen.

📦 Estructura
/
├─ index.html
├─ styles.css #un minimo de estilo para que se vea decente
└─ src/
   ├─ api.js      # llamadas a The Cat API (fetch) + cabeceras centralizadas
   ├─ store.js    # favoritos en localStorage
   ├─ ui.js       # plantillas y helpers de UI
   └─ main.js     # orquesta eventos, filtros y scroll infinito



✅ Checklist del enunciado (Propuesta 3)

 Publicación en GitHub Pages

 Galería con imágenes de The Cat API

 Favoritos persistentes (localStorage)

 Paginación vía scroll infinito

 Estados de carga (spinner) y errores con reintento

 Filtros (raza y tipo)

 (Opcional) Modal con datos de raza (no incluido por decisión de alcance)


👏 Créditos

Imágenes y datos: procedentes de la api: https://api.thecatapi.com/v1