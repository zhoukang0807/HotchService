var mongoose = require('mongoose');
var schema = new mongoose.Schema({
        roomId: {
            type: Number,
            defualt:14990831822,
            unique: true
        },
        roomName: {
            type: String,
            unique: true
        },
        users: {
            type: Array,
            defualt: []
        },
        createTime: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('Room', schema);