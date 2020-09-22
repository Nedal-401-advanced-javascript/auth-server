// Create a POST route for /signin
// Create a GET route for /users that returns a JSON object with all users
'use strict';
const express = require('express');
const users = require('./model/users')
const basicAuth = require('./middleware/basic')
const ouath = require('./middleware/oauth')
const app = express();
const bearerMiddleware=require('./middleware/bearer')

app.use(express.json());


// Create a POST route for /signup
app.post('/signup', (req, res) => {
    users.save(req.body).then(userRecord => {
        console.log('----singup before generate token',userRecord);
        let token = users.generateToken(userRecord);
        res.status(200).send(token);
    }).catch(err => res.status(403).send("This user name not availble, Error!!!!!!!!!!"));
})

app.post('/signin', basicAuth, (req, res) => {
    res.status(200).send(req.token);
});

app.get('/users', basicAuth, (req, res) => {
    // list all users 
    users.list().then(data => {

        res.status(200).send(data);
    })
});
app.get('/oauth', ouath, (req, res)=> {
    res.status(200).send(req.token);
});

module.exports = app;