var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');
var constant = require('../util/constant');
var Room = require('../model/room');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('room');
router.get('/', function (req, res, next) {
    new Room({
        roomId:14990831822,
        roomName:"群聊天",
       users:[{id:1499084091067978,name:"江超",type:1},{id:1499083182572912,name:"周康",type:2}]
    }).save(function (err,row) {
        res.jsonp(err)
    })
});


router.get('/select/users', function (req, res, next) {
     log.info(req.query);
     const id = req.query.id;
     Room.findOne({roomId:id},function (err,data) {
         if(err){
             res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
         }else{
             if(data){
                 res.send({resultCode: constant.resultCode.Success_Code, resultDesc: "查询成功！",users:data.users});
             }else{
                 res.send({resultCode: constant.resultCode.Error_Code_IsExit, resultDesc: "房间号不存在！"});
             }
         }
     });
});
module.exports = router;