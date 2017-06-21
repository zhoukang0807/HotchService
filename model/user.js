var mongoose = require('mongoose');
var schema =new mongoose.Schema({
    userId:{
        type:Number,
        unique: true
    },
    userName:{
        type:String,
    },
    password:{
        type:String,
    },
    createTime:{
        type:Date,
        default:Date.now
    }}
)
module.exports =mongoose.model('Attendance',schema);