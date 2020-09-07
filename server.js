const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const flash = require('connect-flash');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// set up express session and connect session to Sequelize db
const sess = {
	secret            : process.env.SESS_SECRET,
	cookie            : { maxAge: 3600000 },
	resave            : false,
	saveUninitialized : true,
	store             : new SequelizeStore({
		db : sequelize
	})
};

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use((req, res, next) => {
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});
app.use(routes);

// sequelize.sync({ force: true }).then(() => {
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
