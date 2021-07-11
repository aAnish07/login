//creating instance of google provider object
let provider = new firebase.auth.GoogleAuthProvider();

//getting element(s)
const btnSin = document.getElementById("google");

//add click event
btnSin.addEventListener("click", () => {
    firebase.auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((result) => {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;

            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    window.location.href = "pages/loggedin.html";
                }
            });

            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
});