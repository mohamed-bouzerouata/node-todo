// database user and passeword
// Zi9lZqjUtzzpbzao mohamed-bouzerouata

// set up 
// 1/ create our express app 
const express = require('express');
// 2/ Mongoose for mongoDB 
const mongoose = require('mongoose');
// 3/ Log req to the console 
const morgan = require('morgan');
// 4/ pull information from HTML post
const bodyParse = require('body-parser');

const app = express();

// mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');

// log every request to the console 
app.use(morgan('dev'));
// define model 
const todo = mongoose.model('todo', {
    text : String
})
// get all todos 
app.get('/api/todos', (res, req) => {
    // use mongoose to get all todos in the database 
    todo.find((err, todos) => {
        if (err)
            res.send(err)
            // return all todos in JSON format
            res.json(todos);
    });
});

// create todo and send back all todos after creation 
app.post('/api/todos', (res, req) => {
    todo.create({
        text : req.body.text,
        done : false 
    }, (err, todo) => {
        if (err)
        res.send(err);
        //get and return all the todos after you create another
        todo.find((err, todos) => {
            if (err) 
                res.send(err)
            res.json(todos);
        });
    });
});

// delete a todo 
app.delete('/api/todos/:todo_id', (req, res) => {
    todo.remove({
        _id : req.params.todo_id 
    }, (err, todo) => {
        if(err)
        res.send(err);

        // get and return all the todos after create another
        todo.find((err, todos) => {
            if (err)
            res.send(err)
            res.json(todos);
        })
    })
})



// parse application/x-www-form-urlencoded
app.use(bodyParse.urlencoded({'extended': 'true'}));
app.use(bodyParse.json());

//listen (start app with node server.js )
app.listen(3000);
console.log('app listen on port ');