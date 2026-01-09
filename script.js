fetch('promos.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('promos');

    data.promos.forEach(promo => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <h3>${promo.nombre}</h3>
        <p>${promo.descripcion}</p>
        <div class="price">$ ${promo.precio.toLocaleString()}</div>
      `;

      container.appendChild(card);
    });
  });

