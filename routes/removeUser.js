var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/removeUser', function(req, res, next) {
  res.render('index', { title: 'Remove' });
});

module.exports = router;