const API_KEY = "b309e6f13c141af714e26eb5ac405075";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const LANG = "pt-BR";

const movieList = document.getElementById("movie-list");
const messageEl = document.getElementById("message");
const searchInput = document.getElementById("search");
const btnSearch = document.getElementById("btnSearch");

async function fetchMovies(query = "") {
  let url;
  if (query.trim() === "") {
    url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=1`;
  } else {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${encodeURIComponent(query)}&page=1`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
}

function createMovieCard(movie) {
  const card = document.createElement("article");
  card.classList.add("card");

  const poster = document.createElement("img");
  poster.classList.add("card-poster");
  poster.alt = `Pôster de ${movie.title}`;
  poster.src = movie.poster_path
    ? `${IMG_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sem+imagem";
  card.appendChild(poster);

  const body = document.createElement("div");
  body.classList.add("card-body");

  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = movie.title;
  body.appendChild(title);

  const meta = document.createElement("div");
  meta.classList.add("card-meta");

  const ano = movie.release_date ? movie.release_date.slice(0, 4) : "—";
  const year = document.createElement("span");
  year.textContent = ano;
  meta.appendChild(year);

  const rating = document.createElement("span");
  rating.classList.add("card-rating");
  rating.textContent = `★ ${movie.vote_average.toFixed(1)}`;
  meta.appendChild(rating);

  body.appendChild(meta);

  const overview = document.createElement("p");
  overview.classList.add("card-overview");
  const texto = movie.overview && movie.overview.trim() !== ""
    ? movie.overview
    : "Sinopse não disponível.";
  overview.textContent = texto.length > 160 ? texto.slice(0, 160) + "…" : texto;
  body.appendChild(overview);

  card.appendChild(body);
  return card;
}

function renderMovies(movies) {
  movieList.innerHTML = "";

  if (!movies || movies.length === 0) {
    showMessage("Nenhum filme encontrado.");
    return;
  }

  showMessage("");
  movies.forEach(function (movie) {
    const card = createMovieCard(movie);
    movieList.appendChild(card);
  });
}

function showMessage(text) {
  messageEl.textContent = text;
}

async function buscar(query) {
  try {
    showMessage("Carregando...");
    const movies = await fetchMovies(query);
    renderMovies(movies);
  } catch (erro) {
    console.error(erro);
    showMessage("Não foi possível carregar os filmes. Verifique sua conexão ou a chave da API.");
  }
}

function init() {
  buscar("");

  btnSearch.addEventListener("click", function () {
    buscar(searchInput.value);
  });

  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      buscar(searchInput.value);
    }
  });
}

init();
