
// make auth, authUi and firebase reference

var db = firebase.firestore();
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var auth = new firebase.auth();


//authentication login
ui.start('#firebaseui-auth-container', {
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
        }
    ],
    // Other config options...
});

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        },

    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'indexCloudFireStore.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);

//authentication login

// signup
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        alert("successfully signed up");
        // close the signup modal & reset form
        const modal = document.getElementById('modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch(function(error) {
        alert("Sing up failed \n" + error);
        console.error("Error removing document: ", error);
    });
});



// login
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        alert("you are logged in ");
        console.log(cred.user);
        window.location.href = "indexCloudFireStore.html";
        // close the signin modal & reset form
        const modal = document.getElementById('modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(function(error) {
        alert("login failed \n" + error);
        console.error("Error removing document: ", error);
    });

});




//delete from guid
function dlt1(event){
    var id = event.value;
    console.log(id);
    db.collection("Guides").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        document.getElementById(id).remove();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}



