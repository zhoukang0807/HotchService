var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/test', function(req, res, next) {
    var socket = require('socket.io-client')('http://169.254.173.140:3000');
    socket.on('connect', function(){
        console.log("123")
        socket.emit('message', {from: "钱俊", target: "realcxj",msg:"我很好"});
    });
});

module.exports = router;
