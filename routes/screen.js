var express = require('express');
var router = express.Router();


/* GET screen page. */
router.get('/screen', function(req, res) {
	console.log('render screen page');
	exports.funds = function(db) {
    return function(req, res) {
        var collection = db.get('funds'); //获得数据库中的集合(类似关系数据库中的表)
        collection.find({},{},function(e,docs){ //取得所有的集合数据, 渲染到页面上,关键字是userlist
            res.render('./pages/screen', {
                "funds" : docs
            },function(err, html) {
				res.send(html);
			});
        });
    };
};
});

module.exports = router;
