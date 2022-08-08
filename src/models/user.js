const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        min: 0,
        max: 120,
        validate(value) {
            if (value < 0) {
                throw new Erorr('Age must be a positive number!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Phone number is invalid!')
            }
        }
    }
})

module.exports = User