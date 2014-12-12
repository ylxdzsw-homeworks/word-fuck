var express = require('express');
var consts = require('../constants');
var metadata = require('../metadata');
var debug = require('../debug');
var router = express.Router();

router.get(['/','/index','/index.jade'], function(req,res){
	res.render('index',{consts:consts});
});

router.get(['/apply','/apply.jade'], function(req,res){
	res.render('apply',{consts:consts,metadata:metadata});
});

router.route('/test').get(function(req,res){
	res.render('test',{session:req.session});
}).post(function(req,res){
	if(req.session.counter==undefined){
		req.session.counter = 0;
	}else{
		req.session.counter+=1;
	}
	res.json({fuck:'nothing'});
});
module.exports = router;
