var express = require('express');
var router = express.Router();
var Utils = require('../util/utils');

var request = require('request');
var cheerio = require('cheerio');

var rp = require('request-promise');
/* GET users listing. */

router.get('/read', function(req, res, next) {
    console.log(111);
    var opt = {
        method: "get",
        uri: "http://route.showapi.com/1071-1?showapi_appid=41392&showapi_sign=aea22da27ff4492e9ee415d1ca78d978",
        headers: {
            //"enctype":"application/x-www-form-urlencoded",
            "Content-Type": 'application/json',
            "cache-control": 'no-cache',
            "postman-token": 'ebd41a94-488d-0067-374a-ac09f9df49e3',
        },

    };
    rp(opt)
        .then(function (result) {
            var jsonResult=JSON.parse(result);
            var list=jsonResult.showapi_res_body.showapi_res_body.list;
            console.log(list);
            res.send({list:list,resultCode:"0000",resultDesc:"出错！"});
        })
        .catch(function (err) {
            console.error(err);
            res.send({list:[],resultCode:"0001",resultDesc:"出错！"});
        });
   // var list=[
   //     "第1篇文章",
   //     "第2篇文章",
   //     "第3篇文章",
   //     "第4篇文章",
   //     "第5篇文章",
   //     "第6篇文章",
   //     "第7篇文章",
   //     "第8篇文章",
   //     "第9篇文章",
   //     "第10篇文章",
   //     "第11篇文章",
   //     "第12篇文章",
   //     "第13篇文章",
   //     "第14篇文章",
   // ]
       // res.send({list:list,resultCode:"0000",resultDesc:""});

});

module.exports = router;
