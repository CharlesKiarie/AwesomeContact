const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

const User = require('./models/user');
const errorController = require('./controllers/error');
const mongoConnect = require('./utils/database').mongoConnect;
const routes = require('./routes/routes');

const MONGODB_URI = 'mongodb://localhost:27017/test';
const store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions'
});


app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended:false }));

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

mongoConnect(client => {
	//console.log(client);
	app.listen(PORT);
});
