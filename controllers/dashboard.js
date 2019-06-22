const User = require('../models/User');
const Address = require('../models/Address');
const ObjectId = require('mongodb').ObjectId;

exports.getDashboard = (req, res) => {
	res.render('dashboard', {
		isAuthenticated: req.session.isAuthenticated
	});
};

exports.postAddress = (req, res) => {
	const user = req.user;
	const userId = user._id;
	const userEmail = user.email;
	const emailCount = user.emailCount;
	console.log(userId);

	const emailValues = [];
	emailValues.push(req.body.email);
	
	Address.findById(ObjectId("5d0a7c54ad546f36f842902e"))
	.then(user => {
		if(user) {
			//console.log(user);
		}
		//save new model
		// const address = new Address(user, emailValues);
		// return address.save()
		// .then(result => {
		// 	res.render('dashboard', {
		// 		isAuthenticated: req.session.isAuthenticated
		// 	});
		// })
		// .catch(err => console.log(err));	
	})
	.catch(err => console.log(err));
};