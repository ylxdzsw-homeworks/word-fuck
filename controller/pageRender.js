var express = require('express');
var consts = require('../constants');
var debug = require('../debug');
var router = express.Router();

router.get(['/','/index','/index.jade','/app','/app.jade'], function(req,res){
	res.render('app',{consts:consts});
});

module.exports = router;
