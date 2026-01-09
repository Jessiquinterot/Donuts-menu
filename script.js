document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("menu-content");
  if (!container) return;

  // Detectar qué página estamos viendo
  const page = window.location.pathname;

  let jsonFile = "";
  let rootKey = "";

  if (page.includes("dulces.html")) {
    jsonFile = "dulces.json";
    rootKey = "dulces";
  } else if (page.includes("salados.html")) {
    jsonFile = "salados.json";
    rootKey = "salados";
  } else if (page.includes("promos.html")) {
    jsonFile = "promos.json";
    rootKey = "promos";
  } else {
    return;
  }

  fetch(jsonFile)
    .then(res => res.json())
    .then(data => {
      const sections = data[rootKey];

      sections.forEach(section => {
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
                ${item.precio !== null ? "$" + item.precio.toLocaleString("es-AR") : ""}
              </span>
            </li>
          `;
        });
        html += `</ul>`;

        block.innerHTML = html;
        container.appendChild(block);
      });
    })
    .catch(err => {
      container.innerHTML = "<p>Error cargando el menú</p>";
      console.error(err);
    });
});

