const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const express_enforces_ssl = require('express-enforces-ssl');
const http = require('http');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

const User = require('./models/User');
const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;
const getDb = require('./utils/database').getDb;
const routes = require('./routes/routes');

const MONGODB_URI = 'mongodb://localhost:27017/test';
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions'
});

const nodemailer = require('nodemailer');
const MailTime = require('mail-time');

app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:false }));
// app.enable('trust proxy');
// app.use(express_enforces_ssl());

app.use(session({
	secret: 'LshSY_iwklaZuuIop',
	resave: false,
	saveUninitialized: false,
	store: store
}));

app.use((req, res, next) => {
	if(!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
	.then(user => {
		req.user = user;
		//console.log(user);
		next();
	})
	.catch(err => console.log(err));

});

app.use(routes);
app.use(errorController.get404);

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

app.use((req, res, next) => {

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


		mailQueue.sendMail(mailOptions, function(error, info){
			if(error){
				console.log(error);
			} else {
				console.log('Message Sent: '+info.response);
			}
		});
		next();
});

mongoConnect(client => {
	//console.log(client);
	app.listen(PORT);
});