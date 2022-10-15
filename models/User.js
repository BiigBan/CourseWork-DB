const {Schema, model, ObjectId} = require('mongoose');

const User = new Schema ({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    image: {type: String},
    lang: {type: String}
})

module.exports = model('User', User);