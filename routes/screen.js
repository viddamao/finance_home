var express = require('express');
var router = express.Router();


/* GET screen page. */
	console.log('render screen page');
	exports.users = function(db) {
    return function(req, res) {
        var collection = db.get('users'); //获得数据库中的集合(类似关系数据库中的表)
        collection.find({},{},function(e,docs){ //取得所有的集合数据, 渲染到页面上,关键字是userlist
            res.render('./pages/screen', {
                "users" : docs
            });
        });
    };
};

module.exports = router;
