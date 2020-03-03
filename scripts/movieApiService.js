'use strict';

const connectToApi = () => {
    const section = document.querySelector('.movie');

   // for (let i=0; i < 5; i++) {
        fetch(`http://www.omdbapi.com/?apikey=5d86a00&s={{$randomWord}}&type=movie`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (movie) {
            const article = document.createElement('article');
            article.innerHTML = `
                <div>
                    <h1>¡La palomitera ha decidido!</h1>
                </div>

                <div>
                    <img src="${movie.Poster}" alt="poster-${movie.Title}">
                    <h2>${movie.Title}</h2>
                    <p><span>${movie.Year}</span> <span>${movie.Runtime}</span> <span>${movie.Rated}</span></p>
                    <p><span>${movie.Genre}</span> <span>${movie.Country}</span></p>
                    <p>Director: <span>${movie.Director}</span></p>
                    <p>Reparto: <span>${movie.Actors}</span></p>
                    <h3>Sinopsis</h3>
                    <p>${movie.Plot}</p>
                </div>

                <div>
                    <p>Si no te gusta esta elección:</p>
                    <button type="reset">Prueba otra vez</button>
                </div>
                `;
            section.appendChild(article);
            })
            .catch(function (error) {
                return error;
            });
    //}
}

window.onload = connectToApi();


