const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin','user','partner'],
        default: 'user',
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
});


const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
