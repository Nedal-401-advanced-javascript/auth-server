'use strict';
const userAccount=require('./user-schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { find } = require('./user-schema');
const SECRET = 'mytokensecret';
let users = {};

/**
 * Hash the plain text password given before save a user to the database
 * @param {*} record Data with the keys “username” and “password”
 * @returns record
 */


users.save = async function (record) {
    // Registration 
    let getUser=record.username
    let checkUser=await userAccount.find({username:getUser})
    console.log(checkUser,'<<<<<<<<<<<<<<,');
    if (!checkUser.length) {
        // save user if it does not exist
        try {
            record.password = await bcrypt.hash(record.password, 5);
        } catch (e) {
            console.log("error in bcrypt: ", e)
        }
        let newUser= new userAccount(record);
        await newUser.save()
        return record;
    }
    return Promise.reject();
};

/**
 * authenticate a user using the hashed password
 * @param {string} user 
 * @param {*} password 
 */

users.authenticateBasic = async function (user, password) {
    // Signin
    let userObj=await userAccount.find({username:user})
    if (userObj) {
       
        let valid = await bcrypt.compare(password, userObj[0].password);
        let returnValue = valid ? userObj : Promise.reject();
        return returnValue
    }
    return Promise.reject();

};

/**
 * generate a Token following a valid login
 * @param {*} user 
 */

users.generateToken = function (user) {
    //jwt to genrate a token for us.
    // install jwt and generate a token with it and return it.
    let token = jwt.sign({
        username: user.username
    }, SECRET);
    return token;
};
users.list=async function() {
    // await userAccount.remove({})
    let all=await userAccount.find({})
    return all;
}

module.exports=users;