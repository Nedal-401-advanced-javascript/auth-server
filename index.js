'use strict';
const server = require('./src/server');
const mongoose = require('mongoose');
const MONGOOSE_URL=process.env.MONGOOSE_url



/**
 * connect the database and start the server
 */

const mongooseOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}
mongoose.connect(MONGOOSE_URL, mongooseOptions);


//run my server 
server.start();