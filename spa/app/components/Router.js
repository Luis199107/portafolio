import { ajax } from "../helpers/ajax.js";
import wp_api from "../helpers/wp_api.js";
import { ContactForm } from "./ContactForm.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";
import { SearchCard } from "./SearchCard.js";

export async function Router() {
  const d = document,
    $main = d.getElementById("main"),
    $loader = d.querySelector(".loader");

  let { hash } = location;

  if (!hash || hash === "#/") {
    await ajax({
      url: wp_api.POSTS,
      cbSuccess: (posts) => {
        let html = "";
        posts.forEach((post) => (html += PostCard(post)));
        d.querySelector(".loader").style.display = "none";
        d.getElementById("main").innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");
    if (!query) return ($loader.style.display = "none");
    await ajax({
      url: `${wp_api.SEARCH}${query}`,
      cbSuccess: (posts) => {
        let html = "";

        if (posts.length === 0) {
          html = `<p class="error">No se encontraron cohincidencias para el criterio de búsqueda <mark>${query}</mark></p>`;
        } else {
          posts.forEach((post) => {
            html += SearchCard(post);
          });
        }

        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contact") {
    $main.appendChild(ContactForm());
    $loader.style.display = "none";
  } else {
    await ajax({
      url: `${wp_api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }
}
