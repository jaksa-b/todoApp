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

// define model
var Todo = mongoose.model('Todo',{
    text: String
});

// API routes
    // get all todos
    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            if(err)
               res.send(err);

            res.json(todos); // return all todos in JSON format
        });
    });
    // create To do and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a to do, information comes from AJAX request from Angular
        Todo.create({
            text : req.body.text,
            done : false
        }, function (req, todo) {
            if(err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function (err, todos) {
                if(err)
                  res.send(err);
                res.json(todos);
            });
        });
    });
    // delete to do
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id : req.params.todo_id
        }, function (err, todo) {
            if(err)
                res.send(err);
            // get and return all the todos after you delete one
            Todo.find(function (err, todos) {
                if(err)
                    res.send(err);
                res.json(todos);
            });
        });
    });
app.get('*', function (req, res) {
    res.sendfile('./public/index.html');                        // load Angular
});
app.listen(8080);                                               // listen (start app with node server.js)
console.log('App listening on port 8080');