# CatGallery · The Cat API - EJERCICIO CONQUEBLOCKS 🐈

Galería de gatos hecha con **JavaScript**, usando `fetch`, **scroll infinito** (`IntersectionObserver`), **favoritos con `localStorage`**, y **filtro por raza y por tipo de imagen** tal y como se lo solicitabais en el enunciado.

Proyecto desarrollado para la **Propuesta 3** del módulo de JavaScript.

## 🔗 Demo en Vivo

Puedes ver el proyecto funcionando aquí:

[https://daniilabradorr.github.io/CatGallery-con-The-Cat-API/](https://daniilabradorr.github.io/CatGallery-con-The-Cat-API/)

---

## ✨ Funcionalidades Destacadas

* ✅ **Galería de imágenes** desde The Cat API
* ✅ **Scroll infinito** (implementado con `IntersectionObserver`)
* ✅ **Favoritos**: añadir/eliminar y persistencia mediante `localStorage`
* ✅ **Filtros**: por **raza** (`select` con datos de `/breeds`) y por **tipo de imagen** (`jpg`/`png`/`gif`)
* ✅ **Manejo de Estados**:
    * **Estados de carga** (spinner)
    * **Manejo de errores** con botón "Reintentar"
* ♿ **Accesibilidad**: uso de `aria-live`, `aria-pressed`, `aria-controls`

> **Nota**: Los detalles de raza en modal eran opcionales según el enunciado y no los he incluido ya que eran opcinal.

---

## 📦 Estructura del Proyecto
/
├─ index.html
├─ styles.css #un minimo de estilo para que se vea decente
└─ src/
   ├─ api.js      # llamadas a The Cat API (fetch) + cabeceras centralizadas
   ├─ store.js    # favoritos en localStorage
   ├─ ui.js       # plantillas y helpers de UI
   └─ main.js     # orquesta eventos, filtros y scroll infinito


   ## ✅ Checklist del Enunciado (Propuesta 3)

| Requisito | Cumplimiento |
| :--- | :---: |
| Publicación en GitHub Pages | ✅ |
| Galería con imágenes de The Cat API | ✅ |
| Favoritos persistentes (`localStorage`) | ✅ |
| Paginación vía scroll infinito | ✅ |
| Estados de carga (spinner) y errores con reintento | ✅ |
| Filtros (raza y tipo) | ✅ |
| (Opcional) Modal con datos de raza | ❌ (No incluido ya que era opcional) |

---

## 👏 Créditos

* **Imágenes y datos**: Procedentes de The Cat API
    * **API URL**: `https://api.thecatapi.com/v1`