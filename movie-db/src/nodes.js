const d = document;

// Sections
      const headerSection = d.querySelector('#header'),
   trendingPreviewSection = d.querySelector('#trendingPreview'),
 categoriesPreviewSection = d.querySelector('#categoriesPreview'),
           genericSection = d.querySelector('#genericList'),
       movieDetailSection = d.querySelector('#movieDetail');

// Lists & Containers
         const searchForm = d.querySelector('#searchForm'),
trendingMoviesPreviewList = d.querySelector('.trendingPreview-movieList'),
    categoriesPreviewList = d.querySelector('.categoriesPreview-list'),
movieDetailCategoriesList = d.querySelector('#movieDetail .categories-list'),
   relatedMoviesContainer = d.querySelector('.relatedMovies-scrollContainer'),
   likedMoviesListArticle = d.querySelector('.liked-movieList'),
           likedContainer = d.querySelector('.liked-container');
 
// Elements
     const headerTitle = d.querySelector('.header-title'),
              arrowBtn = d.querySelector('.header-arrow'),
   headerCategoryTitle = d.querySelector('.header-title--categoryView'),
       searchFormInput = d.querySelector('#searchForm input'),
         searchFormBtn = d.querySelector('#searchBtn'),
           trendingBtn = d.querySelector('.trendingPreview-btn'),
      movieDetailTitle = d.querySelector('.movieDetail-title'),
movieDetailDescription = d.querySelector('.movieDetail-description'),
      movieDetailScore = d.querySelector('.movieDetail-score'),
       movieDetailsBtn = d.querySelector('.movieDetails-btn'),
    relatedMoviesTitle = d.querySelector('.relatedMovies-title');

//idiom

const headerIdiom = d.querySelector('.header-idiom'),
        countries = d.querySelector('.header-idiom .countries'),
           espBtn = d.querySelector('.esp-btn'),
           engBtn = d.querySelector('.esp-btn'),
         espItems = d.querySelectorAll('.esp'),
         engItems = d.querySelectorAll('.eng');

