const app = express();
const path = require('path');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const {Users} = require('../controller/users');
const sendMail = require('../controller/sendMail');
mongoose.connect('mongodb://localhost/personalBook');


var userLogin = function(data,callback){

    Users.findByCredentials(data.email, data.password).then((user) => {
        sess.userid = user._id;
        sess.token = user.tokens[0].token;
        return user.generateAuthToken().then((token) => {
            console.log(user);
            res.header("x-auth", token).render("homePage", {
                data: user
            });
        });
    }).catch((err) => {
        res.status(400).render("login", {
            errormessage: "Invalid email or password!"
        });
    });
}

