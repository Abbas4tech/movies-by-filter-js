const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const filterMovieHandler = () => {
  const filteredElement = document.getElementById("filter-title").value;
  renderMovieElement(filteredElement);
};

const renderMovieElement = (filter = "") => {
  const movieList = document.getElementById("movie-list");

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }

  movieList.innerHTML = "";

  const filtermovieElement = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter.toLowerCase()));

  filtermovieElement.forEach((movie) => {
    const movieLi = document.createElement("li");
    const { info, ...otherkeys } = movie;
    let editedtext = movie.getFormattedTitle() + " - ";
    for (const otherKeys in info) {
      if (otherKeys !== "title") {
        editedtext += `${otherKeys} : ${info[otherKeys]}`;
      }
    }
    movieLi.textContent = editedtext;
    movieList.append(movieLi);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value.toLowerCase();
  const extraNameValue = document.getElementById("extra-name").value;
  const extraInfoValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraNameValue.trim() === "" ||
    extraInfoValue.trim() === ""
  ) {
    alert("Please fill all input fields");
    return;
  }

  const movie = {
    info: {
      title,
      [extraNameValue]: extraInfoValue,
    },
    id: Math.random(),
    getFormattedTitle() {
      return this.info.title.toUpperCase();
    },
  };
  movies.push(movie);
  renderMovieElement();
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", filterMovieHandler);
