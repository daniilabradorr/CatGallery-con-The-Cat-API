// src/main.js
import { fetchImages, fetchBreeds } from './api.js';
import { addFavorite, removeFavorite, getFavorites } from './store.js';
import { renderCards, clear, setLoading, showError, updateFavCounter, toggleFavoritesPanel } from './ui.js';

// Referencias al DOM
const galleryEl = document.querySelector('#gallery');
const favoritesEl = document.querySelector('#favorites');
const favGridEl = document.querySelector('#fav-grid');
const favBtn = document.querySelector('#btn-favorites');
const breedSelect = document.querySelector('#breed-select');
const statusEl = document.querySelector('#status');
const spinnerEl = document.querySelector('#spinner');
const sentinel = document.querySelector('#sentinel');

// Estado in-memory
let loading = false;
let page = 0;                  // útil si usas API key + order
let currentBreed = '';
let currentMimes = new Set(['jpg']);
const imageCache = new Map();  // cache por id (opcional, útil para favoritos)

// helpers
const currentMimeList = () => Array.from(currentMimes);
const countFavs = () => getFavorites().length;
const refreshFavCounter = () => updateFavCounter(favBtn, countFavs());

function renderFavorites() {
  favGridEl.innerHTML = '';
  renderCards(favGridEl, getFavorites());
}

// Rellena <select> con /breeds
async function loadBreeds() {
  try {
    const breeds = await fetchBreeds();
    for (const b of breeds) {
      const opt = document.createElement('option');
      opt.value = b.id;
      opt.textContent = b.name;
      breedSelect.appendChild(opt);
    }
  } catch {
    // El filtro es opcional; si falla, seguimos.
  }
}

// Carga de imágenes (scroll infinito)
async function loadMore() {
  if (loading) return;
  loading = true;
  setLoading(spinnerEl, true);
  statusEl.textContent = '';

  try {
    const images = await fetchImages({
      limit: 9,
      // order: 'DESC', // activa si usas API key para paginación determinista
      // page: page++,
      breedId: currentBreed || undefined,
      mimes: currentMimeList()
    });

    // Cachea (opcional)
    for (const img of images) imageCache.set(img.id, img);

    renderCards(galleryEl, images);
  } catch (err) {
    showError(statusEl, 'Error al cargar imágenes.', () => loadMore());
  } finally {
    setLoading(spinnerEl, false);
    loading = false;
  }
}

// Delegación de eventos en la galería (solo favoritos)
function onGalleryClick(e) {
  const card = e.target.closest('.card');
  if (!card) return;

  // Toggle favorito
  if (e.target.classList.contains('js-fav')) {
    const id = card.dataset.id;
    const pressed = e.target.getAttribute('aria-pressed') === 'true';

    if (pressed) {
      removeFavorite(id);
      e.target.setAttribute('aria-pressed', 'false');
    } else {
      // Guarda lo mínimo necesario para re-pintar en favoritos
      const url = card.querySelector('img')?.src;
      const cached = imageCache.get(id) ?? { id, url, breeds: [] };
      addFavorite(cached);
      e.target.setAttribute('aria-pressed', 'true');
    }

    refreshFavCounter();
    renderFavorites();

    // Sincroniza botón espejo si existe
    const mirror = document.querySelector(`.grid .card[data-id="${id}"] .js-fav`);
    if (mirror && mirror !== e.target) mirror.setAttribute('aria-pressed', pressed ? 'false' : 'true');
  }
}

function setupInfiniteScroll() {
  const io = new IntersectionObserver(entries => {
    if (entries.some(en => en.isIntersecting)) loadMore();
  }, { rootMargin: '800px 0px' });
  io.observe(sentinel);
}

function setupControls() {
  favBtn.addEventListener('click', () => toggleFavoritesPanel(favoritesEl, favBtn));

  breedSelect.addEventListener('change', () => {
    currentBreed = breedSelect.value;
    page = 0;
    clear(galleryEl);
    loadMore();
  });

  document.querySelectorAll('input[name="mime"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (cb.checked) currentMimes.add(cb.value);
      else currentMimes.delete(cb.value);
      page = 0;
      clear(galleryEl);
      loadMore();
    });
  });

  galleryEl.addEventListener('click', onGalleryClick);

  // Eliminar desde panel de favoritos
  favGridEl.addEventListener('click', (e) => {
    const card = e.target.closest('.card'); if (!card) return;
    if (e.target.classList.contains('js-fav')) {
      const id = card.dataset.id;
      removeFavorite(id);
      renderFavorites();
      refreshFavCounter();
      const mirror = document.querySelector(`#gallery .card[data-id="${id}"] .js-fav`);
      if (mirror) mirror.setAttribute('aria-pressed', 'false');
    }
  });
}

// Arranque
async function init() {
  refreshFavCounter();
  renderFavorites();
  await loadBreeds();
  await loadMore();
  setupInfiniteScroll();
  setupControls();
}
init();
 