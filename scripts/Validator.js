"use strict";

// El validator define las funciones usadas en el login.js
class Validator {
    constructor(userName, email, password){
        this.userName = userName;
        this.email = email;
        this.password = password;
    }

    //UserName - si el usuario deja el area en blanco salta en false
    checkUserName () {
        return this.userName ? true : false;
    }

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
        let div = document.createElement("div"); //se crea un div en el HTML
        div.setAttribute("class", "error"); // le asignamos una class="error" --> <div class="error"></div>
        div.innerHTML = message; // introducimos el mensaje definido en login.js *
        form.insertBefore(div, location); // dónde coloca el mensaje -> dentro del div creado, localización marcada dentro del message *
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
        super(userName, email, password);
        this.repeatPassword = repeatPassword; //añadimos el valor de repeatPassword
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
    constructor (){
        super();
    }

    //comprueba que el usuario ya exista en la DB
    checkEmailInDB (string){
        if (!userDB){
            return false;
        }
        else{
            userDB.forEach(user => {
                if (user.email === string){
                    return true;
                }
            });
        }
        return false;
    }
}