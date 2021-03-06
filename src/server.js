'use strict';

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const router=require('./auth/router')
const extraRouter=require('./extra-routes')


app.use(express.json());
app.use(cors());
app.use(router)
app.use(extraRouter)

/**
 * @module server
 * connection object
 */
module.exports = {
    server: app,
    start: port => {
        let PORT = port || process.env.port || 3000;
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    }
};