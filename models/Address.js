const getDb = require('../utils/database').getDb;
const ObjectId = require('mongodb').ObjectId;


class Address {
	constructor(user, emailValues) {
		this.user = user;
		this.emailValues = emailValues;
	}

	save() {
		const db = getDb();
		return db.collection('address')
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
		return db.collection('address')
		.findOne({email: email})
		.then(user => {
			return user;
		})
		.catch(err => {
			console.log(err);
		});
	}

	static findById(userId) {
	    const db = getDb();
	    return db.collection('address')
	      .findOne({ "_id": userId })
	      .then(user => {
	        console.log(user);
	        return user;
	      })
	      .catch(err => {
	        console.log(err);
	      });
	}

	static pushEmailValues(userId, emailValue) {
		const db = getDb();
		return db.collection('address')
		.update(
			{"_id": userId}, 
			{"$push": {"emailValue": {emailValue}}}
		)
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	}

	static pullEmailValues(userId, emailValue) {
		const db = getDb();
		return db.collection('address')
		.update(
			{"_id": userId}, 
			{"$pull": {"emailValue": {emailValue}}}
		)
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	}
}

module.exports = Address;