const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res) => {
	res.render('signup', {
		isAuthenticated: false
	});
};

exports.postSignup = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;

	User.findUser(email)
	.then(user => {
		if (user) {
			return res.redirect('/login'); //You exist please log in
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
			res.redirect('/login'); //Log in you account has been created
		});
	})
	.catch(err => {
		console.log(err);
	});
};

exports.getLogin = (req, res) => {
	res.render('Login', {
		isAuthenticated: false
	});
};

exports.postLogin = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findUser(email)
	.then(user => {
		if (!user) {
			return res.redirect('/login'); //Wrong email or no account
			//res.send("Wrong email or no account");
		}
		bcrypt.compare(password, user.password)
		.then(match => {
			if (match) {
				console.log(user);
				req.session.isAuthenticated = true;
				req.session.user = user;
				return req.session.save(err => {
					console.log(err);
					res.redirect('/dashboard');
					//res.send("Its Working");
				});
			}
			res.redirect('/login'); //Wrong password
			//res.send("Wrong password");
		})
		.catch(err => {
			console.log(err);
         	res.redirect('/login');
         	//res.send("Not Working");
		});
	})
	.catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};