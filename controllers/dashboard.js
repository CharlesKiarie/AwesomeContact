const User = require('../models/User');
const ObjectId = require('mongodb').ObjectId;
const validateEmail = require('../validation/email');

exports.getDashboard = (req, res, next) => {
	const user = req.user;
	const userId = user._id;
	const emailValues = user.emailValues;
	console.log(userId);

	// find and display all email values
	res.render('dashboard', {
		isAuthenticated: req.session.isAuthenticated,
		errors: {},
		userId,
		emailValues: emailValues
	});
};

exports.pushEmailValues = (req, res, next) => {
	const user = req.user;
	const userId = user._id;
	const emailCount = user.emailCount;
	const emailValues = user.emailValues;
	console.log(emailValues.length);

	const emailValue = req.body.email;

	const { errors, isValid } = validateEmail(req.body);
	if (!isValid) {
		return res.render('dashboard', {
			errors: errors,
			emailValues: emailValues,
			isAuthenticated: req.session.isAuthenticated
		});
	}
	
	User.findById(ObjectId(userId))
	.then(user => {
		if(user) {
			if (emailValues.length < emailCount) {
				User.pushEmailValues(userId, emailValue)
				.then(result => {
					console.log(result);
					res.render('dashboard', {
						isAuthenticated: req.session.isAuthenticated,
						errors: errors,
						emailValues: emailValues
					});
				})
				.catch(err => console.log(err));
			}
			errors.message = "Cannot add new value";
			res.render('dashboard', {
				isAuthenticated: req.session.isAuthenticated,
				errors: errors,
				emailValues: emailValues
			});
		}
	})
	.catch(err => console.log(err));
	res.redirect('dashboard');
};

exports.pullEmailValues = (req, res, next) => {
	const user = req.user;
	const userId = user._id;
	const emailCount = user.emailCount;
	const emailValues = user.emailValues;

	const emailValue = req.body.email;

	User.findById(ObjectId(userId))
	.then(user => {
		if(user) {
				User.pullEmailValues(userId, emailValue)
				.then(result => {
					console.log(result);
					errors.message = "Item  has been deleted";
					res.render('dashboard', {
						isAuthenticated: req.session.isAuthenticated,
						errors: errors,
						emailValues: emailValues
					});
				})
				.catch(err => console.log(err));			
		}
		res.render('dashboard', {
			isAuthenticated: req.session.isAuthenticated,
			errors: errors,
			emailValues: emailValues
		});
	})
	.catch(err => console.log(err));
	res.redirect('dashboard');
};