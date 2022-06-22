const KEY = "0a71cec109121c47e673e6243a05c6e5"


let container = document.querySelectorAll(".container-lancamentos");
let globalData = [];
let filteredData = [];

const fetchMovies = async () => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&language=pt-US&page=1`
    );
    let data = await res.json();
    data = data.results;
    globalData = data;
    filteredData = data;
    return globalData;
};

window.onload = () => {
    fetchMovies().then(() =>{
        renderMovies();
    })
}

const renderMovies = () => {
    filteredData.forEach((movie) => {
                let movieContainer = document.createElement("div");
                movieContainer.classList.add("movie-container");
                movieContainer.classList.add("style-4");

                let movieImage = document.createElement("img");
                movieImage.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

                let movieTitle = document.createElement("h2");
                movieTitle.innerHTML = movie.title;


                let movieDetailsButton = document.createElement("button");
                movieDetailsButton.innerHTML = "Detalhes";
                movieDetailsButton.setAttribute("id", `${movie.id}`);
                movieDetailsButton.classList.add("btn-details");

                movieContainer.appendChild(movieImage);
                movieContainer.appendChild(movieTitle);
                movieContainer.appendChild(movieDetailsButton);

                container[0].appendChild(movieContainer);
            })
            fetchMovieById();
        
};

const fetchMovieById = () => {
    let movieDetailsButton = document.querySelectorAll(".btn-details");

    movieDetailsButton.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${event.target.id}?api_key=${KEY}&language=pt-US`
            );
            let data = await res.json();
            localStorage.setItem("movieTargetDetail", JSON.stringify(data));
            window.location.href = "detalhes.html";
            return data;
        });
    });
};

let inputSearch = document.querySelector("#inputPesquisa");
inputSearch.addEventListener("keyup", (event) => {
    let inputValue = event.target.value;
    filteredData = globalData.filter((movie) => movie.title.toLowerCase().includes(inputValue.toLowerCase()));
    container[0].innerHTML = "";
    console.log(filteredData);
    renderMovies();
})
