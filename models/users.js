var mongoose = require('mongoose');
var userSchema = require('../schemas/users');
var Users = mongoose.model('user', userSchema);
var bae = require('./bae');


function Users(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
};

Users.prototype.save = function(callback) {
  var md5 = crypto.createHash('md5'),
      email_MD5 = md5.update(this.email.toLowerCase()).digest('hex'),
      avatar = "http://www.gravatar.com/avatar/" + email_MD5 + "?s=48";
  //要存入数据库的用户信息文档
  var new_user = {
      name: this.name,
      password: this.password,
      email: this.email,
      avatar: avatar
  };
  
  bae.getConnect();
  
  var dbcon = mongoose.connection;  
  //打开数据库
  dbcon.on('open',function () {
    
   new_user.save(function(err, new_stock) {
		if (err) return console.error(err);
		//console.dir(new_stock);
	});
   
  });
};

//读取用户信息
Users.get = function(name, callback) {
 bae.getConnect();
 var dbcon = mongoose.connection; 
 dbcon.on('open',function () {
    
	Users.findOne()({ email:this.email },"name email password",function (err, user) {
	if (err) // handle this
	{
		console.log("can't find stock in database");
		return callback(err);
	}
	callback(null, user);//成功！返回查询的用户信息
	}
});


module.exports = Users;