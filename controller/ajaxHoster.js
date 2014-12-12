var express = require('express');
var consts = require('../constants');
var debug = require('../debug');
var db_word = require('../model/word');
var router = express.Router();

router.post('/word/add',function(req,res){
	db_word.save(req.body,function(err,doc){
		if(!err){
			debug.log("a new word \""+req.body.english+"\" was saved");
			res.json({err:false});
		}else{
			debug.error("a error occurs when saving a new word \""+req.body.english+"\", error info: "+ err);
			res.json({err:true});
		}
	});
});

module.exports = router;
