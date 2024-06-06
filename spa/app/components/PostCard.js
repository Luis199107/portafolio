export function PostCard(props) {
  let { title, date, slug, _embedded, id } = props;
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: "true",
  };
  let formatDate = new Date(date).toLocaleDateString("es-ES", options),
    urlPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "app/assets/bender.png";

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".post-card a")) return;
    localStorage.setItem("wpPostId", e.target.dataset.id);
  });

  return `
    <article class="post-card">
      <img src="${urlPoster}" alt="${title.rendered}">
      <h2>${title.rendered}</h2>
      <p>
        <time datetime="${date}">${formatDate}</time>
        <a href="#/${slug}" data-id="${id}">Ver Publicación</a>
      </p>
    </article>
  `;
}
