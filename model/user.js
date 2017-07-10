var mongoose = require('mongoose');
var schema =new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique: true
    },
    nick:{
        type:String,
        required:true
    },

    friends:{
        type:[],
    },
    email:{
        type:String,
        required:true,
        defualt:"",
    },
    password:{
        type:String,
        required:true
    },
    createTime:{
        type:Date,
        default:Date.now,
        required:true
    }}
)
module.exports =mongoose.model('User',schema);