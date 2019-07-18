const getDb = require('../utils/database').getDb;
const ObjectId = require('mongodb').ObjectId;

class User {
	constructor(email, password) {
		this.email = email;
		this.password = password;
		this.subscription = 'monthly';
		this.emailCount = '5';
		this.emailValues = [];
	}


	save() {
		const db = getDb();
		return db.collection('users')
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
		return db.collection('users')
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
	    return db.collection('users')
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
		return db.collection('users')
		.updateOne(
			{"_id": userId}, 
			{"$push": {"emailValues": {emailValue}}}
		)
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	}

	static pullEmailValues(userId, emailValue) {
		const db = getDb();
		return db.collection('users')
		.updateOne(
			{"_id": userId}, 
			{"$pull": {"emailValues": {emailValue}}}
		)
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	}


}



module.exports = User;