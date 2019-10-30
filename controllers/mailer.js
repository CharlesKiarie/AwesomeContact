const path = require('path');
const nodemailer = require('nodemailer');

nodemailer.createTransport({
	host: 'email-smtp.eu-west-1.amazonaws.com',
 	port: 465,
 	secure: true,
	auth: {
		user: process.env.AWS_USER,
		pass: process.env.AWS_KEY
	}
});

exports.postEmail = (req, res) => {
	const toEmail = req.params.email;
	const fromEmail = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;

	let thanks = req.body.thanks
	if (thanks === null || thanks === undefined || thanks == "") {
		thanks = "http://awesomecontact.me/thankyou/";
	}
	

	res.redirect(302, thanks);
	//save to db
};


//run cron job and send out emails
//get unsent emails from db
//loop thorugh sending emails
sendEmail(toEmail, fromEmail, subject, message);

const sendEmail = (toEmail, fromEmail, subject, message) => {
	var transporter = nodemailer.createTransport({
		host: 'email-smtp.eu-west-1.amazonaws.com',
	 	port: 465,
	 	secure: true,
		auth: {
			user: process.env.AWS_USER,
			pass: process.env.AWS_KEY
		}
	});

	var mailOptions = {
			from: 'awesomeContact <admin@awesomecontact.me>',
			to: toEmail,
			subject: subject,
			text: message,
			html: `	<p>${message}</p>
					<p>From: ${fromEmail}</p>
					`
		};


	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		} else {
			console.log('Message Sent: '+info.response);
		}
	});
};