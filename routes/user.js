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
    if(postData.userName=="admin" && postData.password=="admin"){
        res.send({resultCode:"0000",resultDesc:"注册成功！",user:postData});
        log.info("用户注册成功|用户名"+postData.userName+"|密码"+postData.password+"|邮箱"+postData.email);
    }else{
        res.send({resultCode:"0001",resultDesc:"注册失败！重复"});
    }
});
router.post('/send/indentify', function(req, res, next) {
    var postData = req.body;
    log.info(postData);
    if(Utils.IsEmail(postData.email)){
        var verifyCode = Utils.randomAlphanumeric(4);
        //记录验证码到session中
        req.session.verifyCode = verifyCode
        Utils.sendEmail(postData.email,"大杂烩注册验证码","",Utils.getEmailHtml('您好！您的验证码为：'+verifyCode+',请勿告诉他人')).then(function (result) {
            log.info(result);
            res.send({resultCode:"0000",resultDesc:"发送验证码成功！",code:verifyCode});
        }).catch(function (err) {
            log.error(err);
            res.send({resultCode:"0102",resultDesc:"发送验证码失败！",code:verifyCode});
        });
    }else{
        res.send({resultCode:"0101",resultDesc:"邮箱格式不正确！"});
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
