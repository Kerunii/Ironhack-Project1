
//let resetMovie = document.getElementById("resetMovie");

// Function to change the content of t2
function modifyText() {
  article.innerHTML = "";
  connectToApiMovie()    
}

// Function to add event listener to t
function load() { 
  var resetMovie = document.getElementById("resetMovie");
  resetMovie.addEventListener("click", modifyText, false); 
} 

document.addEventListener("resetMovie", load, false);