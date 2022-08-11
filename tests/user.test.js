const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const User = require('../src/models/user')

const testUserId = new mongoose.Types.ObjectId()

const testUser = {
    _id: testUserId,
    firstName: 'Test',
    lastName: 'User',
    gender: 'Female',
    age: 24,
    email: 'test.user@example.com',
    phoneNumber: '641-888-0918'
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(testUser).save()
})

test('create a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        age: 50,
        email: 'john.doe@testing.com',
        phoneNumber: '321-890-7155'
    }).expect(201)

    const user = await User.findById(response.body._id)
    expect(user).not.toBeNull()
})

test('find existing user by id', async () => {
    const response = await request(app)
        .get('/users/' + testUser._id.toString())
        .expect(200)

    expect(response.body).not.toBeNull()
})

test('does not find non-existing user', async () => {
    const response = await request(app)
        .get('/users/' + new mongoose.Types.ObjectId().toString())
        .expect(404)

    expect(response.body).toEqual({})
})

test('update existing user', async () => {
    await request(app)
        .patch('/users/' + testUser._id.toString())
        .send({
            firstName: 'Mike',
        })
        .expect(200)

    const user = await User.findById(testUser._id)
    expect(user.firstName).toEqual('Mike')
})