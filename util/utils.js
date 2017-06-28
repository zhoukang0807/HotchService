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
exports.IsEmail = function (email) {
    //对电子邮件的验证
    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(email)) {
        return false;
    }
    return true;
}
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
exports.randomAlphanumeric = function (charsLength, chars) {
    var length = charsLength;
    var newchars = ""
    if (!chars) {
        newchars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
    } else {
        newchars = chars;
    }
    var randomChars = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * newchars.length);
        randomChars += newchars.charAt(i);
    }
    return randomChars;
}

exports.getEmailHtml = function (content) {
    return `<tbody>
     <tr>  
       <td>  
       <table width="800" border="0" align="center" cellpadding="0" cellspacing="0" height="40"></table> </td> 
      </tr>  
     <tr> 
      <td>  
       <table width="800" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#373d41" height="48" style="font-family:'Microsoft YaHei';">  
      <tbody> 
        <tr>  
       <td width="74" height="48" border="0" align="left" valign="middle" style="padding-left:20px;"> <img src="http://kangzw.com/attachment/admin/gallery/psb%20%289%29.jpg" width="80" height="19" border="0"></td> 
      </tr> 
      </tbody> 
     </table>  
      </td>  
     </tr>  
      <tr>  
     <td>  
        <table width="800" border="0" align="center" cellpadding="0" cellspacing="0" style=" border:1px solid #edecec; border-top:none; padding:0 20px;font-size:14px;color:#333333;">  
       <tbody> 
        <tr>  
         <td width="760" height="56" border="0" align="left" colspan="2" style=" font-size:16px;vertical-align:bottom;font-family:'Microsoft YaHei';">尊敬的大杂烩用户：</td>  
        </tr>  
        <tr>  
         <td width="760" height="30" border="0" align="left" colspan="2"></td>  
        </tr>  
        <tr>  
         <td width="40" height="32" border="0" align="left" valign="middle" style=" width:40px; text-align:left;vertical-align:middle; line-height:32px; float:left;"> </td>  
         <td width="720" height="32" border="0" align="left" valign="middle" style=" width:720px; text-align:left;vertical-align:middle;line-height:32px;font-family:'Microsoft YaHei';">  
		 <p><span style="border-bottom:1px dashed #ccc;" t="5" times="">` + content + `</span></p>  
	    <br> 
		</td>  
         <td width="720" height="32" colspan="2" style="padding-left:40px;"></td> 
        </tr>  
        <tr>  
         <td width="720" height="14" colspan="2" style="padding-bottom:16px; border-bottom:1px dashed #e5e5e5;font-family:'Microsoft YaHei';">大杂烩未授权版本</td>  
        </tr>  
        <tr>  
         <td width="720" height="14" colspan="2" style="padding:8px 0 28px;color:#999999;font-size:12px;font-family:'Microsoft YaHei';">此为系统邮件请勿回复</td> 
        </tr>  
       </tbody> 
      </table>  
       </td> 
    </tr>  
   </tbody> `;
}