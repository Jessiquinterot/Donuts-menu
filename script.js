function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function selectLang(lang) {
  if (lang === 'es') {
    showSection('home');
  } else {
    showSection('english');
  }
}

/* Cargar promos */
fetch('promos.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('promos-grid');

    data.promos.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
        <div class="price">$ ${item.precio.toLocaleString('es-AR')}</div>
      `;

      container.appendChild(card);
    });
  });
