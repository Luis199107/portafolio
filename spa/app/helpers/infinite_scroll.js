import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import wp_api from "./wp_api.js";

export function infiniteScroll () {
    const w = window,
          d = document,
      $main = d.getElementById("main");

  let query = localStorage.getItem("wpSearch"),
 isFetching = false,
     apiURL,
  Component;

  w.addEventListener("scroll", async (e) => {
    let { scrollHeight, scrollTop, clientHeight } = d.documentElement,
                                         { hash } = location;

    if(scrollTop + clientHeight >= scrollHeight) {
      wp_api.page++;

      if(!hash || hash === "#/") {
           apiURL = `${wp_api.POSTS}&page=${wp_api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search")) {
           apiURL = `${wp_api.SEARCH}${query}&page=${wp_api.page}`;
        Component = SearchCard;
      } else {
        return;
      }

      if(isFetching) return;
      isFetching = true;
     await ajax({
        url: apiURL,
       cbSuccess: (posts) => {
        let html = "";
        posts.forEach(post => html += Component(post));
        $main.insertAdjacentHTML("beforeend", html);
        isFetching = false;
       }
      })

    }
  });
}