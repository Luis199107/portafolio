//?axios

let api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: API_KEY,
  },
  params: {
    language: localStorage.getItem("idiom") || "en-US",
  },
});

function updateAxiosInstance() {
  api = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
      accept: "aplication/json",
      Authorization: API_KEY,
    },
    params: {
      language: localStorage.getItem("idiom"),
    },
  });
}

//?helpers

function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem("liked-movies"));
  let obj;

  if (!item) {
    obj = {};
  } else {
    obj = item;
  }
  return obj;
}

function likedMovie(movie) {
  const likedMovies = likedMoviesList();
  if (!likedMovies[movie.id]) {
    likedMovies[movie.id] = movie;
  } else {
    likedMovies[movie.id] = undefined;
  }
  localStorage.setItem("liked-movies", JSON.stringify(likedMovies));
}

function renderLikedMovies() {
  const likedMovies = likedMoviesList();
  const likedMoviesArray = Object.values(likedMovies);

  createMovies(likedMoviesArray, likedMoviesListArticle, {
    lazyLoad: true,
  });
}

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

function createMovies(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) container.innerHTML = "";

  movies.forEach((movie) => {
    const perspectiveDiv = document.createElement("div"),
      movieContainer = document.createElement("div"),
      movieImg = document.createElement("img"),
      movieBtn = document.createElement("button");

    perspectiveDiv.classList.add("perspective-container");
    movieContainer.classList.add("movie-container");
    movieImg.classList.add("movie-img");
    movieBtn.classList.add("movie-btn");

    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );

    movieImg.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    movieImg.addEventListener("error", () => {
      movieImg.setAttribute("src", "src/assets/not-found.jpg");
    });

    movieBtn.addEventListener("click", () => {
      movieBtn.classList.toggle("movie-btn--liked");
      likedMovie(movie);
      renderLikedMovies();
    });

    likedMoviesList()[movie.id] && movieBtn.classList.add("movie-btn--liked");

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    perspectiveDiv.appendChild(movieContainer);
    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
    container.appendChild(perspectiveDiv);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

//?Retrieve API Data
async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList, {
    lazyLoad: false,
    clean: true,
  });
}

async function getCategegoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection, { lazyLoad: true });
}

function getPaginatedMoviesByCategory(id) {
  console.log("si");
  return async function () {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    const scrollsBottom = scrollTop + clientHeight >= scrollHeight - 15,
      pageIsNotMax = page < maxPage;
    console.log(scrollsBottom, pageIsNotMax);
    if (scrollsBottom && pageIsNotMax) {
      page++;
      const { data } = await api("discover/movie", {
        params: {
          with_genres: id,
          page,
        },
      });
      const movies = data.results;
      createMovies(movies, genericSection, {
        lazyLoad: true,
        clean: false,
      });
    }
  };
}

async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  createMovies(movies, genericSection);
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;

    const scrollsBottom = scrollTop + clientHeight >= scrollHeight - 15,
      pageIsNotMax = page < maxPage;

    if (scrollsBottom && pageIsNotMax) {
      page++;
      const { data } = await api("search/movie", {
        params: {
          query,
          page,
        },
      });
      const movies = data.results;
      createMovies(movies, genericSection, {
        lazyLoad: true,
        clean: false,
      });
    }
  };
}

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day"),
    movies = data.results;

  maxPage = data.total_pages;
  createMovies(movies, genericSection, { lazyLoad: true, clean: true });
}

async function getPaginatedTrendingMovies() {
  const { clientHeight, scrollTop, scrollHeight } = document.documentElement;

  const scrollsBottom = scrollTop + clientHeight >= scrollHeight - 15,
    pageIsNotMax = page < maxPage;

  if (scrollsBottom && pageIsNotMax) {
    page++;
    const { data } = await api("trending/movie/day", {
      params: {
        page,
      },
    });
    const movies = data.results;
    createMovies(movies, genericSection, {
      lazyLoad: true,
      clean: false,
    });
  }
}

async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);
  const res = await api(
    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
  );
  let trailerId;
  if (res.data.results.length === 0) {
    trailerId = "e";
  } else {
    trailerId = res.data.results[0].key;
  }

  const movieImgUrl = "https://image.tmdb.org/t/p/original" + movie.poster_path;
  headerSection.style["background-image"] = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average.toFixed(1);
  movieDetailsBtn.innerHTML = `
    <a class='btn' href='https://www.youtube.com/watch?v=${trailerId}' target='_blank' rel='noopener'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      Trailer
    </a>
  `;

  createCategories(movie.genres, movieDetailCategoriesList);

  getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, relatedMoviesContainer);
}

function showEng() {
  idiom = "en-US";
  localStorage.setItem("idiom", idiom);
  searchFormInput.placeholder = "Search...";
  trendingBtn.innerHTML = `
   <div></div>
   <div></div>
   <div></div>
   <div></div>
   See more
   `;
  headerCategoryTitle.textContent = "Trending";
  espItems.forEach((item) => {
    item.classList.add("inactive");
  });

  engItems.forEach((item) => {
    item.classList.remove("inactive");
  });

  updateAxiosInstance();
  getTrendingMoviesPreview();
  getCategegoriesPreview();
  renderLikedMovies();
}

function showEsp() {
  idiom = "es-ES";
  localStorage.setItem("idiom", idiom);
  searchFormInput.placeholder = "Buscar...";
  trendingBtn.innerHTML = `
   <div></div>
   <div></div>
   <div></div>
   <div></div>
   Ver más
  `;
  headerCategoryTitle.textContent = "Tendencias";
  engItems.forEach((item) => item.classList.add("inactive"));
  espItems.forEach((item) => item.classList.remove("inactive"));

  updateAxiosInstance();
  getTrendingMoviesPreview();
  getCategegoriesPreview();
  renderLikedMovies();
}

function detectLanguaje() {
  if (confirm("¿Do you like to detect your language?")) {
    idiom = navigator.language.split("-")[0];
    if (idiom === "es") {
      showEsp();
    } else {
      showEng();
    }
  } else {
    showEng();
  }
}
