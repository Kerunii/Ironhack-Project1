'use strict';
const apiRecipeURL = "https://api.edamam.com/search?from=0&q=salt&app_id=eef88d0d&app_key=b39f3efc7f30c7650fcdc3947355c62e&to=20&";

let randomRecipe = Math.round(Math.floor((Math.random() * 20)));

let recipeArray,recipe;
let apiMovieURL = "https://api.themoviedb.org/3/discover/movie?api_key=35dace4745a4ee8ae13d0cf2fd62e8db&language=es-ES&include_adult=false&include_video=false&page=1&release_date.lte=2018&vote_average.gte=7";

let movieArray,movie;
let randomMovie = Math.round(Math.floor((Math.random() * 20)));


const connectToApis = () => {
    fetch(apiMovieURL)
    .then (responseMovie => responseMovie.json())
    .then (dataMovie => movieArray = dataMovie.results)
    .then (movieArrayData => movie = movieArrayData[randomMovie])
    .then (getElement => document.getElementById("movie").innerHTML = `
    <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5">
            <img class="img-fluid rounded-lg border border-white" src="http://image.tmdb.org/t/p/w185//${movie.poster_path}" alt="poster-${movie.title}">
        </div>
        <div class="text-movie col-sm-12 col-md-12 col-lg-7 col-xl-7">
            <h2>${movie.title}</h2>
            <h4>.sinopsis{</h4>
            <p>${movie.overview}</p>
            <p>Año:  ${movie.release_date.split("-")[0]} <br> Puntuación:  ${movie.vote_average}</p>
        </div>
    </div>`)
    
    fetch(apiRecipeURL)
    .then (response => response.json())
    .then (data => recipeArray = data.hits)
    .then (recipeData => recipe = recipeData[randomRecipe].recipe)
    .then (getElement => document.getElementById("recipe").innerHTML = `
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <a href="${recipe.url}"><img class="img-fluid rounded-lg border border-white" src="${recipe.image}" alt="${recipe.source}"></a>
                <h2>${recipe.label}</h2>
            </div>
        </div>
        `)
    .catch(function (error) {
        return error;
    });
};

window.onload = connectToApis;

