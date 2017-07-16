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
            defualt: ""
        },
        telPhone: {
            type: String,
            defualt: "",
        },
        email: {
            type: String,
            defualt: "",
        },
       //个性签名
        sign:{
            type: String,
            defualt: "",
        },
        avatar:{
            type: String,
            defualt: "https://facebook.github.io/react/img/logo_og.png",
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