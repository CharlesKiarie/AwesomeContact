const getDb = require('../utils/database').getDb;
const ObjectId = require('mongodb').ObjectId;


class Address {
	constructor(user, emailValues) {
		this.user = user;
		this.emailValues = emailValues;
	}

	save() {
		const db = getDb();
		return db.collection('user')
		.insertOne(this)
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			console.log(err);
		});
	}

	static findUser(email) {
		const db = getDb();
		return db.collection('user')
		.findOne({email: email})
		.then(user => {
			return user;
		})
		.catch(err => {
			console.log(err);
		});
	}

	
}

module.exports = Address;