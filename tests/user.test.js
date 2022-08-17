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

afterAll(async () => {
    mongoose.connection.close()
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
            age: 25
        })
        .expect(200)

    const user = await User.findById(testUser._id)
    expect(user.firstName).toEqual('Mike')
    expect(user.age).toEqual(25)
})

test('find user by last name (search)', async () => {
    const response = await request(app)
        .get('/users/searchByLastName/' + testUser.lastName)
        .expect(200)

    expect(response.body).not.toBeNull()
})

test('does not find user by last name (search)', async () => {
    const response = await request(app)
        .get('/users/searchByLastName/' + 'test')
        .expect(404)

    expect(response.body).toEqual({})
})

test('find user by email (search)', async () => {
    const response = await request(app)
        .get('/users/searchByEmail/' + testUser.email)
        .expect(200)

    expect(response.body).not.toBeNull()
})

test('does not find user by email (search)', async () => {
    const response = await request(app)
        .get('/users/searchByEmail/' + 'test@email.com')
        .expect(404)

    expect(response.body).toEqual({})
})

test('delete an existing user by id', async () => {
	const res = await request(app)
		.delete('/users/' + testUserId.toString())
		.expect(200)

	const deletedUser = await User.findById(testUserId)

	expect(deletedUser).toBeNull()
})

test('does not delete non-existent user', async () => {
	const res = await request(app)
		.delete('/users/' + new mongoose.Types.ObjectId().toString())
		.expect(404)
})