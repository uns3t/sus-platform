var express = require('express');
var router = express.Router();
var uuid=require('node-uuid')

var postlogin=require('./apis/login')

router.post('/login', postlogin);

module.exports = router;
