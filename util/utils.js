var config = require('../config/config');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: config.email.service, // 主机
    secureConnection: true, // 使用 SSL
    port: config.email.port, // SMTP 端口
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
});
exports.sendEmail = function (email, title, content, html) {
    var mailOptions = {
        from: config.email.user, // 发件地址
        to: email, // 收件列表
        subject: title, // 标题
        text: content,
        html: html
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return error;
        } else {
            return "Success";
        }
    });
}