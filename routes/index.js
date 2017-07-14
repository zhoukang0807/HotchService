var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
    var socket = require('socket.io-client')('http://169.254.173.140:3000');
    socket.on('connect', function(){
        socket.emit('addFriend', {from: "asd123",target:"realcxj", msg:"你好",remark:"钱俊",reqTime:new Date().Format("yyyy-MM-dd hh:mm:ss")});
        //socket.emit('message', {from: "realcxj1989", target: "realcxj",msg:"你麻痹野"})
    });
});


router.get('/test2', function(req, res, next) {
    var socket = require('socket.io-client')('http://169.254.173.140:3000');
    socket.on('connect', function(){
        socket.emit('message', {from: "realcxj1989", target: "realcxj",msg:"你麻痹野"})
    });
});

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

module.exports = router;
