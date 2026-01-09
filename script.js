fetch('promos.json')
  .then(res => {
    if (!res.ok) throw new Error('No se pudo cargar promos.json');
    return res.json();
  })
  .then(data => {
    const container = document.getElementById('promos');
    container.innerHTML = '';

    data.promos.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';

      const precio = Number(item.precio || 0).toLocaleString('es-AR');

      card.innerHTML = `
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
        <div class="price">$ ${precio}</div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    const container = document.getElementById('promos');
    container.innerHTML = `<div class="card"><h3>Error</h3><p>${err.message}</p></div>`;
  });

