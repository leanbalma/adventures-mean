// Creates an express instance.
var express = require('express');
var app = express();
// Add MongoDB
var mongojs = require('mongojs');
// We are going to use the 'contactlist' db
var db = mongojs('contactlist',['contactlist']);
// Tells the app how to parse the body of the request.
var bodyParser = require('body-parser');


// Add this to allow CORS.
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use(bodyParser.json());


// Routing.
app.get('/contacts-list', function(req, res, next) {
  // Returns all the entries from the db.
  db.contactlist.find( function(err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.get('/contacts-list/:id', function(req, res) {
  var id = req.params.id;
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs);
  });
});

app.post('/contacts-list', function(req, res, next) {
  var newContact = req.body;
  // console.log(newContact);
  // Insert the new data into the DB and returns the new entry.
  db.contactlist.insert(newContact, function(err, docs) {
    res.json(docs);
  });
});

// Update contact.
app.put('/contacts-list/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;

  db.contactlist.findAndModify({
    query: {
      _id: mongojs.ObjectId(id)
    },
    update:{
      $set: {
        name: name,
        email: email,
        phone: phone
      }
    },
    new:true
  }, function(err, docs) {
    res.json(docs);
  });
});

app.delete('/contacts-list/:id', function(req, res) {
  var id = req.params.id;
  // console.log(id);
  // Remove the data by id from the DB.
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, docs) {
    res.json(docs);
  });
});


// Listen for connections on port 3000.
var port = 3000;
app.listen(port);
console.log('Server runnning on port ' + port);
