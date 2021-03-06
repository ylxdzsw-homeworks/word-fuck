/* 
 * description: word fuck ajax hoster
 * author: ylxdzsw@gmail.com
 * date: 2014.12.10
 * lisence: MIT
 */
var express = require('express');
var consts = require('../constants');
var debug = require('../debug');
var db_word = require('../model/word');
var db_quiz = require('../model/quiz');
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

router.post('/word/import',function(req,res){
	x = require('../wordlist');
	db_word.batchsave(x,function(x){
		res.json({
			err:!Boolean(x.length)
		});
	});
});

router.post('/word/clear',function(req,res){
	db_word.clear(function(err){
		if(!err){
			debug.info("Database cleared");
		}else{
			debug.warn("Database clearing failed");
		}
		res.json({
			err:err
		});
	});
});

router.post('/word/index',function(req,res){
	db_word.index(function(err){
		if(!err){
			debug.info("Index built succesfully");
		}else{
			debug.warning("Building index failed");
		}
		res.json({
			err:err
		});
	});
});

//==========^^^*word*^^^=====vvv*quiz*vvv==============

router.post('/quiz/start',function(req,res){
	if(Number.isNaN(Number(req.body.num)) || Number(req.body.num) < 1 || Number(req.body.num) != Math.floor(Number(req.body.num))){
		res.json({
			err:"not a integer"
		});
	}else{
		db_quiz.start(req.session,Number(req.body.num),function(err){
			res.json({
				err:err
			});
		});
	}
});

router.post('/quiz/do',function(req,res){
	db_quiz.doquiz(req.session,req.body.english,function(err){
		res.json({
			err:err,
			done:!req.session.remain
		});
	});
});

router.post('/quiz/next',function(req,res){
	if(req.session.remain){
		db_quiz.next(req.session,function(err,doc){
			doc = doc || {};
			doc.err = err;
			res.json(doc);
		});
	}else{
		res.json({
			err:false,
			remain:0,
			right:req.session.right,
			wrong:req.session.wrong,
			total:req.session.total,
			ratio:Math.floor(10000*req.session.right/req.session.total)/100 + '%'
		});
	}
});
module.exports = router;
