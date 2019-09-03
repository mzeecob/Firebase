
// DOM elements
const guideList = document.getElementsByClassName('guides');
const loggedOutLinks = document.getElementsByClassName('logged-out');
const loggedInLinks = document.getElementsByClassName('logged-in');
const accountDetails = document.getElementsByClassName('account-details');

const setupUI = (user) => {
    if (user) {
        // account info
        const html = `<div>Logged in as ${user.email}</div>`;
        accountDetails.innerHTML = html;
        // toggle user UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // clear account info
        accountDetails.innerHTML = '';
        // toggle user elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
};

// setup guides
var db = firebase.firestore();
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

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});
