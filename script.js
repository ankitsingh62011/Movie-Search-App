const apiKey = "66189e2c";

function searchMovie() {
    const movieName = document.getElementById("movieInput").value;
    const movieContainer = document.getElementById("movieContainer");

    movieContainer.innerHTML = "";

    if (movieName === "") {
        movieContainer.innerHTML = "<p>Please enter a movie name</p>";
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "False") {
                movieContainer.innerHTML = "<p>No movies found</p>";
                return;
            }

            data.Search.forEach(movie => {
                const card = document.createElement("div");
                card.classList.add("movie-card");

                card.innerHTML = `
                    <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300'}">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                `;

                movieContainer.appendChild(card);
            });
        })
        .catch(error => {
            movieContainer.innerHTML = "<p>Error loading movies</p>";
        });
}
function showSuggestions() {
    const query = document.getElementById("movieInput").value;
    const suggestionBox = document.getElementById("suggestions");

    if (query.length < 3) {
        suggestionBox.style.display = "none";
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            suggestionBox.innerHTML = "";

            if (data.Response === "False") {
                suggestionBox.style.display = "none";
                return;
            }

            data.Search.slice(0, 5).forEach(movie => {
                const div = document.createElement("div");
                div.classList.add("suggestion-item");
                div.innerHTML = `${movie.Title} (${movie.Year})`;

                div.onclick = () => {
                    document.getElementById("movieInput").value = movie.Title;
                    suggestionBox.style.display = "none";
                    searchMovie();
                };

                suggestionBox.appendChild(div);
            });

            suggestionBox.style.display = "block";
        })
        .catch(() => {
            suggestionBox.style.display = "none";
        });
}
document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-box")) {
        document.getElementById("suggestions").style.display = "none";
    }
});
