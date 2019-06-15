const User = require('../models/User');
const Address = require('../models/Address');

exports.getDashboard = (req, res) => {
	res.render('dashboard', {
		isAuthenticated: req.session.isAuthenticated
	});
};

exports.postAddress = (req, res) => {
	const user = req.session.user;
	const email = req.body.email;
	console.log(user);
	res.render('dashboard', {
		isAuthenticated: req.session.isAuthenticated
	});
};