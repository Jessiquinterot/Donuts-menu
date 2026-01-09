function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

function selectLang(lang) {
  if (lang === 'es') {
    document.getElementById('nav').classList.remove('hidden');
    showSection('promos'); // o 'home' si después agregamos portada ES interna
  } else {
    showSection('english');
  }
}

/* Cargar promos (no depende del idioma, solo se verá cuando entres a Promos) */
fetch('promos.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar promos.json');
    return res.json();
  })
  .then(data => {
    const container = document.getElementById('promos-grid');
    container.innerHTML = '';

    data.promos.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
        <div class="price">$ ${Number(item.precio).toLocaleString('es-AR')}</div>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    const container = document.getElementById('promos-grid');
    if (container) {
      container.innerHTML = `<div class="card"><h3>Error</h3><p>${err.message}</p></div>`;
    }
  });
