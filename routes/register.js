var express = require('express');
var router = express.Router();
var saveData = require('../controller/saveData.js');
/* GET home page. */
router.get('/registration', function(req, res, next) {
  res.render('registration');
});

router.get('/registration', function(req, res, next) {
  res.render('registration');
});

router.post('/register1',function(req, res){
  console.log('Hello');
    saveData.uploadData(req,function(err,res){
      if(err){
        console.log('Error:',err);
      }
      else{
        res.render('login');
      }
    })

});

router.post('/updatePage',function(req, res){
  
    saveData.updateData(req,function(err,res){
      if(err){
        console.log('Error:',err);
      }
      else{
        console.log('done');
      }
    })

});




module.exports = router;