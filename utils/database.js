const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	mongoClient.connect(
		'mongodb://localhost:27017/test', { useNewUrlParser: true } 
	)
		.then(client => {
			console.log("Database Connected");
			_db = client.db();
			callback(client);
		})
		.catch(error => {
			console.log(error);
			throw error;
		});
};

const getDb = () => {
	if(_db) {
		return _db;
	}
	throw "No Database Found"
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// 'mongodb://localhost:27017/test'