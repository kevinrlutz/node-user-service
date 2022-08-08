const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://root:<password>@cluster0.y57olhm.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(connectionURL)

// const me = new User({
//     firstName: 'Rayaan',
//     lastName: 'Attari',
//     gender: 'Male',
//     age: 22,
//     email: 'rayaan.attari@gmail.com',
//     phoneNumber: '321-890-7155'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })