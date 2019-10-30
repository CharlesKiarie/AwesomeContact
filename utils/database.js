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
// 'mongodb://charles:weg7fpDdd3CuRMah@cluster0-shard-00-00-9d7mj.mongodb.net:27017,cluster0-shard-00-01-9d7mj.mongodb.net:27017,cluster0-shard-00-02-9d7mj.mongodb.net:27017/awesomecontact?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'