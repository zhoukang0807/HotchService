//数据库链接
var mongoose = require('mongoose');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('app');
var config=require('./config');
mongoose.Promise = global.Promise;
var dbconnection=mongoose.connect(config.mongodb, function (err, db) {
    if(err)
    {
        log.info("数据库链接失败");
    }else {
        log.info("数据库链接成功");
    }
});
module.exports= dbconnection;