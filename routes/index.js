var express = require('express');
var router = express.Router();
const {Users} = require('../controller/users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});





router.get('/registration', function(req, res){
  res.render('registration');
});

// router.get('/logout', function(req, res){
//   console.log(req.header);
// });

module.exports = router;
