const path = require('path');
const nodemailer = require('nodemailer');
const MailTime = require('mail-time');
const getDb = require('../utils/database').getDb;

const transports = [];

transports.push(nodemailer.createTransport({
  service: 'Gmail',
		auth: {
			user: 'kiariecharles77@gmail.com',
			pass: 'megasxlrunderground'
		}
}));


exports.postEmail = (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;
	
	let thanks = req.body.thanks;
	if (thanks === null || thanks === undefined) {
		thanks = "https://google.com";
	}
	
	sendEmail(email, subject, message);

	//check if email is a paying user
	//redirect to thank you page
	res.json({success : "Updated Successfully", status : 200});
	res.writeHead(301, {Location: `${thanks}`});
	res.end();
};

const sendEmail = () => {

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

	var mailOptions = {
		from: 'Charles <kiariecharles77@gmail.com>',
		to: 'kiariecharles77@gmail.com',
		subject: 'This is from awesome contact mailt-time',
		text: `It works.`,
		html: `<p>It works</p>`
	};


	mailQueue.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		} else {
			console.log('Message Sent: '+info.response);
		}
	});
};