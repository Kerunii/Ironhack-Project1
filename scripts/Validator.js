"use strict";

// El validator define las funciones usadas en el login.js
class Validator {
    constructor( email, password){
        this.email = email;
        this.password = password;
    }

    //UserName - si el usuario deja el area en blanco salta en false
    

    //Email - carácteres y estructura válida
    checkEmail () {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email) ? true : false;
    }

    //Password - si no se rellena(false)/si el string es menor de 6 carácteres(false)/
    checkPassword () {
        if (!this.password){
            return false;
        } else if (this.password.length < 6){
            return false;
        } else {
            return true;
        }
    }

    //Mensaje que se muestra al saltar error
    errorCreator (message, location) {
        location.value = ""
        location.placeholder = message
        location.classList.add("error-class");
        //let div = document.createElement("div"); //se crea un div en el HTML
        //div.setAttribute("class", "error"); // le asignamos una class="error" --> <div class="error"></div>
        //div.innerHTML = message; // introducimos el mensaje definido en login.js *
        //locationMessage.insertBefore(div, location); // dónde coloca el mensaje -> dentro del div creado, localización marcada dentro del message *
    }

    //Borra el error que salta al introducirlo bien
    deleteErrors (){
        let errors = [...document.getElementsByClassName("error")];
        errors ? errors.forEach(error => error.remove()) : null;
    }
}

//clase derivada del Validator anterior para el signup.js
class SignUpValidator extends Validator {
    constructor (userName, email, password, repeatPassword){
        super( email, password);
        this.userName = userName;
        this.repeatPassword = repeatPassword; //añadimos el valor de repeatPassword
    }

    checkUserName () {
        return this.userName ? true : false;
    }

    //Busca en la DB si ya existe el usuario.email
    checkEmailInDB (usersDB){
        let userExists = true;

        if (!usersDB){
            return true; //si no esta en la bd es valido
        }
        else{
            usersDB.forEach(user => { // SI existe el user e iteramos para ver la key de email
                if (user.email === this.email){
                    userExists=false; //si SI existe da error
                }
            });
        }
        return userExists; 
    }

    // comprueba que el password se === que el de repeatPassword
    checkRepeatPassword () {
        if(this.password === this.repeatPassword) {
            return true;
        } else {
            return false;
        } 
    }
}

//clase derivada del Validator anterior para el login.js
class LogInValidator extends Validator {
    constructor (email, password){ //como no queremos heredar nada, se deja vacío y ya lo coge (los valores)
        super(email, password);
    }

    //comprueba que el usuario ya exista en la DB
    checkEmailAndPasswordInDB (userDB){
        let answer = false;

        if (!userDB) {
            return false;
        } else {
            userDB.forEach(user => {
                console.log(this.email, user.email);
                if (this.email === user.email && this.password === user.password){
                    return answer = true;
                }
            });
            return answer;
        }
    }
} 