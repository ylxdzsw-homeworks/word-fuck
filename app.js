var express = require('express');
var debug = require('./debug');
var consts = require('./constants');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var serveStatic = require('serve-static');
var mongoStore = require('connect-mongo')(session);

var pageRender = require('./controller/pageRender');
var ajaxHoster = require('./controller/ajaxHoster');


var app = express();

app.set('views','./view');
app.set('view engine','jade');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: consts.app.secret,
	store: new mongoStore({
		db: "word-fuck"
	},function(){
		debug.log("Session store has connected to MongoDB");
	}),
	cookie: {
		maxAge:86400000
	}
}));

app.use(function(req,res,next){
	next();
});

app.use('/static',serveStatic('./view/static'));
app.use('/ajax',ajaxHoster);
app.use('/',pageRender);

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err,req,res,next){
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
});

module.exports = app;
