const KEY = 'catgallery:favorites';

export function getFavorites() {
  try { return JSON.parse(localStorage.getItem(KEY)) ?? []; }
  catch { return []; }
}

export function isFav(id) {
  return getFavorites().some(it => it.id === id);
}

export function addFavorite(image) {
  const list = getFavorites();
  if (!list.find(it => it.id === image.id)) {
    list.push({ id: image.id, url: image.url, breeds: image.breeds ?? [] });
    localStorage.setItem(KEY, JSON.stringify(list));
  }
  return list;
}

export function removeFavorite(id) {
  const list = getFavorites().filter(it => it.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
  return list;
}
