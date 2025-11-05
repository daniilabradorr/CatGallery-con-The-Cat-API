import { isFav } from './store.js';

//la plantilla de la tarjeta
export function cardTemplate(image) {
  const { id, url, breeds = [] } = image;
  const title = breeds[0]?.name ?? 'Gato';
  const alt = `Imagen de ${title}`;
  const favPressed = isFav(id) ? 'true' : 'false';

  return `
    <article class="card" data-id="${id}">
      <img src="${url}" alt="${alt}" loading="lazy">
      <div class="actions">
        <button class="btn js-fav" aria-pressed="${favPressed}" aria-label="Marcar como favorito">❤</button>
      </div>
    </article>
  `;
}

// inserto la tarjeta al final del conytenedor
export function renderCards(container, images) {
  const html = images.map(cardTemplate).join('');
  container.insertAdjacentHTML('beforeend', html);
}

export function clear(container) { container.innerHTML = ''; }

export function setLoading(spinnerEl, on) {
  spinnerEl.hidden = !on;
}

export function showError(statusEl, msg, onRetry) {
  statusEl.innerHTML = '';
  const div = document.createElement('div');
  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = 'Reintentar';
  btn.addEventListener('click', () => onRetry?.());
  div.textContent = msg + ' ';
  div.appendChild(btn);
  statusEl.appendChild(div);
}

export function updateFavCounter(btn, count) {
  btn.textContent = `Favoritos (${count})`;
}

export function toggleFavoritesPanel(panelEl, btnEl) {
  const isHidden = panelEl.hasAttribute('hidden');
  if (isHidden) {
    panelEl.removeAttribute('hidden');
    btnEl.setAttribute('aria-expanded', 'true');
  } else {
    panelEl.setAttribute('hidden', '');
    btnEl.setAttribute('aria-expanded', 'false');
  }
}
