'use strict';
const express = require('express');
const bearerAuth = require('./auth/middleware/bearer')
const permissions = require('./auth/middleware/authorize')
const router = express();

router.use(express.json());
router.get('/secret', bearerAuth, (req, res) => {
    res.status(200).send(req.user)
});

router.get('/read', bearerAuth, permissions('READ'), (req, res) => {
    res.status(200).send('it is worked you reached the response')
})
router.post('/add', bearerAuth, permissions('CREATE'), (req, res) => {
    res.status(200).send('it is worked you reached the response')
})
router.put('/change', bearerAuth, permissions('UPDATE'), (req, res) => {
    res.status(200).send('it is worked you reached the response')
})
router.delete('/remove', bearerAuth, permissions('DELETE'), (req, res) => {
    res.status(200).send('it is worked you reached the response')
})
module.exports = router;