var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');
var constant = require('../util/constant');
var User = require('../model/user');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('user');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.post('/register', function (req, res, next) {
    var postData = req.body;
    log.info("注册" + JSON.stringify(postData));
    var user = {
        userName: postData.userName,
        password: postData.password,
        email: postData.email
    };
    if (user.userName == "" || user.password == "" || user.email == "" || postData.verifyCode == "") {
        res.send({resultCode: constant.resultCode.Error_Code_Param, resultDesc: "参数缺失"});
    } else {
        if (postData.verifyCode != req.session.verifyCode) {
            res.send({resultCode: constant.resultCode.Error_Code_Verify, resultDesc: "验证码错误，或已失效"});
        } else {
            User.findOne({userName: user.userName}, function (err, data1) {
                if (!data1) {
                    User.findOne({email: user.email}, function (err, data2) {
                        if (!data2) {
                            new User(user).save(function (err, data) {
                                if (err) {
                                    res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "注册失败！"});
                                } else {
                                    res.send({
                                        resultCode: constant.resultCode.Success_Code,
                                        resultDesc: "注册成功！",
                                        user: user
                                    });
                                }
                            })
                        } else {
                            res.send({resultCode: constant.resultCode.Error_Code_IsExit, resultDesc: "邮箱已注册，不能重复使用！"});
                        }
                    })

                } else {
                    res.send({resultCode: constant.resultCode.Error_Code_IsExit, resultDesc: "用户名已存在！"});
                }
            })

        }
    }
    log.info("用户注册|用户名" + postData.userName + "|密码" + postData.password + "|邮箱" + postData.email);

});
//验证码发送服务
router.post('/send/indentify', function (req, res, next) {
    var postData = req.body;
    log.info("发送邮件" + JSON.stringify(postData));
    if (Utils.IsEmail(postData.email)) {
        var verifyCode = Utils.randomAlphanumeric(4);
        //记录验证码到session中
        req.session.verifyCode = verifyCode
        Utils.sendEmail(postData.email, "大杂烩注册验证码", "", Utils.getEmailHtml('您好！您的验证码为：' + verifyCode + ',请勿告诉他人')).then(function (result) {
            log.info(result);
            res.send({resultCode: constant.resultCode.Success_Code, resultDesc: "发送验证码成功！", verifyCode: verifyCode});
        }).catch(function (err) {
            log.error(err);
            res.send({resultCode: constant.resultCode.Error_Code_Send, resultDesc: "发送验证码失败！", verifyCode: verifyCode});
        });
    } else {
        res.send({resultCode: constant.resultCode.Error_Code_Format, resultDesc: "邮箱格式不正确！"});
    }

});
router.post('/login', function (req, res, next) {
    var postData = req.body;
    User.findOne({userName: postData.userName}, function (err, user) {
        if (user) {
            if (postData.password == user.password) {
                res.send({resultCode: constant.resultCode.Success_Code, resultDesc: "登陆成功！", user: postData});
                log.info("用户" + postData.userName + "登陆成功！");
            } else {
                res.send({resultCode: constant.resultCode.Error_Code_Param, resultDesc: "账号或密码错误"});
                log.info("用户" + postData.userName + "登陆失败！");
            }

        } else {
            User.findOne({email: postData.userName}, function (err, data) {
                if (data) {
                    if (data.password == postData.password) {
                        res.send({resultCode: constant.resultCode.Success_Code, resultDesc: "登陆成功！", user: postData});
                        log.info("用户" + postData.userName + "登陆成功！");
                    } else {
                        res.send({resultCode: constant.resultCode.Error_Code_Param, resultDesc: "账号或密码错误"});
                        log.info("用户" + postData.userName + "登陆失败！");
                    }
                } else {
                    res.send({resultCode: constant.resultCode.Error_Code_NoExit, resultDesc: "账号不存在"});
                }
            })
        }
    })
});
router.post('/forget/password', function (req, res, next) {
    var postData = req.body;
    console.log(postData)
    if (postData.verifyCode != req.session.verifyCode) {
        res.send({resultCode: constant.resultCode.Error_Code_Param, resultDesc: "验证码错误！"});
    } else {
        User.findOne({email: postData.email}, function (err, data) {
            if (data) {
                User.update({email: postData.email}, {$set: {password: postData.password}}, function (err, row) {
                    if (err) {
                        res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "修改失败，服务器异常！"});
                    } else {
                        res.send({resultCode: constant.resultCode.Success_Code, resultDesc: "密码修改成功！"});
                    }
                })
            } else {
                res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "邮箱用户不存在，请先注册！"});
            }
        });
    }
});
module.exports = router;
