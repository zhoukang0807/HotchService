var mongoose = require('mongoose');
var schema = new mongoose.Schema({
        roomId: {
            type: Number,
            unique: true
        },
        roomName: {
            type: String,
            unique: true
        },
        roomTitle: {
            type: String,
            defualt: ""
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