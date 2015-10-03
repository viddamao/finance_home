//clear db
db.dropDatabase()
var vidda = {
    _id: ObjectId("54428cf327a1b318f9aaee7c"),
    email: "viddamao@gmail.com",
    family_name: "Mao",
    gender: "male",
    given_name: "Wenjun",
    id: "0000000001",
    name: "Vidda"
}

var stocks = [{
    "name": "ÖÐ¹úÊ¯ÓÍ",
    "id": "601857",
	"price": 8.76,
    "_id": ObjectId("544295060cae810b0056abaf"),
	"articles":[ObjectId("54428cf327a1b318f9aaee7c")]
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
	"user_id": ObjectId("54428cf327a1b318f9aaee7c"),
    "title": "ABC",
	"content":"askdnjsansjknandoabfdojbcjzbcs"
    "date": new Date("Sat Nov 28 2014 00:00:00 GMT+0000 (UTC)"),
	"likes" :10
},{
    "_id" :ObjectId("54428cf327a1b318f9aaee7e"),
	"user_id": ObjectId("54428cf327a1b318f9aaee7c"),
    "title": "lalala",
	"content":"blablabla"
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