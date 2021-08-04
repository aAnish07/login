//creating instance of google provider object
let provider = new firebase.auth.GoogleAuthProvider();

//getting element(s)
const btnSin = document.getElementById("google");

//creating an object of the database
const databaseRef = firebase.database();

//check for mobile device type and execute relevant code
if (!(navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i))) {

    //add click event with popup
    btnSin.addEventListener("click", () => {
        firebase.auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        writeData(user);
                    }
                });
            }).catch((error) => {
                // Handle signIn Errors here.
            });
    });
} else {
    btnSin.addEventListener("click", () => {
        firebase.auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        firebase.auth().getRedirectResult().then((result) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    writeData(user);
                }
            });
        }).catch((error) => {
            // Handle signIn Errors here.       
        });
    });
}

function writeData(user) {
    databaseRef.ref("users/" + user.uid).set({
        userName: user.displayName,
        userEmail: user.email,
        userPhone: user.phoneNumber,
        userPhoto: user.photoURL
    }).then(() => {
        window.location.href = "pages/loggedin.html";
    }).catch((error) => {
        //databasing errors here
    })
}