let page = 1,
  infiniteScroll,
  maxPage,
  idiom;

document.addEventListener('DOMContentLoaded', () => {
  !localStorage.getItem('idiom') && detectLanguaje();
  router();
});

document.addEventListener('click', (e) => {
  if (!e.target.matches('.header-idiom > h2')) return;
  countries.classList.toggle('inactive');
});

countries.addEventListener('click', () => countries.classList.add('inactive'));

document.addEventListener('click', (e) => {
  if (!e.target.matches('.countries *')) return;
  if (e.target.matches('.eng-btn *')) {
    showEng();
  } else if (e.target.matches('.esp-btn *')) {
    showEsp();
  }
});

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
  location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
  history.back();
});

window.addEventListener('hashchange', router);

function router() {
  if (location.hash.startsWith('#trends')) {
    trendsPage();
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else {
    homePage();
  }

             document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener('scroll', infiniteScroll);
  }
}

function homePage() {
  headerIdiom.classList.remove('inactive');
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');
  likedContainer.classList.remove('inactive');

  getTrendingMoviesPreview();
  getCategegoriesPreview();
  renderLikedMovies();
}

function categoriesPage() {
  headerIdiom.classList.add('inactive');
  headerSection.style.background = '';
  headerSection.classList.remove('header-container--long');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  likedContainer.classList.add('inactive');

  const [_, categoryData] = location.hash.split('=');
  const [categoryId, categoryName] = categoryData.split('-');

  headerCategoryTitle.innerHTML = decodeURIComponent(categoryName);

  getMoviesByCategory(categoryId);
  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  headerSection.classList.add('header-container--long');
  headerIdiom.classList.add('inactive');
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.remove('inactive');
  likedContainer.classList.add('inactive');

  const [_, movieId] = location.hash.split('=');
  getMovieById(movieId);

  if (idiom === 'es-ES') {
    relatedMoviesTitle.innerHTML = 'Peliculas similares';
  } else if (idiom === 'en-US') {
    relatedMoviesTitle.innerHTML = 'Similar movies';
  }
}

function searchPage() {
  headerIdiom.classList.add('inactive');
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  likedContainer.classList.add('inactive');

  const [_, query] = location.hash.split('=');
  getMoviesBySearch(query);
  infiniteScroll = getPaginatedMoviesBySearch(query);
}

function trendsPage() {
  console.log('TRENDS!!');
  headerIdiom.classList.add('inactive');
  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.remove('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add('inactive');
  headerCategoryTitle.classList.remove('inactive');
  searchForm.classList.add('inactive');

  trendingPreviewSection.classList.add('inactive');
  categoriesPreviewSection.classList.add('inactive');
  genericSection.classList.remove('inactive');
  movieDetailSection.classList.add('inactive');
  likedContainer.classList.add('inactive');

  if (idiom === 'es-ES') {
    headerCategoryTitle.innerHTML = 'Tendencias';
  } else if (idiom === 'en-US') {
    headerCategoryTitle.innerHTML = 'Trending';
  }

  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}
