const BASE = 'https://api.thecatapi.com/v1';

//centralizo la cabeceera
let API_KEY = null;
export function setApiKey(key) { API_KEY = key || null; }
function headers() {
  const h = { Accept: 'application/json' };
  if (API_KEY) h['x-api-key'] = API_KEY;
  return h;
}

//razas para el <select>
export async function fetchBreeds() {
  const res = await fetch(`${BASE}/breeds?limit=100&page=0`, { headers: headers() });
  if (!res.ok) throw new Error('Error cargando razas');
  return res.json();
}

//imagenes con filtros por raza y tipo de imagen
export async function fetchImages({ limit = 9, page, order, breedId, mimes = [] } = {}) {
  const qs = new URLSearchParams();
  qs.set('limit', limit);
  if (order) qs.set('order', order);
  if (page != null) qs.set('page', page);
  if (breedId) qs.set('breed_ids', breedId);
  if (mimes.length) qs.set('mime_types', mimes.join(','));
  const res = await fetch(`${BASE}/images/search?${qs}`, { headers: headers() });
  if (!res.ok) throw new Error('No se pudieron cargar imágenes');
  return res.json();
}