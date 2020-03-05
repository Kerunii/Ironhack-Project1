// Áreas a rellenar por el user- definimos variables con valor de la classe de nuestro doc HTML
let userName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repeatPassword = document.getElementById("repeat-password");

// Formulario y botón - definimos variables con valor de la classe de nuestro doc HTML
let logInButton = document.getElementById("log-in-button");
let form = document.getElementsByClassName("signup-form")[0]; //para qué es el 0?
let formWrapper = document.getElementsByClassName("form-wrapper")[0];
let signUpButton = document.getElementsByClassName("button")[0];

//Base de Datos donde se guardan los datos introducidos - para comprobar en el login
let usersDB = JSON.parse(localStorage.getItem('users'));
console.log(usersDB);

//Botón submit - al hacer click invoca la función
signUpButton.addEventListener("click", function(event){
    console.log("Comprobar: el signUpButton funciona"); //--> no funciona porque necesita--> ver punto 0
    console.log("Comprobar: qué es el 'event' del argumento"); //--> lista de propiedades del elemento
    //0- parar el efecto por default del botón
    event.preventDefault();
    //1- comprobar que los imputs sean válidos

    //2- dependiendo si los imputs son válidos o no, lo guardas en la BD o muestras un error

    //deleteErrors **
    deleteErrors();
    //Si pasa la función de checkValidUser() * -> crea un usuario
    if (checkValidUser()){
        console.log("user registered");
        // *** createUser -> crea el usuario para guardarlo en la BD
        //LLAMAR o INVOKAR el valor de los parámetros (parametro.valor)
        createUser(userName.value, email.value, password.value);
        let messageSuccess = document.createElement("div");
        messageSuccess.innerHTML = `
            <div class="alert alert-success" role="alert">
            <strong>¡Hecho!</strong> Ya formas parte de la comunidad de la manta.
            </div>`;
        formWrapper.appendChild(messageSuccess);
    }
});

// * Función que comprueba que lo introducido por el usuario es correcto
function checkValidUser() {
    // se define una variable que guarda el valor como objeto de los datos del usuario
    let signUpValidator = new SignUpValidator (userName.value, email.value, password.value, repeatPassword.value);

    // definimos una variable del userDB que recupera en formato JSON el objeto guardado en la DB
    let usersDB = JSON.parse(localStorage.getItem('users'));
    let validUser = true;

    //check NAME - ERROR creator
    if(!signUpValidator.checkUserName()){
        signUpValidator.errorCreator("Por favor, introduce un nombre válido", userName); //userName = location --> insertBefore validator.js 
        validUser=false;
    }
    //check EMAIL - ERROR creator
    if(!signUpValidator.checkEmail()){
        signUpValidator.errorCreator("Por favor, introduce una dirección de email válida", email);//email = location --> insertBefore validator.js
        validUser=false;
    }
    //check PASSWORD - ERROR creator
    if(!signUpValidator.checkPassword()){
        signUpValidator.errorCreator("Por favor, introduce una contraseña válida", password);//password = location --> insertBefore validator.js
        validUser=false;
    }
    //check REPEAT-PASSWORD - ERROR creator
    if(!signUpValidator.checkRepeatPassword()){
        signUpValidator.errorCreator("Las contraseñas no coinciden", repeatPassword);//repeatPassword = location --> insertBefore validator.js
        validUser=false;
    }
    //check EMAIL en la DB - ERROR creator
    if (!signUpValidator.checkEmailInDB(usersDB)){
        signUpValidator.errorCreator("Este mail ya existe", email);//email = location --> insertBefore validator.js
        validUser=false;
    }
    return validUser;
}

// ** Para que los errores no se queden fijos visibles en la página
function deleteErrors (){
    let errors = [...document.getElementsByClassName("error")];
    errors ? errors.forEach(error => error.remove()) : null;
}

// *** createUser -> crea el usuario para guardarlo en la BD
function createUser (name, email, password) {
    //la clase User guardará los valores en keys como objetos
    const newUser = new User (name, email, password);

    if (usersDB){
        usersDB.push(newUser); //si existen users (por tanto existe el array), pushea el nuevo
    } else {
        usersDB = [newUser]; // si no existe (no existe array) por tanto crea una con el newuser
    }
    //para mandarlo a la BD, como no lee objetos, hay que transformarlo en string
    localStorage.setItem('users', JSON.stringify(usersDB));
}  