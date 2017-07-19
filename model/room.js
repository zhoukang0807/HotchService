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
            default: ""
        },
        createUserName:{
            type: String
        },
        avatar:{
            type: String,
            default: "http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=c70c06e4888ba61ecbe3c06c295dfd7f/a9d3fd1f4134970a467710019fcad1c8a7865d93.jpg"
        },
        users: {
            type: Array,
            default: []
        },
        createTime: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('Room', schema);