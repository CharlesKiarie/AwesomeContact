const path = require('path');
const nodemailer = require('nodemailer');
const MailTime = require('mail-time');
const getDb = require('../utils/database').getDb;

const transports = [];

transports.push(nodemailer.createTransport({
	host: 'email-smtp.eu-west-1.amazonaws.com',
 	port: 465,
 	secure: true,
	auth: {
		user: process.env.AWS_USER,
		pass: process.env.AWS_KEY
	}
}));

exports.postEmail = (req, res) => {
	const toEmail = req.params.email;
	const fromEmail = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;

	let thanks = req.body.thanks
	if (thanks === null || thanks === undefined || thanks == "") {
		thanks = "http://awesomecontact.me/thankyou/";
	}
	

	res.redirect(thanks);
	sendEmail(toEmail, fromEmail, subject, message);

};

const sendEmail = (toEmail, fromEmail, subject, message) => {

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
			to: toEmail,
			subject: subject,
			text: message,
			html: `<p>${message}</p>
					<p>From: ${fromEmail}</p>
					`
		};


		mailQueue.sendMail(mailOptions);
};

		// var mailOptions = {
		// 	from: 'Charles <kiariecharles77@gmail.com>',
		// 	to: 'kiariecharles77@gmail.com',
		// 	subject: 'This is from awesome contact mailt-time',
		// 	text: `It works.`,
		// 	html: `<p>It works</p>`
		// };