let userName = document.getElementById("name");
let password = document.getElementById("password");
let logInButton = document.getElementById("log-in-button");
let form = document.getElementById('login-form');
let formWrapper = document.getElementsByClassName("form-wrapper")[0];

let checkUser = () => {
    let usersDB = JSON.parse(localStorage.getItem('users'))
    counter = 0;
    if (!usersDB) {
        return false
    } else usersDB.forEach(user => {
        if (userName.value == user.name && password.value == user.password) {
            counter++;
        }
    })
    return counter === 1 ? true : false
}
let errorUser = () => {
    let div = document.createElement("div")
    div.innerHTML = " Incorrect user name or password "
    div.setAttribute("class", "error")
    form.appendChild(div)
}
let deleteErrors = () => {
    errors = [...document.getElementsByClassName("error")]
    for (i = 0; i < errors.length; i++) {
        errors[i].remove()
    }
}
let validationMessage = () => {
    let div = document.createElement("div")
    div.innerHTML = `<p class="info-text" href="game.html"> Hello ${userName.value}! <a class="info-text" href="game.html"> You can now tell people to fuck off with a card! </a></p>`
    form.insertBefore(div, logInButton);
    logInButton.remove()
}
let mainLogIn = () => {
    event.preventDefault()
    if (!checkUser()) {
        errorUser()
    } else {
        validationMessage()
    }
}
logInButton.addEventListener("click", function (event) {
    event.preventDefault()
    deleteErrors();
    mainLogIn();
})