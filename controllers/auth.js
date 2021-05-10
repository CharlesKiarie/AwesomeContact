const User = require('../models/User');
const bcrypt = require('bcryptjs');
const MailTime = require('mail-time');
const validateSignup = require('../validation/signup');
const validateLogin = require('../validation/login');

const sendEmail = (email, subject, message) => {

	const db = getDb();

		const mailQueue = new MailTime({
		    db, 
		    type: 'client',
		    strategy: 'balancer', // Transports will be used in round robin chain
		    transports,
		    from(transport) {
		      // To pass spam-filters `from` field should be correctly set
		      // for each transport, check `transport` object for more options
		      return '"Awesome App" <' + transport._options.from + '>';
		    },
		    concatEmails: true, // Concatenate emails to the same addressee
		    concatDelimiter: '<h1>{{{subject}}}</h1>' // Start each concatenated email with it's own subject
		    // template: MailTime.Template // Use default template
		  });

		var mailOptions = {
			from: 'awesomeContact <admin@awesomecontact.me>',
			to: email,
			subject: subject,
			text: message,
			html: message
					
		};


		mailQueue.sendMail(mailOptions);
};

exports.getSignup = (req, res) => {
	res.render('signup', {
		isAuthenticated: false,
		errors: {}
	});
};

exports.postSignup = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	const myEmail =  'kiariecharles77@gmail.com';
	const mySubject = 'Someone Signed up';
	const myMsg = `${email} has signed up.`;
	const subject = 'Welcome to awesomeContact.';
	const msg = `	<p>Hello, Charles from awesomeContact here wanted to thank you for signing up and giving my little saas app a chance. You can find the documentation here: <a href="https://medium.com/@charleskiarie77/an-awesome-guide-to-getting-started-with-awesomecontact-471a7b68c297" target="_blank">Click me to read documentation</a> </p>
					<p>If getting setup is still a problem please do get in touch for further assistance. You can contact me here: kiariecharles77@gmail.com</p>
					<p>Also since my billing is not yet completly built out, after paying please do email me so I can manually activate your account.</p>
					<p>My email: kiariecharles77@gmail.com or through awesomeContact's <a href="https://awesomecontact.me/contact" target="_blank">Contact me</a></p>`;
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
			sendEmail(email, subject, msg);
			sendEmail(myEmail, mySubject, myMsg)
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
		errors.server = "Server is down please try again.";
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

