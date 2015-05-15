'use strict';
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/todoApp');          // connect to mongoDB

app.use(express.static(__dirname + '/public'));                 // set static files location
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));           // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

app.listen(8080);                                               // listen (start app with node server.js)
console.log('App listening on port 8080');