const mongoose = require('mongoose')
const validator = require('validator')
const Appointment = require('./appointment')

const userSchema = new mongoose.Schema({
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
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        default: 0,
        max: 120,
        validate(value) {
            if (value < 0) {
                throw new Erorr('Age must be a positive number!')
            }
        }
    },
    email: {
        type: String,
        unique: true,
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
}, {
    timestamps: true
})

userSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'userId'
})

const User = mongoose.model('User', userSchema)

module.exports = User