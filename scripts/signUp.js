// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCPKru3mfkGPmPgHyQm-TARLW76QsO1CRw",
    authDomain: "login-468fd.firebaseapp.com",
    projectId: "login-468fd",
    storageBucket: "login-468fd.appspot.com",
    messagingSenderId: "401960497322",
    appId: "1:401960497322:web:dc1a1d029d394945f820d3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//getting textfields and elements
const txtEmail = document.getElementById("email");
const txtPsw = document.getElementById("psw");
const txtMob = document.getElementById("mobNum");
const btnSignUp = document.getElementById("signUp");

//text-field variables
let email, psw, mob;

//update text fields on input
txtEmail.oninput = () => {
    email = txtEmail.value.trim();
}
txtPsw.oninput = () => {
    psw = txtPsw.value.trim();
}
txtMob.oninput = () => {
    mob = txtMob.value.trim();
}

//prevent default action causing form to reset on submission
document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
})

//setting up database object and root reference.
const database = firebase.database();
// const rootRef = database.ref('users');

//handling the user create event
btnSignUp.addEventListener("click", () => {
    firebase.auth().createUserWithEmailAndPassword(email, psw)
        .then((userCredential) => {
            // Signed Up
            database.ref('/users/' + mob).set({
                userEmail: email,
                mobileNumber: mob
            }).then(() => {
                window.location.href = "loggedin.html";
            })
        })
        .catch((error) => {
            console.error(error.code, error.message);
        });
})