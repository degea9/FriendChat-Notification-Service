var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var firebase = require("firebase");
firebase.initializeApp({
  serviceAccount: "FriendChat-c9590ad56875.json",
  databaseURL: "https://friendchat-260ce.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("message");
var ref1 = db.ref("test");

// ref.push({
//     name:"tuan",
//     email:"degea9@gmail.com"
// })
//
// ref.push({
//     name:"truong",
//     email:"truong@gmail.com"
// })



ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

ref.on("child_changed", function(snapshot) {
  var message = snapshot.val();
  console.log("The updated message is " + message.message);
  ref1.push({
       name:"child_changed",
      email:"child_changed@gmail.com"
   })
});

ref.on("child_added",function (snapshot) {
  var message = snapshot.val();
  console.log("The new message  " + message.message);

})


