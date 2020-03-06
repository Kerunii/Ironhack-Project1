// 1) seleccionar los inputs y guardarlos en variables

//2) añadir el evento onclick al botón con una función

//3)esta funcion debe tener el prevent default

//4) la funcion debe validar los inputs y compararlos con los de la base de datos

let email = document.getElementById("email");
let password = document.getElementById("password");
let form = document.querySelector("form");
let formWrapper = document.getElementsByClassName("form-wrapper")[0];
let logInButton = document.getElementById("login-button");

let containerEmail = document.getElementById("container-email");
let containerPassword = document.getElementById("container-password");
let containerLoginBtn = document.getElementById("container-login-btn");
let titleLogin = document.getElementsByClassName("title-login")[0];

function deleteErrors (){
    let errors = [...document.getElementsByClassName("error")];
    errors ? errors.forEach(error => error.remove()) : null;
}

logInButton.addEventListener("click", function(event){
    event.preventDefault();

    if(checkValidUser()){
        console.log("Valid User");
    }
});

function checkValidUser() {
    //console.log(email.value);
    let loginValidator = new LogInValidator(email.value, password.value);

    let usersDB = JSON.parse(localStorage.getItem("users"));

    if(!loginValidator.checkEmailAndPasswordInDB(usersDB)) {
        document.getElementById('mensaje-error').innerHTML = `Usuario o contraseña incorrectos`;
        return false;
    } else {
        deleteErrors();
        let logUser = usersDB.filter(e=> email.value === e.email);
        document.getElementById('mensaje-success').innerHTML = `¡Saludos, ${logUser[0].name}!`;
    }
}