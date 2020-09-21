'use strict';

const mongoose = require('mongoose');

const userAccount = mongoose.Schema({
  
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    fullname: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'writer', 'user']
    }
});
// sudo service mongod start
userAccount.method.autho()=>{
    
}

module.exports = mongoose.model('userAccount', userAccount);