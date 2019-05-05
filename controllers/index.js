const path = require('path');
const nodemailer = require('nodemailer');


exports.getIndex = (req, res) => {
	 res.send("Its Working");
};


exports.postEmail = (req, res) => {
	console.log(req.body);
	const email = req.body.email;
	const subject = req.body.subject;
	const message = req.body.message;

	//sendEmail(email, subject, message);
};


const sendEmail = () => {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'kiariecharles77@gmail.com',
			pass: 'megasxlrunderground'
		}
	});

	var mailOptions = {
		from: 'Charles <kiariecharles77@gmail.com>',
		to: 'kiariecharles77@gmail.com',
		subject: 'This is from awesome contact',
		text: `It works.`,
		html: `<p>It works</p>`
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		} else {
			console.log('Message Sent: '+info.response);
		}
	});
};