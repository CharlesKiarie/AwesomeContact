const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
	mongoClient.connect(
		'mongodb+srv://charles:<kOtAVHRqXQtur153>@cluster0-9d7mj.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true } 
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