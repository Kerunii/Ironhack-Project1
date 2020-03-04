'use strict';

const apiRecipeURL = "https://api.edamam.com/search?from=0&q=salt&app_id=eef88d0d&app_key=b39f3efc7f30c7650fcdc3947355c62e&to=20&";

let randomRecipe = Math.round(Math.floor((Math.random() * 20)));
let recipeArray,recipe;

// fetch(apiRecipeURL)
// .then(function(response) {
//   return response.json();
// })
// .then(function(data) {
// //   console.log(data);
//   return recipeArray = data.hits;
// })
// .then(function(recipedata) {
//     return recipe = recipedata[random].recipe;
// })
// .then(console.log(recipe));


const connectToApiRecipe = () => {
    fetch(apiRecipeURL)
    .then (response => response.json())
    .then (data => recipeArray = data.hits)
    .then (recipeData => recipe = recipeData[randomRecipe].recipe)
    .then (getElement => document.getElementById("recipe").innerHTML = `
        <div>
           <a href="${recipe.url}"></a><img src="${recipe.image}" alt="${recipe.source}">
           <h2>${recipe.label}</h2>
        </div>
        `)
    .catch(function (error) {
        return error;
    });
};