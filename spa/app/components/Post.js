export function Post(props) {
  let { title, date, content } = props;
  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: "true",
  };
  let formatDate = new Date(date).toLocaleDateString("es-ES", options);

  return `
    <section class="post-page">
      <aside>
        <h2>${title.rendered}</h2>
        <time datetime="${date}">${formatDate}</time>
      </aside>
      <hr>
      <article>${content.rendered}</article>
    </section>
  `;
}
