var consts = require('../constants');
var debug = require('../debug');
var monk = require('monk');
var db = monk(consts.db.url);

var save = function(word,callback){
	db.get('word').insert(word,function(err,doc){
		callback(err,doc);
	});
};

module.exports = {save:save};