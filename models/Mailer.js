const getDb = require('../utils/database').getDb;
const ObjectId = require('mongodb').ObjectId;


class Mailer {
	constructor(toEmail, fromEmail, subject, message) {
		this.toEmail = toEmail;
		this.fromEmail = fromEmail;
		this.subject = subject;
		this.message = message;
		this.isSent = false;
	}

	save() {
		const db = getDb();
		return db.collection('mail')
		.insertOne(this)
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			console.log(err);
		});
	}

	static findNotSent() {
		const db = getDb();
		return db.collection('mail')
		.find({isSent:{$in: [null, false]}})
		.then(result => {
			return result;
		})
		.catch(err => {
			console.log(err);
		});
	}

	static deleteSent() {
		const db = getDb();
		return db.collection('mail')
		.deleteMany({isSent:{$in: [null, true]}})
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			console.log(err);
		});
	}

	static updateSent(id) {
		const db = getDb();
		return db.collection('mail')
		.update({_id: id},{$set:{"isSent": true}})
		.then(result => {
			console.log(result);
		})
		.catch(err => {
			console.log(err);
		});
	}



	
}

module.exports = Mailer;