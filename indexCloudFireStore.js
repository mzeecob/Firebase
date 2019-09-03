
//authentication login
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var auth = new firebase.auth.AuthProvider(firebase.auth());
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
        uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'indexRealTimeDatabase.html',
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
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

// logout
const logout = document.getElementById('logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });

});



// declare database
var db = firebase.firestore();


// list function
db.collection("Users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var name = doc.data().Name;
        var email = doc.data().Email;
        var id  = doc.id;

        $("#table_body").append("<tr id="+ id +">" +
            "<td>" + name + "</td>" +
            "<td>"+ email +"</td>" +
            "<td>" + "<button onclick='dlt(this)' value = "+ id +">" + "remove" + "</button>" +"</td>" +
            "</tr>"
        );
    });
});

//delete from database
function dlt(event){
    var id = event.value;
    console.log(id);
    db.collection("Users").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        document.getElementById(id).remove();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

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

// create new guide
const createForm = document.getElementById('create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Guides').add({
        title: createForm.title.value,
        content: createForm.content.value
    }).then(function(docRef) {
        var doc = db.collection("Guides").doc(docRef.id);
        doc.get().then(doc => {
            $(".guides").append("<li id=" + doc.id + ">" +
                "<div class='collapsible-header grey lighten-4'>" + doc.data().title + "</div>" +
                "<div class='collapsible-body white'>" + doc.data().content + "</div>" +
                "<td>" + "<button class='collapsible-body white' style='height: 20px' onclick='dlt1(this)' value = " + doc.id + ">" + "remove" + "</button>" + "</td>" +
                "</li>"
            );
        });
        const modal = document.getElementById('modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});
