import wp_api from "../helpers/wp_api.js";

export function Title () {
    const $h1 = document.createElement("h1");
$h1.innerHTML = `
  <a href="${wp_api.DOMAIN}" class="title btn center-btn" rel="noopener" target="_blank">${wp_api.NAME.toUpperCase()}</a>
`;

  return $h1;
}