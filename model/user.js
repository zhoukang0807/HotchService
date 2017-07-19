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
        nickName: {
            type: String,
            default: ""
        },
        telPhone: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
       //个性签名
        sign:{
            type: String,
            default: "",
        },
        avatar:{
            type: String,
            default: "https://facebook.github.io/react/img/logo_og.png",
        },
        password: {
            type: String,
        },
        friends: {
            type: Array,
            default: []
        },
        rooms: {
            type: Array,
            default: []
        },
        createTime: {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('User', schema);