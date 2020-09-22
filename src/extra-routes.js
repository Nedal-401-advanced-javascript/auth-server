
'use strict';
const express = require('express');
const users = require('./auth/model/users')
const bearerMiddleware=require('./auth/middleware/bearer')
const router = express();

router.use(express.json());
router.get('/secret', bearerMiddleware, (req,res) => {
res.status(200).send(req.user)
} );

module.exports=router;