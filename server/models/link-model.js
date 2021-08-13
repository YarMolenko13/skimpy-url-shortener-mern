
const {Schema, model} = require('mongoose')

const LinkSchema = new Schema({
    title: {type: String, default: 'Untitled'},
    fullUrl: {type: String, required: true},
    shortUrl: {type: String, required: true, unique: true},
    countFollows: {type: Schema.Types.Number, default: 0},
    date: {type: Schema.Types.Date, default: new Date()},
})

module.exports = model('Link', LinkSchema)