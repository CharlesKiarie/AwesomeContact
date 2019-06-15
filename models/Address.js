const getDb = require('../utils/database').getDb;


class Address {
	constructor(user, Address) {
		this.user = user;
		this.emailAcc = emailAcc;
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
}

module.exports = Address;