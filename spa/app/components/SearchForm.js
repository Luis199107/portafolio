export function SearchForm () {
  const d = document, 
    $form = d.createElement("form"),
   $input = d.createElement("input");

   $form.classList.add("search-form");
          $input.name = "search";
          $input.type = "search";
   $input.placeholder = "Buscar...";
      $input.required = true;
  $input.autocomplete = "off";
   $form.appendChild($input);

  if(location.hash.includes("#/search")) {
    $input.value = localStorage.getItem("wpSearch");
  }

  d.addEventListener("search", (e) => {
    if(!e.target.matches("input[type='search']")) return;
    if(!e.target.value) localStorage.removeItem("wpSearch");
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();
    if(!e.target.matches(".search-form")) return;
    localStorage.setItem("wpSearch", e.target.search.value);
    location.hash = `#/search?${e.target.search.value}`;
  });

  return $form;
}