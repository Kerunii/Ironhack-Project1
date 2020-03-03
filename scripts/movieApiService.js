'use strict';

let apiMovieURL = "https://api.themoviedb.org/3/discover/movie?api_key=35dace4745a4ee8ae13d0cf2fd62e8db&language=es-ES&include_adult=false&include_video=false&page=1&release_date.lte=2018&vote_average.gte=7";

let movieArray,movie,year,section,article;
let random = Math.round(Math.floor((Math.random() * 21)));


const connectToApi = () => {
    fetch(apiMovieURL)
    .then (response => response.json())
    .then (data => movieArray = data.results)
    .then (movieArrayData => movie = movieArray[random])
    .then (getElement => document.getElementById("movie").innerHTML = `
    <div>
        <h1>¡La palomitera ha decidido!</h1>
    </div>
    <div>
        <img src="http://image.tmdb.org/t/p/w185//${movie.poster_path}" alt="poster-${movie.title}">
        <h3>${movie.title}</h3>
        <p><span>Año: ${movie.release_date.split("-")[0]}</span> <span>Puntuación :${movie.vote_average}</span></p>
        <h4>Sinopsis</h4>
        <p>${movie.overview}</p>
    </div>
    <div>
        <p>Si no te gusta esta elección:</p>
        <button type="reset">Prueba otra vez</button>
    </div>
    `)
    .catch(function (error) {
        return error;
    });
};


window.onload = connectToApi;