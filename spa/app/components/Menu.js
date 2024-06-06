export function Menu () {
  const $menu = document.createElement("nav");
        $menu.classList.add("menu");
        $menu.innerHTML = `
          <a href="#/" class="btn left-btn">Home</a>
          <a href="#/search" class="btn center-btn">Búsqueda</a>
          <a href="#/contact" class="btn right-btn">Contacto</a>
        `;
  return $menu;
}