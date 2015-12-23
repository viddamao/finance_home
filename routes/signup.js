var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
    Users = require('../models/users.js');
var app = express();
	
app.get('/signup', checkNotLogin);
  app.get('/signup', function (req, res) {
    res.render('signup', {
      title: '注册',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });

  app.post('/signup', checkNotLogin);
  app.post('/signup', function (req, res) {
    var email = req.body.email,
        password = req.body.password,
        password_re = req.body['password-repeat'];
    //检验用户两次输入的密码是否一致
    if (password_re != password) {
      req.flash('error', '两次输入的密码不一致!'); 
      return res.redirect('/signup');//返回主册页
    }
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        email: req.body.email,
        password: password,
        email: req.body.email
    });
    //检查用户名是否已经存在 
    Users.get(newUser.email, function (err, user) {
      if (user) {
        req.flash('error', '用户已存在!');
        return res.redirect('/signup');//返回注册页
      }
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/signup');//注册失败返回注册页
        }
        req.session.user = user;//用户信息存入 session
        req.flash('success', '注册成功!');
        res.redirect('/');//注册成功后返回主页
      });
    });
  });
  
function checkLogin(req, res, next) {
    if (!req.session.user) {
      req.flash('error', '未登录!'); 
      res.redirect('/login');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (req.session.user) {
      req.flash('error', '已登录!'); 
      res.redirect('back');//返回之前的页面
    }
    next();
  }


module.exports = router;  
