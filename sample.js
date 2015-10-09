//clear db

db.dropDatabase()
var vidda = {
    _id: ObjectId("54428cf327a1b318f9aaee7c"),
    email: "viddamao@gmail.com",
    family_name: "Mao",
    gender: "male",
    given_name: "Wenjun",
    id: "0000000001",
    username: "Vidda"
}

var stocks = [{
        "_id" : ObjectId("560f8530d6387e405fa3b50e"),
        "name" : "Google",
        "id" : "600000",
        "price" : 8.76,
		"articles":[]
}
{
        "_id" : ObjectId("560f8557d6387e405fa3b50f"),
        "name" : "Cocacola",
        "id" : "600001",
        "price" : 12.23,
		"articles":[]
}]
//create test users
db.users.insert(vidda)
//create test balances
db.stocks.insert(stocks, {
    multi: true
})
//create test budgets
db.articles.insert([{
    "_id" :ObjectId("54428cf327a1b318f9aaee7d"),
	"author_id": ObjectId("54428cf327a1b318f9aaee7c"),
    "title": "ABC",
	"href":"www.baidu.com",
	"content":"askdnjsansjknandoabfdojbcjzbcs",
    "date": new Date("Sat Nov 28 2014 00:00:00 GMT+0000 (UTC)"),
	"likes" :10
},{
    "_id" :ObjectId("54428cf327a1b318f9aaee7e"),
	"user_id": ObjectId("54428cf327a1b318f9aaee7c"),
    "title": "lalala",
	"href":"www.baidu.com",
	"content":"blablabla",
    "date": new Date("Sat Nov 28 2014 00:01:00 GMT+0000 (UTC)"),
	"likes" :76
}
], {
    multi: true
})
//sample query, find all users
cursor = db.users.find();
while(cursor.hasNext()) {
    printjson(cursor.next());
}

//find articles for a certain stock
cursor = db.stocks.find({
    user_id: ObjectId("54428cf327a1b318f9aaee7c")
});
while(cursor.hasNext()) {
    printjson(cursor.next());
}