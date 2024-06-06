import { App } from "./App.js";
import wp_api from "./helpers/wp_api.js";

document.addEventListener("DOMContentLoaded", App);
window.addEventListener("hashchange", (e) => {
  App();
  wp_api.page = 1;
});