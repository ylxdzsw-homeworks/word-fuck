/* 
 * description: word fuck quiz manager
 * author: ylxdzsw@gmail.com
 * date: 2014.12.10
 * lisence: MIT
 */
var consts = require('../constants');
var debug = require('../debug');
var db_word = require('./word');

var start = function(session,number,callback){
	session.total = number;
	session.remain = number;
	session.right = 0;
	session.wrong = 0;
	session.key = '';
	callback(false);
}

var next = function(session,callback){
	db_word.randomload(function(err,doc){
		if(err){
			callback(err)
		}else{
			session.key = doc.english;
			callback(false,{
				POS: doc.POS,
				chinese: doc.chinese,
				remain: session.remain
			});
		}
	});
};

var doquiz = function(session,answer,callback){
	session.remain -= 1;
	if(session.key === answer.trim()){
		session.right += 1;
		callback(false);
	}else{
		session.wrong += 1;
		callback(session.key);
	}
};

module.exports = {
	start:start,
	next:next,
	doquiz:doquiz
};