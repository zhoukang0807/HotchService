var mongoose = require('mongoose');
var schema = new mongoose.Schema({
        userId: {
            type: Number,
            unique: true
        },
        userName: {
            type: String,
            unique: true
        },
        telPhone: {
            type: String,
            defualt: "",
        },
        email: {
            type: String,
            defualt: "",
        },
        password: {
            type: String,
        },
        friends: {
            type: Array,
            defualt: []
        },
        rooms: {
            type: Array,
            defualt: []
        },
        createTime: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('User', schema);