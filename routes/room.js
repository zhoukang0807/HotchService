var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');
var constant = require('../util/constant');
var Room = require('../model/room');
var User = require('../model/user');
var log4js = require('log4js');
log4js.configure("./log4js.json");
var log = log4js.getLogger('room');
router.post('/create', function (req, res, next) {
    let postData = req.body;
    let host = req.headers.host;
    log.info(JSON.stringify(req.body));
    let rom = {
        roomId: Number(Date.now().toString() + Utils.GetRandomNum(0, 1000).toString()),
        roomName: postData.roomName,
        roomTitle: postData.roomTitle,
        createUserName: postData.createUserName,
        users: [postData.createUserName],
        avatar: 'http://' + host + '/public/img/bg_group.png'
    };
    User.findOne({userName: postData.roomName}, function (err, rowData) {
        if (err) {
            res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "数据库异常！"});
        } else {
            if (rowData) {
                res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "房间名不能和用户名相同！"});
            } else {

                new Room(rom).save(function (err, row) {
                    if (err) {
                        console.log(err)
                        res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
                    } else {
                        User.findOne({userName: postData.createUserName}, function (err, data) {
                            if (err) {
                                res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
                            } else {
                                if (data) {
                                    let rooms = data.rooms;
                                    rooms.push(row);
                                    User.findOneAndUpdate({userName: postData.createUserName}, {$set: {rooms: rooms}}, function (err, result) {
                                        if (err) {
                                            log.error(err);
                                            res.send({
                                                resultCode: constant.resultCode.Error_Code_DB,
                                                resultDesc: "服务器异常！"
                                            });
                                        } else {
                                            log.info(rom);
                                            res.send({
                                                resultCode: constant.resultCode.Success_Code,
                                                resultDesc: "创建成功！",
                                                room: rom
                                            });
                                        }
                                    })
                                } else {
                                    res.send({
                                        resultCode: constant.resultCode.Error_Code_IsExit,
                                        resultDesc: "用户名不存在！"
                                    });
                                }
                            }
                        })
                    }
                })
            }
        }
    })

});


router.get('/select/users', function (req, res, next) {
    log.info(req.query);
    const roomName = req.query.roomName;
    Room.findOne({roomName: roomName}, function (err, data) {
        if (err) {
            res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
        } else {
            if (data) {
                res.send({resultCode: constant.resultCode.Success_Code, resultDesc: "查询成功！", users: data.users});
            } else {
                res.send({resultCode: constant.resultCode.Error_Code_IsExit, resultDesc: "房间号不存在！"});
            }
        }
    });
});

router.post('/add', function (req, res, next) {
    log.info(req.body);
    const postData = req.body;
    Room.findOne({roomName: postData.roomName}, function (err, data) {
        if (err) {
            res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
        } else {
            if (data) {
                var users=data.users;
                users.push(postData.userName);
                Room.findOneAndUpdate({roomName: postData.roomName},{$set:{users: users}},function (err,row) {
                    if(err){
                        res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
                    }else{
                        User.findOne({userName: postData.userName}, function (err, userInfo) {
                            if (err) {
                                res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
                            } else {
                                var rooms=userInfo.rooms;
                                rooms.push(data);
                                User.findOneAndUpdate({userName: postData.userName},{$set:{rooms: rooms}},function (err,row) {
                                    if(err){
                                        res.send({resultCode: constant.resultCode.Error_Code_DB, resultDesc: "服务器异常！"});
                                    }else{
                                        res.send({resultCode: constant.resultCode.Success_Code, resultDesc: "群加入成功！", users: data.users});
                                    }
                                })
                            }
                        });

                    }
                })
            } else {
                res.send({resultCode: constant.resultCode.Error_Code_IsExit, resultDesc: "房间号不存在！"});
            }
        }
    });
});
module.exports = router;
