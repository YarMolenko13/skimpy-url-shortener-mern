
const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    img: {type: String, required: false},
    links: {type: Array, default: [], ref: 'Link'}
})

module.exports = model('User', UserSchema)