const request = require('supertest')
const app = require('../src/app')

test('create a new user', async () => {
    await request(app).post('/users').send({
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        age: 50,
        email: 'john.doe@testing.com',
        phoneNumber: '321-890-7155'
    }).expect(201)
})