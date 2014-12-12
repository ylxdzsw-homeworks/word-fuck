var consts = require('../constants');
var debug = require('../debug');
var monk = require('monk');
var db = monk(consts.db.url);

var save = function(word,callback){
	db.get('word').insert(word,function(err,doc){
		callback(err,doc);
	});
};

var batchsave = function(words,callback){
	words = words.map(function(x){
		return {
			english: x[0],
			POS: x[1],
			chinese: x[2]
		};
	});
	var co = {
		counts: 0,
		data: []
	};
	words.map(function(word){
		co.counts += 1;
		save(word,function(err,doc){
			co.data.push(doc);
			if(co.counts != 1){
				co.counts -= 1;
			}else{
				debug.info(co.data.length + ' words imported')
				callback(co.data);
			}
		});
	});
};

var clear = function(callback){
	db.get('word').drop(callback);
};

var index = function(callback){
	db.get('word').index('english',callback);
}
module.exports = {
	save:save,
	batchsave:batchsave,
	clear:clear,
	index:index
};