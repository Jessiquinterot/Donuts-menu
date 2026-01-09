document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("menu-content");
  if (!container) return;

  const path = window.location.pathname.toLowerCase();

  /* ===== PROMOS ===== */
  if (path.includes("promos.html")) {
    fetch("promos.json")
      .then(res => res.json())
      .then(data => {
        data.promos.forEach(item => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>${item.descripcion}</p>
            <div class="price">$ ${Number(item.precio).toLocaleString("es-AR")}</div>
          `;
          container.appendChild(card);
        });
      })
      .catch(() => {
        container.innerHTML = "<p>Error cargando promos</p>";
      });
    return;
  }

  /* ===== DULCES / SALADOS ===== */
  let jsonFile = "";
  let rootKey = "";

  if (path.includes("dulces.html")) {
    jsonFile = "dulces.json";
    rootKey = "dulces";
  } else if (path.includes("salados.html")) {
    jsonFile = "salados.json";
    rootKey = "salados";
  } else {
    return;
  }

  fetch(jsonFile)
    .then(res => res.json())
    .then(data => {
      data[rootKey].forEach(section => {
        const block = document.createElement("div");
        block.className = "menu-section";

        let html = `<h2>${section.categoria}</h2>`;

        if (section.nota) {
          html += `<p class="note">${section.nota}</p>`;
        }

        html += `<ul>`;
        section.items.forEach(item => {
          html += `
            <li>
              <span>${item.nombre}</span>
              <span class="price">
                ${item.precio !== null ? "$ " + Number(item.precio).toLocaleString("es-AR") : ""}
              </span>
            </li>
          `;
        });
        html += `</ul>`;

        block.innerHTML = html;
        container.appendChild(block);
      });
    })
    .catch(() => {
      container.innerHTML = "<p>Error cargando menú</p>";
    });
});

