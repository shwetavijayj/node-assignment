var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const express = require('express');
const async = require('async');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const {Users} = require('../controller/users');
const sendMail = require('../controller/sendMail');
mongoose.connect('mongodb://localhost/personalBook');


var uploadData = function (req, callback) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        let fext = path.extname(files.filetoupload.name);
        let email = fields.email
        var name   = email.substring(0, email.lastIndexOf("@"));
        let fileName = name + fext;
        console.log(oldpath);
        console.log(files.filetoupload.name);
        console.log(fileName);
        fields.fileName = fileName;
        console.log(fields);
        var newpath = __dirname + '/../public/upload/' + fileName;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                console.log('Error', err);
            }
            else {
                fields.imagePath = newpath;
                var user = new Users(fields);
                console.log('User',user);
                user.save().then(() => {
                    return user.generateAuthToken();
                }).then((token) => {
                    //send mail method call
                    sendMail.sendRegistrationMail(user,function(err,res){
                        if(err){
                          console.log('Error:',err);
                        }
                        
                            callback(null,res);
                        
                      })
                   
                }).catch((e) => {
                    console.log('Unable to save user', e);
                });
            }

        });
    });
}

var updateData = function (req, res, callback) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(files.filetoupload){
        var oldpath = files.filetoupload.path;
        let fext = path.extname(files.filetoupload.name);
        console.log(fext);
        let fileName = fields.cname + fext;
        console.log(oldpath);
        console.log(files.filetoupload.name);
        console.log(fileName);
        fields.fileName = fileName;
        console.log(fields);
        var newpath = __dirname + '/../public/upload/' + fileName;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                console.log('Error', err);
            }
        })
    }
    else{

        var user = new Users(fields);
        console.log('User',user);
        Users.updateOne({
            email: req.session.email
        }, {
            $set: fields
        }, {
            new: true
        }).then((user) => {
            if (!user) {
                callback('Error');

            }
            else{
                callback(null,user);
            }
            Users.findByEmail(req.session.email).then((user) => {
                    
            }).catch((e) => {
                res.status(400).send("An error occured!");
            });
            
        }).catch((err) => {
            return res.status(400).send("An error occured");
        });
    }
        });
   
}



module.exports = {
    uploadData,
    updateData
}