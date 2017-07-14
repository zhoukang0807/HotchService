var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');
var constant = require('../util/constant');
var User = require('../model/user');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('contact');
router.get('/add', function (req, res, next) {
    var friends=[
        {
            userId:1499083182572912,
            userName:"kangz",
            sign:"这是一个个性签名",
            remark:"周康",
            nickName:"霜龙？。。。"
        },
        {
            userId:1499083182572913,
            userName:"admin",
            sign:"这是一个个性签名",
            nickName:"管理员？。。。"
        },
    ];
    User.update({userId:1499084091067978},{$set: {friends: friends}},function (err,row) {
        if(err){
            res.send(err);
        }
        else{
            res.send(row);
        }
    })
});


router.get('/select', function (req, res, next) {
    log.info(req.query);
    const userId = req.query.userId;
    User.findOne({userId:userId},function (err,row) {
        if(err){
            res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc:"数据库异常！"});
        }
        else{
            if(row){
                res.send({resultCode: constant.resultCode.Success_Code, resultDesc:"查询成功！", friends:row.friends});
            }else{
                res.send({resultCode: constant.resultCode.Error_Code_NoExit, resultDesc:"用户信息不存在！"});
            }
        }
    })
});
module.exports = router;
