var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function(req, res, next) {
    res.send('respond with a resource');
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
