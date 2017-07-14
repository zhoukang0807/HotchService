var mongoose = require('mongoose');
var schema =new mongoose.Schema({
    userName:{
        type:String,
    },
    targetUserName:{
        type:String,
    },
    message:{
        type:String,
    },
    createTime:{
        type:Date,
        default:Date.now
    }
})
module.exports =mongoose.model('Chat',schema);