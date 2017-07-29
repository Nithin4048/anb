// var express = require('express');
// var router = express.Router();
// var app = express();
// var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
// var mongojs = require('mongojs');
// var mongoose = require('mongoose');
// var db = mongojs('mongodb://<nithin>:<nithin>@ds111549.mlab.com:11549/userdetails', ['users']);

// app.use(express.static(__dirname+'/client'));
// app.use(bodyParser.json());

// // Add Middleware necessary for REST API's
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use(methodOverride('X-HTTP-Method-Override'));

// app.get('/', function(req, res) {
// 	res.send('Hello world!');
// });

// app.get('/users', function (req, res) {
// 	// console.log(db.users);
// 	db.users.find(function(err, users) {
// 		if (err) {
// 			res.send(err);
// 			console.log(err);
// 		}
// 		console.dir(users);
// 		res.json(users);
// 	});
// 	res.send('Hello POST');
// });

// app.post('/submitUser', function (req, res) {
// 	db.users.insert({name: req.name, email: req.email, message: req.message});
// 	res.send('Hello POST');
// });


// app.listen(3000);
// console.log('Running on port 3000...');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var port = 3000;

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', index);
app.use('/api', users);

app.listen(port, function(){
    console.log('Server started on port '+port);
});
