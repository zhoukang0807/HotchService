var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');
var constant = require('../util/constant');
var User = require('../model/user');
var Room = require('../model/room');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('contact');
router.get('/', function (req, res, next) {
    log.info(req.query);
    const name = req.query.name;
    User.findOne({userName:name},function (err,row) {
        if(err){
            res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc:"数据库异常！"});
        }
        else{
            if(row){
                let userInfo={
                    userId:row.userId,
                    userName:row.userName,
                    nickName:row.nickName,
                    sign:row.sign,
                };
                res.send({resultCode: constant.resultCode.Success_Code, resultDesc:"查询成功！",room:false, data:userInfo});
            }else{
                Room.findOne({roomName:name},function (err,romData) {
                    if(err){
                        res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc:"数据库异常！"});
                    }
                    else{
                        if(romData){
                            res.send({resultCode: constant.resultCode.Success_Code, resultDesc:"查询成功！",room:true, data:romData});
                        }else{
                            res.send({resultCode: constant.resultCode.Error_Code_IsExit, resultDesc: "用户或群组不存在！"});
                        }
                    }
                })

            }
        }
    })
});


module.exports = router;
