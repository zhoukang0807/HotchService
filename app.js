var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var routes = require('./routesConfig');
var config=require("./config/config");
var log4js = require('log4js');
log4js.configure("./log4js.json");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var db=require("./config/db");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'hotch  app', //secret的值建议使用随机字符串
    name: 'hotchapp',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
    store: new MongoStore({   //创建新的mongodb数据库
        url:config.mongodb
    })
}));
app.use(express.static(path.join(__dirname, 'public')));

//路由集合
routes(app);
//配置日志
var log = log4js.getLogger('app');
log.info("app启动了");
app.listen(config.port);
log.info("网址为  http://localhost:8089");
module.exports = app;
