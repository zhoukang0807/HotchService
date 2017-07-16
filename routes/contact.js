var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');
var constant = require('../util/constant');
var User = require('../model/user');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('contact');
router.get('/add', function (req, res, next) {
    log.info(req.query);
    const form = req.query.form;
    const receiver = req.query.receiver;

    User.findOne({userName:form},function (err,data) {
        if(data){
            User.findOne({userName:receiver},function (err,row) {
                if(row){
                    let friends=row.friends;
                    let param={
                        userId:data.userId,
                        userName:data.userName,
                        sign:data.sign,
                        remark:"",
                        nickName:data.nickName,
                        avatar:data.avatar
                    };
                    friends.push(param);
                    User.update({userName:receiver},{$set: {friends: friends}},function (err,result1) {
                        if(err){
                            res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc:"数据库异常！"});
                        }
                        else{
                            let friends2=data.friends;
                            var param2={
                                userId:row.userId,
                                userName:row.userName,
                                sign:row.sign,
                                remark:"",
                                nickName:row.nickName,
                                avatar:row.avatar
                            };
                            friends2.push(param2);
                            User.update({userName:form},{$set: {friends: friends2}},function (err,result2) {
                                if(err){
                                    res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc:"数据库异常！"});
                                }
                                else{
                                    res.send({resultCode: constant.resultCode.Success_Code, resultDesc:"操作成功！",userName:receiver});
                                }
                            })
                        }
                    })
                }else{
                    res.send({resultCode: constant.resultCode.Error_Code_NoExit, resultDesc:"用户信息不存在！"});
                }
            })
        }else{
            res.send({resultCode: constant.resultCode.Error_Code_NoExit, resultDesc:"用户信息不存在！"});
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
