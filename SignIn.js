
var db = firebase.firestore();
var auth = new firebase.auth();



// list function
db.collection("Guides").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var content = doc.data().content;
        var title = doc.data().title;
        var id  = doc.id;

        $(".guides").append("<li id="+ id +">" +
            "<div class='collapsible-header grey lighten-4'>" + title + "</div>" +
            "<div class='collapsible-body white'>"+ content +"</div>" +
            "<td>" + "<button class='collapsible-body white' style='height: 20px' onclick='dlt1(this)' value = "+ id +">" + "remove" + "</button>" +"</td>" +
            "</li>"
        );
    });
});


// listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log(user);
    if (user) {
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI(user);
        });
        db.collection('guides').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
        }, err => console.log(err.message));
    } else {
        setupUI();
        setupGuides([]);
    }
});


// logout
const logout = document.getElementById('logout');

if (logout){
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log("User Signed out");
            window.location.href = "SignIn.html";
        });
    });
}


// create new guide
const createForm = document.getElementById('create-form');
if (createForm){
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
                    "<button class='collapsible-body white' style='height: 20px' onclick='dlt1(this)' value = " + doc.id + ">" + "remove" + "</button>" +
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
}




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
