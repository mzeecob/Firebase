//****starter code
// var mainText = document.getElementById("mainText");
// var submitBtn = document.getElementById("submitBtn");
// var fireHeading = document.getElementById("fireHeading");
//
// var filebaseHeadingRef = firebase.database().ref().child("Heading");
// filebaseHeadingRef.on('value', function (snapshot) {
//     fireHeading.innerText = snapshot.val();
//     console.log(snapshot);
// });
// function submitClick() {
//     var filebaseRef = firebase.database().ref();
//     // filebaseRef.child("Me").set("saaa");        // direct pass child with name
//     filebaseRef.push().set(mainText.value);         // pash a child with unique id
// }
//*******starter code


    var rootref = firebase.database().ref("/Users/");
    rootref.on("child_added", snapchat =>{
        var name = snapchat.child("Name").val();
        var email = snapchat.child("Email").val();
        $("#table_body").append("<tr>" +
            "<td>" + name + "</td>" +
            "<td>"+ email +"</td>" +
            "<td>" + "<button>" + "remove" + "</button>" +"</td>" +
            "</tr>");


});
