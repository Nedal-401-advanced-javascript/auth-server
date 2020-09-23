'use strict';
const userAccount = require('./user-schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    find
} = require('./user-schema');
const SECRET = 'mytokensecret';
let users = {};

/**
 * Hash the plain text password given, before save a user to the database
 * @param {*} record Data with the keys “username” and “password”
 * @returns record
 */


users.save = async function (record) {
    // Registration 
    let getUser = record.username
    await userAccount.remove({})
    let checkUser = await userAccount.find({
        username: getUser
    })
    console.log(checkUser, '<<<<<<<<<<<<<<,');
    if (!checkUser.length) {
        // save user if it does not exist
        try {
            console.log(record);
            record.password = await bcrypt.hash(record.password, 5);
        } catch (e) {
            console.log("error in bcrypt: ", e)
        }
        let newUser = new userAccount(record);

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
    let userObj = await userAccount.find({
        username: user
    })
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
let roles = {
    admin: ["READ", "CREATE", "UPDATE", "DELETE"],
    editor: ["READ", "CREATE", "UPDATE"],
    writer: ["READ", "CREATE"],
    user: ["READ"]
};

users.generateToken = function (user) {
    //jwt to genrate a token for us.
    // install jwt and generate a token with it and return it.
    console.log('user befor generate token----> : ', user)
    if (user.length) {
        user = user[0];
    }
    let token = jwt.sign({
        username: user.username,
        actions: roles[user.role]
    }, SECRET);
    return token;
};
users.authenticateToken = async function (token) {
    // let getUser = record.username
    // let checkUser = await userAccount.find({
    //     username: getUser
    // })
    console.log(token, '<-----------token before verifying');
    try {
        let tokenObject = jwt.verify(token, SECRET);
        let getUser = tokenObject.username
        let checkUser = await userAccount.find({
            username: getUser
        })

        if (checkUser.length) {
            return Promise.resolve({
                tokenObject: tokenObject,
                user: getUser
            });
        } else {
            return Promise.reject();
        }
    } catch (e) {
        return Promise.reject();
    }

};

users.list = async function () {
    // await userAccount.remove({})
    let all = await userAccount.find({})
    return all;
}

module.exports = users;