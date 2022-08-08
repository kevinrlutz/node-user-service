const mongoose = require('mongoose')
const validator = require('validator')

const connectionURL = 'mongodb+srv://root:<password>@cluster0.y57olhm.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connectionURL)

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

const me = new User({
    firstName: 'Rayaan',
    lastName: 'Attari',
    gender: 'Male',
    age: 22,
    email: 'rayaan.attari@gmail.com',
    phoneNumber: '321-890-7155'
})

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })