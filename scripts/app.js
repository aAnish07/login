// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//getting textfields and elements
const txtEmail = document.getElementById("email");
const txtPsw = document.getElementById("psw");
const btnLogin = document.getElementById("login");
const btnSignUp = document.getElementById("signUp");
const aFpsw = document.getElementById("fpsw");

//text-field variables
let email, psw;

//update text fields on input
txtEmail.oninput = () => {
    email = txtEmail.value.trim();
}

txtPsw.oninput = () => {
    psw = txtPsw.value.trim();
}

//prevent default behaviour causing form to reset
document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
})

//handling login/signin activity
btnLogin.addEventListener("click", () => {
    firebase.auth().signInWithEmailAndPassword(email, psw)
        .then((userCredential) => {
            var user = userCredential.user;
            sessionStorage.setItem("uid", user.uid);
            window.location.href = "pages/loggedin.html";
        })
        .catch((error) => {
            console.error(error.code);
            if (error.code === "auth/user-not-found") {
                window.alert("User not found, click 'OK' to redirect to the Sign-Up page");
                window.location.href = "pages/signup.html";
            }
            else if (error.code === "auth/wrong-password") {
                window.alert("Please enter the correct password");
            }
        });
});

//handling forgot password activity
aFpsw.addEventListener("click", () => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            window.alert("Password Reset email was sent");
        })
        .catch((error) => {
            console.log(error.code);
            if (error.code === "auth/user-not-found") {
                window.alert(`${error.message}. Click 'OK' to create a new account with ${email}`);
                window.location.href = "signup.html";
            }
        });
})