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
		user: 'AKIASU6QDXYCL5P4QR5P',
		pass: 'BCJrfy9y+IdvHJdLfTsOB4WtUTaABmtYZ9Zmb39jF46q'
	}
}));

// transports.push(nodemailer.createTransport({
// service: 'Gmail',
// 		auth: {
// 			user: 'kiariecharles77@gmail.com',
// 			pass: 'ilvdxpomydyyhfqz'
// 		}
// }));

exports.postEmail = (req, res) => {
	const toEmail = req.params.email;
	const fromEmail = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;

	let thanks = req.body.thanks
	if (thanks === null || thanks === undefined || thanks == "") {
		thanks = "https://awesomecontact.me/thankyou/";
	}
	

	sendEmail(toEmail, fromEmail, subject, message);

	//check if email is a paying user
	//redirect to thank you page

	res.redirect(301, thanks);
	return res.end();
};

const sendEmail = (toEmail, fromEmail, subject, message) => {

	const db = getDb();

	const mailQueue = new MailTime({
	    db, 
	    type: 'server',
	    strategy: 'balancer', // Transports will be used in round robin chain
	    transports,
	    from(transport) {
	      // To pass spam-filters `from` field should be correctly set
	      // for each transport, check `transport` object for more options
	      return '"Awesome App" <' + transport._options.from + '>';
	    },
	    concatEmails: true, // Concatenate emails to the same addressee
	    concatDelimiter: '<h1>{{{subject}}}</h1>', // Start each concatenated email with it's own subject
	    template: MailTime.Template // Use default template
	  });

	// var mailOptions = {
	// 	from: 'Charles <kiariecharles77@gmail.com>',
	// 	to: 'kiariecharles77@gmail.com',
	// 	subject: 'This is from awesome contact mailt-time',
	// 	text: `It works.`,
	// 	html: `<p>It works</p>`
	// };

	var mailOptions = {
		from: fromEmail,
		to: toEmail,
		subject: subject,
		text: message,
		html: `<p>${message}</p>`
	};


	mailQueue.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		} else {
			console.log('Message Sent: '+info.response);
		}
	});
};