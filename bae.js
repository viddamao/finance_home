var mongoose = require('mongoose');
var redis = require('redis');

var host, port, username, password, database, url;

if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
    host = 'mongo.duapp.com';
    username = "9100bd6357d945a9ac962a65957c2a53",
        password = "e4e1e426f9154811be0e75e76efe343c",
        database = 'VhpiFanakhuHdTjVHxMd';
    port = 8908;
    url = "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database;


    var redis_username = "9100bd6357d945a9ac962a65957c2a53";
    var redis_password = "e4e1e426f9154811be0e75e76efe343c";
    var redis_host = 'redis.duapp.com';
    var redis_port = 80;
    var redis_database = "RpiDsahJtJQAAtlhcHvX";
    var options = {
        "no_ready_check": true
    };


} else {
    host = '127.0.0.1';
    database = 'finance_home';
    port = 8080;
    url = "mongodb://127.0.0.1:8080/finance_home";
}



function testRedis(req, res) {
    var client = redis.createClient(redis_port, redis_host, options);


    client.on("error", function(err) {
        console.log("Error " + err);
    });


    client.auth(redis_username + '-' + redis_password + '-' + redis_database);

    client.set('baidu', 'welcome to BAE');

    client.get('baidu', function(err, result) {
        console.log(result);
    });

}

function putRedis(key, value) {
    var client = redis.createClient(redis_port, redis_host, options);

    client.auth(redis_username + '-' + redis_password + '-' + redis_database);

    client.set(key, value);

}

function getRedis(key) {
    var client = redis.createClient(redis_port, redis_host, options);

    client.auth(redis_username + '-' + redis_password + '-' + redis_database);

    var ret = client.get(key, function(err, result) {
        console.log(result);
    });
    return ret;
}

var recon = true;

function getConnect() {
    var opts = {
        db: {
            native_parser: true
        },
        server: {
            poolSize: 5,
            auto_reconnect: true
        },
        user: username,
        pass: password
    };
    // mongoose.connect("mongodb://HahMqSkZWUq9QWHsWceXmG83:XH82hOf5MGzoMUMUkCNj0KdBvecF3mzP@mongo.duapp.com:8908/pQPzvWlctdHpUjrbtFnX");//需要验证账户  
    // mongoose.connect("mongodb://" + username + ":" + password +"@"+ host + ":" + port + "/" + dbName);//需要验证账户  
    mongoose.connect(url, opts);
    var dbcon = mongoose.connection;
    // var dbcon = mongoose.createConnection(url, opts);  
    dbcon.on('error', function(error) {
        console.log('connection error');
        // throw new Error('disconnected,restart');  
        dbcon.close();
    });

     
    dbcon.on('disconnected', function() {
        console.log('disconnected');
        dbcon.close();
    });
    dbcon.on('open', function() {
        console.log('connection success open');
        recon = true;
    });
    dbcon.on('close', function(err) {
        console.log('closed');
        // dbcon.open(host, dbName, port, opts, function() {  
        // console.log('closed-opening');  
        // });  
        reConnect('*');
    });

    function reConnect(msg) {
        console.log('reConnect' + msg);
        if (recon) {
            console.log('reConnect-**');
            dbcon.open(host, database, port, opts, function() {
                console.log('closed-opening');
            });
            recon = false;
            console.log('reConnect-***');
        };
        console.log('reConnect-end');
    }
}



exports.testRedis = testRedis;
//exports.putRedis = putRedis;
//exports.getRedis = getRedis;

exports.getConnect = getConnect;
exports.mongoose = mongoose;
