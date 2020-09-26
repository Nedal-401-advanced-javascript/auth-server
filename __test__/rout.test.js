/* eslint-disable no-undef */
'use strict';

const {server} = require('../src/server');

const supergoose = require('@code-fellows/supergoose');
const base64 = require('base-64');
const mockRequest = supergoose(server);

describe('API', () => {
    it('POST to /signup to create a new user', async () => {
        let obj = {
            username: "Ahmad",
            password: "123"
        }
        let data = await mockRequest.post('/signup').send(obj);
        expect(data.status).toBe(200);
    })
    it('POST to /signin to login as a user (use basic auth) and GET all users', async () => {
        let obj = {
            username: "Ahmad",
            password: "123"
        }
        let header=base64.encode(
            `${obj.username}:${obj.password}`,
          );
        let data = await mockRequest.post('/signin').set('authorization',`Basic ${header}`);
        let getData = await mockRequest.get('/users').set('authorization',`Basic ${header}`);
        expect(data.status).toBe(200);
        expect(getData.status).toEqual(200);
    })

});