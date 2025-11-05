export function openModal(dialog, { title, bodyHtml }) {
  dialog.querySelector('#modal-title').textContent = title ?? 'Detalles';
  dialog.querySelector('#modal-body').innerHTML = bodyHtml ?? '';
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open',''); //aqui hago un fallback
}

export function closeModal(dialog) {
  if (typeof dialog.close === 'function') dialog.close();
  dialog.removeAttribute('open');
}

export function renderBreedDetails(image) {
  const b = image.breeds?.[0];
  if (!b) return { title: 'Sin datos de raza', bodyHtml: '<p>No hay metadatos disponibles.</p>' };
  const body = `
    <p><strong>Raza:</strong> ${b.name}</p>
    <p><strong>Temperamento:</strong> ${b.temperament ?? '—'}</p>
    <p><strong>Origen:</strong> ${b.origin ?? '—'}</p>
  `;
  return { title: `Detalles · ${b.name}`, bodyHtml: body };
}
