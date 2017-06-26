var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function(req, res, next) {
    var postData = req.body;
    console.log(postData);
    Utils.sendEmail("731364471@qq.com","注册验证码","测试打算","<h3>页面HTML</h3>")
    if(postData.userName=="admin" && postData.password=="admin"){
        res.send({resultCode:"0000",resultDesc:"注册成功！",user:postData});
        log.info("用户注册成功|用户名"+postData.userName+"|密码"+postData.password+"|邮箱"+postData.email);
    }else{
        res.send({resultCode:"0001",resultDesc:"注册失败！重复"});
    }
});
router.post('/login', function(req, res, next) {
    var postData = req.body;
    console.log(postData);
    if(postData.userName=="admin" && postData.password=="admin"){
        res.send({resultCode:"0000",resultDesc:"登陆成功！",user:postData});
    }else{
        res.send({resultCode:"0001",resultDesc:"账户名或密码不存在"});
    }
});
module.exports = router;
