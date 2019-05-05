const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

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
app.use(routes);

mongoConnect(client => {
	console.log(client);
	app.listen(PORT);
});
