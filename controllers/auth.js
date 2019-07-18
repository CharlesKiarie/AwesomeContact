const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validateSignup = require('../validation/signup');
const validateLogin = require('../validation/login');

exports.getSignup = (req, res) => {
	res.render('signup', {
		isAuthenticated: false,
		errors: {}
	});
};

exports.postSignup = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	console.log(req.body);

	const { errors, isValid } = validateSignup(req.body);
	if (!isValid) {
		return res.status(400).render('signup', {
			errors: errors
		});
	}

	User.findUser(email)
	.then(user => {
		if (user) {
			errors.email = "Email already exists please login.";
			return res.render('login', {
				errors: errors
			}); //You exist please log in
		}
		return bcrypt.hash(password, 12)
		.then(hashedPassword => {
		const user = new User(
			email,
			hashedPassword
		);
		return user.save();
		})
		.then(result => {
			errors.email = "Your account has been created please login.";
			res.render('login', {
				errors: errors
			}); //Log in you account has been created
		});
	})
	.catch(err => {
		//console.log(err);
		errors.server = "Server is down please try again.";
		return res.status(500).json(errors);
	});
};

exports.getLogin = (req, res) => {
	res.render('login', {
		isAuthenticated: false,
		errors: {}
	});
};

exports.postLogin = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const { errors, isValid } = validateLogin(req.body);
	if (!isValid) {
		return res.status(303).render('login', {
			errors: errors
		});
	}

	User.findUser(email)
	.then(user => {
		if (!user) {
			errors.email = "Email does not exist or using wrong account";
			return res.render('login', {
				errors: errors
			}); //Wrong email or no account
		}
		bcrypt.compare(password, user.password)
		.then(match => {
			if (match) {
				req.session.isAuthenticated = true;
				req.session.user = user;
				return req.session.save(err => {
				res.redirect('dashboard');
				});
			}
			error.password = "Password failed use your correct password1.";
			res.render('login', {
				errors: errors
			}); 
		})
		.catch(err => {
			console.log(err);
			errors.server = "Password failed use your correct password2.";
         	res.render('login', {
         		errors: errors
         	}); //Wrong password
		});
	})
	.catch(err => {
		console.log(err)
		errors.server = "Server is down please try again2.";
		return res.render('login', {
     		errors: errors
     	});
	});
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.status(303).redirect('/');
  });
};