var consts = require('../constants');
var debug = require('../debug');
var db_word = require('./word');

var start = function(session,number,callback){
	session.total = number;
	session.remains = number;
	session.right = 0;
	session.wrong = 0;
	session.key = '';
	callback(false);
}

var next = function(session,callback){
	db_word.randomload(function(doc){
		session.key = doc.english;
		callback({
			POS: doc.POS,
			chinese: doc.chinese
		});
	});
};

var doquiz = function(session,answer,callback){
	session.remains -= 1;
	if(session.key === answer.trim()){
		session.right += 1;
		callback(true);
	}else{
		session.wrong += 1;
		callback(false);
	}
};

module.exports = {
	start:start,
	next:next,
	doquiz:doquiz
};