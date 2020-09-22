'use strict';

const base64 = require('base-64');
const users = require('../model/users');

module.exports = (req, res, next) => {
    // pass the username and password to this method;
    // Basic Authentication (HTTP Headers)
    // we expect to have req headers 
    // Basic YWhtYWRfc2hlbGEgOjEyMzQ=
    const auth = req.headers.authorization.split(' ');
    
    if(auth[0] == 'Basic') {
        const [username, password] = base64.decode(auth[1]).split(':'); 
        console.log('here ---->',{username, password});
        users.authenticateBasic(username, password).then(validUser=>{
        console.log('<-----Basic user: before generate token------>',validUser);
            let token = users.generateToken(validUser);
            req.token = token;
            console.log(token,'<---------Basic Token');
            next();
            
        }).catch(err=> next(err));
    } else {
        next('Invalid Login!! ');
    }
}
