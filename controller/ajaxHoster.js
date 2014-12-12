var express = require('express');
var consts = require('../constants');
var debug = require('../debug');
var db_file = require('../model/file');
var db_user = require('../model/user');
var router = express.Router();

router.post('/file/upload',function(req,res,next){
	db_file.save(req.files,function(err,doc){
		res.json({id:doc[0]._id});
	});
});

router.post('/user/add', function(req,res,next){
	console.log(req.body);
	db_user.save(req.body,function(err,doc){
		res.json({id:doc._id});
	});
});

module.exports = router;
