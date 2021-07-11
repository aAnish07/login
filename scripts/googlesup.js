
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCPKru3mfkGPmPgHyQm-TARLW76QsO1CRw",
    authDomain: "login-468fd.firebaseapp.com",
    projectId: "login-468fd",
    storageBucket: "login-468fd.appspot.com",
    messagingSenderId: "401960497322",
    appId: "1:401960497322:web:dc1a1d029d394945f820d3"
};

//creating instance of google provider object
let provider = new firebase.auth.GoogleAuthProvider();

//getting element(s)
const btnSin = document.getElementById("google");

//add click event
btnSin.addEventListener("click", () => {
    firebase.auth().signInWithRedirect(provider)
});
