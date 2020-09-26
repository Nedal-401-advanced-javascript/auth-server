/* eslint-disable no-undef */
'use strict';
require('dotenv').config();
const {server} = require('../src/server');
const base64 = require('base-64');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);
const jwt = require('jsonwebtoken');

describe('Roles', () => {
    it('can successfully check if the user have the right accessabilities', async () => {
        let obj = {
            username: "Nedal",
            password: "123",
            role: "writer"
        }
        console.log('here');
        let header =await base64.encode(
            `${obj.username}:${obj.password}`,
        );
        await mockRequest.post('/signup').send(obj);
        let token =await jwt.sign({
            username: "Nedal"
        
        }, process.env.SECRET);
        console.log(token);
        await mockRequest.post('/signin').set('authorization', `Basic ${header}`);
        let data = mockRequest.get('/read').set('authorization', `Bearer ${token}`);
        expect(data.status).toEqual(200);
    })
})